import { http } from '@/services/http'
import { COURSE_API } from '@/constants/api'
import { AxiosResponse } from 'axios'
import { CourseResponse } from '@/interfaces/course'

class CourseService {
    async getAllCourses(): Promise<AxiosResponse<CourseResponse[]>> {
        return http.get(COURSE_API.ALL_COURSES)
    }

    async getCourseById(
        courseId: number
    ): Promise<AxiosResponse<CourseResponse>> {
        return http.get(COURSE_API.COURSE_BY_ID(courseId))
    }
}

export default new CourseService()
