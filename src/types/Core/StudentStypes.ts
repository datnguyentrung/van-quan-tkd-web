import type { Belt, StudentStatus } from "../../config/constants";

// ============================================================
// Request DTOs
// ============================================================

export interface StudentCreateRequest {
  nationalCode?: string;
  studentStatus: StudentStatus;
  fullName: string;
  /** Format: "yyyy-MM-dd" */
  startDate: string;
  branchId: number;
  phoneNumber: string;
  /** Format: "yyyy-MM-dd" */
  birthDate: string;
  belt: Belt;
}

export interface StudentUpdateRequest {
  userId: string;
  phoneNumber?: string;
  /** Format: "yyyy-MM-dd" */
  birthDate?: string;
  belt?: Belt;
  nationalCode?: string;
  fullName?: string;
  /** Format: "yyyy-MM-dd" */
  startDate?: string;
  studentStatus?: StudentStatus;
  branchId?: number;
}

// ============================================================
// Response DTOs
// ============================================================

/** Chi tiết đầy đủ của một học viên */
export interface StudentDetail {
  userId: string;
  /** Format: "yyyy-MM-dd" */
  birthDate: string;
  phoneNumber: string;
  belt: Belt;
  /** Trạng thái tài khoản hệ thống */
  status: string; // UserStatus
  /** Format: ISO 8601 UTC */
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
  roleName: string;
  studentCode: string;
  nationalCode: string | null;
  fullName: string;
  /** Format: "yyyy-MM-dd" */
  startDate: string;
  studentStatus: StudentStatus;
  branchId: number;
  branchName: string;
  branchAddress: string;
}

/** Tóm tắt học viên dùng trong danh sách / dropdown */
export interface StudentSummary {
  userId: string;
  fullName: string;
  email: string;
  code: string;
}

/** DTO trả về cho 1 võ sinh trong danh sách gợi ý */
export interface StudentAutocompleteDTO {
  userId: string;
  studentCode: string;
  fullName: string;
  nationalCode: string;
  branchName: string;
  studentStatus: string;
}

// Kiểu dữ liệu phân trang (chung cho Spring Data)
export interface PageResponse<T> {
  content: T[];
  pageable: any;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}


