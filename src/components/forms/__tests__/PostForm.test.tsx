import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { PostForm } from '../PostForm'
import type { Post, User } from '@/@types'

const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    phone: '123-456-7890',
    website: 'johndoe.com',
    address: {
      street: '123 Main St',
      suite: 'Apt 1',
      city: 'New York',
      zipcode: '10001',
      geo: { lat: '40.7128', lng: '-74.0060' },
    },
    company: {
      name: 'Acme Corp',
      catchPhrase: 'Making things happen',
      bs: 'business solutions',
    },
  },
  {
    id: 2,
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane@example.com',
    phone: '987-654-3210',
    website: 'janesmith.com',
    address: {
      street: '456 Oak Ave',
      suite: 'Suite 200',
      city: 'Los Angeles',
      zipcode: '90001',
      geo: { lat: '34.0522', lng: '-118.2437' },
    },
    company: {
      name: 'Tech Inc',
      catchPhrase: 'Innovation first',
      bs: 'tech solutions',
    },
  },
]

const mockPost: Post = {
  id: 1,
  userId: 1,
  title: 'Test Post Title',
  body: 'This is the test post body content that is long enough.',
}

describe('PostForm', () => {
  const mockOnSubmit = vi.fn()
  const mockOnCancel = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('renders all form fields', () => {
      render(
        <PostForm
          post={null}
          users={mockUsers}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      )

      expect(screen.getByLabelText(/author/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/content/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /create post/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
    })

    it('renders user options in select', () => {
      render(
        <PostForm
          post={null}
          users={mockUsers}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      )

      const select = screen.getByLabelText(/author/i)
      expect(select).toHaveValue('1')

      mockUsers.forEach((user) => {
        expect(screen.getByRole('option', { name: user.name })).toBeInTheDocument()
      })
    })

    it('pre-fills form when editing existing post', () => {
      render(
        <PostForm
          post={mockPost}
          users={mockUsers}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      )

      expect(screen.getByLabelText(/title/i)).toHaveValue(mockPost.title)
      expect(screen.getByLabelText(/content/i)).toHaveValue(mockPost.body)
      expect(screen.getByLabelText(/author/i)).toHaveValue(String(mockPost.userId))
      expect(screen.getByRole('button', { name: /update post/i })).toBeInTheDocument()
    })
  })

  describe('validation', () => {
    it('shows error when title is empty', async () => {
      render(
        <PostForm
          post={null}
          users={mockUsers}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      )

      const contentInput = screen.getByLabelText(/content/i)
      fireEvent.change(contentInput, { target: { value: 'This is valid content text' } })

      fireEvent.click(screen.getByRole('button', { name: /create post/i }))

      await waitFor(() => {
        expect(screen.getByText(/title is required/i)).toBeInTheDocument()
      })
      expect(mockOnSubmit).not.toHaveBeenCalled()
    })

    it('shows error when title is too short', async () => {
      render(
        <PostForm
          post={null}
          users={mockUsers}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      )

      const titleInput = screen.getByLabelText(/title/i)
      fireEvent.change(titleInput, { target: { value: 'AB' } })

      fireEvent.click(screen.getByRole('button', { name: /create post/i }))

      await waitFor(() => {
        expect(screen.getByText(/title must be at least 3 characters/i)).toBeInTheDocument()
      })
    })

    it('shows error when content is empty', async () => {
      render(
        <PostForm
          post={null}
          users={mockUsers}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      )

      const titleInput = screen.getByLabelText(/title/i)
      fireEvent.change(titleInput, { target: { value: 'Valid Title' } })

      fireEvent.click(screen.getByRole('button', { name: /create post/i }))

      await waitFor(() => {
        expect(screen.getByText(/content is required/i)).toBeInTheDocument()
      })
    })

    it('shows error when content is too short', async () => {
      render(
        <PostForm
          post={null}
          users={mockUsers}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      )

      const titleInput = screen.getByLabelText(/title/i)
      const contentInput = screen.getByLabelText(/content/i)

      fireEvent.change(titleInput, { target: { value: 'Valid Title' } })
      fireEvent.change(contentInput, { target: { value: 'Short' } })

      fireEvent.click(screen.getByRole('button', { name: /create post/i }))

      await waitFor(() => {
        expect(screen.getByText(/content must be at least 10 characters/i)).toBeInTheDocument()
      })
    })
  })

  describe('form submission', () => {
    it('calls onSubmit with correct data when form is valid', async () => {
      render(
        <PostForm
          post={null}
          users={mockUsers}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      )

      const titleInput = screen.getByLabelText(/title/i)
      const contentInput = screen.getByLabelText(/content/i)
      const authorSelect = screen.getByLabelText(/author/i)

      fireEvent.change(titleInput, { target: { value: 'New Post Title' } })
      fireEvent.change(contentInput, { target: { value: 'This is the post content that is long enough' } })
      fireEvent.change(authorSelect, { target: { value: '2' } })

      fireEvent.click(screen.getByRole('button', { name: /create post/i }))

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          title: 'New Post Title',
          body: 'This is the post content that is long enough',
          userId: 2,
        })
      })
    })

    it('trims whitespace from title and body', async () => {
      render(
        <PostForm
          post={null}
          users={mockUsers}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      )

      const titleInput = screen.getByLabelText(/title/i)
      const contentInput = screen.getByLabelText(/content/i)

      fireEvent.change(titleInput, { target: { value: '  Trimmed Title  ' } })
      fireEvent.change(contentInput, { target: { value: '  This is trimmed content text  ' } })

      fireEvent.click(screen.getByRole('button', { name: /create post/i }))

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          title: 'Trimmed Title',
          body: 'This is trimmed content text',
          userId: 1,
        })
      })
    })
  })

  describe('cancel button', () => {
    it('calls onCancel when cancel button is clicked', () => {
      render(
        <PostForm
          post={null}
          users={mockUsers}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      )

      fireEvent.click(screen.getByRole('button', { name: /cancel/i }))

      expect(mockOnCancel).toHaveBeenCalled()
    })
  })

  describe('loading state', () => {
    it('disables all inputs when loading', () => {
      render(
        <PostForm
          post={null}
          users={mockUsers}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          isLoading={true}
        />
      )

      expect(screen.getByLabelText(/author/i)).toBeDisabled()
      expect(screen.getByLabelText(/title/i)).toBeDisabled()
      expect(screen.getByLabelText(/content/i)).toBeDisabled()
      expect(screen.getByRole('button', { name: /cancel/i })).toBeDisabled()
    })

    it('shows saving text when loading', () => {
      render(
        <PostForm
          post={null}
          users={mockUsers}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
          isLoading={true}
        />
      )

      expect(screen.getByText(/saving/i)).toBeInTheDocument()
    })
  })
})
