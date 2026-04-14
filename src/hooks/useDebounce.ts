import { useState, useEffect } from "react";

/**
 * Hook giúp trì hoãn việc cập nhật giá trị cho đến khi người dùng ngừng thao tác 
 * trong một khoảng thời gian nhất định (delay). Rất hữu ích cho ô tìm kiếm.
 * * @param value Giá trị cần debounce (ví dụ: text trong ô input)
 * @param delay Thời gian chờ (mili-giây)
 */
export function useDebounce<T>(value: T, delay: number): T {
    // State và setter cho debounced value
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Cập nhật debounced value sau khoảng thời gian delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Hủy timeout nếu value thay đổi (người dùng gõ tiếp) 
        // hoặc khi component unmount
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]); // Chỉ chạy lại effect nếu value hoặc delay thay đổi

    return debouncedValue;
}