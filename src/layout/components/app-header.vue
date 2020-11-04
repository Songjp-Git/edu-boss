<template>
  <div class="app-header">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="30" :src="userInfo.portrait"></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>用户ID: {{userInfo.userName}}</el-dropdown-item>
        <el-dropdown-item divided @click.native="handleLogout" >退出登陆</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getUserInfo } from '@/services/user'
export default Vue.extend({
  name: 'AppHeader',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.loadUserInfo()
    this.loadUserInfo()
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo () {
      const { data } = await getUserInfo()
      this.userInfo = data.content
    },
    handleLogout () {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('setUser', null)
        this.$router.push({
          name: 'login'
        })
      }).catch(() => {
        // 异常
      })
    }
  }
})
</script>
<style lang="scss" scoped>
.app-header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-dropdown-selfdefine{
  display: flex;
  align-items: center;
}
</style>
