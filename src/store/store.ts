import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import postReducer from './slices/postSlice'
import commentReducer from './slices/commentSlice'
import todoReducer from './slices/todoSlice'
import { saveState } from './persistence'

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    comment: commentReducer,
    todo: todoReducer,
  },
})

// Subscribe to store changes and persist to localStorage
let saveTimeout: ReturnType<typeof setTimeout> | null = null
store.subscribe(() => {
  // Debounce saves to avoid excessive writes
  if (saveTimeout) {
    clearTimeout(saveTimeout)
  }
  saveTimeout = setTimeout(() => {
    saveState(store.getState())
  }, 1000)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
