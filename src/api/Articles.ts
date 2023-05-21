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

type ArticlesParams = {
  tag?: string
  author?: string
  favorited?: string
  limit?: number
  offset?: number
}

type CreateArticlePayload = {
  article: {
    title: string
    description: string
    body: string
  }
}

export async function getArticles(params: ArticlesParams): Promise<ArticlesResponse> {
  return await globalAxiosInstance.get('/articles', {
    params,
  })
}

export async function getArticlesFeed(): Promise<ArticlesResponse> {
  return await globalAxiosInstance.get('/articles/feed')
}

export async function favoriteAnArticle({ slug }: { slug: string }) {
  return await globalAxiosInstance.post(`/articles/${slug}/favorite`)
}

export async function unFavoriteAnArticle({ slug }: { slug: string }) {
  return await globalAxiosInstance.delete(`/articles/${slug}/favorite`)
}

export async function getArticle({ slug }: { slug: string }): Promise<{ article: Article }> {
  return await globalAxiosInstance.get(`/articles/${slug}`)
}
