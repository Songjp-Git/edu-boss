<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button
        type="primary"
         @click="addOrEditCategoryVisibe = true"
        >添加分类</el-button>
        <add-or-edit-category
          :visible="addOrEditCategoryVisibe"
          @close="closeModal"
          :data="currentCategoryData"
        />
      </div>
      <div class="text item">
         <el-table
            :data="categorys"
            style="width: 100%">
            <el-table-column
            type="index"
            label="编号"
            min-width="50">
          </el-table-column>
            <el-table-column
              prop="name"
              label="名称"
              min-width="150">
            </el-table-column>
            <el-table-column
              prop="createdTime"
              label="创建时间"
              min-width="150">
            </el-table-column>
            <el-table-column
              prop="sort"
              label="排序"
              min-width="150">
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
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getCategoryAll, deleteDategory } from '@/services/resource'
import AddOrEditCategory from '@/views/resource/components/AddOrEditCategory.vue'

export default Vue.extend({
  name: 'ResourceCategory',
  components: {
    AddOrEditCategory
  },
  data () {
    return {
      categorys: [],
      addOrEditCategoryVisibe: false,
      currentCategoryData: {}
    }
  },
  created () {
    this.loadCategory()
  },
  methods: {
    async loadCategory () {
      const { data } = await getCategoryAll()
      if (data.code === '000000') {
        this.categorys = data.data
      }
    },
    closeModal () {
      this.currentCategoryData = {}
      this.addOrEditCategoryVisibe = false
      this.loadCategory()
    },
    handleEdit (item: any) {
      this.currentCategoryData = item
      this.addOrEditCategoryVisibe = true
    },
    async handleDelete (item: any) {
      try {
        await this.$confirm(`确认删除《${item.name}》吗?`, '删除', {})
        const { data } = await deleteDategory(item.id)
        if (data.code === '000000') {
          this.$message('删除成功')
          this.loadCategory()
        }
      } catch (error) {
        // 否则就没删
      }
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
