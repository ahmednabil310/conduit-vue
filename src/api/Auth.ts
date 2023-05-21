import axios, { globalAxiosInstance } from '@/plugins/axios'

type SignInPayload = {
  user: {
    email: string
    password: string
  }
}

type SignInResponse = {
  user: {
    email: string
    token: string
    username: string
    bio: string
    image: string
  }
}

export async function signIn(data: SignInPayload): Promise<SignInResponse> {
  return await globalAxiosInstance.post('/users/login', data)
}

type SignUpPayload = {
  user: {
    username: string
    email: string
    password: string
  }
}

export async function signUp(data: SignUpPayload) {
  return await globalAxiosInstance.post('/users', data)
}
