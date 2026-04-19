import axiosInstance from "@/lib/axiosInstance";
import type { CoachAssignmentResponse } from "@/types";

interface ApiResponse<T> {
  data: T;
  message?: string;
  statusCode?: number;
}

export const coachApi = {
  getTodaySchedule: async (coachId: string): Promise<CoachAssignmentResponse[]> => {
    try {
      const response = await axiosInstance.get(`/api/v1/coaches/${coachId}/schedule/today`);
      return response.data?.data || [];
    } catch (error) {
      console.error("Lỗi gọi API:", error);
      return [];
    }
  },
};