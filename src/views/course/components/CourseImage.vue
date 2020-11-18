<template>
<div class="course-image">
  <el-progress
  type="circle"
  :percentage="percentage"
  width="178px"
  v-if="isUploading"
  :status="percentage ? 'success' : undefined"
  />
  <el-upload
    v-else
    class="avatar-uploader"
    action="https://jsonplaceholder.typicode.com/posts/"
    :show-file-list="false"
    :http-request="handleUpload"
    :before-upload="beforeAvatarUpload">
    <img v-if="value" :src="value" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</div>
</template>

<script lang="ts">
import { uploadCourseImage } from '@/services/course'
import Vue from 'vue'

export default Vue.extend({
  name: 'CourseImage',
  props: {
    value: {
      type: String
    },
    limit: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      isUploading: false,
      percentage: 0
    }
  },
  methods: {
    beforeAvatarUpload (file: any) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < this.limit

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error(`上传头像图片大小不能超过 ${this.limit}MB!`)
      }
      return isJPG && isLt2M
    },
    async handleUpload (options: any) {
      this.isUploading = true
      const fd = new FormData()
      fd.append('file', options.file)
      const { data } = await uploadCourseImage(fd, (e) => {
        // loaded 已经上传的数据量
        // 上传总数据量
        this.percentage = Math.floor(e.loaded / e.total * 100)
      })
      this.percentage = 0
      this.isUploading = false
      this.$emit('input', data.data.name)
      console.log(data)
    }
  }
})
</script>

<style lang="scss" scoped>
// 深度作用选择器
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
