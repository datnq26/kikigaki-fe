<script setup lang='ts'></script>

<template>
  <div class='common-layout'>
    <el-container>
      <el-container>
        <el-main id='main'>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  padding-top: 20px;
}

#main {
  padding-top: 0;
  overflow: hidden;
}

@media only screen and (max-width: 767px) {
  #main {
    padding: 0;
  }
}
</style>