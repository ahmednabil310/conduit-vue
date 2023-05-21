<template>
  <el-row bg-color="primary">
    <el-col v-if="isArticleDataLoading" :offset="6" :span="12">
      <el-skeleton animated justify="center" align="middle" :rows="5" />
    </el-col>
    <el-container class="article-container" v-else>
      <h1 class="article-title">{{ articleData?.article.title }}</h1>
      <el-row class="user-content">
        <el-avatar class="article-user-img" :src="articleData?.article.author.image"></el-avatar>

        <div>
          <router-link
            :to="`/profile/${articleData?.article.author.username}`"
            custom
            v-slot="{ navigate, href }"
          >
            <el-link :href="href" @click.native="navigate" class="article-username" type="primary">
              {{ articleData?.article.author.username }}</el-link
            >
          </router-link>
          <el-text class="user-createdDate" tag="p" type="info">
            {{
              new Date(articleData?.article.createdAt as string).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
            }}
          </el-text>
        </div>
        <el-button
          class="follow-button"
          type="primary"
          round
          color="#0066CC"
          @click="handleFollowState"
          >{{ articleData?.article.author.following ? '- Unfollow' : '+ Follow' }}
          {{ articleData?.article.author.username }}</el-button
        >

        <el-button
          type="primary"
          class="favorite-button"
          round
          @click="handleFavoriteArticle"
          color="#0066CC"
        >
          <img
            v-if="articleData?.article.favorited"
            src="@/assets/icons/heart-filled.svg"
            class="heart-icon"
            height="21.12"
            width="21.12"
          />
          <img
            v-else
            src="@/assets/icons/heart-unfilled.svg"
            class="heart-icon"
            height="21.12"
            width="21.12"
          />

          {{ articleData?.article.favoritesCount }}
        </el-button>
      </el-row>
    </el-container>
  </el-row>

  <el-container style="flex-direction: column; margin-top: 40px">
    <div class="article-body" style="font-size: 20px" v-html="articleData?.article.body"></div>

    <div class="tags-container">
      <el-tag v-for="(tag, index) in articleData?.article.tagList" :key="index">{{ tag }}</el-tag>
    </div>
    <el-divider />
  </el-container>
</template>
<script setup lang="ts">
import { favoriteAnArticle, getArticle, unFavoriteAnArticle } from '@/api/Articles'
import { followUser, unFollowUser } from '@/api/Profiles'
import { useUserDataStore } from '@/stores/userData'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'

const route = useRoute()

const toast = useToast()

const token = useUserDataStore().$state.user.token

const {
  data: articleData,
  isLoading: isArticleDataLoading,
  refetch,
} = useQuery({
  queryKey: ['article'],
  queryFn: () => getArticle({ slug: route.params.slug as string }),
})

const { mutate: followUserMutation } = useMutation(followUser, {
  onSuccess: () => {
    refetch()
    toast.success('User Followed Successfully!')
  },
})

const { mutate: unFollowUserMutation } = useMutation(unFollowUser, {
  onSuccess: () => {
    refetch()
    toast.success('User UnFollowed Successfully!')
  },
})

const { mutate: favoriteArticleMutation } = useMutation(favoriteAnArticle, {
  onSuccess: () => {
    refetch()
    toast.success('Article Favorited!')
  },
})

const { mutate: unFavoriteArticleMutation } = useMutation(unFavoriteAnArticle, {
  onSuccess: () => {
    refetch()
    toast.success('Article UnFavorited!')
  },
})

const handleFavoriteArticle = () => {
  if (!token) {
    return toast.error('You need to login first')
  } else if (articleData.value?.article.favorited) {
    return unFavoriteArticleMutation({
      slug: route.params.slug as string,
    })
  } else {
    return favoriteArticleMutation({
      slug: route.params.slug as string,
    })
  }
}

const handleFollowState = () => {
  if (!token) {
    return toast.error('You need to login first')
  } else if (articleData.value?.article.author.following) {
    return unFollowUserMutation({
      username: articleData?.value?.article.author.username as string,
    })
  } else {
    return followUserMutation({
      username: articleData?.value?.article.author.username as string,
    })
  }
}
</script>
<style scoped>
.el-row {
  background-color: var(--el-color-primary);
  margin-top: 0px;
  margin-bottom: 20px;
  color: var(--el-color-white);
  flex-direction: column;
  padding: 32px 0;
  box-shadow: var(--el-box-shadow);
}
.skeleton-userinfo {
  gap: 10px;
  flex-direction: row;
  flex-wrap: nowrap;
}

.el-skeleton {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.el-skeleton__circle {
  width: 70px;
  height: 70px;
}
.favorite-button {
  width: 85px;
  margin-left: 0;
}
.el-skeleton__button {
  height: 32px;
  width: 186.5px;
}
.banner-username {
  font-weight: bold;
  font-size: 24px;
  color: var(--el-color-white);
  font-style: italic;
}
.article-container {
  flex-direction: column;
  justify-content: start;
  padding: 32px 0;
}
.article-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--el-color-white);
}
.user-content {
  gap: 10px;
  flex-direction: row;
  box-shadow: none;
  align-items: center;
  padding: 0;
  margin: 0;
}
.article-title {
  font-weight: 600;
  font-size: 32px;
  margin-bottom: 15px;
}
.article-username {
  margin-right: auto;
  text-align: start;
  display: block;
  width: fit-content;
  color: var(--el-color-white);
}
.user-createdDate {
  font-size: 12px;
  margin-top: 2px;
  color: var(--el-color-white);
}

.heart-icon {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(80deg) brightness(104%) contrast(101%);
  margin-right: 5px;
}

.tags-container {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 20px;
}
</style>
