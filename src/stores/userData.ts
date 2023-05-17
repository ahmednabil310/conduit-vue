import { defineStore } from 'pinia'

type User = {
  email: string | null
  token: string | null
  username: string | null
  bio: string | null
  image: string | null
}
type UserDataState = {
  user: User
}

export const useUserDataStore = defineStore('userData', {
  state: (): UserDataState => ({
    user: {
      email: null,
      token: null,
      username: null,
      bio: null,
      image: null,
    },
  }),
  getters: {},
  actions: {
    updateUserData(userData: User) {
      Object.assign(this.user, userData)
    },
  },
  persist: true,
})
