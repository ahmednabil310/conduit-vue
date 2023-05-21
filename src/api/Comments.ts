import { globalAxiosInstance } from '@/plugins/axios'

export type ArticleComment = {
  id: number
  createdAt: string
  updatedAt: string
  body: string
  author: {
    username: string
    bio: string
    image: string
    following: boolean
  }
}

export type ArticleCommentsResponse = {
  comments: ArticleComment[]
}

export async function getArticleComments({
  slug,
}: {
  slug: string
}): Promise<ArticleCommentsResponse> {
  return await globalAxiosInstance.get(`/articles/${slug}/comments`)
}

export async function addComment({ slug, comment }: { slug: string; comment: string }) {
  return await globalAxiosInstance.post(`/articles/${slug}/comments`, {
    comment: {
      body: comment,
    },
  })
}

export async function deleteComment({ slug, id }: { slug: string; id: number }) {
  return await globalAxiosInstance.delete(`/articles/${slug}/comments/${id}`)
}
