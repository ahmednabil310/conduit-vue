<template>
  <el-row>
    <el-col :span="24">
      <el-card shadow="never">
        <el-text>{{ commentData.body }}</el-text>
        <div>
          <div class="card-footer">
            <el-row>
              <el-avatar
                :size="30"
                :src="
                  commentData.author.image ?? `https://api.realworld.io/images/smiley-cyrus.jpeg`
                "
              />
              <el-text class="comment-username" size="small">{{
                commentData.author.username
              }}</el-text>
            </el-row>
            <el-button
              @click="handleDeleteComment"
              :loading="isLoading"
              v-if="userData.user.username === commentData.author.username"
              type="danger"
              >Delete comment</el-button
            >
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { deleteComment, type ArticleComment } from '@/api/Comments'
import { useUserDataStore } from '@/stores/userData'
import { useMutation } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'

const props = defineProps({
  commentData: {
    type: Object as () => ArticleComment,
    required: true,
  },
  refetch: {
    type: Function,
    required: true,
  },
})

const userData = useUserDataStore()

const route = useRoute()

const toast = useToast()

const { mutate, isLoading } = useMutation(deleteComment, {
  onSuccess: () => {
    toast.success('Comment Deleted')
    props.refetch()
  },
})

const handleDeleteComment = () => {
  mutate({
    slug: route.params.slug as string,
    id: props.commentData.id,
  })
}
</script>
<style scoped>
.bottom {
  margin-top: 12px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comment-username {
  margin-left: 10px;
  font-weight: 500;
  text-transform: capitalize;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
.card-footer {
  border-top: none;

  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
