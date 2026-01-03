const STORAGE_KEY = 'claros-dashboard-state'

interface PersistedState {
  user: {
    searchQuery: string
    currentPage: number
    itemsPerPage: number
  }
  post: {
    searchQuery: string
  }
  todo: {
    filter: 'all' | 'completed' | 'pending'
  }
}

export function loadPersistedState(): PersistedState | null {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY)
    if (!serializedState) {
      return null
    }
    return JSON.parse(serializedState) as PersistedState
  } catch (err) {
    console.warn('Failed to load state from localStorage:', err)
    return null
  }
}

export function saveState(state: PersistedState): void {
  try {
    const stateToPersist: PersistedState = {
      user: {
        searchQuery: state.user.searchQuery,
        currentPage: state.user.currentPage,
        itemsPerPage: state.user.itemsPerPage,
      },
      post: {
        searchQuery: state.post.searchQuery,
      },
      todo: {
        filter: state.todo.filter,
      },
    }
    const serializedState = JSON.stringify(stateToPersist)
    localStorage.setItem(STORAGE_KEY, serializedState)
  } catch (err) {
    console.warn('Failed to save state to localStorage:', err)
  }
}

export function clearPersistedState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (err) {
    console.warn('Failed to clear persisted state:', err)
  }
}
