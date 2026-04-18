import type {
  ScheduleLevel,
  ScheduleLocation,
  ScheduleShift,
  Weekday,
} from "../../config/constants";

/** Dùng trong danh sách / dropdown — thông tin tối giản */
export interface ClassScheduleSummary {
  scheduleId: string;
  branchName: string;
  scheduleLocation: ScheduleLocation;
  scheduleLevel: ScheduleLevel;
  scheduleShift: ScheduleShift;
  /** Format: "HH:mm" */
  startTime: string;
  /** Format: "HH:mm" */
  endTime: string;
  weekday: Weekday;

  // --- Nhãn Tiếng Việt (Backend trả về sẵn) ---
  /** VD: "Thứ Hai (08:30 - 10:00) - Lớp Cơ Bản" */
  displayLabel: string;
  /** VD: "Thứ Hai" */
  weekdayLabel: string;
  /** VD: "Lớp Cơ Bản" */
  levelLabel: string;
  /** VD: "08:30 - 10:00" */
  timeRange: string;
}

/** Dùng khi xem chi tiết 1 lớp học */
export interface ClassScheduleDetail {
  scheduleId: string;
  branchId: number;
  branchName: string;
  scheduleLevel: ScheduleLevel;
  scheduleShift: ScheduleShift;
  scheduleLocation: ScheduleLocation;
  weekday: Weekday;
  /** Format: "HH:mm" */
  startTime: string;
  /** Format: "HH:mm" */
  endTime: string;
  totalStudents: number | null;
  maxCapacity: number | null;
  note: string | null;
}

/**
 * Khớp với ClassScheduleResDTO.ClassScheduleDropdown (Backend)
 * Dùng cho Cascading Dropdown: Chọn Chi nhánh -> hiện danh sách Lớp học
 */
export interface ClassScheduleDropdown {
  /** Value để FE gửi lên khi submit form */
  scheduleId: string;
  /** VD: "Thứ Hai (08:30 - 10:00) - Lớp Cơ Bản" */
  displayLabel: string;
  /** VD: "Thứ Hai" */
  weekdayLabel: string;
  /** VD: "Lớp Cơ Bản" */
  levelLabel: string;
  /** VD: "08:30 - 10:00" */
  timeRange: string;
  scheduleLevel: string;
  weekday: string;
}

/**
 * Interface hiển thị chung cho component ClassList.
 * Dùng chung cho cả "Lịch học chi nhánh" và "Lịch học của học viên".
 * ClassScheduleDropdown có thể gán trực tiếp (vì cùng cấu trúc cơ bản).
 * Enrollment data thì map thêm joinDate + branchName.
 */
export interface ClassDisplayItem {
  scheduleId: string;
  /** Nhãn chính đã Việt hóa: "Thứ Hai (08:30 - 10:00) - Lớp Cơ Bản" */
  displayLabel: string;
  // --- Thông tin phụ (optional, chỉ có khi hiển thị lịch học viên) ---
  /** Ngày nhập học, format: "yyyy-MM-dd" */
  joinDate?: string;
  /** Tên chi nhánh */
  branchName?: string;
}
