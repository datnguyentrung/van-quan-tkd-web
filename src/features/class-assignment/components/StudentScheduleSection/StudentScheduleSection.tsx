import React from "react";
import { ClassList } from "../ClassList";
import type { ClassDisplayItem } from "@/types/Core/ClassScheduleTypes";
import styles from "../../styles/ClassAssignment.module.scss";

interface StudentScheduleSectionProps {
  isLoading: boolean;
  selectedStudent: any;
  activeDisplayClasses: ClassDisplayItem[];
  onDelete: (id: string) => void;
}

export const StudentScheduleSection: React.FC<StudentScheduleSectionProps> = ({
  isLoading,
  selectedStudent,
  activeDisplayClasses,
  onDelete,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className={styles.sectionTitle}>
        🥋 Lịch học của học viên
      </h3>
      <ClassList
        hasBranch={!!selectedStudent}
        isLoading={isLoading}
        classList={selectedStudent ? activeDisplayClasses : []}
        selectedIds={new Set()}
        onAction={onDelete}
        actionLabel="Xóa"
      />
    </div>
  );
};
