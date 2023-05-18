<template>
  <el-tabs v-model="activeName" class="feed-tabs" @tab-click="handleClick">
    <el-tab-pane label="Global Feed" name="global">
      <Article v-for="(article, index) in articles" :key="index" :articleData="article" />
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { useQuery } from '@tanstack/vue-query'
import { getArticles } from '@/api/auth/Articles'
import Article from './Article.vue'

const activeName = ref('global')

const { data, isLoading, error } = useQuery(['articles'], getArticles)
const articles = data.value?.articles
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab)
}
</script>
<style scoped>
.feed-tabs {
  width: 75%;
}
</style>
