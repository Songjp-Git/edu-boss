<template>
  <div class="login-page">
    <el-form
    ref="form"
    :model="form"
    :rules="rules"
    label-width="80px">
      <h2>lt: 一个不知道是啥的后台</h2>
      <el-form-item label="手机号码"  prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="isLoginLoading">登录</el-button>
      </el-form-item>
</el-form>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { login } from '@/services/user'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'Login',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          { pattern: /^1\d{10}/, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请择活动区域', trigger: 'change' },
          { min: 6, max: 16, message: '长度在 6到 16 个字符', trigger: 'blur' }
        ]
      },
      isLoginLoading: false
    }
  },
  methods: {
    async onSubmit () {
      try {
        await (this.$refs.form as Form).validate()
        this.isLoginLoading = true
        const { data } = await login(this.form)
        // 登录状态 放入 vuex 全局
        this.$store.commit('setUser', data.content)
        if (data.state !== 1) {
          this.$message.error(data.message)
        } else {
          this.$message.success('登录成功')
          this.$router.push(this.$route.query.redirect as string || '/')
        }
      } catch (error) {
        console.log('登录失败', error)
      }
      this.isLoginLoading = false
    }
  }
})
</script>
<style lang="scss" scoped>
.login-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
