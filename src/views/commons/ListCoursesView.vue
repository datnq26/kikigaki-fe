<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CourseCard from '@/components/cards/CourseCard.vue'
import CourseService from '@/services/course'
import { ArrowRight, Right } from '@element-plus/icons-vue'
import { TopByCategoriesResponse } from '@/interfaces/course'
import { ElNotification } from 'element-plus'

const loading = ref(false)
const courses = ref<TopByCategoriesResponse[]>()

const fetchCourses = async () => {
    loading.value = true
    try {
        const response = await CourseService.topByCategories()
        if (response.status === 200) {
            courses.value = response.data
        }
    } catch (error) {
        ElNotification({
            title: 'Error',
            message: 'Loading courses failed. Please try again.',
            type: 'error',
        })
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
            v-for="course in courses"
            :key="course.category"
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
            <h1 class="section-title" v-else>{{ course.category }}</h1>
            <el-row gutter="20">
                <el-col :span="7" v-for="topCourse in course.courses">
                    <CourseCard
                        :key="topCourse.id"
                        :course="topCourse"
                        :loading="loading"
                    />
                </el-col>
                <el-col
                    :span="3"
                    class="d-flex justify-center align-center"
                    v-if="course.courses.length >= 3"
                >
                    <el-button
                        class="more-button"
                        v-if="course.courses.length >= 3"
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
