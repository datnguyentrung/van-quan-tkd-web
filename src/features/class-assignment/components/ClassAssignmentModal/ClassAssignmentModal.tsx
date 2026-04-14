// File: src/features/class-assignment/components/ClassAssignmentModal/ClassAssignmentModal.tsx
import { useState, useEffect } from "react";
import { ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

import StepProgress from "../StepProgress/StepProgress";
import StudentSearch from "../StudentSearch/StudentSearch";
import ClassList from "../ClassList/ClassList";
import { EnrollmentSuccessOverlay } from "../EnrollmentSuccessOverlay";

import { branchApi } from "../../api/branchApi";
import { enrollmentApi } from "../../api/enrollmentApi";

import type { StudentAutocompleteDTO } from "../../../../types/Core/StudentStypes";
import type { ClassScheduleDropdown } from "@/types/Core/ClassScheduleTypes";
import type { BranchDropdown } from "@/types/Core/BranchTypes";
import { cn } from "@/components/ui/utils";
import styles from "../../styles/ClassAssignment.module.scss";

/**
 * Component trung tâm của tính năng Ghi Danh - Giao diện TRẮNG/ĐỎ PREMIUM.
 * Quản lý toàn bộ trạng thái và logic 3 bước.
 */
export const ClassAssignmentModal = () => {
  // --- STATE ---
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<StudentAutocompleteDTO | null>(null);
  const [selectedBranchId, setSelectedBranchId] = useState<string>("");
  const [enrollmentDate, setEnrollmentDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedClassIds, setSelectedClassIds] = useState<Set<string>>(new Set());
  
  const [classList, setClassList] = useState<ClassScheduleDropdown[]>([]);
  const [branches, setBranches] = useState<BranchDropdown[]>([]);
  const [isClassesLoading, setIsClassesLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // --- LOGIC: Load danh sách chi nhánh ---
  useEffect(() => {
    branchApi.fetchAll().then(setBranches).catch(console.error);
  }, []);

  // --- LOGIC: Load lớp học khi đổi chi nhánh ---
  useEffect(() => {
    if (!selectedBranchId) {
      setClassList([]);
      return;
    }

    const fetchClasses = async () => {
      setIsClassesLoading(true);
      try {
        const data = await branchApi.fetchClassesByBranch(selectedBranchId);
        setClassList(data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách lớp:", error);
      } finally {
        setIsClassesLoading(false);
      }
    };

    fetchClasses();
  }, [selectedBranchId]);

  // --- LOGIC: Reset lớp khi đổi chi nhánh (Yêu cầu nghiệp vụ: chỉ ghi danh 1 chi nhánh) ---
  useEffect(() => {
    setSelectedClassIds(new Set());
  }, [selectedBranchId]);

  // --- LOGIC: Chuyển bước tự động ---
  useEffect(() => {
    if (selectedStudent && currentStep === 1) {
      setCurrentStep(2);
    }
    if (!selectedStudent && currentStep > 1) {
      setCurrentStep(1);
      setSelectedBranchId("");
      setSelectedClassIds(new Set());
    }
  }, [selectedStudent, currentStep]);

  // --- ACTIONS ---
  const handleToggleClass = (id: string) => {
    const newIds = new Set(selectedClassIds);
    if (newIds.has(id)) newIds.delete(id);
    else newIds.add(id);
    setSelectedClassIds(newIds);
  };

  const handleSubmit = async () => {
    if (!selectedStudent || selectedClassIds.size === 0) return;

    setIsSubmitting(true);
    try {
      await enrollmentApi.create({
        studentId: selectedStudent.userId,
        scheduleIds: Array.from(selectedClassIds),
        joinDate: enrollmentDate,
      });
      setIsSuccess(true);
      setCurrentStep(3);
    } catch (error: any) {
      console.error("Enrollment error:", error);
      const backendMessage = error.response?.data?.message;
      toast.error(backendMessage || "Đã có lỗi xảy ra khi ghi danh. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSelectedStudent(null);
    setSelectedBranchId("");
    setSelectedClassIds(new Set());
    setCurrentStep(1);
    setIsSuccess(false);
  };

  // --- DATA PREP ---
  const selectedBranchName = branches.find(b => String(b.branchId) === selectedBranchId)?.branchName || "Chi nhánh";
  const selectedClassObjects = classList.filter(c => selectedClassIds.has(c.scheduleId));

  return (
    <div className={cn(styles.modal, isSuccess && styles.modalSuccessMode)}>
      {/* Success Overlay */}
      {isSuccess && (
        <EnrollmentSuccessOverlay
          selectedStudent={selectedStudent}
          branchName={selectedBranchName}
          enrollmentDate={enrollmentDate}
          selectedClasses={selectedClassObjects}
          onClose={handleReset}
        />
      )}

      {/* Header */}
      <header className={styles.header}>
        <div className="flex items-center gap-4">
          <div className={styles.iconBadge}>
            <span className="text-white">🥋</span>
          </div>
          <div>
            <h1 className={styles.title}>Ghi Danh Võ Sinh</h1>
            <p className={styles.subtitle}>Xếp lớp học cho học viên </p>
          </div>
        </div>
      </header>

      {/* Steps */}
      <StepProgress currentStep={currentStep} />

      {/* Body */}
      <div className={styles.modalBody}>
        {/* Step 1: Tìm kiếm */}
        <StudentSearch
          selectedStudent={selectedStudent}
          onSelect={setSelectedStudent}
          onClear={() => setSelectedStudent(null)}
        />

        {/* Step 2: Chi nhánh & Ngày */}
        <div className="grid grid-cols-2 gap-4">
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Chi nhánh <span className={styles.redText}>*</span></label>
            <div className="relative">
              <select
                className={cn(styles.inputField, "appearance-none pr-10")}
                value={selectedBranchId}
                onChange={(e) => setSelectedBranchId(e.target.value)}
                /* Cho phép chọn trước theo yêu cầu */
              >
                <option value="">— Chọn chi nhánh —</option>
                {branches.map(b => (
                  <option key={b.branchId} value={b.branchId}>{b.branchName}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#8A92A6] text-xs font-bold">
                v
              </div>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel}>Ngày nhập học <span className={styles.redText}>*</span></label>
            <input
              type="date"
              className={styles.inputField}
              value={enrollmentDate}
              onChange={(e) => setEnrollmentDate(e.target.value)}
              /* Cho phép chọn trước theo yêu cầu */
            />
          </div>
        </div>

        {/* Step 3: Danh sách lớp */}
        <ClassList
          hasBranch={!!selectedBranchId}
          isLoading={isClassesLoading}
          classList={classList}
          selectedIds={selectedClassIds}
          onToggle={handleToggleClass}
        />
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="text-[12.5px] text-[#8A92A6]">
          {selectedStudent ? (
            <>Đang chọn: <strong className="text-[#1A1D23]">{selectedStudent.fullName}</strong> · {selectedClassIds.size} lớp</>
          ) : (
            "Vui lòng chọn võ sinh & lớp học"
          )}
        </div>
        <div className="flex gap-2.5">
          <button onClick={handleReset} className={cn(styles.btn, styles.btnGhost)}>
            Hủy bỏ
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedStudent || selectedClassIds.size === 0 || isSubmitting}
            className={cn(styles.btn, styles.btnPrimary)}
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>Xác nhận Ghi danh <ChevronRight size={16} /></>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
};
