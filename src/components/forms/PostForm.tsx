import { useState, useEffect } from 'react'
import type { Post, User } from '@/@types'

interface PostFormProps {
  post: Post | null
  users: User[]
  onSubmit: (data: { title: string; body: string; userId: number }) => void
  onCancel: () => void
  isLoading?: boolean
}

export function PostForm({ post, users, onSubmit, onCancel, isLoading = false }: PostFormProps) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [userId, setUserId] = useState<number>(users[0]?.id || 1)
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({})

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setBody(post.body)
      setUserId(post.userId)
    } else {
      setTitle('')
      setBody('')
      setUserId(users[0]?.id || 1)
    }
    setErrors({})
  }, [post, users])

  const validate = () => {
    const newErrors: { title?: string; body?: string } = {}

    if (!title.trim()) {
      newErrors.title = 'Title is required'
    } else if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters'
    }

    if (!body.trim()) {
      newErrors.body = 'Content is required'
    } else if (body.trim().length < 10) {
      newErrors.body = 'Content must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validate()) {
      onSubmit({ title: title.trim(), body: body.trim(), userId })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Author Select */}
      <div>
        <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
          Author
        </label>
        <select
          id="userId"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          disabled={isLoading}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {/* Title Input */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
          placeholder="Enter post title..."
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>

      {/* Body Textarea */}
      <div>
        <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={isLoading}
          placeholder="Enter post content..."
          rows={5}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-none ${
            errors.body ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.body && <p className="mt-1 text-sm text-red-600">{errors.body}</p>}
      </div>

      {/* Form Actions */}
      <div className="flex gap-3 justify-end pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Saving...
            </span>
          ) : post ? (
            'Update Post'
          ) : (
            'Create Post'
          )}
        </button>
      </div>
    </form>
  )
}
