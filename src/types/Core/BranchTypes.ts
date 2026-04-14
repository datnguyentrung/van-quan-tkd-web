/**
 * Khớp với BranchController.BranchDropdownResponse (Backend)
 * Dùng cho Dropdown chọn Chi nhánh trên trang Ghi Danh Võ Sinh
 */
export interface BranchDropdown {
  branchId: number;
  branchName: string;
  address: string;
}
