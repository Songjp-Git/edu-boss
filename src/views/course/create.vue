<template>
  <div class="course-create">
    <create-or-update-course />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrUpdateCourse from '@/views/course/components/CreateOrUpdate.vue'

export default Vue.extend({
  name: 'CourseCreate',
  components: {
    CreateOrUpdateCourse
  },
  data () {
    return {}
  },
  methods: {}
})
</script>

<style lang="scss" scoped>
</style>
