<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CourseCard from '@/components/cards/CourseCard.vue'
import CourseService from '@/services/course'
import { ArrowRight, Right } from '@element-plus/icons-vue'

const loading = ref(false)
const courseSections = ref([
    {
        title: 'Beginner',
        courses: [
            {
                id: 1,
                name: 'Kanji for Beginners',
                description:
                    'An introduction to the most common fundamental Kanji characters.',
                image: 'https://images.unsplash.com/photo-1543183538-42b753a9481f?w=600',
                categories: ['Kanji', 'Vocabulary'],
            },
            {
                id: 2,
                name: 'Adjectives & Adverbs',
                description:
                    'Learn how to describe things and actions with common Japanese adjectives and adverbs.',
                image: 'https://images.unsplash.com/photo-1516943991208-011831844199?w=600',
                categories: ['Grammar'],
            },
            {
                id: 3,
                name: 'Japanese Counters',
                description:
                    'Master the art of counting different objects in Japanese with the correct counters.',
                image: 'https://images.unsplash.com/photo-1517402092188-16428a2a07d8?w=600',
                categories: ['Vocabulary'],
            },
        ],
    },
    {
        title: 'Anime 2025',
        courses: [
            {
                id: 4,
                name: 'Anime & Manga Phrases',
                description:
                    'Understand common phrases and slang you hear in your favorite anime and manga.',
                image: 'https://images.unsplash.com/photo-1613376023733-0a73375d9306?w=600',
                categories: ['Culture'],
            },
            {
                id: 5,
                name: 'Onomatopoeia in Action',
                description:
                    'Explore the expressive world of Japanese onomatopoeia, from "doki doki" to "zaa zaa".',
                image: 'https://images.unsplash.com/photo-1618336753325-a7653b1b59ab?w=600',
                categories: ['Vocabulary'],
            },
            {
                id: 6,
                name: 'Analyzing Your Favorite Scenes',
                description:
                    'A deep dive into the language and grammar used in iconic anime scenes.',
                image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600',
                categories: ['Listening'],
            },
        ],
    },
])
const courses = ref([])

const fetchCourses = async () => {
    loading.value = true
    try {
        const response = await CourseService.getAllCourses()
        if (response.status === 200) {
            console.log(response)
        }
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchCourses()
})
</script>

<template>
    <div class="page-container">
        <el-breadcrumb class="course-breadcrumb" :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
            <el-breadcrumb-item>Courses</el-breadcrumb-item>
        </el-breadcrumb>

        <div
            v-for="section in courseSections"
            :key="section.title"
            class="course-section"
        >
            <el-skeleton v-if="loading" animated>
                <template #template>
                    <el-skeleton-item
                        variant="h1"
                        style="
                            margin: 13px 0 12px 0;
                            font-size: 30px;
                            max-width: 150px;
                            min-height: 36px;
                        "
                    />
                </template>
            </el-skeleton>
            <h1 class="section-title" v-else>{{ section.title }}</h1>
            <el-row gutter="20">
                <el-col :span="7" v-for="course in section.courses">
                    <CourseCard
                        :key="course.id"
                        :course="course"
                        :loading="loading"
                    />
                </el-col>
                <el-col
                    :span="3"
                    class="d-flex justify-center align-center"
                    v-if="section.courses.length >= 3"
                >
                    <el-button
                        class="more-button"
                        v-if="section.courses.length >= 3"
                        :icon="Right"
                        type="success"
                        plain
                        circle
                    />
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<style scoped>
.course-section {
    margin-bottom: 48px;
}

.section-title {
    font-family: Archivo, sans-serif;
    font-size: 30px;
    line-height: 36px;
    font-weight: 700;
    color: #242524ff;
    margin: 13px 0 12px 0;
}

.more-button {
    width: 56px !important;
    height: 56px;
}

@media (max-width: 768px) {
    .section-title {
        font-size: 1.875rem;
    }
    .course-grid {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
}
</style>

<style>
.page-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
    background-color: #ffffff;
}

.course-breadcrumb .el-breadcrumb__inner {
    color: #636ae8ff !important;
}

@media (max-width: 768px) {
    .page-container {
        padding: 16px;
    }
}
</style>
