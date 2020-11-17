<template>
  <div class="text-editor">
    <div ref="editor" class="text-editor"></div>
  </div>
</template>

<script lang="ts">
import { uploadCourseImage } from '@/services/course'
import Vue from 'vue'
import E from 'wangeditor'
// http://www.wangeditor.com/doc

let editor: any = null
export default Vue.extend({
  name: 'TextEditor',
  props: {
    value: {
      type: String
    }
  },
  mounted () {
    this.initEditor()
  },
  watch: {
    value: function () {
      // this.initEditor()
      editor.txt.html(this.value) // 重新设置编辑器内容
    }
  },
  methods: {
    initEditor () {
      // this.$refs.editor as any
      editor = new E(this.$refs.editor as any)
      // 配置 onchange 回调函数 , 必须在editor.create 之前
      editor.config.onchange = (newHtml: string) => {
        this.$emit('input', newHtml)
      }
      // 配置触发 onchange 的时间频率，默认为 200ms
      editor.config.onchangeTimeout = 220 // 修改为 500ms
      editor.create()
      // 必须在创建 editor.create 之后
      editor.txt.html(this.value) // 重新设置编辑器内容

      editor.config.customUploadImg = async (resultFiles: any, insertImgFn: any) => {
        // resultFiles 是 input 中选中的文件列表
        // insertImgFn 是获取图片 url 后，插入到编辑器的方法
        try {
          const fd = new FormData()
          fd.append('file', resultFiles[0])
          const { data } = await uploadCourseImage(fd)
          // 上传图片，返回结果，将图片插入到编辑器中
          insertImgFn(data.data.name)
        } catch (error) {
          this.$message.error('图片上传失败')
          console.log(error)
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
