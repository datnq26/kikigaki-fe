<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import CourseCard from '@/components/cards/CourseCard.vue'
import CourseService from '@/services/course'
import { ArrowLeft, ArrowRight, Right } from '@element-plus/icons-vue'
import { CourseResponse, TopByCategoriesResponse } from '@/interfaces/course'
import { ElNotification } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { PATHS } from '@/router/paths'

const loading = ref(false)
const topCourses = ref<TopByCategoriesResponse[]>([])
const flatCourses = ref<CourseResponse[]>([])
const router = useRouter()
const route = useRoute()
const category = computed(() => route.query.category as string | undefined)
const currentPage = ref(1)
const pageSize = 6
const pagedCourses = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize
    const endIndex = startIndex + pageSize
    return flatCourses.value.slice(startIndex, endIndex)
})

const fetchTopCourses = async () => {
    loading.value = true
    try {   
        const response = await CourseService.topByCategories()
        if (response.status === 200) {
            topCourses.value = response.data
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

const fetchAllCourses = async (params: any) => {
    loading.value = true
    try {
        const response = await CourseService.getAllCourses(params)
        if (response.status === 200) {
            flatCourses.value = response.data
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
    if (category.value) {
        fetchAllCourses({ categories: category.value })
    } else {
        fetchTopCourses()
    }
})

watch(category, () => {
    currentPage.value = 1
    if (category.value) {
        fetchAllCourses({ categories: category.value })
    } else {
        fetchTopCourses()
    }
})
</script>

<template>
    <div class="page-container">
        <el-breadcrumb class="course-breadcrumb" :separator-icon="ArrowRight">
            <el-breadcrumb-item style="cursor: pointer !important;" :to="{ path: PATHS.HOME }">Home</el-breadcrumb-item>
            <el-breadcrumb-item style="cursor: pointer !important;" :to="{ path: PATHS.COURSES }">Courses</el-breadcrumb-item>
            <el-breadcrumb-item v-if="category">Category</el-breadcrumb-item>
            <el-breadcrumb-item v-if="category">{{ category }}</el-breadcrumb-item>
        </el-breadcrumb>

        <template v-if="category">
            <div
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
                <h1 class="section-title" v-else>Category: {{ category }}</h1>
                <el-row gutter="20">
                    <el-col :span="7" v-for="topCourse in pagedCourses" :key="topCourse.id">
                        <CourseCard
                            :course="topCourse"
                            :loading="loading"
                        />
                    </el-col>
                </el-row>
                <div class="d-flex justify-center" style="margin-top: 16px;">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :page-size="pageSize"
                        :total="flatCourses.length"
                        v-model:current-page="currentPage"
                    >
                    </el-pagination>
                </div>
            </div>
        </template>
        <template v-else>
            <div
                v-for="group in topCourses"
                :key="group.category"
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
                <h1 class="section-title" v-else>{{ group.category }}</h1>
                <el-row gutter="20">
                    <el-col :span="7" v-for="topCourse in group.courses" :key="topCourse.id">
                        <CourseCard
                            :course="topCourse"
                            :loading="loading"
                        />
                    </el-col>
                    <el-col
                        :span="3"
                        class="d-flex justify-center align-center"
                        v-if="group.courses.length >= 3"
                    >
                        <el-button
                            class="more-button"
                            v-if="group.courses.length >= 3"
                            :icon="Right"
                            type="success"
                            plain
                            circle
                            @click="router.push(`/courses?category=${group.category}`)"
                        />
                    </el-col>
                </el-row>
            </div>
        </template>
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

/* Pagination active page to success color */
.el-pagination.is-background .el-pager li.is-active {
    background-color: var(--el-color-success) !important;
    border-color: var(--el-color-success) !important;
    color: #fff !important;
}

@media (max-width: 768px) {
    .page-container {
        padding: 16px;
    }
}
</style>
