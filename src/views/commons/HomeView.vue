<script setup lang="ts">
import { ref } from 'vue'

import type { TabsPaneContext } from 'element-plus'
import { VideoPlay } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import CourseService from '@/services/course'
import { CourseResponse } from '@/interfaces/course'


const activeName = ref('1')
const loading = ref(false)
const recommendCourses = ref<CourseResponse[]>([])

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}

const fetchTopCourses = async (params: any) => {
    loading.value = true
    try {
        const response = await CourseService.topByCategories(params)
        if (response.status === 200) {
            recommendCourses.value = response.data
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

</script>

<template>
    <div class="main-content">
        <el-card class="card welcome-card">
            <template #header>
                <div class="card-header">
                    <span
                        ><el-text tag="b" style="color: black"
                            >Welcome back,</el-text
                        >
                        <el-text tag="b" 　style="color: #44A248FF;"
                            >LinguaLearner!</el-text
                        ></span
                    >
                </div>
            </template>
            <div>
                <div>
                    <a class="subtitle"
                        >Continue your journey to Japanese fluency!</a
                    >
                </div>
                <div class="welcome-card-content">
                    <div class="welcome-card-streak">
                        <div>
                            <el-image
                                style="
                                    width: 15px;
                                    height: 15px;
                                    color: #f97316ff;
                                "
                                src="/fire-streak.svg"
                                fit="fit"
                            />
                            <el-text
                                class="highlight-color"
                                style="color: #f88379"
                                >15-Days Streak</el-text
                            >
                        </div>
                        <div>
                            <el-image
                                style="
                                    width: 15px;
                                    height: 15px;
                                    color: #f97316ff;
                                "
                                src="/award.svg"
                                fit="fit"
                            />
                            <el-text
                                class="highlight-color"
                                style="color: #ffc000"
                                >1250 Bonus Points</el-text
                            >
                        </div>
                    </div>
                    <div class="welcome-card-goal">
                        <div class="highlight-color" style="color: aliceblue">
                            Daily Goal
                        </div>
                        <div>
                            <el-progress percentage="20" color="#44A248FF" />
                        </div>
                        <div class="highlight-color" style="color: aliceblue">
                            Keep learning to reach your daily target!
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
        <div>
            <div>
                <el-text tag="b" class="text-title"
                    >Today's Listening Lesson</el-text
                >
            </div>
            <el-card class="card today-lesson-card">
                <div>
                    <el-image
                        style="width: 100%; max-width: 100%; height: 400px"
                        src="https://preview.redd.it/suggestion-make-this-the-new-banner-of-r-onepiece-from-v0-iodwygpkys9b1.jpg?width=1080&crop=smart&auto=webp&s=cc51caadcdaf492ea2164c08371a59252bfb3349"
                        fit="fill"
                    />
                </div>
                <template #footer>
                    <div class="card-footer">
                        <div>
                            <el-tag
                                style="
                                    border-radius: 9999px;
                                    color: aliceblue;
                                    background-color: #f88379;
                                "
                                >Not started</el-tag
                            >
                        </div>
                        <div>
                            <el-button
                                style="
                                    background-color: #44a248ff;
                                    color: #ffffffff;
                                    float: right;
                                "
                                >Start lesson <el-icon><VideoPlay /></el-icon
                            ></el-button>
                        </div>
                    </div>
                </template>
            </el-card>
        </div>

        <div class="card">
            <div>
                <el-text tag="b" class="text-title"
                    >Recommended for You</el-text
                >
            </div>
            <div>
                <div>
                    <el-tabs
                        v-model="activeName"
                        class="tabs"
                        @tab-click="handleClick"
                    >
                        <el-tab-pane label="Beginner" name="1">
                            <div class="recommend-courses">
                                <el-card
                                    v-for="course in recommendCourses"
                                    :key="course.id"
                                    shadow="hover"
                                    :body-style="{ padding: '0px' }"
                                    class="course-card"
                                >
                                    <el-image
                                        :src="course.image"
                                        class="card-image"
                                        :alt="course.name"
                                        fit="fill"
                                    />
                                    <div class="card-content">
                                        <h3 class="title">{{ course.name }}</h3>
                                        <p class="description">
                                            {{ course.description }}
                                        </p>
                                        <div class="meta">
                                            <el-tag
                                                v-for="(
                                                    category, index
                                                ) in course.categories"
                                                :key="index"
                                                size="small"
                                                type="info"
                                                effect="plain"
                                                class="tag-category"
                                            >
                                                {{ category }}
                                            </el-tag>
                                        </div>
                                        <div class="card-footer">
                                            <el-link
                                                type="success"
                                                :underline="false"
                                                class="learn-now"
                                            >
                                                Learn now
                                            </el-link>
                                        </div>
                                    </div>
                                </el-card>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="Intermediate" name="2"
                            >Config</el-tab-pane
                        >
                        <el-tab-pane label="Advanced" name="3"
                            >Role</el-tab-pane
                        >
                        <el-tab-pane label="JLPT N5 Prep" name="4"
                            >Task</el-tab-pane
                        >
                        <el-tab-pane label="Business Japanese" name="5"
                            >Task</el-tab-pane
                        >
                        <el-tab-pane label="Cultural Insights" name="6"
                            >Task</el-tab-pane
                        >
                        <el-tab-pane label="Slice of Life Anime" name="7"
                            >Task</el-tab-pane
                        >
                        <el-tab-pane label="Fantasy Anime" name="8"
                            >Task</el-tab-pane
                        >
                    </el-tabs>
                </div>
            </div>
            <div></div>
        </div>
    </div>
</template>

<style scoped>
.card {
    width: 100%;
    max-width: 100%;
    border-radius: 10px;
}

.main-content {
    padding-left: 10%;
    padding-right: 10%;
    padding-top: 5%;
    padding-bottom: 5%;
    display: flex;
    flex-direction: column;
    gap: 36px;
}

.welcome-card .card-header .el-text {
    font-size: 24px;
}

.welcome-card {
    background-image: url('/welcome-banner.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

.welcome-card-content {
    display: flex;
    margin-top: 12px;
}

.welcome-card-streak {
    display: flex;
    flex-direction: column;
    flex: 2;
}

.welcome-card-goal {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.highlight-color {
    font-weight: bold;
    text-shadow:
        -1px -1px 0 #000,
        1px -1px 0 #000,
        -1px 1px 0 #000,
        1px 1px 0 #000;
}

.subtitle {
    color: rgba(255, 255, 255, 0.7);
    font-weight: bold;
    text-shadow:
        -1px -1px 0 #000,
        1px -1px 0 #000,
        -1px 1px 0 #000,
        1px 1px 0 #000;
}

.tabs > .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.tabs {
    border-radius: 9999px;
}

.recommend-courses {
    display: flex;
    flex-direction: row;
    gap: 16px;
}

.card-footer {
    display: flex;
    width: 100%;
}

.card-footer div {
    flex: 1;
    width: 100%;
}

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

.text-title {
    font-size: 30px;
    line-height: 36px;
    font-weight: 700;
    color: #242524ff;
}

div:has(.text-title) {
    margin-bottom: 12px;
}
</style>
