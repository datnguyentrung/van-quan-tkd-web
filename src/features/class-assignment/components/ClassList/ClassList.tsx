// File: src/features/class-assignment/components/ClassList/ClassList.tsx
import { Check, Loader2, Calendar, User } from "lucide-react";
import { cn } from "@/components/ui/utils";
import type { ClassScheduleDropdown } from "@/types/Core/ClassScheduleTypes";
import styles from "../../styles/ClassAssignment.module.scss";

interface ClassListProps {
  hasBranch: boolean;
  isLoading: boolean;
  classList: ClassScheduleDropdown[];
  selectedIds: Set<string>;
  onToggle: (scheduleId: string) => void;
}

/**
 * Component hiển thị danh sách Lớp học - Custom UI.
 * Thiết kế khớp mẫu HTML class_assigment.html.
 */
export default function ClassList({
  hasBranch,
  isLoading,
  classList,
  selectedIds,
  onToggle,
}: ClassListProps) {
  return (
    <div className={cn(
      styles.field,
      "transition-all",
      !hasBranch && "opacity-40 pointer-events-none"
    )}>
      <label className={styles.fieldLabel}>
        Lịch học (Có thể chọn nhiều) <span className={styles.redText}>*</span>
      </label>

      {/* Trạng thái: Chưa chọn chi nhánh */}
      {!hasBranch && (
        <div className="text-center py-7 text-[#8A92A6] text-[13px] flex flex-col items-center gap-2">
          <div className="text-3xl">🏫</div>
          <span>Vui lòng chọn chi nhánh để xem lịch học</span>
        </div>
      )}

      {/* Trạng thái: Đang tải */}
      {hasBranch && isLoading && (
        <div className="text-center py-7 text-[#8A92A6] text-[13px] flex flex-col items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-[#C0392B]" />
          <span>Đang tải danh sách lớp học...</span>
        </div>
      )}

      {/* Trạng thái: Không có lớp */}
      {hasBranch && !isLoading && classList.length === 0 && (
        <div className="text-center py-7 text-[#8A92A6] text-[13px] flex flex-col items-center gap-2">
          <div className="text-3xl">📭</div>
          <span>Chi nhánh này hiện chưa có lớp học nào phù hợp.</span>
        </div>
      )}

      {/* Danh sách lớp */}
      {hasBranch && !isLoading && classList.length > 0 && (
        <div className="flex flex-col gap-2.5 mt-1">
          {classList.map((cls) => {
            const isSelected = selectedIds.has(cls.scheduleId);

            return (
              <div
                key={cls.scheduleId}
                className={cn(
                  styles.classItem,
                  isSelected && styles.classItemSelected
                )}
                onClick={() => onToggle(cls.scheduleId)}
              >
                {/* Custom Checkbox */}
                <div className={styles.classCheck}>
                  {isSelected && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                </div>

                {/* Thông tin lớp */}
                <div className="flex-1 min-w-0">
                  <div className="text-[13.5px] font-bold text-[#1A1D23]">{cls.displayLabel}</div>
                  <div className={styles.classMeta}>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <User size={12} className="opacity-70" /> {cls.scheduleLevel}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} className="opacity-70" /> {cls.weekday}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
