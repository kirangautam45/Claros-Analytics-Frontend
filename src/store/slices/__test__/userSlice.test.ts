import { describe, it, expect } from 'vitest'
import userReducer, {
  setSearchQuery,
  setCurrentPage,
  setItemsPerPage,
  clearError,
} from '../userSlice'

describe('userSlice', () => {
  const initialState = {
    users: [],
    selectedUser: null,
    loading: false,
    error: null,
    searchQuery: '',
    currentPage: 1,
    itemsPerPage: 10,
  }

  it('should return the initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle setSearchQuery', () => {
    const state = userReducer(initialState, setSearchQuery('test'))
    expect(state.searchQuery).toBe('test')
    expect(state.currentPage).toBe(1)
  })

  it('should reset currentPage when search query changes', () => {
    const stateWithPage = { ...initialState, currentPage: 3 }
    const state = userReducer(stateWithPage, setSearchQuery('new search'))
    expect(state.currentPage).toBe(1)
  })

  it('should handle setCurrentPage', () => {
    const state = userReducer(initialState, setCurrentPage(3))
    expect(state.currentPage).toBe(3)
  })

  it('should handle setItemsPerPage', () => {
    const stateWithPage = { ...initialState, currentPage: 3 }
    const state = userReducer(stateWithPage, setItemsPerPage(10))
    expect(state.itemsPerPage).toBe(10)
    expect(state.currentPage).toBe(1)
  })

  it('should handle clearError', () => {
    const stateWithError = { ...initialState, error: 'Some error' }
    const state = userReducer(stateWithError, clearError())
    expect(state.error).toBeNull()
  })
})
