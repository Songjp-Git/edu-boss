<template>
  <el-dialog
    :title="id === -1 ? '添加资源': '编辑资源'"
    :visible.sync="visible"
    :destroy-on-close="true"
    width="30%"
    :before-close="handleClose">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="资源名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="资源路径">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="资源分类">
        <el-select v-model="form.categoryId" placeholder="请选择资源分类">
          <el-option
          v-for="cate in categorys"
          :key="cate.id"
          :label="cate.name"
          :value="cate.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.desc"></el-input>
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
import { getCategoryAll, saveOrUpdate, getResourceById } from '@/services/resource'

export default Vue.extend({
  name: 'AddOrEditResourceModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      form: {
        name: '',
        categoryId: undefined,
        url: '',
        description: ''
      },
      categorys: []
    }
  },
  created () {
    this.loadCategory()
    if (this.id !== -1) {
      this.loadResource(this.id)
    }
  },
  watch: {
    visible: function (newVal: boolean) {
      if (this.id !== -1) {
        this.loadResource(this.id)
      }
      // 清空数据
      if (newVal === false) {
        this.resetForm()
      }
    }
  },
  methods: {
    async loadCategory () {
      const { data } = await getCategoryAll()
      if (data.code === '000000') {
        this.categorys = data.data
      }
    },
    async loadResource (id: number) {
      const { data } = await getResourceById(id)
      if (data.code === '000000') {
        this.form = data.data
      } else {
        this.$message.error(data.mesg)
      }
    },
    handleClose () {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$emit('close')
        })
        .catch(_ => {
          // haha
        })
    },
    resetForm () {
      this.form = {
        name: '',
        categoryId: undefined,
        url: '',
        description: ''
      }
    },
    async onSubmit () {
      // 数据验证后 提交表单并关闭弹出
      const { data } = await saveOrUpdate(this.form)
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
