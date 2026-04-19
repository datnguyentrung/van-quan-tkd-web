import axiosInstance from "@/lib/axiosInstance";
import type { ClassScheduleSummary } from "@/types";

export const classScheduleApi = {
  list: async (): Promise<ClassScheduleSummary[]> => {
    const response = await axiosInstance.get<ClassScheduleSummary[]>("/class-schedules");
    return response.data;
  },
};
