import { useMemo, useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { AttendanceStatus } from "@/config/constants";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { StudentAttendanceResponse } from "@/types";
import { studentAttendanceApi } from "@/services/studentAttendanceApi";
import { studentEnrollmentApi } from "@/services/studentEnrollmentApi";
import styles from "./StudentListPage.module.scss";

const ITEMS_PER_PAGE = 10;
const coachAttendanceToggles: AttendanceStatus[] = ["PRESENT", "ABSENT", "LATE"];

function getStatusText(status?: string | null) {
  const s = status?.toString().toUpperCase();
  if (s === "PRESENT") return "Có mặt";
  if (s === "LATE") return "Muộn";
  return "Vắng"; 
}

function getStatusClass(status?: string | null) {
  const s = status?.toString().toUpperCase();
  if (s === "PRESENT") return styles.present;
  if (s === "LATE") return styles.late;
  return styles.absent; 
}

function getTodayLocalDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export default function StudentListPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedStatus, setSelectedStatus] = useState<AttendanceStatus | "ALL">("ALL");
  const [updatingAttendanceId, setUpdatingAttendanceId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const scheduleId = searchParams.get("scheduleId") ?? "";
  const className = searchParams.get("className") ?? "Danh sách lớp";
  const branchName = searchParams.get("branchName") ?? "";
  const shift = searchParams.get("shift") ?? "";
  const sessionDate = useMemo(() => getTodayLocalDate(), []);

  const { data: enrollmentCount = 0 } = useQuery({
    queryKey: ["studentEnrollmentCount", scheduleId],
    enabled: Boolean(scheduleId),
    queryFn: async () => {
      const rows = await studentEnrollmentApi.getActiveByClassSchedule(scheduleId);
      return rows.length;
    },
  });

  const { data, isLoading, isError, refetch, isFetching } = useQuery<StudentAttendanceResponse[]>({
    queryKey: ["studentAttendance", scheduleId, sessionDate],
    enabled: Boolean(scheduleId),
    queryFn: async () => {
      const records = await studentAttendanceApi.filterByScheduleAndDate(scheduleId, sessionDate);
      if (records && records.length > 0) return records;
      return studentAttendanceApi.initializeDailyAttendance({ classScheduleId: scheduleId, sessionDate });
    },
  });

  const updateAttendanceMutation = useMutation({
    mutationFn: async ({ attendanceId, attendanceStatus }: { attendanceId: string; attendanceStatus: AttendanceStatus }) => {
      setUpdatingAttendanceId(attendanceId);
      await studentAttendanceApi.updateAttendanceStatus(attendanceId, {
        attendanceStatus,
        checkInTime: new Date().toISOString(),
      });
    },
    onSettled: async () => {
      setUpdatingAttendanceId(null);
      await refetch();
    },
  });

  const stats = useMemo(() => {
    const list = data ?? [];
    return {
      ALL: list.length,
      PRESENT: list.filter(s => s.attendanceStatus?.toString().toUpperCase() === "PRESENT").length,
      LATE: list.filter(s => s.attendanceStatus?.toString().toUpperCase() === "LATE").length,
      ABSENT: list.filter(s => {
        const st = s.attendanceStatus?.toString().toUpperCase();
        return st !== "PRESENT" && st !== "LATE"; // Gồm cả "ABSENT", null, rỗng...
      }).length,
    };
  }, [data]);

  const filteredStudents = useMemo(() => {
    const list = data ?? [];
    if (selectedStatus === "ALL") return list;
    return list.filter((s) => {
      const st = s.attendanceStatus?.toString().toUpperCase();
      const safeSt = (st === "PRESENT" || st === "LATE") ? st : "ABSENT";
      return safeSt === selectedStatus.toUpperCase();
    });
  }, [data, selectedStatus]);

  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredStudents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredStudents, currentPage]);

  useEffect(() => { setCurrentPage(1); }, [selectedStatus]);

  return (
    <div className={styles.pageRoot}>
      <button className={styles.backButton} onClick={() => navigate("/dashboard")}>← Quay lại dashboard</button>

      <div className={styles.pageHeader}>
        <div className={styles.headerInfo}>
          <span className={styles.sectionLabel}>Điểm danh võ sinh</span>
          <h1 className={styles.pageTitle}>{className}</h1>
          <p className={styles.pageSubtitle}>{branchName} • {shift} • <span className={styles.dateBadge}>{sessionDate}</span></p>
        </div>

        <div className={styles.filterBox}>
          <p className={styles.filterLabel}>Lọc trạng thái</p>
          <ToggleGroup type="single" value={selectedStatus} onValueChange={(v) => v && setSelectedStatus(v as any)} className={styles.mainToggle}>
            <ToggleGroupItem value="ALL" className={styles.filterButton}>Tất cả ({stats.ALL})</ToggleGroupItem>
            <ToggleGroupItem value="PRESENT" className={styles.filterButton}>Có mặt ({stats.PRESENT})</ToggleGroupItem>
            <ToggleGroupItem value="ABSENT" className={styles.filterButton}>Vắng ({stats.ABSENT})</ToggleGroupItem>
            <ToggleGroupItem value="LATE" className={styles.filterButton}>Muộn ({stats.LATE})</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      <div className={styles.listContainer}>
        <div className={styles.listSummary}>
          <span>Hiển thị <strong>{filteredStudents.length}</strong> võ sinh (Sĩ số: {enrollmentCount})</span>
          <span className={styles.viewMode}>Trang {currentPage} / {totalPages || 1}</span>
        </div>

        {isLoading || isFetching ? (
          <div className={styles.emptyState}>Đang đồng bộ dữ liệu...</div>
        ) : paginatedStudents.length === 0 ? (
          <div className={styles.emptyState}>Mục này hiện đang trống.</div>
        ) : (
          <>
            <div className={styles.studentList}>
              {paginatedStudents.map((student, index) => {
                // 🛡️ SỬA NHẸ 5: Gắn status an toàn để ToggleGroup tự chọn đúng nút Vắng
                const st = student.attendanceStatus?.toString().toUpperCase();
                const safeStatus = (st === "PRESENT" || st === "LATE") ? st : "ABSENT";

                return (
                  <div key={student.attendanceId} className={styles.studentRow}>
                    <div className={styles.studentLeft}>
                      <div className={styles.indexNum}>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</div>
                      <div className={styles.avatar}>{student.studentName.split(" ").pop()?.charAt(0)}</div>
                      <div className={styles.nameContent}>
                        <h3 className={styles.studentName}>{student.studentName}</h3>
                        <div className={`${styles.statusIndicator} ${getStatusClass(safeStatus)}`}>
                          <span className={styles.dot}></span>
                          {getStatusText(safeStatus)}
                        </div>
                      </div>
                    </div>

                    <div className={styles.studentRight}>
                      <ToggleGroup
                        type="single"
                        className={styles.attendanceToggle}
                        value={safeStatus}
                        onValueChange={(val) => {
                          if (!val || val === safeStatus) return;
                          updateAttendanceMutation.mutate({ attendanceId: student.attendanceId, attendanceStatus: val as AttendanceStatus });
                        }}
                        disabled={updateAttendanceMutation.isPending && updatingAttendanceId === student.attendanceId}
                      >
                        {coachAttendanceToggles.map((status) => (
                          <ToggleGroupItem key={status} value={status} className={styles.toggleItem}>{getStatusText(status)}</ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </div>
                  </div>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className={styles.paginationWrapper}>
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className={styles.pagerBtn}>Trước</button>
                <div className={styles.pageNumbers}>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                    <button key={num} onClick={() => setCurrentPage(num)} className={`${styles.pageNumber} ${currentPage === num ? styles.activePage : ""}`}>{num}</button>
                  ))}
                </div>
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className={styles.pagerBtn}>Sau</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}