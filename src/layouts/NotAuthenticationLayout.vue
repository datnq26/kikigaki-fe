<script setup lang="ts"></script>

<template>
    <el-container class="not-authentication-container">
        <el-main class="not-authentication-main">
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<style scoped>
.not-authentication-container {
    max-height: 100vh;
}

.not-authentication-main {
    padding: 0;
    overflow: hidden;
}
</style>
