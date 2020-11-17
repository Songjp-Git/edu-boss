<template>
  <div class="course-edit">
    <create-or-update-course
    is-edit
    :course-id="courseId"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrUpdateCourse from '@/views/course/components/CreateOrUpdate.vue'

export default Vue.extend({
  name: 'CourseEdit',
  components: {
    CreateOrUpdateCourse
  },
  props: {
    courseId: {
      type: [String, Number]
    }
  },
  data () {
    return {}
  },
  methods: {}
})
</script>

<style lang="scss" scoped>
</style>
