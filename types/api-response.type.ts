export interface ApiResponse<T> {
  data: T;
}

export interface ApiResponseMultiple<T> {
  data: T;
  meta: PaginationMeta;
}


export interface PaginationMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}