<script lang="ts" setup>
import { onMounted } from 'vue'
import HeaderDesktop from '@/components/commons/HeaderDesktop.vue'
import HeaderMobile from '@/components/commons/HeaderMobile.vue'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'

const authenticationStore = useAuthenticationStore()

onMounted(async () => {
    if (!authenticationStore.userInfo) {
        await authenticationStore.loadFromServer()
    }
})
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-header id="header" class="hidden-sm-and-down header-position">
                <HeaderDesktop />
            </el-header>
            <el-header
                id="header-mobile"
                class="hidden-md-and-up header-position"
            >
                <HeaderMobile />
            </el-header>
            <el-main id="main">
                <router-view></router-view>
            </el-main>
        </el-container>
        <el-backtop :bottom="100" :right="50" class="hidden-sm-and-down" />
        <el-backtop :bottom="50" :right="20" class="hidden-md-and-up" />
    </div>
</template>

<style scoped>
.el-header {
    --el-header-padding: 0;
}

.header-position {
    width: 100%;
}

#main {
    padding: 0;
    overflow-y: auto;
    height: calc(100vh - 60px);
}
</style>
