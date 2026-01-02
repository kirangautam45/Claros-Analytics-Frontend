import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'
import type { AxiosResponse } from 'axios'
import Users from './Users'
import userReducer from '../store/slices/userSlice'
import postReducer from '../store/slices/postSlice'
import commentReducer from '../store/slices/commentSlice'
import * as userApi from '../api/userApi'
import * as postApi from '../api/postApi'
import * as commentApi from '../api/commentApi'

const createMockResponse = <T,>(data: T): AxiosResponse<T> => ({
  data,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: { headers: {} } as AxiosResponse['config'],
})

vi.mock('../api/userApi', () => ({
  userApi: {
    getAll: vi.fn(),
  },
}))

vi.mock('../api/postApi', () => ({
  postApi: {
    getAll: vi.fn(),
  },
}))

vi.mock('../api/commentApi', () => ({
  commentApi: {
    getAll: vi.fn(),
  },
}))

const mockUsers = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: { lat: '-37.3159', lng: '81.1496' },
    },
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets',
    },
  },
]

const createMockStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      post: postReducer,
      comment: commentReducer,
    },
  })
}

const renderWithProviders = (ui: React.ReactElement) => {
  const store = createMockStore()
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  )
}

describe('Users', () => {
  beforeEach(() => {
    vi.clearAllMocks()
<<<<<<< HEAD
    vi.mocked(postApi.postApi.getAll).mockResolvedValue({ data: [] } as any)
    vi.mocked(commentApi.commentApi.getAll).mockResolvedValue({ data: [] } as any)
=======
    vi.mocked(postApi.postApi.getAll).mockResolvedValue(createMockResponse([]))
    vi.mocked(commentApi.commentApi.getAll).mockResolvedValue(createMockResponse([]))
>>>>>>> 0e293d8 ( text fixed)
  })

  it('should render loading state initially', () => {
    vi.mocked(userApi.userApi.getAll).mockImplementation(
      () => new Promise(() => {})
    )
    renderWithProviders(<Users />)
    expect(screen.getByText('Loading users...')).toBeInTheDocument()
  })

  it('should render error state when API fails', async () => {
    vi.mocked(userApi.userApi.getAll).mockRejectedValue(
      new Error('Failed to fetch users')
    )
    renderWithProviders(<Users />)
    await waitFor(() => {
      expect(screen.getByText('Error')).toBeInTheDocument()
    })
  })

  it('should render users table when data is loaded', async () => {
<<<<<<< HEAD
    vi.mocked(userApi.userApi.getAll).mockResolvedValue({ data: mockUsers } as any)
=======
    vi.mocked(userApi.userApi.getAll).mockResolvedValue(createMockResponse(mockUsers))
>>>>>>> 0e293d8 ( text fixed)
    renderWithProviders(<Users />)
    await waitFor(() => {
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument()
    })
    expect(screen.getByText('Bret')).toBeInTheDocument()
    expect(screen.getByText('Sincere@april.biz')).toBeInTheDocument()
    expect(screen.getByText('Gwenborough')).toBeInTheDocument()
  })

  it('should render search input', async () => {
<<<<<<< HEAD
    vi.mocked(userApi.userApi.getAll).mockResolvedValue({ data: mockUsers } as any)
=======
    vi.mocked(userApi.userApi.getAll).mockResolvedValue(createMockResponse(mockUsers))
>>>>>>> 0e293d8 ( text fixed)
    renderWithProviders(<Users />)
    await waitFor(() => {
      expect(
        screen.getByPlaceholderText('Search users...')
      ).toBeInTheDocument()
    })
  })

  it('should show no users found when list is empty', async () => {
<<<<<<< HEAD
    vi.mocked(userApi.userApi.getAll).mockResolvedValue({ data: [] } as any)
=======
    vi.mocked(userApi.userApi.getAll).mockResolvedValue(createMockResponse([]))
>>>>>>> 0e293d8 ( text fixed)
    renderWithProviders(<Users />)
    await waitFor(() => {
      expect(screen.getByText('No users found')).toBeInTheDocument()
    })
  })
})
