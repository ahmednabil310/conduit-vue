<template>
  <el-tabs v-model="activeName" class="feed-tabs" @tab-click="handleClick">
    <el-tab-pane label="My Articles" name="my-articles">
      <template v-if="isArticleDataLoading || isFetching">
        <el-skeleton :rows="5" animated />
      </template>
      <template v-else>
        <Article
          v-for="(article, index) in articles"
          :key="index"
          :articleData="article"
          :refech="refetch"
        />
      </template>
    </el-tab-pane>

    <el-tab-pane label="Favorited Articles" name="favorite-articles">
      <template v-if="isArticleDataLoading || isFetching">
        <el-skeleton :rows="5" animated />
      </template>
      <template v-else>
        <Article
          v-for="(article, index) in articles"
          :key="index"
          :articleData="article"
          :refetch="refetch"
        />
      </template>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
import { type Article as IArticle } from '@/api/Articles'
import Article from '@/components/Shared/Article.vue'
import type { TabsPaneContext } from 'element-plus/lib/components/tabs/src/constants.js'
import { onMounted } from 'vue'
import { getArticles } from '@/api/Articles'

import { useQuery } from '@tanstack/vue-query'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const activeName = ref('my-articles')

const {
  data: articleData,
  isLoading: isArticleDataLoading,
  refetch,
  isFetching,
} = useQuery({
  queryKey: ['user-articles'],
  queryFn: () =>
    getArticles({
      limit: 5,
      offset: 0,
      author: activeName.value === 'my-articles' ? (route.params.username as string) : undefined,
      favorited:
        activeName.value === 'favorite-articles' ? (route.params.username as string) : undefined,
    }),
  enabled: false,
})
const articles = ref<IArticle[]>([])

watchEffect(() => {
  if (articleData?.value?.articles) {
    articles.value = articleData.value.articles
  }
})

onMounted(() => {
  refetch()
})

const handleClick = (tab: TabsPaneContext) => {
  activeName.value = tab.paneName as string
  refetch()
}
</script>
<style scoped>
.feed-tabs {
  width: 75%;
}
</style>
