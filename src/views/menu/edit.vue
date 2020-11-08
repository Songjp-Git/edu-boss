<template>
  <div class="creat-menu">
    <create-or-edit-menu :is-edit="true"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEditMenu from '@/views/menu/components/CreateOrEditMenu.vue'

export default Vue.extend({
  name: 'MenuEdit',
  components: {
    CreateOrEditMenu
  },
  data () {
    return {}
  }

})
</script>

<style lang="scss" scoped>

</style>
