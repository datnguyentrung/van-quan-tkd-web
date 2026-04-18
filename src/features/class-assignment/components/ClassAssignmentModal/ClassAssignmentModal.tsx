// File: src/features/class-assignment/components/ClassAssignmentModal/ClassAssignmentModal.tsx
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";

import StepProgress from "../StepProgress/StepProgress";
import StudentSearch from "../StudentSearch/StudentSearch";
import { ClassList } from "../ClassList";

import { branchApi } from "../../api/branchApi";
import { enrollmentApi } from "../../api/enrollmentApi";

import type { StudentAutocompleteDTO } from "../../../../types/Core/StudentStypes";
import type { BranchDropdown } from "@/types/Core/BranchTypes";
import type { ClassScheduleDropdown, ClassDisplayItem } from "@/types/Core/ClassScheduleTypes";
import type { StudentEnrollmentResponse } from "@/types/Operation/StudentEnrollmentTypes";
import { cn } from "@/components/ui/utils";
import { StudentScheduleSection } from "../StudentScheduleSection";
import { RemovalQueueSection } from "../RemovalQueueSection";
import styles from "../../styles/ClassAssignment.module.scss";

/**
 * Component trung tâm của tính năng Ghi Danh - Giao diện TRẮNG/ĐỎ PREMIUM.
 * Luồng hoạt động REAL-TIME:
 *  - Thêm lớp: Lưu ngay xuống backend → refetch danh sách.
 *  - Xóa lớp: Đưa vào hàng chờ → Xác nhận xóa mới gọi API.
 */
export const ClassAssignmentModal = () => {
  // --- STATE ---
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<StudentAutocompleteDTO | null>(null);
  const [selectedBranchId, setSelectedBranchId] = useState<string>("");
  const [selectedClassIds, setSelectedClassIds] = useState<Set<string>>(new Set());
  const [enrollmentDate, setEnrollmentDate] = useState(new Date().toISOString().split("T")[0]);

  // Danh sách các ID lớp muốn XÓA (staged - chỉ cập nhật UI, chưa gọi API)
  const [removalQueue, setRemovalQueue] = useState<Set<string>>(new Set());

  const [branches, setBranches] = useState<BranchDropdown[]>([]);
  const [isAdding, setIsAdding] = useState(false);       // Loading khi thêm lớp
  const [isRemoving, setIsRemoving] = useState(false);    // Loading khi xác nhận xóa

  // --- LOGIC: Load danh sách chi nhánh ---
  useEffect(() => {
    branchApi.fetchAll().then(setBranches).catch(console.error);
  }, []);

  // --- LOGIC: Load lớp học theo chi nhánh ---
  const { data: classList = [] } = useQuery({
    queryKey: ['classes-by-branch', selectedBranchId],
    queryFn: () => branchApi.fetchClassesByBranch(selectedBranchId),
    enabled: !!selectedBranchId,
    staleTime: 5 * 60 * 1000,
  });

  // Reset lớp đã chọn khi đổi chi nhánh
  useEffect(() => {
    setSelectedClassIds(new Set());
  }, [selectedBranchId]);

  // --- LOGIC: Load lịch học hiện tại của võ sinh ---
  const { data: existingEnrollments = [], isFetching: isEnrollmentsLoading, refetch: refetchEnrollments } = useQuery({
    queryKey: ['student-enrollments', selectedStudent?.userId],
    queryFn: () => enrollmentApi.fetchByStudentId(selectedStudent!.userId),
    enabled: !!selectedStudent,
  });

  // Map enrollment data → ClassDisplayItem (chỉ lấy đúng các trường cần hiển thị)
  const allClasses: ClassDisplayItem[] = existingEnrollments.map((en: StudentEnrollmentResponse) => ({
    scheduleId: en.classSchedule.scheduleId,
    displayLabel: en.classSchedule.displayLabel,
    joinDate: en.joinDate,
    branchName: en.classSchedule.branchName,
  }));

  // Danh sách hiển thị = tất cả lớp trừ những lớp đang trong hàng chờ xóa
  const activeDisplayClasses = selectedStudent ? allClasses.filter(c => !removalQueue.has(c.scheduleId)) : [];
  const toDeleteObjects = allClasses.filter(c => removalQueue.has(c.scheduleId));

  // Logic chuyển bước khi chọn võ sinh
  useEffect(() => {
    if (selectedStudent) {
      if (currentStep === 1) setCurrentStep(2);
    } else {
      if (currentStep > 1) {
        setCurrentStep(1);
        setSelectedBranchId("");
        setSelectedClassIds(new Set());
        setRemovalQueue(new Set());
      }
    }
  }, [selectedStudent]);

  // --- ACTIONS ---

  /**
   * Toggle chọn/bỏ chọn lớp từ danh sách chi nhánh.
   */
  const handleToggleClass = (id: string) => {
    setSelectedClassIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  /**
   * THÊM LỚP (Hàng loạt): Gọi API với tất cả các lớp đã chọn.
   */
  const handleAddClasses = async () => {
    if (selectedClassIds.size === 0 || !selectedStudent) return;

    // Lọc bỏ các lớp đã ghi danh rồi
    const existingIds = new Set(allClasses.map(c => c.scheduleId));
    const newIds = Array.from(selectedClassIds).filter(id => !existingIds.has(id));

    if (newIds.length === 0) {
      toast.warning("Tất cả các lớp đã chọn đều đã được ghi danh rồi");
      return;
    }

    setIsAdding(true);
    try {
      await enrollmentApi.create({
        studentId: selectedStudent.userId,
        scheduleIds: newIds,
        joinDate: enrollmentDate,
        note: "Đăng ký từ dashboard quản lý"
      });

      toast.success(`Đã ghi danh thành công ${newIds.length} lớp học!`);
      setSelectedClassIds(new Set());
      refetchEnrollments();
    } catch (error: any) {
      toast.error("Lỗi khi ghi danh lớp học.");
    } finally {
      setIsAdding(false);
    }
  };

  /**
   * XÓA LỚP (Bước 1): Đưa vào hàng chờ xóa — chỉ cập nhật giao diện.
   */
  const handleQueueDelete = (id: string) => {
    setRemovalQueue(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  /**
   * BỎ KHỎI HÀNG CHỜ: Hoàn tác việc đánh dấu xóa.
   */
  const handleRemoveFromQueue = (id: string) => {
    setRemovalQueue(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  /**
   * XÓA LỚP (Bước 2): Xác nhận xóa — gọi API xóa thực sự trên backend.
   */
  const handleConfirmRemoval = async () => {
    if (!selectedStudent || removalQueue.size === 0) return;

    try {
      setIsRemoving(true);
      const deletePromises = Array.from(removalQueue).map(scheduleId =>
        enrollmentApi.remove(selectedStudent.userId, scheduleId)
      );

      await Promise.all(deletePromises);

      toast.success(`Đã xóa thành công ${removalQueue.size} lớp học`);
      setRemovalQueue(new Set());
      refetchEnrollments();
    } catch (error) {
      toast.error("Lỗi khi thực hiện xóa lịch học");
    } finally {
      setIsRemoving(false);
    }
  };

  const handleReset = () => {
    setSelectedStudent(null);
    setSelectedBranchId("");
    setSelectedClassIds(new Set());
    setCurrentStep(1);
    setRemovalQueue(new Set());
  };

  return (
    <div className={styles.modal}>
      {/* Header */}
      <header className={styles.header}>
        <div className="flex items-center gap-4">
          <div className={styles.iconBadge}>
            <span className="text-white">🥋</span>
          </div>
          <div>
            <h1 className={styles.title}>Ghi Danh Võ Sinh</h1>
            <p className={styles.subtitle}>Xếp lớp học cho học viên</p>
          </div>
        </div>
      </header>

      {/* Steps */}
      <StepProgress currentStep={currentStep} />

      {/* Body */}
      <div className={styles.modalBody}>
        <StudentSearch
          selectedStudent={selectedStudent}
          onSelect={setSelectedStudent}
          onClear={() => setSelectedStudent(null)}
        />

        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className={styles.filterRow}>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Chi nhánh</label>
              <select
                className={styles.inputField}
                value={selectedBranchId}
                onChange={(e) => setSelectedBranchId(e.target.value)}
              >
                <option value="">— Chọn chi nhánh —</option>
                {branches.map(b => (
                  <option key={b.branchId} value={b.branchId}>{b.branchName}</option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel}>Ngày nhập học</label>
              <input
                type="date"
                className={styles.inputField}
                value={enrollmentDate}
                onChange={(e) => setEnrollmentDate(e.target.value)}
              />
            </div>

            <button
              className={styles.btnAdd}
              disabled={selectedClassIds.size === 0 || !selectedStudent || isAdding}
              onClick={handleAddClasses}
            >
              {isAdding ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <><Plus size={18} /> Thêm{selectedClassIds.size > 0 ? ` (${selectedClassIds.size})` : ''}</>
              )}
            </button>

            <div className={styles.classSelectionArea}>
              <label className={styles.fieldLabel}>Lịch học chi nhánh</label>
              <div className={cn(styles.branchScheduleBox, !selectedBranchId && "opacity-40 pointer-events-none")}>
                <ClassList
                  hasBranch={!!selectedBranchId}
                  isLoading={false}
                  classList={classList}
                  selectedIds={selectedClassIds}
                  onToggle={handleToggleClass}
                  isCompact={true}
                />
              </div>
            </div>
          </div>

          <div className={cn(styles.manageSection, !selectedStudent && "opacity-40 pointer-events-none")}>
            <StudentScheduleSection
              isLoading={isEnrollmentsLoading}
              selectedStudent={selectedStudent}
              activeDisplayClasses={activeDisplayClasses}
              onDelete={handleQueueDelete}
            />

            <RemovalQueueSection
              removalQueue={removalQueue}
              toDeleteObjects={toDeleteObjects}
              onRemoveFromQueue={handleRemoveFromQueue}
              onConfirmRemoval={handleConfirmRemoval}
              isProcessing={isRemoving}
            />
          </div>
        </div>
      </div>

      {/* Footer — Simplified */}
      <footer className={styles.footer}>
        <div className="text-[12.5px] text-[#8A92A6]">
          {selectedStudent ? (
            <>Võ sinh: <strong className="text-[#1A1D23]">{selectedStudent.fullName}</strong> · {activeDisplayClasses.length} lớp học</>
          ) : (
            "Vui lòng chọn võ sinh để quản lý"
          )}
        </div>
        <div className="flex gap-2.5">
          <button onClick={handleReset} className={cn(styles.btn, styles.btnGhost)}>
            Đặt lại
          </button>
        </div>
      </footer>
    </div>
  );
};
