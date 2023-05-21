import { globalAxiosInstance } from '@/plugins/axios'

export type getProfileResponse = {
  profile: {
    username: string
    bio: string
    image: string
    following: boolean
  }
}

export async function getProfile({ username }: { username: string }): Promise<getProfileResponse> {
  return await globalAxiosInstance.get(`/profiles/${username}`)
}

export async function followUser({ username }: { username: string }) {
  return await globalAxiosInstance.post(`/profiles/${username}/follow`)
}

export async function unFollowUser({ username }: { username: string }) {
  return await globalAxiosInstance.delete(`/profiles/${username}/follow`)
}
