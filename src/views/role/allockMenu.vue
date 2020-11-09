<template>
 <div>角色资源菜单</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AllockMenu',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  }

})
</script>

<style lang="scss" scoped>

</style>
