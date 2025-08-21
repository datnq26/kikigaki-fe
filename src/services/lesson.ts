import { http } from '@/services/http'
import { LESSON_API } from '@/constants/api'

class LessonService {
    async getAllLessons() {
        return await http.get(LESSON_API.ALL_LESSONS)
    }

    async getLessonById(lessonId: number) {
        return await http.get(LESSON_API.LESSON_BY_ID(lessonId))
    }
}

export default new LessonService()
