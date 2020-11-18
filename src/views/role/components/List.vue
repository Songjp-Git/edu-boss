<template>
  <div>
    <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-form ref="filterForm" :inline="true" :model="filterForm" class="demo-form-inline">
        <el-form-item prop="name" label="角色名称">
          <el-input v-model="filterForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="isLoading" @click="onFilter">查询(此功能暂无)</el-button>
          <el-button
          :disabled="isLoading"
          @click="onReset">重置(此功能暂无)</el-button>
        </el-form-item>
      </el-form>
      <hr />
      <el-button @click="addOrEditRoleVisible = true">添加角色</el-button>

    </div>
    <div  class="text item">
      <el-table
        :data="roles"
        v-loading="isLoading"
        style="width: 100%, margin-bottom: 20px,">
        <el-table-column
          type="index"
          label="编号"
          min-width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="角色姓名"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="添加时间"
          min-width="150">
        </el-table-column>
        <el-table-column label="操作"  min-width="150">
          <template slot-scope="scope">
              <el-row>
                <el-button
                size="mini"
                @click="$router.push({
                  name: 'allock-menu',
                  params: {
                    roleId: scope.row.id
                  }
                })">分配菜单</el-button>
              <el-button
                size="mini"
                 @click="$router.push({
                  name: 'alloc-resource',
                  params: {
                    roleId: scope.row.id
                  }
                })">分配资源</el-button>
              </el-row>
              <el-row>
                <el-button
                  size="mini"
                  @click="handleEdit(scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row)">删除</el-button>
              </el-row>
            </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>

  <el-dialog
    :title="currentRecordId ? '新增角色': '编辑角色'"
    :visible.sync="addOrEditRoleVisible"
    width="30%"
    >
      <add-or-edit-role
        @close="closeModal"
        :id="currentRecordId"
      />
  </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { getAllRoles, deleteRole } from '@/services/role'
import AddOrEditRole from '@/views/role/components/AddOrEditRole.vue'

export default Vue.extend({
  name: 'RoleList',
  components: {
    AddOrEditRole
  },
  data () {
    return {
      roles: [],
      filterForm: {
        name: ''
      },
      addOrEditRoleVisible: false,
      currentRecordId: -1,
      isLoading: true
    }
  },
  created () {
    this.loadRoles()
  },
  methods: {
    async loadRoles () {
      this.isLoading = true
      const { data } = await getAllRoles()
      this.roles = data.data
      this.isLoading = false
      // console.log(data)
    },
    closeModal () {
      this.addOrEditRoleVisible = false
      this.currentRecordId = -1
      this.loadRoles()
    },
    handleEdit (item: any) {
      // console.log(item.id)
      this.currentRecordId = item.id
      this.addOrEditRoleVisible = true
    },
    async handleDelete (item: any) {
      try {
        await this.$confirm(`确认删除《${item.name}》吗?`, '删除', {})
        const { data } = await deleteRole(item.id)
        if (data.code === '000000') {
          this.$message('删除成功')
          this.loadRoles()
        }
      } catch (error) {
        // 否则就没删
      }
    },
    onFilter () {
      this.loadRoles()
    },
    onReset () {
      (this.$refs.filterForm as Form).resetFields()
      this.loadRoles()
    }
  }
})
</script>
