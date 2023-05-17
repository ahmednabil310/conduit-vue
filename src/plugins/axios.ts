import storage from '@/utils/storage'
import axios, { type AxiosInstance } from 'axios'
import { type App } from 'vue'
import { useToast } from 'vue-toastification'
interface AxiosOptions {
  baseUrl?: string
  token?: string
}

let globalAxiosInstance: AxiosInstance

export default {
  install: (app: App, options: AxiosOptions) => {
    const token = storage.getToken()
    const toast = useToast()
    globalAxiosInstance = axios.create({
      baseURL: options.baseUrl,
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    })

    globalAxiosInstance.interceptors.response.use(
      (response) => {
        return response.data
      },
      (error) => {
        const message = Object.keys(error?.response?.data?.errors || {})[0] + ' '
        Object.values(error?.response?.data?.errors || {})[0]

        toast.error(message)
        return Promise.reject(error)
      }
    )

    app.config.globalProperties.$axios = globalAxiosInstance
  },
}

export { globalAxiosInstance }
