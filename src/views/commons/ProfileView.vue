<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
    View,
    VideoPlay,
    DataLine,
    Timer,
    Star,
    Headset,
} from '@element-plus/icons-vue'
import LessonSummaryCard from '@/components/cards/LessonSummaryCard.vue'
import { LessonResponse } from '@/interfaces/lesson'
import DateStreak from '@/components/commons/DateStreak.vue'
import { getStreakColor } from '@/utils/get'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
import { BASE_IMAGE_URL } from '@/constants/image'
import { UserDailyActivityResponse } from '@/interfaces/daily'
import UserDailyActivityService from '@/services/daily'

const user = ref({
    name: 'Kira Sensei',
    avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=256&auto=format&fit=crop',
    points: 12500,
    days: 98,
})

const authStore = useAuthenticationStore()
const userInfo = authStore.userInfo

const lessons = ref<
    Array<LessonResponse & { progress: number; locked: boolean }>
>([
    {
        id: 1,
        title: 'Daily Life in Tokyo',
        content: 'Learn essential Japanese phrases for everyday life in Tokyo.',
        audio_url: '',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=400&auto=format&fit=crop',
        duration_minutes: 15,
        access_level: 'free',
        course: 'Tokyo Basics',
        progress: 75,
        locked: false,
    },
    {
        id: 2,
        title: 'Ordering Food at a Restaurant',
        content:
            'Practice ordering your favorite Japanese dishes with confidence.',
        audio_url: '',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=400&auto=format&fit=crop',
        duration_minutes: 20,
        access_level: 'free',
        course: 'Restaurant',
        progress: 50,
        locked: false,
    },
    {
        id: 3,
        title: 'Anime Phrases & Slang',
        content: 'Master popular anime expressions and Japanese slang.',
        audio_url: '',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=400&auto=format&fit=crop',
        duration_minutes: 25,
        access_level: 'premium',
        course: 'Anime Culture',
        progress: 90,
        locked: false,
    },
    {
        id: 4,
        title: 'Business Etiquette Basics',
        content:
            'Understand fundamental Japanese business customs and greetings.',
        audio_url: '',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
        duration_minutes: 30,
        access_level: 'premium',
        course: 'Business',
        progress: 0,
        locked: true,
    },
    {
        id: 5,
        title: 'Navigating Public Transport',
        content:
            'Learn how to use trains, buses, and other public transportation.',
        audio_url: '',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=400&auto=format&fit=crop',
        duration_minutes: 18,
        access_level: 'free',
        course: 'Transportation',
        progress: 20,
        locked: false,
    },
    {
        id: 6,
        title: 'Japanese Festivals & Traditions',
        content:
            'Explore the rich cultural heritage of Japan through its festivals.',
        audio_url: '',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=400&auto=format&fit=crop',
        duration_minutes: 35,
        access_level: 'premium',
        course: 'Culture',
        progress: 0,
        locked: true,
    },
])
const dailyActivities = ref<UserDailyActivityResponse[] | []>([])

const stats = ref({
    listCompleted: 12,
    focusTimeHours: 8.5,
})

const loginRecords: UserDailyActivityResponse[] = [
    {
        date: '2025-01-01',
        completed_lessons: 2,
        user: 1,
        study_time_minutes: 1,
        id: 1,
    },
    {
        date: '2025-01-02',
        completed_lessons: 1,
        user: 1,
        study_time_minutes: 1,
        id: 1,
    },
    {
        date: '2025-02-15',
        completed_lessons: 4,
        user: 1,
        study_time_minutes: 1,
        id: 1,
    },
    {
        date: '2025-03-20',
        completed_lessons: 3,
        user: 1,
        study_time_minutes: 1,
        id: 1,
    },
    {
        date: '2025-09-13',
        completed_lessons: 2,
        user: 1,
        study_time_minutes: 1,
        id: 1,
    },
]

const fetchDailyActivities = async () => {
    try {
        const response =
            await UserDailyActivityService.getAllUserDailyActivities({
                year: '',
            })
        if (response.status === 200) {
            dailyActivities.value = response.data
        }
    } catch (e) {
        console.log(e)
    }
}

onMounted(() => {
    fetchDailyActivities()
})
</script>

<template>
    <div class="page-container">
        <h2 class="page-title">Your Profile</h2>

        <div class="grid">
            <div class="left">
                <el-card shadow="never" class="panel">
                    <div class="user">
                        <img
                            :src="BASE_IMAGE_URL + userInfo?.avatar"
                            alt="avatar"
                            class="avatar"
                        />
                        <div class="meta">
                            <h1 class="name">{{ userInfo?.username }}</h1>
                        </div>
                        <div style="flex-grow: 1"></div>
                        <div class="kpis">
                            <div class="kpi">
                                <div class="value">
                                    {{ user.points.toLocaleString() }}
                                </div>
                                <div class="label">Points</div>
                            </div>
                            <div class="kpi">
                                <div class="value">{{ user.days }}</div>
                                <div class="label">Days</div>
                            </div>
                        </div>
                    </div>
                </el-card>
                <br />
                <el-card shadow="never" class="panel">
                    <div class="section-title">⚡ Login Streak</div>
                    <DateStreak :records="dailyActivities" />
                    <div class="legend">
                        <span>Less</span>
                        <div
                            class="legend-box"
                            v-for="i in 5"
                            :key="i"
                            :style="{ backgroundColor: getStreakColor(i - 1) }"
                        />
                        <span>More</span>
                    </div>
                </el-card>
                <br />
                <div class="stats">
                    <el-card shadow="never">
                        <div class="stat-label d-flex align-center">
                            List Completed
                            <el-icon style="font-size: 16px; margin-left: 10px"
                                ><DataLine color="#636AE8FF"
                            /></el-icon>
                        </div>
                        <el-text class="stat-value">
                            {{ stats.listCompleted }}
                        </el-text>
                        <div style="font-size: 12px">+3 from last week</div>
                    </el-card>
                    <el-card shadow="never">
                        <div class="stat-label d-flex align-center">
                            Focus Time
                            <el-icon style="font-size: 16px; margin-left: 10px"
                                ><Timer color="#636AE8FF"
                            /></el-icon>
                        </div>
                        <el-text class="stat-value">
                            {{ stats.focusTimeHours }} hrs
                        </el-text>
                        <div style="font-size: 12px">Reached daily goal</div>
                    </el-card>
                </div>
                <br />
                <el-card shadow="never" class="panel">
                    <div class="section-title d-flex align-center">
                        <el-icon style="font-size: 24px; margin-right: 8px">
                            <Star color="#44A248FF" />
                        </el-icon>
                        <span>Achievements</span>
                    </div>
                    <div class="achievements">
                        <div v-for="n in 6" :key="n" class="achievement">
                            <div class="icon">🏅</div>
                            <div class="ach-meta">
                                <div class="ach-title">Badge {{ n }}</div>
                                <div class="ach-desc">
                                    Sample achievement description
                                </div>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>

            <div class="right">
                <el-card shadow="never" class="panel">
                    <div class="section-title d-flex align-center">
                        <el-icon>
                            <View color="#44A248FF" />
                        </el-icon>
                        <span style="margin-left: 7px">Quick Links</span>
                    </div>
                    <div class="d-flex justify-center">
                        <el-button type="success">
                            <el-icon><VideoPlay /></el-icon>
                            <span style="margin-left: 7px"
                                >Continue Last Lesson</span
                            >
                        </el-button>
                    </div>
                </el-card>
                <br />
                <el-card shadow="never" class="panel">
                    <div class="section-title d-flex align-center">
                        <el-icon style="font-size: 24px"
                            ><Headset color="#44A248FF"
                        /></el-icon>
                        <span style="margin-left: 7px">Your Lessons</span>
                    </div>
                    <div class="lessons">
                        <LessonSummaryCard
                            v-for="lesson in lessons"
                            :key="lesson.id"
                            :lesson="lesson"
                            :progress="lesson.progress"
                            :locked="lesson.locked"
                        />
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<style scoped>
.profile {
    padding: 16px;
}

.page-title {
    margin: 0 0 12px;
    font-size: 20px;
}

.grid {
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
}

.streak-container {
    display: flex;
    gap: 8px;
}

/* Cột ngày */
.day-labels {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 12px;
    color: #666;
    margin-top: 20px;
    margin-right: 4px;
}

.day-labels span {
    height: 18px;
}

/* Streak grid */
.streak-weeks {
    display: flex;
    flex-direction: column;
}

.month-labels {
    display: grid;
    grid-auto-flow: column;
    font-size: 12px;
    margin-bottom: 4px;
    color: #666;
}

.month-label {
    text-align: left;
}

.weeks {
    display: flex;
    gap: 4px;
}

.week-col {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.day-cell {
    width: 16px;
    height: 16px;
    border-radius: 3px;
}

/* Legend */
.legend {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    margin-top: 12px;
}

.legend-box {
    width: 16px;
    height: 16px;
    border-radius: 3px;
}

@media (min-width: 992px) {
    .grid {
        grid-template-columns: 1fr 1fr;
        gap: 16px;
    }
}

.panel {
    border: 1px solid #eef0f3;
}

.user {
    display: flex;
    gap: 12px;
    align-items: center;
}

.avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
}

.meta .name {
    font-weight: 700;
    font-size: 18px;
}

.kpis {
    display: flex;
    gap: 20px;
    margin-top: 6px;
}

.kpi .value {
    font-weight: 600;
}

.kpi .label {
    font-size: 12px;
    color: var(--el-text-color-secondary);
}

.section-title {
    font-weight: 600;
    margin-bottom: 8px;
}

.streak-placeholder {
    height: 110px;
    background: repeating-linear-gradient(
        -45deg,
        #f6f7f9,
        #f6f7f9 10px,
        #ffffff 10px,
        #ffffff 20px
    );
    border-radius: 8px;
}

.stats {
    margin-top: 12px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
}

.stat {
    border: 1px dashed #e5e7eb;
    border-radius: 8px;
    padding: 10px;
    text-align: center;
}

.stat-value {
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
}

.stat-label {
    font-size: 14px;
    color: var(--el-text-color-secondary);
}

.achievements {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
}

@media (min-width: 768px) {
    .achievements {
        grid-template-columns: 1fr 1fr;
    }
}

.achievement {
    display: flex;
    gap: 10px;
    align-items: center;
    border: 1px solid #f0f1f3;
    border-radius: 8px;
    padding: 8px;
}

.icon {
    font-size: 20px;
}

.ach-title {
    font-weight: 600;
}

.ach-desc {
    font-size: 12px;
    color: var(--el-text-color-secondary);
}

.lessons {
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: 100%;
    overflow-y: scroll;
}
</style>
