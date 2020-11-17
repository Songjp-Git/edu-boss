<template>
  <div class="course-section">
    <el-tree
    :data="sections"
    :props="defaultProps"
    default-expand-all
    draggable>
  </el-tree>
  </div>
</template>

<script lang="ts">
import { getCourseById } from '@/services/course'
import { getSectionAndLesson } from '@/services/course-section'
import Vue from 'vue'

export default Vue.extend({
  name: 'CourseSection',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    const defaultProps = {
      children: 'lessonDTOS',
      label (data: any) {
        return data.sectionName || data.theme
      }
    }

    return {
      sections: [],
      course: {},
      defaultProps
    }
  },
  created () {
    this.loadSections()
    this.loadCourse()
  },
  methods: {
    async loadCourse () {
      const { data } = await getCourseById(this.courseId)
      this.course = data.data
    },

    async loadSections () {
      const { data } = await getSectionAndLesson(this.courseId)
      this.sections = data.data
    }
  }

})
</script>

<style lang="scss" scoped>

</style>
