<template>
  <el-row bg-color="primary">
    <el-col v-if="isProfileDataLoading" :span="24">
      <el-skeleton animated justify="center" align="middle">
        <template #template>
          <el-skeleton-item variant="circle" />
          <el-skeleton-item variant="p" style="width: 20%" />
          <el-skeleton-item variant="button" />
        </template>
      </el-skeleton>
    </el-col>

    <el-col v-else :span="24" justify="center" align="middle">
      <el-avatar :size="70" :src="profileData?.profile.image" />
      <el-text class="banner-username">{{ profileData?.profile.username }}</el-text>
      <el-button
        class="follow-button"
        type="primary"
        round
        color="#0066CC"
        @click="handleFollowState"
        >{{ profileData?.profile.following ? '- Unfollow' : '+ Follow' }}
        {{ profileData?.profile.username }}</el-button
      >
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import { followUser, getProfile, unFollowUser } from '@/api/Profiles'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'

const route = useRoute()

const toast = useToast()

const {
  data: profileData,
  isLoading: isProfileDataLoading,
  refetch,
} = useQuery({
  queryKey: ['profiles'],
  queryFn: () => getProfile({ username: route.params.username as string }),
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

const handleFollowState = () => {
  if (profileData.value?.profile.following) {
    return unFollowUserMutation({
      username: profileData?.value?.profile.username as string,
    })
  } else {
    return followUserMutation({
      username: profileData?.value?.profile.username as string,
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
.el-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
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
</style>
