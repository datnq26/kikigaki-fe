import { http } from '@/services/http'
import { COURSE_API } from '@/constants/api'
import { AxiosResponse } from 'axios'
import {
    CourseRequest,
    CourseResponse,
    TopByCategoriesResponse,
} from '@/interfaces/course'
import { PaginationRequest, PaginationResponse } from '@/interfaces/commons'

class CourseService {
    async getAllCourses(
        params: CourseRequest
    ): Promise<AxiosResponse<PaginationResponse<CourseResponse>>> {
        return http.get(COURSE_API.ALL_COURSES(params))
    }

    async getCourseById(
        courseId: number
    ): Promise<AxiosResponse<CourseResponse>> {
        return http.get(COURSE_API.COURSE_BY_ID(courseId))
    }

    async topByCategories(
        params: PaginationRequest
    ): Promise<AxiosResponse<PaginationResponse<TopByCategoriesResponse>>> {
        return http.get(COURSE_API.TOP_BY_CATEGORIES(params))
    }
}

export default new CourseService()
