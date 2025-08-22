<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { CourseResponse } from '@/interfaces/course'

const props = defineProps<{
    course: CourseResponse
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
        @click="goToCourseDetail"
    >
        <el-image :src="course.image" class="card-image" :alt="course.name" />
        <div class="card-content">
            <h3 class="title">{{ course.name }}</h3>
            <p class="description">{{ course.description }}</p>
            <div class="meta">
                <el-tag
                    size="small"
                    type="info"
                    effect="plain"
                    v-for="category in course.categories"
                    class="tag-category"
                    >{{ category }}</el-tag
                >
            </div>
            <div class="card-footer">
                <el-link type="success" :underline="false" class="learn-now"
                    >Learn now</el-link
                >
            </div>
        </div>
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
    font-family: Inter, sans-serif;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
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
    -webkit-line-clamp: 2;
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
    font-family: Inter, sans-serif;
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
