import storage from '@/utils/storage'
import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import { type App } from 'vue'
import { useToast } from 'vue-toastification'

interface AxiosOptions {
  baseUrl?: string
  token?: string
}

let globalAxiosInstance: AxiosInstance

function authRequestInterceptor(
  config: InternalAxiosRequestConfig<any>
): InternalAxiosRequestConfig<any> {
  const token = storage.getToken()
  if (token) {
    config.headers.authorization = `Bearer ${token}`
  } else {
    config.headers.Accept = 'application/json'
  }
  return config
}

export default {
  install: (app: App, options: AxiosOptions) => {
    const toast = useToast()
    globalAxiosInstance = axios.create({
      baseURL: options.baseUrl,
      headers: {},
    })

    globalAxiosInstance.interceptors.request.use(authRequestInterceptor)

    globalAxiosInstance.interceptors.response.use(
      (response) => {
        return response.data
      },
      (error) => {
        const message =
          Object.keys(error?.response?.data?.errors || {})[0] +
          ' ' +
          Object.values(error?.response?.data?.errors || {})[0]

        toast.error(message)
        return Promise.reject(error)
      }
    )

    app.config.globalProperties.$axios = globalAxiosInstance
  },
}

export { globalAxiosInstance }
