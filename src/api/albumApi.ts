import api from './axios'
import type { Album, Photo } from '../@types/album'

export const albumApi = {
  getAll: () => api.get<Album[]>('/albums'),
  getById: (id: number) => api.get<Album>(`/albums/${id}`),
  getPhotos: () => api.get<Photo[]>('/photos'),
  getPhotosByAlbum: (albumId: number) => api.get<Photo[]>(`/albums/${albumId}/photos`),
}
