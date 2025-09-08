<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { CourseResponse } from '@/interfaces/course'
import { BASE_IMAGE_URL } from '@/constants/image'

const props = defineProps<{
    course: CourseResponse
    loading: boolean
}>()

const router = useRouter()

const goToCourseDetail = () => {
    router.push(`/courses/${props.course.id}`)
}
</script>

<template>
    <el-card
        shadow="hover"
        :body-style="{ padding: '0px' }"
        class="course-card"
    >
        <template v-if="loading">
            <el-skeleton animated>
                <template #template>
                    <el-skeleton-item
                        variant="image"
                        style="width: 100%; height: 128px; border-radius: 4px"
                    />
                    <div style="padding: 12px 17px">
                        <el-skeleton-item
                            variant="h3"
                            style="width: 80%; margin-bottom: 12px"
                        />
                        <el-skeleton-item
                            variant="text"
                            style="margin-bottom: 8px"
                        />
                        <el-skeleton-item
                            variant="text"
                            style="width: 60%; margin-bottom: 16px"
                        />
                        <div
                            style="display: flex; gap: 8px; margin-bottom: 16px"
                        >
                            <el-skeleton-item
                                variant="rect"
                                style="
                                    width: 60px;
                                    height: 24px;
                                    border-radius: 12px;
                                "
                            />
                            <el-skeleton-item
                                variant="rect"
                                style="
                                    width: 60px;
                                    height: 24px;
                                    border-radius: 12px;
                                "
                            />
                        </div>
                        <el-skeleton-item
                            variant="button"
                            style="width: 100px; height: 28px"
                        />
                    </div>
                </template>
            </el-skeleton>
        </template>
        <template v-else>
            <el-image
                :src="
                    course.image.startsWith(BASE_IMAGE_URL)
                        ? course.image
                        : BASE_IMAGE_URL + course.image
                "
                class="card-image"
                :alt="course.name"
                @click="goToCourseDetail"
            />
            <div class="card-content">
                <h3 class="title" @click="goToCourseDetail">
                    {{ course.name }}
                </h3>
                <p class="description">{{ course.description }}</p>
                <div class="meta">
                    <el-tag
                        size="small"
                        type="info"
                        effect="plain"
                        v-for="category in course.categories"
                        :key="category"
                        class="tag-category"
                        @click="router.push(`/courses?category=${category}`)"
                    >
                        {{ category }}
                    </el-tag>
                </div>
                <div class="card-footer">
                    <el-link
                        type="success"
                        @click="goToCourseDetail"
                        :underline="false"
                        class="learn-now"
                        >Learn now</el-link
                    >
                </div>
            </div>
        </template>
    </el-card>
</template>

<style scoped>
.course-card {
    max-width: 356px;
    max-height: 312px;
    cursor: pointer;
    border-radius: 8px;
    overflow: hidden;
    transition:
        transform 0.2s ease-in-out,
        box-shadow 0.2s ease-in-out;
}

.course-card:hover {
    transform: translateY(-4px);
}

.card-image {
    width: 100%;
    height: 128px;
    object-fit: cover;
    display: block;
}

.card-content {
    padding: 12px 17px;
}

.title {
    font-weight: 600;
    font-size: 18px;
    margin: 0 0 17px 0;
    color: #242524ff;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}

.description {
    font-size: 14px;
    color: #8c8d8bff;
    font-weight: 400;
    margin: 0 0 11px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}

.tag-category {
    font-size: 12px;
    line-height: 20px;
    font-weight: 400;
}

.tag-category:hover {
    color: #565e6cff;
    background: #dee1e6ff;
    border-color: #565e6cff;
}

.el-tag {
    height: 28px;
    padding: 4px 8px;
    border-radius: 9999px;
    font-size: 10px;
    line-height: 16px;
    font-weight: 600;
    background: #f7f7f7ff;
    border-width: 1px;
    border-color: #ebebeaff;
    border-style: solid;
}

.card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 12px;
}

.meta {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.8rem;
    color: #6b7280;
}

.learn-now {
    font-size: 14px;
    line-height: 22px;
    font-weight: 500;
    color: #44a248ff;
    padding: 0 12px;
    margin-left: -12px;
}

.learn-now:hover {
    color: #44a248ff;
    background: #f1f9f2ff;
}
</style>
