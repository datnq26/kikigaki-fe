<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { UpdateAccountRequest } from '@/interfaces/user'
import UserService from '@/services/user'

const userInfoRequest = ref<UpdateAccountRequest>({
    username: '',
    first_name: '',
    last_name: '',
})

const userService = UserService
const isUpdateSuccess = ref(false)
const isLoading = ref(false)
const isFormValid = ref(true)
const originalData = ref({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
})

const loadUserData = async () => {
    try {
        const response = await userService.getCurrentUser()
        if (response.status === 200 && response.data) {
            const userData = {
                username: response.data.username || '',
                first_name: response.data.first_name || '',
                last_name: response.data.last_name || '',
            }
            userInfoRequest.value = { 
                ...userData, 
            }
            originalData.value = { 
                ...userData, 
                email: response.data.email || '' 
            }
        }
    } catch (error) {
        console.error('Error loading user data:', error)
        ElMessage.error('Failed to load user data')
    }
}

const validateForm = () => {
    isFormValid.value = true
    
    if (!userInfoRequest.value.username?.trim()) {
        ElMessage.warning('Username is required')
        isFormValid.value = false
        return false
    }
    
    return true
}

const handleUpdateAccountInfo = async () => {
    if (!validateForm()) {
        return
    }
    
    isLoading.value = true
    isUpdateSuccess.value = false
    
    try {
        const response = await userService.updateAccount(userInfoRequest.value)
        if (response.status === 200) {
            isUpdateSuccess.value = true
            ElMessage.success('Account updated successfully')
        } else {
            isUpdateSuccess.value = false
            ElMessage.error('Failed to update account')
        }
    } catch (error) {
        console.error('Error updating account info:', error)
        isUpdateSuccess.value = false
        ElMessage.error('An error occurred while updating account')
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    loadUserData()
})
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
                                        v-model="userInfoRequest.first_name"
                                        style="width: 100%"
                                        placeholder="First Name"
                                        :disabled="isLoading"
                                        :class="{ 'is-error': !isFormValid && !userInfoRequest.first_name.trim() }"
                                    />
                                    <div><el-text>Last Name</el-text></div>
                                    <el-input
                                        v-model="userInfoRequest.last_name"
                                        style="width: 100%"
                                        placeholder="Last Name"
                                        :disabled="isLoading"
                                        :class="{ 'is-error': !isFormValid && !userInfoRequest.last_name.trim() }"
                                    />
                                </div>
                            </div>
                            <div class="personel-credentials">
                                <div class="input">
                                    <div><el-text>Username</el-text></div>
                                    <el-input
                                        v-model="userInfoRequest.username"
                                        style="width: 100%"
                                        placeholder="Username"
                                        :disabled="isLoading"
                                        :class="{ 'is-error': !isFormValid && !userInfoRequest.username.trim() }"
                                    />
                                </div>
                                <div class="input">
                                    <div><el-text>Email Address</el-text></div>
                                    <el-input
                                        style="width: 100%"
                                        placeholder="Email Address"
                                        :value="originalData.email"
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 2%">
                            <el-button
                                type="primary"
                                :loading="isLoading"
                                :disabled="isLoading"
                                @click="handleUpdateAccountInfo"
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

.is-error {
    border-color: #f56c6c !important;
}

.is-error:focus {
    border-color: #f56c6c !important;
    box-shadow: 0 0 0 2px rgba(245, 108, 108, 0.2) !important;
}
</style>
