import { http } from '@/services/http'
import { LESSON_API } from '@/constants/api'

class LessonService {
    async getAllLessons() {
        return await http.get(LESSON_API.ALL_LESSONS)
    }
}

export default new LessonService()
