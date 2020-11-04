<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <app-aside />
      </el-aside>
      <el-container>
        <el-header>
          <app-header />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import AppAside from '@/layout/components/app-aside.vue'
import AppHeader from '@/layout/components/app-header.vue'

export default Vue.extend({
  name: 'Layout',
  components: {
    'app-aside': AppAside,
    'app-header': AppHeader
  }
})
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
  min-width: 980px;
}
.el-header, .el-footer {
  background-color: #fff;
}
.el-aside {
  height: 100%;
  background-color: #D3DCE6;
}
.el-main {
  background-color: #E9EEF3;
}
</style>
