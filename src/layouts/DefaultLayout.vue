<script lang="ts" setup>
import HeaderDesktop from '@/components/commons/HeaderDesktop.vue'
import FooterDesktop from '@/components/commons/FooterDesktop.vue'
import HeaderMobile from '@/components/commons/HeaderMobile.vue'
import FooterMobile from '@/components/commons/FooterMobile.vue'
import {useAuthenticationStore} from '@/stores/useAuthenticationStore'
import NavigationDesktop from '@/layouts/NavigationDesktop.vue'

const authenticationStore = useAuthenticationStore()
authenticationStore.loadFromServer()
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width='auto'>
        <NavigationDesktop/>
      </el-aside>
      <el-container>
        <el-header id="header" class="hidden-sm-and-down header-position">
          <HeaderDesktop/>
        </el-header>
        <el-header
            id="header-mobile"
            class="hidden-md-and-up header-position"
        >
          <HeaderMobile/>
        </el-header>
        <el-main id="main">
          <router-view></router-view>
        </el-main>
        <el-footer class="footer hidden-sm-and-down">
          <FooterDesktop/>
        </el-footer>
        <el-footer class="footer hidden-md-and-up">
          <FooterMobile/>
        </el-footer>
      </el-container>
    </el-container>
    <el-backtop :bottom="100" :right="50" class="hidden-sm-and-down"/>
    <el-backtop :bottom="50" :right="20" class="hidden-md-and-up"/>
  </div>
</template>

<style scoped>
.el-header {
  --el-header-padding: 0;
}

.header-position {
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  z-index: 1000;
}

#main {
  padding: 0;
  overflow: hidden;
  height: calc(100vh - 60px);
}

.footer {
  padding: 0;
}
</style>
