<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import CourseCard from '@/components/cards/CourseCard.vue'
import CourseService from '@/services/course'
import { ArrowLeft, ArrowRight, Right } from '@element-plus/icons-vue'
import {
    CourseRequest,
    CourseResponse,
    TopByCategoriesResponse,
} from '@/interfaces/course'
import { ElNotification } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { PATHS } from '@/router/paths'
import { PaginationRequest, PaginationResponse } from '@/interfaces/commons'
import { extractLimitOffsetPagination } from '@/utils/extract'

const loading = ref(false)
const topCourses = ref<PaginationResponse<TopByCategoriesResponse>>({
    count: 0,
    limit: 0,
    offset: 0,
    current_page: 1,
    next: '',
    previous: '',
    results: [],
})
const flatCourses = ref<PaginationResponse<CourseResponse>>({
    count: 0,
    limit: 0,
    offset: 0,
    current_page: 1,
    next: '',
    previous: '',
    results: [],
})
const router = useRouter()
const route = useRoute()
const category = computed(() => route.query.category as string | undefined)

const fetchTopCourses = async (params: PaginationRequest) => {
    loading.value = true
    try {
        const response = await CourseService.topByCategories(params)
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

const fetchAllCourses = async (params: CourseRequest) => {
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

const handlePageTopCourseChange = (page: number) => {
    console.log(page, topCourses.value.current_page)
    if (page > topCourses.value.current_page && topCourses.value.next) {
        fetchTopCourses(extractLimitOffsetPagination(topCourses.value.next))
    } else if (
        page < topCourses.value.current_page &&
        topCourses.value.previous
    ) {
        fetchTopCourses(extractLimitOffsetPagination(topCourses.value.previous))
    }
}

const handlePageCourseByCategoryChange = (page: number) => {
    console.log(page, flatCourses.value.current_page)
    if (page > flatCourses.value.current_page && flatCourses.value.next) {
        fetchAllCourses({
            ...extractLimitOffsetPagination(flatCourses.value.next),
            categories: category.value ?? null,
        })
    } else if (
        page < flatCourses.value.current_page &&
        flatCourses.value.previous
    ) {
        fetchAllCourses({
            ...extractLimitOffsetPagination(flatCourses.value.previous),
            categories: category.value ?? null,
        })
    }
}

onMounted(() => {
    if (category.value) {
        fetchAllCourses({
            categories: category.value,
            limit: null,
            offset: null,
        })
    } else {
        fetchTopCourses({
            limit: null,
            offset: null,
        })
    }
})

watch(category, () => {
    if (category.value) {
        fetchAllCourses({
            categories: category.value,
            limit: null,
            offset: null,
        })
    } else {
        fetchTopCourses({
            limit: null,
            offset: null,
        })
    }
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
            <el-breadcrumb-item v-if="category">Category</el-breadcrumb-item>
            <el-breadcrumb-item v-if="category">{{
                category
            }}</el-breadcrumb-item>
        </el-breadcrumb>

        <template v-if="category">
            <div class="course-section">
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
                    <el-col
                        :span="7"
                        v-for="courseByCategory in flatCourses.results"
                        :key="courseByCategory.id"
                    >
                        <CourseCard
                            :course="courseByCategory"
                            :loading="loading"
                        />
                    </el-col>
                </el-row>
                <div class="d-flex justify-center" style="margin-top: 16px">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :page-size="flatCourses.limit"
                        :total="flatCourses.count"
                        :current-page="flatCourses.current_page"
                        @current-change="handlePageCourseByCategoryChange"
                    >
                    </el-pagination>
                </div>
            </div>
        </template>
        <template v-else>
            <div
                v-for="group in topCourses.results"
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
                    <el-col
                        :span="7"
                        v-for="topCourse in group.courses"
                        :key="topCourse.id"
                    >
                        <CourseCard :course="topCourse" :loading="loading" />
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
                            @click="
                                router.push(
                                    `/courses?category=${group.category}`
                                )
                            "
                        />
                    </el-col>
                </el-row>
            </div>
            <div class="d-flex justify-center" style="margin-top: 16px">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="topCourses.limit"
                    :total="topCourses.count"
                    :current-page="topCourses.current_page"
                    @current-change="handlePageTopCourseChange"
                >
                </el-pagination>
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

.el-col {
    margin-bottom: 20px;
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

.el-pagination.is-background .el-pager li.is-active {
    background-color: var(--el-color-success) !important;
    color: #fff !important;
}

@media (max-width: 768px) {
    .page-container {
        padding: 16px;
    }
}
</style>
