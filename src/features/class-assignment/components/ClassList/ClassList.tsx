// File: src/features/class-assignment/components/ClassList/ClassList.tsx
import { Check, Loader2, Calendar, MapPin } from "lucide-react";
import { cn } from "@/components/ui/utils";
import type { ClassDisplayItem } from "@/types/Core/ClassScheduleTypes";
import styles from "../../styles/ClassAssignment.module.scss";

interface ClassListProps {
  hasBranch: boolean;
  isLoading: boolean;
  classList: ClassDisplayItem[];
  selectedIds?: Set<string>;
  onToggle?: (scheduleId: string) => void;
  onAction?: (scheduleId: string) => void;
  actionLabel?: string;
  isCompact?: boolean;
}

/**
 * Component hiển thị danh sách Lớp học - Custom UI.
 * Hỗ trợ 2 chế độ: Chọn (Checkbox) hoặc Hành động (Nút bấm như Xóa).
 */
export default function ClassList({
  hasBranch,
  isLoading,
  classList,
  selectedIds = new Set(),
  onToggle,
  onAction,
  actionLabel,
  isCompact = false,
}: ClassListProps) {
  return (
    <div className={cn(
      styles.field,
      "transition-all",
      !hasBranch && "opacity-40 pointer-events-none"
    )}>
      {/* Trạng thái: Chưa chọn chi nhánh */}
      {!hasBranch && (
        <div className="text-center py-7 text-[#8A92A6] text-[13px] flex flex-col items-center gap-2">
          <div className="text-3xl">🏫</div>
          <span>Vui lòng chọn Võ sinh để xem lịch học</span>
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
          <span>Hiện chưa có lớp học nào phù hợp.</span>
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
                  isCompact && styles.classItemCompact,
                  isSelected && styles.classItemSelected,
                  onAction && "cursor-default hover:border-slate-200 hover:bg-white"
                )}
                onClick={() => !onAction && onToggle?.(cls.scheduleId)}
              >
                {/* Mode 1: Checkbox (Nếu không có onAction) */}
                {!onAction && (
                  <div className={styles.classCheck}>
                    {isSelected && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                  </div>
                )}

                {/* Thông tin lớp */}
                <div className="flex-1 min-w-0">
                  <div className={cn(
                    "font-bold text-[#1A1D23]",
                    isCompact ? "text-[12.5px]" : "text-[13.5px]"
                  )}>
                    {cls.displayLabel}
                  </div>
                  {/* Thông tin phụ: ngày nhập học & chi nhánh (chỉ hiển thị trong lịch học viên) */}
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

                {/* Mode 2: Nút hành động */}
                {onAction && (
                  <div className={styles.deleteWrapper}>
                    <button 
                      className={styles.btnDelete}
                      onClick={() => onAction(cls.scheduleId)}
                    >
                      {actionLabel || "Hành động"}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
