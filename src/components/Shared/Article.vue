<template>
  <div class="article">
    <div class="article-header" align="middle">
      <el-row class="user-content">
        <el-avatar class="article-user-img" :src="articleData.author.image"></el-avatar>

        <div>
          <router-link
            :to="`/profile/${articleData.author.username}`"
            custom
            v-slot="{ navigate, href }"
          >
            <el-link :href="href" @click.native="navigate" class="article-username" type="primary">
              {{ articleData.author.username }}</el-link
            >
          </router-link>

          <el-text class="user-createdDate" tag="p" type="info">
            {{
              new Date(articleData.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
            }}
          </el-text>
        </div>
      </el-row>

      <el-button type="primary" class="favorite-button" @click="handleFavoriteArticle">
        <img
          v-if="articleData.favorited"
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

        {{ articleData.favoritesCount }}
      </el-button>
    </div>

    <div @click="router.push(`/article/${articleData.slug}`)" style="cursor: pointer">
      <h1 class="article-title">
        {{ articleData.title }}
      </h1>
      <el-text type="info" size="small">
        {{ articleData.description }}
      </el-text>
    </div>
    <el-row class="article-footer" align="middle" justify="space-between">
      <router-link :to="`/article/${articleData.slug}`" custom v-slot="{ navigate, href }">
        <el-link :href="href" @click.native="navigate" type="info">Read more...</el-link>
      </router-link>

      <div class="tags-container">
        <el-tag v-for="(tag, index) in articleData.tagList" :key="index">{{ tag }}</el-tag>
      </div>
    </el-row>
  </div>
  <el-divider />
</template>
<script setup lang="ts">
import { favoriteAnArticle, type Article, unFavoriteAnArticle } from '@/api/Articles'
import { useUserDataStore } from '@/stores/userData'
import { useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
const props = defineProps({
  articleData: {
    type: Object as () => Article,
    required: true,
  },
  refetch: {
    type: Function,
    required: true,
  },
})
const toast = useToast()
const router = useRouter()
const token = useUserDataStore().$state.user.token

const { mutate: favoriteArticleMutation } = useMutation(favoriteAnArticle, {
  onSuccess: (data) => {
    props.refetch()
    toast.success('Article Favorited!')
  },
})

const { mutate: unFavoriteArticleMutation } = useMutation(unFavoriteAnArticle, {
  onSuccess: (data) => {
    props.refetch()
    toast.success('Article UnFavorited!')
  },
})

const handleFavoriteArticle = () => {
  if (!token) {
    return toast.error('You need to login first')
  } else if (props.articleData.favorited) {
    return unFavoriteArticleMutation({
      slug: props.articleData.slug,
    })
  } else {
    return favoriteArticleMutation({
      slug: props.articleData.slug,
    })
  }
}
</script>
<style scoped>
.article-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.user-content {
  gap: 10px;
}
.article-username {
  margin-right: auto;
  text-align: start;
  display: block;
  width: fit-content;
}
.user-createdDate {
  font-size: 12px;
  margin-top: 2px;
}
.heart-icon {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(80deg) brightness(104%) contrast(101%);
  margin-right: 5px;
}
.favorite-button {
  width: 85px;
}
.article-title {
  font-weight: 600;
  font-size: 20px;
  margin-top: 15px;
  margin-bottom: 3px;
}
.article-footer {
  margin-top: 13px;
}
.tags-container {
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>
