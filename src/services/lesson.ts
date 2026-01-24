import { http } from '@/services/http'
import { LESSON_API } from '@/constants/api'
import { LessonResponse } from '@/interfaces/lesson'
import { AxiosResponse } from 'axios'

class LessonService {
    async getAllLessons(
        courseId: number | null = null
    ): Promise<AxiosResponse<LessonResponse[]>> {
        return await http.get(LESSON_API.ALL_LESSONS(courseId))
    }

    async getLessonById(
        lessonId: number
    ): Promise<AxiosResponse<LessonResponse>> {
        return await http.get(LESSON_API.LESSON_BY_ID(lessonId))
    }

    async getRandomLesson(): Promise<AxiosResponse<LessonResponse>> {
        return await http.get(LESSON_API.RANDOM_LESSON)
    }
}

export default new LessonService()
