// File: src/features/class-assignment/components/EnrollmentSuccessOverlay/EnrollmentSuccessOverlay.tsx
import React from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/components/ui/utils";
import type { StudentAutocompleteDTO } from "../../../../types/Core/StudentStypes";
import type { ClassScheduleDropdown } from "@/types/Core/ClassScheduleTypes";
import styles from "../../styles/ClassAssignment.module.scss";

interface EnrollmentSuccessOverlayProps {
  selectedStudent: StudentAutocompleteDTO | null;
  branchName: string;
  enrollmentDate: string;
  selectedClasses: ClassScheduleDropdown[];
  onClose: () => void;
}

/**
 * Component hiển thị thông báo "Ghi danh thành công" - Phiên bản Premium.
 */
export const EnrollmentSuccessOverlay: React.FC<EnrollmentSuccessOverlayProps> = ({
  selectedStudent,
  branchName,
  enrollmentDate,
  selectedClasses,
  onClose,
}) => {
  return (
    <div className={styles.successOverlay}>
      <div className={styles.successCard}>
        <div className={styles.successIcon}>
          <CheckCircle2 size={36} />
        </div>
        <h2 className={styles.successTitle}>Ghi danh thành công!</h2>
        <p className={styles.successSub}>
          Đã thêm <strong>{selectedStudent?.fullName}</strong> vào {selectedClasses.length} lớp học tại {branchName}
        </p>
        <div className={styles.successDetail}>
          <div className="font-semibold mb-1">
            📅 Ngày nhập học: <strong>{enrollmentDate}</strong>
          </div>
          {selectedClasses.map((c) => (
            <div key={c.scheduleId}>📝 {c.displayLabel}</div>
          ))}
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={onClose} className={cn(styles.btn, styles.btnPrimary)}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
