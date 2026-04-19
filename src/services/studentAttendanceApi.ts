import axiosInstance from "@/lib/axiosInstance";
import type {
  AttendanceBatchCreateRequest,
  AttendanceUpdateStatusRequest,
  StudentAttendanceResponse,
} from "@/types";

export const studentAttendanceApi = {
  filterByScheduleAndDate: async (
    classScheduleId: string,
    sessionDate: string,
  ): Promise<StudentAttendanceResponse[]> => {
    try {
      const response = await axiosInstance.get("/api/v1/student-attendance/filter", {
        params: { classScheduleId, sessionDate },
      });
      
      const result = response.data;
      return Array.isArray(result) ? result : (result?.data || []); 
    } catch (error) {
      console.error("Lỗi filter attendance:", error);
      return [];
    }
  },

  initializeDailyAttendance: async (
    request: AttendanceBatchCreateRequest
  ): Promise<StudentAttendanceResponse[]> => {
    try {
      const response = await axiosInstance.post("/api/v1/student-attendance/batch-init", request);
      const result = response.data;
      return Array.isArray(result) ? result : (result?.data || []); 
    } catch (error) {
      console.error("Lỗi init attendance:", error);
      return [];
    }
  },

  updateAttendanceStatus: async (
    attendanceId: string,
    request: AttendanceUpdateStatusRequest,
  ): Promise<void> => {
    await axiosInstance.patch(`/api/v1/student-attendance/${attendanceId}/status`, request);
  },
};