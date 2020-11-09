<template>
  <el-form el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="角色名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="角色编码">
      <el-input v-model="form.code"></el-input>
    </el-form-item>
    <el-form-item label="角色描述">
      <el-input type="textarea" v-model="form.description"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="$emit('close')">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { getRoleById, createOrUpdate } from '@/services/role'

export default Vue.extend({
  name: 'AddOrEditRole',
  props: {
    id: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      form: {
        name: '',
        code: '',
        description: ''
      },
      categorys: []
    }
  },
  created () {
    this.resetForm()
    if (this.id !== -1) {
      this.loadResource(this.id)
    }
  },
  watch: {
    id: function (newVal: number) {
      this.resetForm()
      if (this.id !== -1) {
        this.loadResource(this.id)
      }
    }
  },
  methods: {
    async loadResource (id: number) {
      const { data } = await getRoleById(id)
      if (data.code === '000000') {
        this.form = data.data
      } else {
        this.$message.error(data.mesg)
      }
    },
    resetForm () {
      this.form = {
        name: '',
        code: '',
        description: ''
      }
    },
    async onSubmit () {
      // 数据验证后 提交表单并关闭弹出
      const { data } = await createOrUpdate(this.form)
      if (data.code === '000000') {
        this.$message.success(data.mesg)
        this.$emit('close')
      } else {
        this.$message.error(data.mesg)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
