// File: src/features/class-assignment/components/StudentSearch/StudentSearch.tsx
import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { cn } from "@/components/ui/utils";

import type { StudentAutocompleteDTO } from "@/types/Core/StudentStypes";
import { searchStudents } from "../../api/studentApi";
import styles from "../../styles/ClassAssignment.module.scss";

interface StudentSearchProps {
  selectedStudent: StudentAutocompleteDTO | null;
  onSelect: (student: StudentAutocompleteDTO) => void;
  onClear: () => void;
}

const getInitials = (name: string) =>
  name.split(" ").slice(-2).map((w) => w[0]).join("");

/**
 * Component Tìm kiếm Võ sinh - Custom UI (Không dùng Shadcn).
 * Khớp 100% giao diện mẫu Premium từ class_assigment.html.
 */
export default function StudentSearch({ selectedStudent, onSelect, onClear }: StudentSearchProps) {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<StudentAutocompleteDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounce tìm kiếm
  useEffect(() => {
    if (!keyword.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const page = await searchStudents(keyword);
        setResults(page.content);
      } catch {
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [keyword]);

  return (
    <div className={styles.field} ref={wrapperRef}>
      <label className={styles.fieldLabel}>
        Tìm kiếm Võ sinh <span className={styles.redText}>*</span>
      </label>

      {/* Thanh tìm kiếm */}
      <div className={styles.searchWrap}>
        <Search className={styles.searchIcon} size={16} />
        <input
          type="text"
          className={styles.inputWithSearch}
          placeholder="Nhập tên hoặc mã võ sinh..."
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
        />
        
        {isLoading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Loader2 className="w-4 h-4 animate-spin text-[#8A92A6]" />
          </div>
        )}

        {/* Dropdown Autocomplete */}
        {showDropdown && (keyword || results.length > 0) && (
          <div className={styles.autocomplete}>
            {/* Kết quả tìm thấy */}
            {results.length > 0 && results.map((student) => (
              <div
                key={student.userId}
                className={styles.acItem}
                onClick={() => {
                  onSelect(student);
                  setKeyword("");
                  setShowDropdown(false);
                }}
              >
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#96281B] to-[#8B0000] flex items-center justify-center text-xs font-bold text-white shrink-0">
                  {getInitials(student.fullName)}
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-[#1A1D23]">{student.fullName}</div>
                  <div className="text-[11.5px] text-[#8A92A6]">
                    Mã: {student.studentCode} · {student.branchName}
                  </div>
                </div>
                <div className={cn(styles.acBadge, (student.studentStatus === 'ACTIVE' || student.studentStatus === 'Đang hoạt động') && styles.statusActive)}>
                  {student.studentStatus}
                </div>
              </div>
            ))}

            {/* Trạng thái không tìm thấy */}
            {!isLoading && keyword && results.length === 0 && (
              <div className="p-6 text-center text-[13px] text-[#8A92A6]">
                Không tìm thấy võ sinh phù hợp.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Thẻ võ sinh đã chọn (hiển thị bên dưới) */}
      {selectedStudent && (
        <div className={styles.studentCard}>
          <div className="w-[42px] h-[42px] rounded-xl bg-gradient-to-br from-[#96281B] to-[#E74C3C] flex items-center justify-center text-[15px] font-bold text-white shrink-0 shadow-sm">
            {getInitials(selectedStudent.fullName)}
          </div>
          <div>
            <div className="text-[15px] font-bold text-[#1A1D23]">{selectedStudent.fullName}</div>
            <div className={styles.scMeta}>
              Mã: {selectedStudent.studentCode} · {selectedStudent.branchName}
            </div>
          </div>
          <div className={cn(styles.scBadge, (selectedStudent.studentStatus === 'ACTIVE' || selectedStudent.studentStatus === 'Đang hoạt động') && styles.statusActive)}>
            {selectedStudent.studentStatus}
          </div>
        </div>
      )}
    </div>
  );
}
