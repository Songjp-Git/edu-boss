<template>
  <div class="creat-menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{isEdit ? '编辑菜单' : '添加菜单'}}  </span>
      </div>
      <div class="text item">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="菜单名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="菜单路径">
            <el-input v-model="form.href"></el-input>
          </el-form-item>
          <el-form-item label="上级菜单">
            <el-select v-model="form.parentId" placeholder="请选择上级菜单">
               <el-option
                label="无上级菜单"
                :value="-1"></el-option>
              <el-option
                v-for="menuItem in parentMenuList"
                :key="menuItem.id"
                :label="menuItem.name"
                :value="menuItem.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea" v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item label="前端图标">
            <el-input v-model="form.icon"></el-input>
          </el-form-item>
           <el-form-item label="是否显示">
            <el-radio-group v-model="form.shown">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="排序">
            <el-input-number v-model="form.orderNum" :min="1" :max="10" label="描述文字"></el-input-number>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { createOrUpdateMenu, getEditMenuInfo } from '@/services/menu'

export default Vue.extend({
  name: 'CreateOrEditMenu',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        name: '123',
        href: '123',
        icon: '123',
        parentId: -1,
        orderNum: 0,
        description: '123',
        shown: true
      },
      parentMenuList: []
    }
  },
  created () {
    this.loadMenuInfo()
  },
  methods: {
    async loadMenuInfo () {
      try {
        const { data } = await getEditMenuInfo(this.$route.params.id || -1)
        const parentMenuList = data.data.parentMenuList
        const menuInfo = data.data.menuInfo
        this.parentMenuList = parentMenuList
        if (menuInfo) {
          this.form = menuInfo
        }
      } catch (error) {
        this.$message.error(error)
      }
    },
    async onSubmit () {
      // 数据验证
      // 验证通过就发请求
      const { data } = await createOrUpdateMenu(this.form)
      console.log(data)
      if (data.code === '000000') {
        this.$message.success(data.mesg)
        this.$router.push({
          name: 'menu'
        })
      } else {
        this.$message.success(data.mesg)
      }
    }
  }

})
</script>

<style lang="scss" scoped>

</style>
