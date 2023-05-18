<template>
  <el-container>
    <el-header> <Header /></el-header>
  </el-container>
  <el-main style="padding: 0">
    <slot></slot>
  </el-main>
</template>

<script setup lang="ts">
import Header from './Header.vue'
</script>
