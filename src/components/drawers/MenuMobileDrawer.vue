<template>
  <el-drawer modal-class="padding: 0" direction="ltr" v-model="visible" size="100%" :show-close="false">
    <template #header="{ close }">
      <div class='header-content'>
        <el-menu class='menu' mode='horizontal' text-color="#333" :ellipsis='false'
                 background-color='#fff' menu-trigger='click'
                 :default-active='$route.path' router>
          <el-menu-item class='desktop-logo-container no-hover' @click='router.push("/")'>

          </el-menu-item>
          <div class='flex-grow'></div>

          <div style="display: flex; align-items: center; margin-right: 8px" class='no-hover'>
            <el-button type="danger" @click="close">
              <FAIcon icon="fa-solid fa-xmark" size="large" color=""/>
            </el-button>
          </div>
        </el-menu>
      </div>
    </template>
    <div v-if="!authenticationStore.authenticated" class="group-btn-auth"
         style="background:linear-gradient(180deg, #fee1e1 0%, #fff 42.1%)">
      <el-row justify="space-between">
        <el-col :span="15">
          <p class="">Vui lòng bấm nút liên hệ <br> để có thể liên hệ trực tiếp với chúng tôi</p>
          <div>
            <el-button type='danger' round @click="() => {router.push(PATHS.HOME); visible = false}">Liên
              hệ
            </el-button>
            <el-button type='success' round @click="router.push(PATHS.LOGIN)">Sign In</el-button>
          </div>
        </el-col>
        <el-col :xs='9' :sm='5' :md='5' :lg='5' :span="8">
          <img src="https://fptshop.com.vn/img/login_mobile.png?w=360&q=60" alt="img-mobile"/>
        </el-col>
      </el-row>
    </div>
    <div style="display: flex; align-items: center" v-else>
      <div class='name-user' @click="() => {router.push(PATHS.PROFILE); visible = false}">
        <el-avatar src=''
                   class='avatar-image'/>
        <span class='avatar'>{{ userInfo?.name }}</span>
        <FAIcon icon="fa-solid fa-angle-right" size="large" color="" style="margin: 3px 0 0 8px"/>
      </div>
      <div class="flex-grow"></div>
      <div style="padding: 16px">
        <el-button type="danger" @click="handleLogout" size="large" plain round>Logout</el-button>
      </div>
    </div>
    <el-divider/>
    <div>
      <el-menu :ellipsis='false' class='menu-bar' menu-trigger='click' mode='vertical'
               router>
        <el-menu-item v-if="authenticationStore?.role.toString() === 'admin'"
                      v-for="item in adminRoute"
                      :index='item.path' :route='item.path' @click='visible = false'>
          <FAIcon size='large' :icon='item.icon' class='custom-icon' color=""/>
          {{ item.label }}
        </el-menu-item>
        <el-divider v-if="authenticationStore?.role.toString() === 'admin'"/>
        <el-menu-item v-for="item in commonRoute"
                      :index='item.path' :route='item.path' @click='visible = false'>
          <FAIcon size='large' :icon='item.icon' class='custom-icon' color=""/>
          {{ item.label }}
        </el-menu-item>
        <el-menu-item @click='visible = false'>
          <FAIcon size='large' icon='fa-solid fa-xmark' class='custom-icon' color=""/>
          Close
        </el-menu-item>
      </el-menu>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue'
import FAIcon from '@/components/commons/FAIcon.vue'
import {PATHS} from '@/router/paths'
import {useAuthenticationStore} from '@/stores/useAuthenticationStore'
import {useRouter} from 'vue-router'
import {storeToRefs} from 'pinia'


const authenticationStore = useAuthenticationStore()
const {authenticated} = storeToRefs(authenticationStore)
const visible = ref<boolean>(false)
const userInfo = ref<any>()
const router = useRouter()

const adminRoute = [

]

const commonRoute = [
  {
    path: PATHS.HOME,
    icon: 'fa-solid fa-house',
    label: 'Trang chủ',
  },
]

const handleLogout = async () => {
  await authenticationStore.logout()
  await router.push(PATHS.LOGIN)
  visible.value = false
}

function openDrawer() {
  visible.value = true
  userInfo.value = authenticationStore.userInfo
}

watch(
    authenticated,
    async (newAuth) => {
      if (newAuth) {
        // await authenticationStore.loadUserFromServer()
      }
    },
    {
      immediate: true,
    },
)

defineExpose({
  openDrawer,
})
</script>

<style scoped>
.group-btn-auth {
  padding: 16px 0 16px 16px;
}

.header-content {
  box-shadow: 0 3px 5px -2px #b8b8b8;
  width: 100%;
}

.desktop-logo {
  height: 40px;
  width: auto;
}

.flex-grow {
  flex-grow: 1;
}

.el-drawer__header {
  margin-bottom: 0;
}

.el-drawer {
  --el-drawer-padding-primary: 0 !important;
}

.el-menu {
  border: none;
}

.name-user {
  display: flex;
  align-items: center;
  padding: 10px 20px;
}

.avatar {
  margin-left: 8px;
}

.custom-icon {
  margin-right: 10px;
}

.avatar-image {
  height: 75px;
  width: 75px;
}

.avatar {
  font-size: 18px;
  font-weight: 600;
}
</style>

<style>
.el-drawer {
  --el-drawer-padding-primary: 0 !important;
}

.el-drawer__header {
  margin-bottom: 0 !important;
}
</style>