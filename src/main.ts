import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import axios from './plugins/axios'
import { VueQueryPlugin } from '@tanstack/vue-query'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(axios, {
  baseUrl: import.meta.env.VITE_API_URL,
})

app.use(VueQueryPlugin)
const options = {
  position: POSITION.TOP_RIGHT,
}
app.use(Toast, options)
app.mount('#app')
