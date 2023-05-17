<template>
  <el-form @submit="onSubmit"><slot></slot></el-form>
</template>

<script lang="ts" setup>
const props = defineProps({
  onSubmit: {
    type: Function,
    required: true
  }
})
</script>

<style scoped></style>
