<template>
  <div>
    <div class="article-header">
      <el-avatar class="article-user-img" :src="articleData.author.image"></el-avatar>
      <div></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { type Article } from '@/api/auth/Articles'

const props = defineProps({
  articleData: {
    type: Object as () => Article,
    required: true,
  },
})
console.log(props.articleData.author.image)
</script>
<style scoped></style>
