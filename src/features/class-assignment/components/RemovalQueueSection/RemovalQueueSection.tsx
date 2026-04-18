import React from "react";
import { X, Calendar, MapPin } from "lucide-react";
import { cn } from "@/components/ui/utils";
import type { ClassDisplayItem } from "@/types/Core/ClassScheduleTypes";
import styles from "../../styles/ClassAssignment.module.scss";

interface RemovalQueueSectionProps {
  removalQueue: Set<string>;
  toDeleteObjects: ClassDisplayItem[];
  onRemoveFromQueue: (id: string) => void;
  onConfirmRemoval: () => void;
  isProcessing?: boolean;
}

export const RemovalQueueSection: React.FC<RemovalQueueSectionProps> = ({
  removalQueue,
  toDeleteObjects,
  onRemoveFromQueue,
  onConfirmRemoval,
  isProcessing = false,
}) => {
  if (removalQueue.size === 0) return null;

  return (
    <div className={styles.removalSection}>
      <h3 className={cn(styles.sectionTitle, "mb-4")}>
        🗑️ Danh sách lớp học muốn xóa
      </h3>
      <div className={styles.removalList}>
        {toDeleteObjects.map((cls) => (
          <div key={cls.scheduleId} className={styles.classItem}>
            <div className="flex-1">
              <div className="text-[13.5px] font-bold text-[#1A1D23]">{cls.displayLabel}</div>
              
              {/* Thông tin phụ: ngày nhập học & chi nhánh (Đồng bộ với ClassList) */}
              {(cls.joinDate || cls.branchName) && (
                <div className="flex items-center gap-3 mt-1 text-[10.5px] text-[#8A92A6]">
                  {cls.joinDate && (
                    <span className="flex items-center gap-1">
                      <Calendar size={11} className="opacity-60" />
                      {cls.joinDate}
                    </span>
                  )}
                  {cls.branchName && (
                    <span className="flex items-center gap-1">
                      <MapPin size={11} className="opacity-60" />
                      {cls.branchName}
                    </span>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={() => onRemoveFromQueue(cls.scheduleId)}
              className={styles.btnSmallSquare}
              title="Bỏ khỏi danh sách chờ xóa"
              disabled={isProcessing}
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
      <button
        className={styles.btnConfirmRemoval}
        onClick={onConfirmRemoval}
        disabled={isProcessing}
      >
        {isProcessing ? "Đang xử lý..." : `Xác nhận xóa (${removalQueue.size})`}
      </button>
    </div>
  );
};
