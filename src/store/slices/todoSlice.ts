import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { Todo } from '../../@types/todo'
import { todoApi } from '../../api/todoApi'

type FilterType = 'all' | 'completed' | 'pending'

interface TodoState {
  todos: Todo[]
  loading: boolean
  operationLoading: boolean
  error: string | null
  searchQuery: string
  filter: FilterType
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  operationLoading: false,
  error: null,
  searchQuery: '',
  filter: 'all',
}

export const fetchTodos = createAsyncThunk('todo/fetchTodos', async () => {
  const response = await todoApi.getAll()
  return response.data
})

export const createTodo = createAsyncThunk(
  'todo/createTodo',
  async (todo: Omit<Todo, 'id'>) => {
    const response = await todoApi.create(todo)
    return response.data
  }
)

export const updateTodo = createAsyncThunk(
  'todo/updateTodo',
  async ({ id, todo }: { id: number; todo: Partial<Todo> }) => {
    const response = await todoApi.update(id, todo)
    return response.data
  }
)

export const deleteTodo = createAsyncThunk('todo/deleteTodo', async (id: number) => {
  await todoApi.delete(id)
  return id
})

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    clearTodoError: (state) => {
      state.error = null
    },
    setTodoSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    setTodoFilter: (state, action) => {
      state.filter = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false
        state.todos = action.payload
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch todos'
      })
      .addCase(createTodo.pending, (state) => {
        state.operationLoading = true
        state.error = null
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.operationLoading = false
        state.todos.unshift(action.payload)
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.operationLoading = false
        state.error = action.error.message || 'Failed to create todo'
      })
      .addCase(updateTodo.pending, (state) => {
        state.operationLoading = true
        state.error = null
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.operationLoading = false
        const index = state.todos.findIndex((t) => t.id === action.payload.id)
        if (index !== -1) {
          state.todos[index] = action.payload
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.operationLoading = false
        state.error = action.error.message || 'Failed to update todo'
      })
      .addCase(deleteTodo.pending, (state) => {
        state.operationLoading = true
        state.error = null
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.operationLoading = false
        state.todos = state.todos.filter((t) => t.id !== action.payload)
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.operationLoading = false
        state.error = action.error.message || 'Failed to delete todo'
      })
  },
})

export const { clearTodoError, setTodoSearchQuery, setTodoFilter } = todoSlice.actions
export default todoSlice.reducer
