<template>
  <el-container>
    <el-header> <Header /></el-header>
    <el-main>
      <slot></slot>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import Header from './Header.vue'
</script>
