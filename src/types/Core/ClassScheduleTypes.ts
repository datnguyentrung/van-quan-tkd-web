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
  /** Label hiển thị (VD: "MONDAY (08:30 - 10:00) - BASIC INDOOR") */
  displayLabel: string;
  scheduleLevel: string;
  weekday: string;
}
