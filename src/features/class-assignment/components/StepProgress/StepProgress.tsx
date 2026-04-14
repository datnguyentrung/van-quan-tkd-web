// File: src/features/class-assignment/components/StepProgress/StepProgress.tsx
import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/components/ui/utils";
import styles from "../../styles/ClassAssignment.module.scss";

/** Cấu hình từng bước trong thanh tiến trình */
const STEPS = [
  { num: 1, label: "Chọn Võ sinh" },
  { num: 2, label: "Chọn Chi nhánh & Lớp" },
  { num: 3, label: "Xác nhận" },
];

interface StepProgressProps {
  currentStep: number;
}

/**
 * Thanh tiến trình hiển thị bước hiện tại trong quy trình Ghi Danh.
 * Theo mẫu HTML: Ngang, có đường line nối giữa các số, số nằm trong vòng tròn.
 */
export default function StepProgress({ currentStep }: StepProgressProps) {
  return (
    <div className={styles.stepsContainer}>
      {STEPS.map((s, index) => {
        const isActive = currentStep === s.num;
        const isDone = currentStep > s.num;

        return (
          <React.Fragment key={s.num}>
            {/* Bước hiện tại */}
            <div className={cn(
              "flex items-center gap-2.5 font-medium text-[12.5px] transition-colors",
              isActive && styles.stepActive,
              isDone && styles.stepDone,
              !isActive && !isDone && "text-[#8A92A6]"
            )}>
              <div className={styles.stepNum}>
                {isDone ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : s.num}
              </div>
              <span>{s.label}</span>
            </div>

            {/* Đường nối */}
            {index < STEPS.length - 1 && (
              <div className={styles.stepLine}>
                <div className={cn(
                  "absolute inset-0 transition-all",
                  currentStep > s.num && styles.stepLineFilled
                )} />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
