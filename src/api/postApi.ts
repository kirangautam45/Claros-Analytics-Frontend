import api from './axios'
import type { Post } from '../@types/post'

export const postApi = {
  getAll: () => api.get<Post[]>('/posts'),
  getById: (id: number) => api.get<Post>(`/posts/${id}`),
  getByUserId: (userId: number) => api.get<Post[]>(`/posts?userId=${userId}`),
  create: (post: Omit<Post, 'id'>) => api.post<Post>('/posts', post),
  update: (id: number, post: Partial<Post>) =>
    api.put<Post>(`/posts/${id}`, post),
  delete: (id: number) => api.delete(`/posts/${id}`),
}
