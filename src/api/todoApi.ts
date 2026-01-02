import api from './axios'
import type { Todo } from '../@types/todo'

export const todoApi = {
  getAll: () => api.get<Todo[]>('/todos'),
  getById: (id: number) => api.get<Todo>(`/todos/${id}`),
  create: (todo: Omit<Todo, 'id'>) => api.post<Todo>('/todos', todo),
  update: (id: number, todo: Partial<Todo>) =>
    api.put<Todo>(`/todos/${id}`, todo),
  delete: (id: number) => api.delete(`/todos/${id}`),
}
