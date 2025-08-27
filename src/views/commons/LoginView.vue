<template>
    <el-row class="login-page">
        <el-col :span="12" class="d-none d-md-block">
            <el-image
                class="login-page-image"
                fit="cover"
                src="/background_authentication_page.png"
            />
        </el-col>
        <el-col
            :md="12"
            :sm="24"
            :xs="24"
            class="d-flex align-center justify-center"
        >
            <el-card
                body-style="padding: 57px 61px 83px 61px;"
                class="login-page-card"
                shadow="always"
            >
                <div class="card-content">
                    <el-image class="logo" src="/logo.png" />
                    <h2 class="title">Welcome to KIKIGAKI</h2>
                    <p class="subtitle">
                        Start your Japanese journey with engaging anime videos!
                    </p>
                    <el-form
                        ref="formRef"
                        :model="loginForm"
                        :rules="rules"
                        class="login-form"
                        label-position="top"
                        @submit.prevent="submitForm(formRef)"
                    >
                        <el-form-item prop="email">
                            <el-input
                                v-model="loginForm.email"
                                placeholder="Email"
                                :prefix-icon="Message"
                                size="large"
                                spellcheck="false"
                            />
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input
                                v-model="loginForm.password"
                                :prefix-icon="Lock"
                                placeholder="Password"
                                show-password
                                size="large"
                                type="password"
                                spellcheck="false"
                            />
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                :loading="loading"
                                class="login-button"
                                native-type="submit"
                                size="large"
                                type="success"
                            >
                                Login
                            </el-button>
                        </el-form-item>
                    </el-form>
                    <el-divider>OR</el-divider>
                    <el-button class="google-button" size="large">
                        Continue with Google
                    </el-button>
                    <div class="signup-text">
                        <el-text>If you don't have an account, </el-text>
                        <el-link
                            :href="PATHS.REGISTER"
                            :underline="false"
                            class="signup-link"
                            >Sign Up</el-link
                        >
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElForm, ElNotification, FormRules } from 'element-plus'
import { Lock, Message } from '@element-plus/icons-vue'
import { PATHS } from '@/router/paths'
import AuthService from '@/services/auth'
import { LoginRequest } from '@/interfaces/auth'
import { useRouter } from 'vue-router'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'

const authStore = useAuthenticationStore()
const loading = ref(false)
const formRef = ref<typeof ElForm | null>(null)
const router = useRouter()
const loginForm = reactive<LoginRequest>({
    email: '',
    password: '',
})
const rules = reactive<FormRules>({
    email: [
        { required: true, message: 'Please input your email', trigger: 'blur' },
        {
            type: 'email',
            message: 'Please input a valid email address',
            trigger: ['blur', 'change'],
        },
    ],
    password: [
        {
            required: true,
            message: 'Please input your password',
            trigger: 'blur',
        },
    ],
})

const handleLogin = async () => {
    loading.value = true
    const payload = {
        email: loginForm.email,
        password: loginForm.password,
    }
    try {
        const response = await authStore.login(payload)
        if (response.status === 200) {
            ElNotification({
                title: 'Success',
                message: response.data.message,
                type: 'success',
            })
            await router.push(PATHS.HOME)
        }
    } catch (error) {
        ElNotification({
            title: 'Error',
            message: 'Login failed. Please try again.',
            type: 'error',
        })
    } finally {
        loading.value = false
    }
}

const submitForm = (formEl: typeof ElForm | null) => {
    if (!formEl) return
    formEl.validate(async (valid: any) => {
        if (!valid) return false
        await handleLogin()
    })
}
</script>

<style scoped>
.login-page {
    height: 100vh;
}

.login-page-image {
    width: 100%;
    height: 100%;
}

.login-page-card {
    min-width: 448px;
    max-width: 480px;
    border-radius: 12px;
    border: none;
}

.card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.logo {
    width: 64px;
    height: 64px;
    margin-bottom: 27px;
}

.title {
    font-size: 24px;
    line-height: 32px;
    font-weight: 700;
    margin: 0 0 48px 0;
    color: #242524ff;
}

.subtitle {
    margin: 0 0 32px 0;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    color: #8c8d8bff;
    max-width: 300px;
    text-align: center;
}

.login-form {
    width: 100%;
}

.login-button {
    width: 100%;
    font-size: 14px;
    font-weight: 600;
    background-color: #44a248ff;
}

.google-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 22px;
    font-weight: 600;
    color: #242524ff;
}

.signup-text {
    margin-top: 24px;
    font-size: 14px;
}

.signup-link {
    font-weight: 600;
    color: #4caf50;
    margin-bottom: 5px;
}

.signup-link:hover {
    color: #45a049;
}

@media (max-width: 768px) {
    .d-none.d-md-block {
        display: none !important;
    }
    .login-page-card {
        min-width: 90%;
        max-width: 400px;
        box-shadow: none;
        border: 1px solid #e0e0e0;
    }
}
</style>
