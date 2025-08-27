export interface CourseResponse {
    id: number
    name: string
    description: string
    image: string
    categories: string[]
    level: string
}

export interface TopByCategoriesResponse {
    category: string
    courses: CourseResponse[]
}
