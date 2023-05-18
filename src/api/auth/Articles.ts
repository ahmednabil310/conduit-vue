import { globalAxiosInstance } from '@/plugins/axios'

export type Article = {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: {
    username: string
    bio: string
    image: string
    following: boolean
  }
}

export type ArticlesResponse = {
  articles: Article[]
}

export async function getArticles(): Promise<ArticlesResponse> {
  return await globalAxiosInstance.get('/articles')
}
