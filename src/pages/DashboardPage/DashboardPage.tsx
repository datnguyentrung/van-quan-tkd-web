import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { CoachAssignmentResponse } from "@/types";
import {
  ScheduleLevelLabel,
  ScheduleLocationLabel,
  ScheduleShiftLabel,
  WeekdayLabel,
} from "@/config/constants/CoreEnums";
import { useGetAccount } from "@/features/auth/api/useAuthentication";
import { coachApi } from "@/services/coachApi";
import styles from "./DashboardPage.module.scss";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [pullDistance, setPullDistance] = useState(0);
  const [isTouchActive, setIsTouchActive] = useState(false);
  const { data: account } = useGetAccount();

  const {
    data,
    isFetching,
    refetch,
    isLoading,
    isError,
  } = useQuery<CoachAssignmentResponse[]>({
    queryKey: ["dashboardSchedules", account?.userId],
    queryFn: () => coachApi.getTodaySchedule(account!.userId),
    enabled: Boolean(account?.userId),
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });

  const schedules = useMemo(() => {
    const list = data ?? [];
    return [...list].sort((a, b) => {
      if (a.classSchedule.weekday === b.classSchedule.weekday) {
        return a.classSchedule.startTime.localeCompare(b.classSchedule.startTime);
      }
      return a.classSchedule.weekday.localeCompare(b.classSchedule.weekday);
    });
  }, [data]);

  const handleRefresh = async () => {
    await refetch();
    setPullDistance(0);
    setIsTouchActive(false);
    setTouchStartY(null);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (isFetching) return;
    if (window.scrollY > 0) return;
    setTouchStartY(event.touches[0].clientY);
    setIsTouchActive(true);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!isTouchActive || touchStartY === null) return;
    const delta = event.touches[0].clientY - touchStartY;
    if (delta > 0) {
      event.preventDefault();
      setPullDistance(Math.min(delta, 120));
    }
  };

  const handleTouchEnd = async () => {
    if (!isTouchActive) return;
    if (pullDistance >= 80) {
      await handleRefresh();
    } else {
      setPullDistance(0);
    }
    setTouchStartY(null);
    setIsTouchActive(false);
  };

  const pullText = isFetching
    ? "Đang làm mới..."
    : pullDistance >= 80
      ? "Nhấn để làm mới"
      : "Kéo xuống để làm mới";

  const openStudentList = (schedule: CoachAssignmentResponse) => {
    const params = new URLSearchParams({
      scheduleId: schedule.classSchedule.scheduleId,
      className: ScheduleLevelLabel[schedule.classSchedule.scheduleLevel],
      classCode: schedule.classSchedule.scheduleId,
      branchName: schedule.classSchedule.branchName,
      shift: ScheduleShiftLabel[schedule.classSchedule.scheduleShift],
    });

    navigate(`/students?${params.toString()}`);
  };

  return (
    <div className={styles.pageRoot}>
      <div
        className={styles.pullContainer}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={styles.pullIndicator}
          style={{ height: `${pullDistance}px` }}
        >
          <span>{pullText}</span>
        </div>

        <div className={styles.pageContent}>
          <div className={styles.headerBar}>
            <div>
              <div className={styles.badge}>Dashboard</div>
              <h1 className={styles.pageTitle}>Lịch dạy hôm nay</h1>
              <p className={styles.pageSubtitle}>
                Card lịch dạy với tên lớp, ca học và chi nhánh. Kéo xuống để làm mới.
              </p>
            </div>
            <button
              type="button"
              className={styles.refreshButton}
              onClick={handleRefresh}
              disabled={isFetching}
            >
              {isFetching ? "Làm mới..." : "Làm mới"}
            </button>
          </div>

          {!account?.userId ? (
            <div className={styles.emptyState}>Không tìm thấy thông tin HLV.</div>
          ) : isLoading ? (
            <div className={styles.emptyState}>Đang tải dữ liệu ...</div>
          ) : isError ? (
            <div className={styles.emptyState}>Không tải được lịch hôm nay.</div>
          ) : schedules.length === 0 ? (
            <div className={styles.emptyState}>Hôm nay chưa có lịch nào.</div>
          ) : (
            <ul className={styles.cardList}>
              {schedules.map((schedule) => {
                const classSchedule = schedule.classSchedule;

                return (
                  <li key={schedule.assignmentId} className={styles.cardItem}>
                    <button
                      type="button"
                      className={styles.cardButton}
                      onClick={() => openStudentList(schedule)}
                    >
                      <div className={styles.cardHeader}>
                        <div>
                          <p className={styles.cardEyebrow}>{`Mã lớp ${classSchedule.scheduleId}`}</p>
                          <h2>{ScheduleLevelLabel[classSchedule.scheduleLevel]}</h2>
                        </div>
                        <span className={styles.shiftBadge}>
                          {ScheduleShiftLabel[classSchedule.scheduleShift]}
                        </span>
                      </div>
                      <p className={styles.cardMeta}>
                        {WeekdayLabel[classSchedule.weekday]} - {classSchedule.startTime} - {classSchedule.endTime}
                      </p>
                      <div className={styles.cardRow}>
                        <span className={styles.cardLabel}>Chi nhánh</span>
                        <span>{classSchedule.branchName}</span>
                      </div>
                      <div className={styles.cardRow}>
                        <span className={styles.cardLabel}>Tên lớp</span>
                        <span>{ScheduleLevelLabel[classSchedule.scheduleLevel]}</span>
                      </div>
                      <div className={styles.cardRow}>
                        <span className={styles.cardLabel}>Địa điểm</span>
                        <span>{ScheduleLocationLabel[classSchedule.scheduleLocation]}</span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
