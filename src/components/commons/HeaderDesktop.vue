<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
import { PATHS } from '@/router/paths'
import { BASE_IMAGE_URL } from '@/constants/image'

const route = useRoute()
const router = useRouter()
const authenticationStore = useAuthenticationStore()
const keyword = ref('')

const navLinks = [
    { label: 'Home', path: PATHS.HOME },
    { label: 'Profile', path: PATHS.PROFILE },
    { label: 'Courses', path: PATHS.COURSES },
    { label: 'Top Users', path: PATHS.TOP_USERS },
]

const onSearch = () => {
    const q = keyword.value.trim()
    if (!q) return
    router.push({ path: PATHS.SEARCH, query: { q } })
}

const handleLogout = async () => {
    await authenticationStore.logout()
    await router.push(PATHS.LOGIN)
}

console.log(BASE_IMAGE_URL + authenticationStore?.userInfo?.avatar)
</script>

<template>
    <div class="header-wrap">
        <el-menu
            class="menu"
            mode="horizontal"
            router
            :ellipsis="false"
            :default-active="route.path"
            background-color="#fff"
            text-color="#111827"
            active-text-color="#22c55e"
        >
            <el-menu-item class="no-hover brand">
                <img src="/logo.png" class="brand-logo" alt="logo" />
                <span class="brand-name">KiKiGaki</span>
            </el-menu-item>
            <el-menu-item
                v-for="l in navLinks"
                :key="l.path"
                :index="l.path"
                class="nav-item"
            >
                {{ l.label }}
            </el-menu-item>
            <div class="flex-grow" />
            <el-menu-item class="no-hover">
                <el-input
                    v-model="keyword"
                    class="responsive-input"
                    placeholder="Search lessons..."
                    :prefix-icon="Search"
                    clearable
                    size="large"
                    @keyup.enter="onSearch"
                />
            </el-menu-item>
            <template v-if="authenticationStore.authenticated">
                <el-menu-item class="no-hover">
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                            <el-avatar
                                class="user-avatar"
                                :src="
                                    BASE_IMAGE_URL +
                                    authenticationStore?.userInfo?.avatar
                                "
                            />
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>
                                    <el-link :href="PATHS.ACCOUNT_SETTINGS"
                                        >Account settings</el-link
                                    >
                                </el-dropdown-item>
                                <el-dropdown-item @click="handleLogout">
                                    Log out
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-menu-item>
            </template>
            <template v-else>
                <el-menu-item class="no-hover">
                    <el-button plain @click="router.push(PATHS.REGISTER)"
                        >Sign Up</el-button
                    >
                </el-menu-item>
                <el-menu-item class="no-hover">
                    <el-button type="primary" @click="router.push(PATHS.LOGIN)"
                        >Sign In</el-button
                    >
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<style scoped>
.header-wrap {
    position: sticky;
    top: 0;
    z-index: 200;
    background: #fff;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
}

.flex-grow {
    flex: 1;
}

.menu.el-menu--horizontal {
    border-bottom: 0;
    padding: 0 16px;
    align-items: center;
}

:deep(.el-menu--horizontal > .el-menu-item) {
    height: 64px;
    line-height: 64px;
    padding: 0 14px;
    font-weight: 500;
}

.menu .no-hover:hover {
    background-color: transparent !important;
}

.brand {
    display: flex;
    align-items: center;
    gap: 10px;
}

.brand-logo {
    width: 36px;
    height: 36px;
}

.brand-name {
    font-size: 18px;
    font-weight: 700;
    color: #111827;
}

.user-avatar {
    cursor: pointer;
}
</style>
