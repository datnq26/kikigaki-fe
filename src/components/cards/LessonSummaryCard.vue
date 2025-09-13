<script setup lang="ts">
import { LessonResponse } from '@/interfaces/lesson'

const props = defineProps<{
    lesson: LessonResponse
    progress?: number
    locked?: boolean
}>()

const progress = props.progress ?? 0
const locked = props.locked ?? false
</script>

<template>
    <el-card class="lesson-card" shadow="hover">
        <div class="lesson-content">
            <div class="lesson-image">
                <el-image
                    :src="lesson.image"
                    :alt="lesson.title"
                    fit="cover"
                    class="image"
                />
            </div>
            <div class="lesson-info">
                <h3 class="lesson-title">{{ lesson.title }}</h3>
                <p class="lesson-description">{{ lesson.content }}</p>
                <div class="lesson-progress">
                    <div class="progress-text">{{ progress }}% Complete</div>
                    <el-progress
                        :percentage="progress"
                        :status="locked ? 'warning' : 'success'"
                        :stroke-width="8"
                        class="progress-bar"
                    />
                </div>
            </div>
        </div>
    </el-card>
</template>

<style scoped>
.lesson-card {
    border: 1px solid #e5e7eb;
    overflow: hidden;
    transition: all 0.3s ease;
    min-height: 122px;
    cursor: pointer;
    border-radius: 8px;
}

.lesson-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.lesson-content {
    display: flex;
    gap: 16px;
    padding: 0;
}

.lesson-image {
    flex-shrink: 0;
    width: 128px;
    height: 80px;
    border-radius: 8px;
    overflow: hidden;
}

.image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.lesson-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.lesson-title {
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 8px 0;
    line-height: 1.4;
}

.lesson-description {
    font-size: 14px;
    color: #6b7280;
    margin: 0 0 16px 0;
    line-height: 1.5;
    flex-grow: 1;
}

.lesson-progress {
    margin-top: auto;
}

.progress-text {
    font-size: 12px;
    color: #9ca3af;
    margin-bottom: 6px;
}

.progress-bar {
    width: 100%;
}

@media (max-width: 640px) {
    .lesson-content {
        flex-direction: column;
        gap: 12px;
    }

    .lesson-image {
        width: 100%;
        height: 160px;
    }

    .lesson-info {
        padding: 0;
    }
}
</style>
