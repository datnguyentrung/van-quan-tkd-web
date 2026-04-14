import axiosInstance from '@/lib/axiosInstance';
import type { PageResponse, StudentAutocompleteDTO } from '@/types/Core/StudentStypes';


// call api
export const searchStudents = async (keyword: string): Promise<PageResponse<StudentAutocompleteDTO>> => {
    const response = await axiosInstance.get('/api/v1/students/search-autocomplete',
        {
            params: {
                keyword: keyword.trim(),
                page: 0,
                size: 10
            }
        });
    return response.data;
};