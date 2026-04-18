import axiosInstance from '@/lib/axiosInstance';
import type { StudentEnrollmentCreateRequest } from '@/types/Operation/StudentEnrollmentTypes';

/**
 * API liên quan đến Ghi danh Võ sinh (Student Enrollment)
 * Phục vụ form Ghi Danh trên trang Quản Lý Lớp Học
 */
export const enrollmentApi = {

  /**
   * Ghi danh Võ sinh vào lớp học
   * POST /api/v1/student-enrollments
   *
   * @param request - Thông tin ghi danh (studentId, scheduleIds, joinDate, note)
   * @throws 404 - Lớp học không tồn tại (CLASS_NOT_FOUND)
   * @throws 409 - Võ sinh đã đăng ký lớp này (STUDENT_ALREADY_ENROLLED)
   */
  create: async (request: StudentEnrollmentCreateRequest): Promise<void> => {
    await axiosInstance.post('/api/v1/student-enrollments', request);
  },

  /**
   * Lấy danh sách lớp đang ACTIVE của võ sinh
   * GET /api/v1/student-enrollments/student/{id}
   */
  fetchByStudentId: async (studentId: string): Promise<any[]> => {
    const response = await axiosInstance.get(`/api/v1/student-enrollments/student/${studentId}`);
    return response.data;
  },

  /**
   * Xóa ghi danh của võ sinh trong lớp
   * DELETE /api/v1/student-enrollments/student/{studentId}/class-schedule/{classScheduleId}
   */
  remove: async (studentId: string, scheduleId: string): Promise<void> => {
    await axiosInstance.delete(`/api/v1/student-enrollments/student/${studentId}/class-schedule/${scheduleId}`);
  },
};
