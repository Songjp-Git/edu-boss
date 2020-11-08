<template>
  <div>
    <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-form ref="filterForm" :inline="true" :model="filterForm" class="demo-form-inline">
        <el-form-item prop="name" label="资源名称">
          <el-input v-model="filterForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="url" label="资源路径">
          <el-input  v-model="filterForm.url"></el-input>
        </el-form-item>
        <el-form-item prop="categoryId" label="资源分类">
          <el-select clearable v-model="filterForm.categoryId" placeholder="活动区域">
            <el-option
              v-for="cate in categorys"
              :key="cate.id"
              :label="cate.name"
              :value="cate.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="isLoading" @click="onFilter">查询</el-button>
          <el-button type="primary"
          :disabled="isLoading"
          @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
      <hr />
      <el-button @click="addOrEditModalVisible = true">添加资源</el-button>
      <el-button @click="$router.push({ name: 'resource-category' })">资源分类</el-button>

      <add-or-edit-resource-modal
        :visible="addOrEditModalVisible"
        @close="closeModal"
        :id="currentRecordId"/>
    </div>
    <div  class="text item">
      <el-table
        :data="records"
        v-loading="isLoading"
        style="width: 100%, margin-bottom: 20px,">
        <el-table-column
          type="index"
          label="编号"
          min-width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源姓名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="url"
          label="资源路径"
          width="150">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          width="150">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="添加时间"
          width="150">
        </el-table-column>
        <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="filterForm.current"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="filterForm.size"
      :disabled="isLoading"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { getResourcePagesgin, deleteResourceById, getCategoryAll } from '@/services/resource'
import AddOrEditResourceModal from '@/views/resource/components/AddOrEditModal.vue'

export default Vue.extend({
  name: 'Resource',
  components: {
    AddOrEditResourceModal
  },
  data () {
    return {
      records: [],
      categorys: [],
      filterForm: {
        name: '',
        url: '',
        categoryId: undefined,
        current: 1,
        size: 10
      },
      total: 0,
      addOrEditModalVisible: false,
      currentRecordId: -1,
      isLoading: true
    }
  },
  created () {
    this.loadResource()
    this.loadCategory()
  },
  methods: {
    async loadCategory () {
      const { data } = await getCategoryAll()
      if (data.code === '000000') {
        this.categorys = data.data
      }
    },
    async loadResource () {
      this.isLoading = true
      const { data } = await getResourcePagesgin(this.filterForm)
      this.records = data.data.records
      this.total = data.data.total
      this.isLoading = false
      // console.log(data)
    },
    closeModal () {
      this.addOrEditModalVisible = false
      this.currentRecordId = -1
      this.loadResource()
    },
    handleEdit (item: any) {
      this.addOrEditModalVisible = true
      this.currentRecordId = item.id
    },
    async handleDelete (item: any) {
      try {
        await this.$confirm(`确认删除《${item.name}》吗?`, '删除', {})
        const { data } = await deleteResourceById(item.id)
        if (data.code === '000000') {
          this.$message('删除成功')
          this.loadResource()
        }
      } catch (error) {
        // 否则就没删
      }
    },
    onFilter () {
      this.loadResource()
    },
    onReset () {
      // this.filterForm = {
      //   name: '',
      //   url: '',
      //   categoryId: undefined,
      //   current: 1,
      //   size: 10
      // }
      // 方式2
      (this.$refs.filterForm as Form).resetFields()
      this.filterForm.current = 1
      this.loadResource()
    },
    handleSizeChange (val: number) {
      this.filterForm.size = val
      this.filterForm.current = 1
      this.loadResource()
    },
    handleCurrentChange (val: number) {
      this.filterForm.current = val
      this.loadResource()
    }
  }
})
</script>
