<template>
  <el-row bg-color="primary" justify="center" align="middle">
    <el-text class="banner-title">conduit</el-text>
    <el-text class="banner-desc">A place to share your knowledge.</el-text>
  </el-row>
</template>
<script setup lang="ts"></script>
<style scoped>
.el-row {
  background-color: var(--el-color-primary);
  margin-top: 20px;
  margin-bottom: 20px;
  color: var(--el-color-white);
  flex-direction: column;
  padding: 32px 0;
  box-shadow: var(--el-box-shadow);
}
.banner-title {
  font-weight: bold;
  font-size: 48px;
  color: var(--el-color-white);
}
.banner-desc {
  font-size: 18px;
  color: var(--el-color-white);
  margin-top: 4px;
}
</style>
