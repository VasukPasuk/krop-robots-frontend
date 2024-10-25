export interface ApiResponse<T> {
  data: T;
}

export interface ResponseItem<T>  { id: number, attributes: T }


export interface ApiResponseMultiple<T> {
  data: ResponseItem<T>[];
  meta: PaginationMeta;
}

export interface ApiResponseSingle<T> {
  data: ResponseItem<T>;
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