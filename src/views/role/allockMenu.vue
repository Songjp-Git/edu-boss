<template>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>资源分配</span>
  </div>
  <div class="text item">
    <el-tree
    ref="menu-tree"
    node-key="id"
    :data="menus"
    :props="defaultProps"
    :default-checked-keys="checkedKeys"
    default-expand-all
    show-checkbox
    ></el-tree>
    <el-button @click="onSubmit">保存</el-button>
    <el-button >取消</el-button>
  </div>
</el-card>

</template>

<script lang="ts">
import Vue from 'vue'
import { getMenuNodeList, allocateRoleMenus, getRoleMenus } from '@/services/menu'
import { Tree } from 'element-ui'

export default Vue.extend({
  name: 'AllockMenu',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      menus: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      checkedKeys: []
    }
  },
  async created () {
    await this.loadMenus()
    this.loadRoleMenus()
  },
  methods: {
    async loadRoleMenus () {
      const { data } = await getRoleMenus(this.roleId)
      this.getCheckedKeys(data.data)
    },
    getCheckedKeys (menus: any) {
      menus.forEach((menu: any) => {
        if (menu.selected) {
          // this.checkedKeys.push(menu.id as never)
          this.checkedKeys = [...this.checkedKeys, menu.id] as any
        }
        if (menu.subMenuList) {
          this.getCheckedKeys(menu.subMenuList)
        }
      })
    },
    async loadMenus () {
      try {
        const { data } = await getMenuNodeList()
        this.menus = data.data
      } catch (error) {
        console.log(error)
      }
    },
    async onSubmit () {
      try {
        const menuIdList = (this.$refs['menu-tree'] as Tree).getCheckedKeys()
        await allocateRoleMenus({
          roleId: parseInt((this.roleId as string)),
          menuIdList
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

})
</script>

<style lang="scss" scoped>

</style>
