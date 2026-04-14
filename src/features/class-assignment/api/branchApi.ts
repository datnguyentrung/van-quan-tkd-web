// File: src/features/class-assignment/api/branchApi.ts
import axiosInstance from '@/lib/axiosInstance';
import type { BranchDropdown } from '@/types/Core/BranchTypes';
import type { ClassScheduleDropdown } from '@/types/Core/ClassScheduleTypes';

/**
 * API liên quan đến Branch (Chi nhánh)
 * Phục vụ tính năng Cascading Dropdown trên trang Ghi Danh Võ Sinh
 */
export const branchApi = {

  /**
   * Lấy toàn bộ danh sách Chi nhánh để hiển thị Dropdown
   * GET /api/v1/branches
   */
  fetchAll: async (): Promise<BranchDropdown[]> => {
    const response = await axiosInstance.get('/api/v1/branches');
    return response.data;
  },

  /**
   * Lấy danh sách Lớp học theo Chi nhánh (Cascading Dropdown)
   * GET /api/v1/branches/{id}/classes
   *
   * Được gọi sau khi user chọn Branch, để load Lớp học tương ứng.
   */
  fetchClassesByBranch: async (branchId: string): Promise<ClassScheduleDropdown[]> => {
    const response = await axiosInstance.get(`/api/v1/branches/${branchId}/classes`);
    return response.data;
  },
};
