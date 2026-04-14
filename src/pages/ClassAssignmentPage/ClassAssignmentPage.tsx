// File: src/pages/ClassAssignmentPage/ClassAssignmentPage.tsx
import MainLayout from "@/layouts/MainLayout/MainLayout";
import { ClassAssignmentModal } from "../../features/class-assignment/components/ClassAssignmentModal/ClassAssignmentModal";
import styles from "../../features/class-assignment/styles/ClassAssignment.module.scss";

/**
 * Trang Ghi Danh Võ Sinh.
 * Trang này chỉ chứa duy nhất component ClassAssignmentModal để xử lý nghiệp vụ.
 */
export default function ClassAssignmentPage() {
  return (
    <MainLayout>
      <div className={styles.pageContainer}>
        {/* Component trung tâm chứa toàn bộ logic và giao diện Premium */}
        <ClassAssignmentModal />
      </div>
    </MainLayout>
  );
}
