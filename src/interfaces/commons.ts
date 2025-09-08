export interface PaginationResponse<T> {
    count: number
    limit: number
    offset: number
    current_page: number
    next: string | null
    previous: string | null
    results: T[]
}

export interface PaginationRequest {
    limit: number | null | undefined
    offset: number | null | undefined
}
