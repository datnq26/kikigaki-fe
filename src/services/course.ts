import { http } from '@/services/http'
import { COURSE_API } from '@/constants/api'
import { AxiosResponse } from 'axios'
import { CourseResponse, TopByCategoriesResponse } from '@/interfaces/course'

class CourseService {
    async getAllCourses(): Promise<AxiosResponse<CourseResponse[]>> {
        return http.get(COURSE_API.ALL_COURSES)
    }

    async getCourseById(
        courseId: number
    ): Promise<AxiosResponse<CourseResponse>> {
        return http.get(COURSE_API.COURSE_BY_ID(courseId))
    }

    async topByCategories(): Promise<AxiosResponse<TopByCategoriesResponse[]>> {
        return http.get(COURSE_API.TOP_BY_CATEGORIES)
    }
}

export default new CourseService()
