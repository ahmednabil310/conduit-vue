<template>
  <el-tabs v-model="activeName" class="feed-tabs" @tab-click="handleClick">
    <el-tab-pane label="Your Feed" name="yourfeed" v-if="userData.user.token">
      <template v-if="isfeedDataLoading">
        <el-skeleton :rows="5" animated />
      </template>
      <template v-else>
        <Article
          v-for="(article, index) in articles"
          :key="index"
          :articleData="article"
          :refech="refetchFeed"
        />
      </template>
    </el-tab-pane>

    <el-tab-pane label="Global Feed" name="global">
      <template v-if="isLoading">
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
<script lang="ts" setup>
import { ref, watchEffect, type Ref } from 'vue'

import { useQuery } from '@tanstack/vue-query'
import { getArticles, getArticlesFeed } from '@/api/Articles'
import Article from '@/components/Shared/Article.vue'
import { type Article as IArticle } from '@/api/Articles'
import { useUserDataStore } from '@/stores/userData'
import type { TabsPaneContext } from 'element-plus/lib/components/tabs/src/constants.js'
const userData = useUserDataStore()
const activeName = ref(userData.user.token ? 'yourfeed' : 'global')

const {
  data: feedData,
  isLoading: isfeedDataLoading,
  refetch: refetchFeed,
} = useQuery({
  queryKey: ['articles-feed'],
  queryFn: getArticlesFeed,
  enabled: userData.user.token && activeName.value === 'yourfeed' ? true : false,
})

const { data, isLoading, refetch } = useQuery({
  queryKey: ['articles'],
  queryFn: () => getArticles({}),
  enabled: activeName.value === 'global',
})

const articles = ref<IArticle[]>([])

watchEffect(() => {
  if (data?.value?.articles && activeName.value === 'global') {
    articles.value = data.value.articles
  } else if (feedData?.value?.articles && activeName.value === 'yourfeed') {
    articles.value = feedData?.value?.articles
  }
})

const handleClick = (tab: TabsPaneContext) => {
  // Manually trigger refetch based on the active tab

  if (tab.paneName === 'global' && activeName.value !== 'global') {
    refetch()
  } else if (tab.paneName === 'yourfeed' && activeName.value !== 'yourfeed') {
    refetchFeed()
  }
}
</script>
<style scoped>
.feed-tabs {
  width: 75%;
}
</style>
