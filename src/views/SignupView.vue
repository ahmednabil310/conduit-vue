<template>
  <h1 class="form-title">Sign up</h1>

  <Form @submit="onSubmit">
    <Input name="username" type="text" placeholder="Username" />
    <Input name="email" type="email" placeholder="Email Address" />

    <Input name="password" type="password" placeholder="Password" showPassword="true" />
    <el-link type="primary"
      ><router-link to="/signin">Havn an account? Login Now!</router-link></el-link
    >
    <el-form-item>
      <el-button
        class="form-button"
        :disabled="isLoading"
        type="primary"
        v-loading="isLoading"
        native-type="submit"
        size="large"
        >Sign up</el-button
      >
    </el-form-item>
  </Form>
</template>

<script lang="ts" setup>
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import Input from '@/components/Shared/Input.vue'
import Form from '@/components/Shared/Form.vue'
import { useMutation } from '@tanstack/vue-query'
import { signUp } from '../api/auth/Auth'

import router from '@/router'
import { useToast } from 'vue-toastification'

const toast = useToast()

const schema = yup.object({
  username: yup.string().required().label('Username'),
  email: yup.string().required().email().label('Email address'),
  password: yup.string().required().min(6).label('Password'),
})

const { isLoading, mutate } = useMutation(signUp, {
  onSuccess: () => {
    toast.success('Registered Successfully!')
    router.push('/signin')
  },
})

const { handleSubmit } = useForm({
  initialValues: {
    username: '',
    email: '',
    password: '',
  },
  validationSchema: schema,
})

const onSubmit = handleSubmit((values, actions) => {
  mutate({
    user: {
      ...values,
    },
  })
})
</script>

<style scoped>
.form-title {
  font-size: 32px;
  text-align: center;
  margin-bottom: 24px;
  color: var(--el-color-DarkGray);
}

.form-button {
  margin-left: auto;
  font-size: 18px;
}

.el-form {
  max-width: 500px;
  margin: 0 auto;
}
.el-form-item {
  margin-bottom: 24px;
}

.el-link {
  width: fit-content;
  margin-left: auto;
  display: block;
  margin-bottom: 15px;
}
.el-link__inner a {
  text-decoration: underline;
  color: var(--el-color-primary);
  font-weight: 500;
}
</style>
