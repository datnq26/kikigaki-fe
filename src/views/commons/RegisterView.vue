<template>
    <el-row class="register-page">
        <el-col :span="12" class="d-none d-md-block">
            <el-image
                class="register-page-image"
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
                class="register-page-card"
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
                        :model="registerForm"
                        :rules="rules"
                        class="register-form"
                        label-position="top"
                        @submit.prevent="submitForm(formRef)"
                    >
                        <el-form-item
                            prop="email"
                            :error="
                                formErrors.email?.length
                                    ? formErrors.email[0]
                                    : ''
                            "
                        >
                            <el-input
                                v-model="registerForm.email"
                                placeholder="Email"
                                :prefix-icon="Message"
                                size="large"
                                spellcheck="false"
                                @input="clearFieldError('email')"
                            />
                            <template #error>
                                <div
                                    class="el-form-item__error"
                                    style="position: relative"
                                    v-for="err in formErrors.email || []"
                                    :key="err"
                                >
                                    {{ err }}
                                </div>
                            </template>
                        </el-form-item>
                        <el-form-item
                            prop="password"
                            :error="
                                formErrors.password?.length
                                    ? formErrors.password[0]
                                    : ''
                            "
                        >
                            <el-input
                                v-model="registerForm.password"
                                :prefix-icon="Lock"
                                placeholder="Password"
                                show-password
                                size="large"
                                type="password"
                                @input="clearFieldError('password')"
                            />
                            <template #error>
                                <div
                                    class="el-form-item__error"
                                    style="position: relative"
                                    v-for="err in formErrors.password || []"
                                    :key="err"
                                >
                                    {{ err }}
                                </div>
                            </template>
                        </el-form-item>
                        <el-form-item prop="confirm_password">
                            <el-input
                                v-model="registerForm.confirm_password"
                                :prefix-icon="Lock"
                                placeholder="Confirm password"
                                show-password
                                size="large"
                                type="password"
                                spellcheck="false"
                            />
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                :loading="loading"
                                class="register-button"
                                native-type="submit"
                                size="large"
                                type="success"
                            >
                                Sign up
                            </el-button>
                        </el-form-item>
                    </el-form>
                    <el-divider>OR</el-divider>
                    <div class="signin-text">
                        <el-text>You already have an account,</el-text>
                        <el-link
                            :href="PATHS.LOGIN"
                            :underline="false"
                            class="signin-link"
                            >Login
                        </el-link>
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
import { RegisterRequest } from '@/interfaces/auth'
import { useRouter } from 'vue-router'
import { AxiosError, AxiosResponse } from 'axios'

const loading = ref(false)
const formRef = ref<typeof ElForm | null>(null)
const formErrors = reactive<{ [key: string]: string[] }>({})
const router = useRouter()
const registerForm = reactive<RegisterRequest>({
    email: '',
    password: '',
    confirm_password: '',
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
    confirm_password: [
        {
            required: true,
            message: 'Please input your password again',
            trigger: 'blur',
        },
        {
            validator: (rule: any, value: any, callback: any) => {
                if (value !== registerForm.password) {
                    callback('Passwords do not match')
                } else {
                    callback()
                }
            },
            trigger: 'blur',
        },
    ],
})

const clearFieldError = (field: string) => {
    delete formErrors[field]
}

const handleRegister = async () => {
    loading.value = true
    const payload = {
        email: registerForm.email,
        password: registerForm.password,
    } as RegisterRequest
    try {
        const response = await AuthService.register(payload)
        if (response.status === 201) {
            ElNotification({
                title: 'Success',
                message: response.data.message,
                type: 'success',
            })
            await router.push(PATHS.LOGIN)
        }
    } catch (error: any) {
        if (error.response?.status === 400) {
            const errors = error.response.data
            Object.keys(formErrors).forEach((key) => delete formErrors[key])
            for (const key in errors) {
                if (Object.prototype.hasOwnProperty.call(errors, key)) {
                    formErrors[key] = errors[key]
                }
            }
            console.log(formErrors.email)
        } else {
            ElNotification({
                title: 'Error',
                message: 'Sign up failed. Please try again.',
                type: 'error',
            })
        }
    } finally {
        loading.value = false
    }
}

const submitForm = (formEl: typeof ElForm | null) => {
    if (!formEl) return
    formEl.validate(async (valid: any) => {
        if (!valid) return false
        await handleRegister()
    })
}
</script>

<style scoped>
.register-page {
    height: 100vh;
}

.register-page-image {
    width: 100%;
    height: 100%;
}

.register-page-card {
    min-width: 448px;
    max-width: 448px;
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

.register-form {
    width: 100%;
}

.register-button {
    width: 100%;
    font-size: 14px;
    font-weight: 600;
    background-color: #44a248ff;
}

.signin-text {
    margin-top: 24px;
    font-size: 14px;
}

.signin-link {
    font-weight: 600;
    color: #4caf50;
    margin-bottom: 5px;
}

.signin-link:hover {
    color: #45a049;
}

@media (max-width: 768px) {
    .d-none.d-md-block {
        display: none !important;
    }

    .register-page-card {
        min-width: 90%;
        max-width: 400px;
        box-shadow: none;
        border: 1px solid #e0e0e0;
    }
}
</style>
