<template>
  <el-dialog
    title="提示"
    :visible.sync="visible"
    width="30%"
    >
    <!-- :before-close="handleClose" -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="排序">
           <el-input-number v-model="form.sort" :min="1" :max="10" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button @click="$emit('close')">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
  </el-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { saveOrderUpdate } from '@/services/resource'

export default Vue.extend({
  name: 'AddOrEditCategory',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object
    }
  },
  data () {
    return {
      form: {
        name: '',
        sort: 0
      }
    }
  },
  watch: {
    visible: function (newVal: boolean) {
      // 清空数据
      if (newVal === false) {
        this.resetForm()
      }
      if (this.data && this.data.id) {
        this.form = this.data
      }
    }
  },
  methods: {
    resetForm () {
      this.form = {
        name: '',
        sort: 0
      }
    },
    async onSubmit () {
      // 数据验证后 提交表单并关闭弹出
      const { data } = await saveOrderUpdate(this.form)
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
