export interface ApiResponse<T> {
    status: number;
    data: T | null;
    errorMessage: string | null;
}