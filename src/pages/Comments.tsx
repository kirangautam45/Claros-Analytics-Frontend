import { useMemo, useState } from 'react'
import { Header } from '@/components/Header'
import { DataTable, SearchInput, Pagination } from '@/components/dashboard'
import { LoadingSpinner, ErrorMessage } from '@/components/common'
import { useDashboard } from '@/hooks'
import type { Comment } from '@/@types'
import { MessageSquare, User } from 'lucide-react'

export function CommentsPage() {
  const {
    filteredComments,
    posts,
    users,
    commentSearchTerm,
    isLoading,
    error,
    handleCommentSearch,
    handleClearError,
    handleRetry,
  } = useDashboard()

  const getPostInfo = (postId: number) => {
    const post = posts.find((p) => p.id === postId)
    const author = users.find((u) => u.id === post?.userId)
    return {
      title: post?.title || `Post #${postId}`,
      author: author?.name || 'Unknown',
    }
  }

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const paginatedComments = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredComments.slice(start, start + itemsPerPage)
  }, [filteredComments, currentPage, itemsPerPage])

  const totalPages = Math.ceil(filteredComments.length / itemsPerPage)

  const columns = [
    {
      key: 'content',
      header: 'Comment Thread',
      render: (comment: Comment) => {
        const postInfo = getPostInfo(comment.postId)
        return (
          <div className="py-2 space-y-2">
            {/* Post context */}
            <div className="flex items-start gap-2 text-xs text-gray-500">
              <User className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                <span className="font-medium text-gray-700">{postInfo.author}</span>
                {' wrote: '}
                <span className="italic">"{postInfo.title}"</span>
              </span>
            </div>
            {/* Comment */}
            <div className="flex items-start gap-2 pl-4 border-l-2 border-blue-200">
              <MessageSquare className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm text-gray-800 line-clamp-2">{comment.body}</p>
                <p className="text-xs text-gray-400">
                  — {comment.name.split(' ').slice(0, 3).join(' ')}
                  <span className="text-blue-500 ml-1">({comment.email})</span>
                </p>
              </div>
            </div>
          </div>
        )
      },
    },
  ]

  return (
    <div className="flex flex-col h-screen">
      <Header title="Comments" />
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
            <SearchInput
              value={commentSearchTerm}
              onChange={handleCommentSearch}
              placeholder="Search comments..."
            />
            <span className="text-sm text-gray-500">
              {filteredComments.length} comments found
            </span>
          </div>

          {/* Error State */}
          {error && (
            <ErrorMessage error={error} onDismiss={handleClearError} onRetry={handleRetry} />
          )}

          {/* Loading State */}
          {isLoading && <LoadingSpinner size="lg" text="Loading comments..." />}

          {/* Table */}
          {!isLoading && !error && (
            <>
              <DataTable data={paginatedComments} columns={columns} keyField="id" />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                totalItems={filteredComments.length}
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
    </div>
  )
}

export default CommentsPage
