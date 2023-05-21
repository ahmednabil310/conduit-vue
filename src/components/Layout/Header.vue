<template>
  <el-menu
    router="true"
    :default-active="activeRoute"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
  >
    <el-menu-item router="/" index="/" class="logo">conduit</el-menu-item>
    <div class="flex-grow" />
    <!-- Render when user is logged in -->
    <template v-if="userData.user.token">
      <el-menu-item router="/" index="/">Home</el-menu-item>

      <el-menu-item @click="handleLogout">Logout</el-menu-item>
    </template>
    <!-- Render when user is logged out -->
    <template v-else>
      <el-menu-item router="/" index="/">Home</el-menu-item>
      <el-menu-item router="/signin" index="/signin">Sign in</el-menu-item>
      <el-menu-item router="/signup" index="/signup">Sign up</el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { useUserDataStore } from '@/stores/userData'
import storage from '@/utils/storage'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const currentRouteName = computed(() => route.path)
const userData = useUserDataStore()
const activeRoute = ref(currentRouteName)
const store = useUserDataStore()
const handleLogout = () => {
  storage.clearToken()
  store.$reset()
  router.push('/signin')
}
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

.el-menu {
  border-bottom: none;
}
.el-menu--horizontal .el-menu-item.logo {
  color: var(--el-menu-active-color);
  font-size: 20px;
  border: none;
  padding: 0;
}
</style>
