<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import {
    CircleCheck,
    Clock,
    CollectionTag,
    Share,
    VideoPlay,
} from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import FAIcon from '@/components/commons/FAIcon.vue'
import ReviewCard from '@/components/cards/ReviewCard.vue'
import { CourseResponse } from '@/interfaces/course'
import CourseService from '@/services/course'
import LessonService from '@/services/lesson'
import { LessonResponse } from '@/interfaces/lesson'

import { ArrowRight } from '@element-plus/icons-vue'
import { PATHS } from '@/router/paths'

const route = useRoute()
const router = useRouter()
const courseId = Number(route.params.courseId)
const isWishlisted = ref(false)
const toggleWishlist = () => {
    isWishlisted.value = !isWishlisted.value
}
const courseOverview = ref([
    { title: 'Duration', value: '12 hours', icon: 'fa-solid fa-book-open' },
    { title: 'Language', value: 'Japanese', icon: 'fa-regular fa-comment' },
    { title: 'Certificate', value: 'Yes', icon: 'fa-solid fa-trophy' },
    { title: 'Access', value: 'Lifetime', icon: 'fa-regular fa-calendar' },
])
const rating = ref(4.7)
const reviewsCount = ref(1250)
const duration = ref('12 hours')
const learningOutcomes = ref<string[]>([
    'Deeply understand the comprehensive UI/UX design process.',
    'Analyze and research users to identify needs and behaviors.',
    'Conduct user testing and iterate on designs based on feedback.',
    'Proficiently use design tools such as Figma, Sketch, or Adobe XD.',
    'Design wireframes, mockups, and highly interactive prototypes.',
    'Build an impressive portfolio to attract employers.',
])
const course = ref<CourseResponse>({
    categories: [],
    description: '',
    id: 0,
    image: '',
    name: '',
    level: '',
})
const lessons = ref<LessonResponse[]>([])
const loading = ref(false)
const activeModules = ref<string[]>(['m1'])

const reviews = ref<any[]>([
    {
        id: 'r1',
        name: 'Ha Tran',
        date: '2023-10-26',
        rating: 5,
        avatar: 'https://i.pravatar.cc/100?img=12',
        content:
            'The course is truly amazing! Content is presented very clearly, easy to understand, suitable for beginners. Instructor Phong is very enthusiastic and professional.',
    },
    {
        id: 'r2',
        name: 'An Le',
        date: '2023-10-20',
        rating: 4,
        avatar: 'https://i.pravatar.cc/100?img=15',
        content:
            'I learned many new skills from this course. The practical exercises were very helpful. Just wish it was a bit longer, hope for more real-world examples.',
    },
    {
        id: 'r3',
        name: 'Tung Nguyen',
        date: '2023-10-15',
        rating: 5,
        avatar: 'https://i.pravatar.cc/100?img=5',
        content:
            'The instructor is experienced and shared many great industry tips. The course has opened up new career opportunities for me. Very valuable!',
    },
    {
        id: 'r4',
        name: 'Mai Pham',
        date: '2023-10-10',
        rating: 4,
        avatar: 'https://i.pravatar.cc/100?img=32',
        content:
            'The content is very detailed and up-to-date. I especially liked the Figma section. However, it would be even more perfect with a section on UI Animation.',
    },
])

const formatNumber = (n: number) => n.toLocaleString('vi-VN')

const handleEnroll = () => {}

const fetchCourseDetail = async () => {
    loading.value = true
    try {
        const [courseDetailResponse, lessonsResponse] = await Promise.all([
            CourseService.getCourseById(courseId),
            LessonService.getAllLessons(courseId),
        ])
        if (courseDetailResponse.status === 200) {
            course.value = courseDetailResponse.data
        }
        if (lessonsResponse.status === 200) {
            lessons.value = lessonsResponse.data
        }
    } catch (error) {
        console.error('Error fetching course detail:', error)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchCourseDetail()
})
</script>

<template>
    <div class="page-container">
        <el-breadcrumb class="course-breadcrumb" :separator-icon="ArrowRight">
            <el-breadcrumb-item
                style="cursor: pointer !important"
                :to="{ path: PATHS.HOME }"
                >Home</el-breadcrumb-item
            >
            <el-breadcrumb-item
                style="cursor: pointer !important"
                :to="{ path: PATHS.COURSES }"
                >Courses</el-breadcrumb-item
            >
            <el-breadcrumb-item>{{ course.name }}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row :gutter="48">
            <el-col :span="18">
                <el-card
                    shadow="never"
                    class="hero-card"
                    :body-style="{
                        padding: '0',
                        minHeight: '450px',
                        backgroundImage: `url(${course.image})`,
                        display: 'flex',
                        alignItems: 'end',
                    }"
                >
                    <div class="hero-content">
                        <h1 class="page-title">{{ course.name }}</h1>
                        <div class="meta-row">
                            <div class="meta-left">
                                <div class="rating-wrap">
                                    <el-rate
                                        v-model="rating"
                                        disabled
                                        size="small"
                                        :colors="[
                                            '#F59E0B',
                                            '#F59E0B',
                                            '#F59E0B',
                                        ]"
                                    />
                                    <span class="rating-text">{{
                                        rating.toFixed(1)
                                    }}</span>
                                    <span class="reviews-count"
                                        >({{
                                            formatNumber(reviewsCount)
                                        }}
                                        reviews)</span
                                    >
                                    <el-icon class="meta-icon">
                                        <Clock />
                                    </el-icon>
                                    <span class="duration">{{ duration }}</span>
                                </div>
                                <div class="meta-actions">
                                    <el-button
                                        type="success"
                                        class="enroll-button"
                                        @click="handleEnroll"
                                        >Enroll Now
                                    </el-button>
                                    <el-button plain style="height: 40px">
                                        <el-icon>
                                            <Share />
                                        </el-icon>
                                        <span style="margin-left: 6px"
                                            >Share</span
                                        >
                                    </el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-card>
                <section class="section">
                    <h2 class="section-title">Course Overview</h2>
                    <p class="section-desc">
                        {{ course.description }}
                    </p>

                    <h3 class="sub-title">What you will learn:</h3>
                    <div class="learn-grid">
                        <div
                            class="learn-item"
                            v-for="(item, i) in learningOutcomes"
                            :key="i"
                        >
                            <el-icon class="learn-check">
                                <CircleCheck />
                            </el-icon>
                            <span class="learn-text">{{ item }}</span>
                        </div>
                    </div>
                </section>
                <section class="section">
                    <h2 class="section-title">List Lessons</h2>
                    <p class="section-desc">
                        Explore the detailed modules and lessons of this course.
                    </p>

                    <el-collapse v-model="activeModules" class="modules">
                        <el-collapse-item key="m1" name="m1">
                            <template #title>
                                <div class="module-title">All Lessons</div>
                            </template>

                            <div class="lessons">
                                <div
                                    class="lesson-item"
                                    v-for="l in lessons"
                                    :key="l.id"
                                >
                                    <div class="lesson-left">
                                        <el-icon class="lesson-play">
                                            <VideoPlay />
                                        </el-icon>
                                        <span class="lesson-name">{{
                                            l.title
                                        }}</span>
                                        <el-tag
                                            v-if="l.access_level === 'FREE'"
                                            size="small"
                                            effect="plain"
                                            round
                                            >Preview
                                        </el-tag>
                                    </div>
                                    <div class="lesson-right">
                                        <span class="lesson-duration"
                                            >{{
                                                l.duration_minutes
                                            }}
                                            minutes</span
                                        >
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </section>
                <section class="section">
                    <div class="section-head">
                        <h2 class="section-title">User Reviews</h2>
                    </div>

                    <div class="review-summary">
                        <div class="score">{{ rating.toFixed(1) }}</div>
                        <div class="stars">
                            <el-rate
                                v-model="rating"
                                disabled
                                :colors="['#F59E0B', '#F59E0B', '#F59E0B']"
                            />
                            <div class="reviews-note">
                                {{ formatNumber(reviewsCount) }} reviews
                            </div>
                        </div>
                        <div style="flex-grow: 1"></div>
                        <el-link type="primary" :underline="false"
                            >View All Reviews
                        </el-link>
                    </div>

                    <div class="reviews-grid">
                        <ReviewCard :reviews="reviews" />
                    </div>
                </section>
            </el-col>
            <el-col :span="6">
                <el-card
                    class="course-aside"
                    shadow="never"
                    :body-style="{ padding: '25px 24px' }"
                >
                    <h3 class="text-price">FREE</h3>

                    <el-button
                        type="success"
                        class="enroll-button"
                        @click="handleEnroll"
                    >
                        Enroll Now
                    </el-button>

                    <el-button
                        type="default"
                        :icon="CollectionTag"
                        class="wishlist-button"
                        @click="toggleWishlist"
                    >
                        {{ isWishlisted ? 'Wishlisted' : 'Add to Wishlist' }}
                    </el-button>

                    <div class="overview">
                        <div
                            class="overview-row"
                            v-for="co in courseOverview"
                            :key="co.title"
                        >
                            <FAIcon
                                :icon="co.icon"
                                color="#636AE8FF"
                                size="16px"
                            />
                            <span class="co-title">{{ co.title }}:</span>
                            <span class="co-value">{{ co.value }}</span>
                        </div>
                        <div class="overview-row">
                            <FAIcon
                                icon="fa-solid fa-bolt"
                                color="#636AE8FF"
                                size="16px"
                            />
                            <span class="co-title">Level:</span>
                            <span class="co-value">{{ course.level }}</span>
                        </div>
                    </div>

                    <div class="categories">
                        <div class="categories-title">Categories:</div>
                        <div class="categories-list">
                            <el-tag
                                size="small"
                                type="info"
                                effect="plain"
                                v-for="cat in course.categories"
                                :key="cat"
                                class="category-tag"
                                @click="router.push(`/courses?category=${cat}`)"
                            >
                                {{ cat }}
                            </el-tag>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
.course-breadcrumb {
    margin-bottom: 13px;
}

.hero-card {
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 24px;
}

.hero-content {
    padding: 32px;
    width: 100%;
}

.page-title {
    font-weight: 800;
    font-size: 36px;
    line-height: 48px;
    color: #323842ff;
    margin: 0;
}

.meta-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
    background-color: transparent;
}

.meta-left {
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    gap: 23px;
}

.rating-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #6b7280;
    font-size: 14px;
}

.rating-text {
    font-weight: 600;
    color: #111827;
}

.meta-icon {
    color: #636ae8ff;
    font-size: 16px;
}

.duration {
    color: #111827;
}

.meta-actions {
    display: flex;
    gap: 10px;
}

.section {
    margin-bottom: 28px;
}

.section-title {
    font-size: 22px;
    line-height: 28px;
    font-weight: 700;
    color: #111827;
    margin: 0 0 8px 0;
}

.section-desc {
    color: #4b5563;
    font-size: 14px;
    margin-bottom: 16px;
}

.sub-title {
    font-weight: 700;
    font-size: 16px;
    margin: 10px 0 12px 0;
}

.learn-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px 20px;
}

.learn-item {
    display: flex;
    align-items: center;
    gap: 8px;
}

.learn-check {
    color: #22c55e;
    margin-top: 2px;
}

.learn-text {
    font-size: 14px;
    color: #111827;
}

.modules {
    background: transparent;
}

.module-title {
    font-weight: 600;
    color: #111827;
}

.lessons {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 6px 4px 4px 4px;
}

.lesson-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 10px 12px;
}

.lesson-left {
    display: flex;
    align-items: center;
    gap: 10px;
}

.lesson-play {
    color: #636ae8ff;
}

.lesson-name {
    font-size: 14px;
    color: #111827;
}

.lesson-duration {
    font-size: 13px;
    color: #6b7280;
}

.section-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
}

.review-summary {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
}

.score {
    font-size: 40px;
    font-weight: 800;
    color: #111827;
    line-height: 1;
}

.stars {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.reviews-note {
    font-size: 13px;
    color: #6b7280;
}

.reviews-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
}

.course-aside {
    position: sticky;
    top: 24px;
    border-radius: 12px;
}

.text-price {
    font-size: 30px;
    line-height: 36px;
    font-weight: 700;
    color: #636ae8ff;
    text-align: center;
    margin: 0 0 18px 0;
}

.enroll-button {
    width: 100%;
    font-size: 18px;
    line-height: 28px;
    font-weight: 600;
    background: #44a248ff;
    border-color: #44a248ff;
    border-radius: 6px;
    padding: 0 12px;
    height: 40px;
    margin-bottom: 16px;
}

.enroll-button:hover {
    background: #36823aff;
    border-color: #36823aff;
}

.wishlist-button {
    width: 100%;
    height: 40px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    color: #171a1fff;
    font-size: 14px;
    font-weight: 500;
    margin: 0 0 16px 0 !important;
}

.wishlist-button:hover {
    background: #f9fafb;
}

.overview {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 12px;
}

.overview-row {
    display: flex;
    align-items: center;
    gap: 8px;
}

.co-title {
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    color: #171a1fff;
}

.co-value {
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    color: #171a1fff;
}

.categories {
    margin-top: 4px;
}

.categories-title {
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
    color: #171a1fff;
    margin-bottom: 8px;
}

.categories-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.category-tag {
    font-size: 12px;
    line-height: 20px;
    font-weight: 400;
    cursor: pointer;
}

.category-tag:hover {
    color: #565e6cff;
    background: #dee1e6ff;
    border-color: #565e6cff;
}

.el-tag {
    height: 28px;
    padding: 4px 8px;
    border-radius: 9999px;
    font-size: 12px;
    line-height: 16px;
    font-weight: 600;
    background: #f7f7f7ff;
    border-width: 1px;
    border-color: #ebebeaff;
    border-style: solid;
}
</style>
