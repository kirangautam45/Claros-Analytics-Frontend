import api from './axios'
import type { Comment } from '../@types/comment'

export const commentApi = {
  getAll: () => api.get<Comment[]>('/comments'),
  getById: (id: number) => api.get<Comment>(`/comments/${id}`),
  getByPostId: (postId: number) => api.get<Comment[]>(`/comments?postId=${postId}`),
}
