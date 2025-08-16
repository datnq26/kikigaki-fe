<script setup lang="ts">
import FAIcon from '@/components/commons/FAIcon.vue'
import { ref } from 'vue'
import MenuMobileDrawer from '@/components/drawers/MenuMobileDrawer.vue'

const menuDrawers = ref<InstanceType<typeof MenuMobileDrawer>>()

const handleOpenDrawer = () => {
    menuDrawers.value?.openDrawer()
}
</script>

<template>
    <div class="header-content">
        <el-menu
            class="menu"
            mode="horizontal"
            text-color="#333"
            :ellipsis="false"
            active-text-color="#67c23a"
            background-color="#fff"
            menu-trigger="click"
            :default-active="$route.path"
            router
        >
            <div
                style="display: flex; align-items: center; margin-left: 8px"
                class="no-hover"
            >
                <el-button
                    type="primary"
                    size="large"
                    @click="handleOpenDrawer()"
                >
                    <FAIcon icon="fa-solid fa-bars" color="" size="large" />
                </el-button>
            </div>
            <div class="flex-grow"></div>
        </el-menu>
    </div>

    <MenuMobileDrawer ref="menuDrawers" />
</template>

<style scoped>
.header-content {
    box-shadow: 0 3px 5px -2px #b8b8b8;
    width: 100%;
}

.flex-grow {
    flex-grow: 1;
}
</style>
