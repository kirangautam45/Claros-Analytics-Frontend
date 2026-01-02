import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { Album, Photo } from '../../@types/album'
import { albumApi } from '../../api/albumApi'

interface AlbumState {
  albums: Album[]
  photos: Photo[]
  loading: boolean
  error: string | null
  searchQuery: string
}

const initialState: AlbumState = {
  albums: [],
  photos: [],
  loading: false,
  error: null,
  searchQuery: '',
}

export const fetchAlbums = createAsyncThunk('album/fetchAlbums', async () => {
  const response = await albumApi.getAll()
  return response.data
})

export const fetchPhotos = createAsyncThunk('album/fetchPhotos', async () => {
  const response = await albumApi.getPhotos()
  return response.data
})

const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    clearAlbumError: (state) => {
      state.error = null
    },
    setAlbumSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.loading = false
        state.albums = action.payload
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch albums'
      })
      .addCase(fetchPhotos.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.loading = false
        state.photos = action.payload
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch photos'
      })
  },
})

export const { clearAlbumError, setAlbumSearchQuery } = albumSlice.actions
export default albumSlice.reducer
