import axiosInstance from "@/lib/axiosInstance";
import type { StudentEnrollmentSimpleResponse } from "@/types";

interface ApiResponse<T> {
  data?: T;
  message?: string;
  statusCode?: number;
}

/**
 * Hàm bổ trợ để bóc tách dữ liệu mảng từ RestResponse
 */
function unwrapList(payload: any): StudentEnrollmentSimpleResponse[] {
  if (Array.isArray(payload)) return payload;
  if (payload?.data && Array.isArray(payload.data)) return payload.data;
  return [];
}

export const studentEnrollmentApi = {
  /**
   * Lấy danh sách học viên ACTIVE của lớp để hiển thị sĩ số
   */
  getActiveByClassSchedule: async (scheduleId: string): Promise<StudentEnrollmentSimpleResponse[]> => {
    try {
      const response = await axiosInstance.get(`/api/v1/student-enrollments/class-schedule/${scheduleId}`);
      
      console.log("Học viên ACTIVE lớp:", scheduleId, response.data);

      return unwrapList(response.data);
    } catch (error) {
      console.error("Lỗi gọi API Enrollment:", error);
      return [];
    }
  },
};