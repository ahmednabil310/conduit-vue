<template>
  <el-row class="cards-container">
    <el-card shadow="never" :body-style="{ padding: '0px' }">
      <el-input
        v-model="comment"
        :autosize="{ minRows: 4 }"
        type="textarea"
        placeholder="Write your comment!"
      />
      <div v-if="token">
        <el-row class="card-footer" justify="space-between" align="center">
          <el-avatar
            :size="30"
            :src="userImage ?? `https://api.realworld.io/images/smiley-cyrus.jpeg`"
          />
          <el-button :loading="isLoading" @click="handleAddComment" type="primary" class="button"
            >Post Comment</el-button
          >
        </el-row>
      </div>
    </el-card>
    <Comment
      v-for="comment in commentsData?.comments"
      :key="comment.id"
      :commentData="comment"
      :refetch="refetch"
    />
  </el-row>
</template>

<script setup lang="ts">
import { addComment, getArticleComments } from '@/api/Comments'
import { useUserDataStore } from '@/stores/userData'
import storage from '@/utils/storage'
import { useMutation, useQuery } from '@tanstack/vue-query'
import Comment from './Comment.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'

const route = useRoute()

const toast = useToast()

const userImage = useUserDataStore().user.image

const token = storage.getToken()

const {
  data: commentsData,

  refetch,
} = useQuery({
  queryKey: ['comments'],
  queryFn: () => getArticleComments({ slug: route.params.slug as string }),
})

const { isLoading, mutate } = useMutation(addComment, {
  onSuccess: () => {
    toast.success('Comment Added!')
    refetch()
  },
})

const comment = ref('')

const handleAddComment = () => {
  if (!token) {
    return toast.error('You need to login first')
  } else {
    mutate({
      slug: route.params.slug as string,
      comment: comment.value,
    })
  }
}
</script>
<style scoped>
.el-row {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}
.cards-container {
  margin-bottom: 100px;
  flex-direction: column;
  gap: 30px;
}
.el-card {
  width: 100%;
  padding: 0;
  border: none;
}

.card-footer {
  padding-left: 11px;
  border: 1px solid gainsboro;
  border-top: none;
  padding: 20px;
  background-color: whitesmoke;
}
</style>
