import { useMemo, useState } from 'react'
import { Header } from '@/components/Header'
import { DataTable, SearchInput, Pagination } from '@/components/dashboard'
import {
  LoadingSpinner,
  ErrorMessage,
  Modal,
  ConfirmDialog,
} from '@/components/common'
import { PostForm } from '@/components/forms'
import { useDashboard } from '@/hooks'
import type { Post } from '@/@types'
import { Plus, Pencil, Trash2 } from 'lucide-react'

type LocalPost = Post & { isLocal?: boolean }

export function PostsPage() {
  const {
    filteredPosts,
    users,
    postSearchTerm,
    isLoading,
    operationLoading,
    error,
    handlePostSearch,
    handleClearError,
    handleRetry,
    handleCreatePost,
    handleUpdatePost,
    handleDeletePost,
  } = useDashboard()

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<LocalPost | null>(null)

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredPosts.slice(start, start + itemsPerPage)
  }, [filteredPosts, currentPage, itemsPerPage])

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage)

  const getUserName = (userId: number) => {
    const user = users.find((u) => u.id === userId)
    return user?.name || `User ${userId}`
  }

  const openCreateModal = () => {
    setSelectedPost(null)
    setIsFormOpen(true)
  }

  const openEditModal = (post: LocalPost) => {
    setSelectedPost(post)
    setIsFormOpen(true)
  }

  const openDeleteModal = (post: LocalPost) => {
    setSelectedPost(post)
    setIsDeleteOpen(true)
  }

  const handleFormSubmit = async (data: {
    title: string
    body: string
    userId: number
  }) => {
    try {
      if (selectedPost) {
        await handleUpdatePost({
          ...data,
          id: selectedPost.id,
          isLocal: selectedPost.isLocal,
        })
      } else {
        await handleCreatePost(data)
      }
      setIsFormOpen(false)
      setSelectedPost(null)
    } catch {
      // Error is handled by Redux
    }
  }

  const handleConfirmDelete = async () => {
    if (selectedPost) {
      try {
        await handleDeletePost(selectedPost.id, selectedPost.isLocal)
        setIsDeleteOpen(false)
        setSelectedPost(null)
      } catch {
        // Error is handled by Redux
      }
    }
  }

  const columns = [
    {
      key: 'id',
      header: '#',
      className: 'w-16',
      hideOnMobile: true,
      render: (post: LocalPost) => (
        <span className='text-gray-400 font-mono text-xs'>{post.id}</span>
      ),
    },
    {
      key: 'userId',
      header: 'Author',
      className: 'w-44',
      hideOnMobile: true,
      render: (post: LocalPost) => (
        <span className='badge badge-info'>{getUserName(post.userId)}</span>
      ),
    },
    {
      key: 'title',
      header: 'Title',
      className: 'w-1/3',
      render: (post: LocalPost) => (
        <span className='font-semibold text-gray-900 first-letter:uppercase wrap-break-word'>
          {post.title}
        </span>
      ),
    },
    {
      key: 'body',
      header: 'Content',
      className: 'w-1/3',
      hideOnMobile: true,
      render: (post: LocalPost) => (
        <p className='text-gray-500 text-sm leading-relaxed first-letter:uppercase wrap-break-word'>
          {post.body}
        </p>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'w-28',
      render: (post: LocalPost) => (
        <div className='flex gap-1'>
          <button
            onClick={() => openEditModal(post)}
            className='p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-150 hover:scale-105'
            title='Edit post'
          >
            <Pencil className='w-4 h-4' />
          </button>
          <button
            onClick={() => openDeleteModal(post)}
            className='p-2 text-rose-600 hover:bg-rose-100 rounded-lg transition-all duration-150 hover:scale-105'
            title='Delete post'
          >
            <Trash2 className='w-4 h-4' />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className='flex flex-col'>
      <Header title='Posts' />
      <div className='flex-1 p-4 sm:p-6'>
        <div className='max-w-7xl mx-auto space-y-6'>
          {/* Search and Add Button */}
          <div className='flex flex-wrap gap-4 justify-between items-center'>
            <SearchInput
              value={postSearchTerm}
              onChange={handlePostSearch}
              placeholder='Search posts...'
            />
            <div className='flex items-center gap-4'>
              <span className='text-sm text-gray-500'>
                {filteredPosts.length} posts found
              </span>
              <button
                onClick={openCreateModal}
                className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'
              >
                <Plus className='w-5 h-5' />
                Add Post
              </button>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <ErrorMessage
              error={error}
              onDismiss={handleClearError}
              onRetry={handleRetry}
            />
          )}

          {/* Loading State */}
          {isLoading && <LoadingSpinner size='lg' text='Loading posts...' />}

          {/* Table */}
          {!isLoading && !error && (
            <>
              <DataTable
                data={paginatedPosts}
                columns={columns}
                keyField='id'
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                totalItems={filteredPosts.length}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={(value) => {
                  setItemsPerPage(value)
                  setCurrentPage(1)
                }}
              />
            </>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={selectedPost ? 'Edit Post' : 'Create New Post'}
        size='lg'
      >
        <PostForm
          key={selectedPost?.id ?? 'new'}
          post={selectedPost}
          users={users}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormOpen(false)}
          isLoading={operationLoading}
        />
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title='Delete Post'
        message={`Are you sure you want to delete "${selectedPost?.title}"? This action cannot be undone.`}
        confirmText='Delete'
        variant='danger'
        isLoading={operationLoading}
      />
    </div>
  )
}

export default PostsPage
