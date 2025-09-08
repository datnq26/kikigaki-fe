import { PaginationRequest } from '@/interfaces/commons'

export const extractLimitOffsetPagination = (
    url: string
): PaginationRequest => {
    try {
        const parsedUrl = new URL(url)
        const limitStr = parsedUrl.searchParams.get('limit')
        const offsetStr = parsedUrl.searchParams.get('offset')

        return {
            limit: limitStr ? parseInt(limitStr, 10) : 0,
            offset: offsetStr ? parseInt(offsetStr, 10) : 0,
        }
    } catch (error) {
        return { limit: 0, offset: 0 }
    }
}
