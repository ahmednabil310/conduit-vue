<template>
  <el-form-item prop="name" :error="errorMessage">
    <el-input
      size="large"
      v-model="value"
      :type="type"
      :placeholder="placeholder"
      :show-password="showPassword"
    />
  </el-form-item>
  <!-- <el-form-item :error="errorMessage" :label="label">
    <el-input :placeholder="label" v-model="value" v-bind="$attrs" :validate-event="false" />
  </el-form-item> -->
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { toRef } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
    default: 'text',
  },
  showPassword: {
    type: String,
    required: false,
    default: false,
  },
})

const { value, errorMessage } = useField(toRef(props, 'name'))
</script>
