<script setup lang="ts">
import { ref } from 'vue'
import CourseCard from '@/components/cards/CourseCard.vue'
import { ArrowRight, Right } from '@element-plus/icons-vue'
</script>

<template>
    <div class="page-container">
        <div class="account-setting content">
            <div>
                <el-text tag="h1" class="mx-1 title" size="large"
                    >Account Settings</el-text
                >
            </div>
            <div></div>
            <div>
                <div class="flex justify-center card">
                    <el-card style="max-width: 100%" class="profile-card">
                        <div
                            style="
                                gap: 8px;
                                display: flex;
                                flex-direction: column;
                            "
                        >
                            <div>
                                <el-text tag="h2" class="mx-1 h1" size="large"
                                    >Profile Picture</el-text
                                >
                            </div>
                            <div>
                                <el-text tag="h3" class="mx-1" size="small"
                                    >Upload a new avatar or remove your current
                                    one.</el-text
                                >
                            </div>
                        </div>
                        <div class="profile-picture">
                            <div>
                                <el-image
                                    class="avatar"
                                    style="width: 100px; height: 100px"
                                    src="http://localhost:8000/media/images/avatars/default.jpg"
                                    fit="cover"
                                />
                            </div>
                            <div class="handle-avatar-buttons">
                                <el-button type="default" style="">
                                    <el-text type="primary"
                                        >Upload new picture</el-text
                                    >
                                </el-button>
                                <el-button
                                    type="default"
                                    text
                                    style="margin: 0%"
                                >
                                    <el-text type="danger"
                                        >Remove picture</el-text
                                    >
                                </el-button>
                            </div>
                        </div>
                    </el-card>
                </div>
            </div>
            <div>
                <div class="flex justify-center card">
                    <el-card style="max-width: 100%" class="profile-card">
                        <div
                            style="
                                gap: 8px;
                                display: flex;
                                flex-direction: column;
                            "
                        >
                            <div>
                                <el-text tag="h2" class="mx-1 h1" size="large"
                                    >Personal Details</el-text
                                >
                            </div>
                            <div>
                                <el-text tag="h3" class="mx-1" size="small"
                                    >Update your profile information and manage
                                    your account type.</el-text
                                >
                            </div>
                        </div>
                        <div class="personal-details">
                            <div class="personel-credentials">
                                <div class="input">
                                    <div><el-text>First Name</el-text></div>
                                    <el-input
                                        style="width: 100%"
                                        placeholder="First Name"
                                    />
                                </div>
                                <div class="input">
                                    <div><el-text>Last Name</el-text></div>
                                    <el-input
                                        style="width: 100%"
                                        placeholder="Last Name"
                                    />
                                </div>
                            </div>
                            <div class="personel-credentials">
                                <div class="input">
                                    <div><el-text>Username</el-text></div>
                                    <el-input
                                        style="width: 100%"
                                        placeholder="Username"
                                    />
                                </div>
                                <div class="input">
                                    <div><el-text>Email Address</el-text></div>
                                    <el-input
                                        style="width: 100%"
                                        placeholder="Email Address"
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <el-button
                                type="primary"
                                style="width: 12%; float: right; margin-top: 2%"
                                >Save Changes</el-button
                            >
                        </div>
                    </el-card>
                </div>
            </div>
            <div>
                <div class="flex justify-center card">
                    <el-card style="max-width: 100%" class="profile-card">
                        <div
                            style="
                                gap: 8px;
                                display: flex;
                                flex-direction: column;
                            "
                        >
                            <div style="display: flex; align-items: center">
                                <el-text tag="h2" class="mx-1 h1" size="large"
                                    >Subscription Status</el-text
                                >
                                <el-tag
                                    type="primary"
                                    class="active-tag"
                                    effect="dark"
                                >
                                    <el-text size="small" style="color: white"
                                        >Active</el-text
                                    >
                                </el-tag>
                            </div>
                            <div>
                                <el-text tag="h3" class="mx-1" size="small"
                                    >Your current plan details and next
                                    renewal.</el-text
                                >
                            </div>
                        </div>
                        <div class="profile-acess-level">
                            <div>
                                <el-text class="mx-1" size="small"
                                    >Current Plan:
                                </el-text>
                                <el-text class="mx-1" size="small" tag="b"
                                    >Free</el-text
                                >
                            </div>
                            <div>
                                <el-text class="mx-1" size="small"
                                    >Renewal Date:
                                </el-text>
                                <el-text class="mx-1" size="small" tag="b"
                                    >October 26, 2025</el-text
                                >
                            </div>
                        </div>
                    </el-card>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.page-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
    background-color: #ffffff;
}

.title {
    font-size: 30px;
    color: #242524ff;
}

.h1 {
    font-size: 20px;
    color: #242524ff;
}

.content {
    padding: 32px;
}

.personel-credentials {
    display: flex;
    flex-direction: row;
    gap: 20px;
    width: 100%;
    margin-bottom: 10px;
    margin-top: 24px;
}

.card {
    margin-top: 20px;
    margin-bottom: 20px;
}

.input {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 5px;
}

.profile-acess-level {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 24px;
}

.profile-picture {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 20px;
}

.active-tag {
    margin-left: 10px;
    border-radius: 9999px;
}

.profile-card {
    width: 100%;
    padding-bottom: 25px;
    padding-left: 25px;
}

.handle-avatar-buttons {
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    gap: 10px;
}

.avatar {
    border-radius: 50%;
}

.radius {
    height: 40px;
    width: 100%;
    border: 1px solid var(--el-border-color);
    border-radius: 0;
    margin-top: 20px;
}

@media (max-width: 768px) {
    .section-title {
        font-size: 1.875rem;
    }
    .course-grid {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
    .page-container {
        padding: 16px;
    }
}
</style>

<style>
.course-breadcrumb .el-breadcrumb__inner {
    color: #636ae8ff !important;
}
</style>
