import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import type { ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  const handleGoHome = () => {
    resetErrorBoundary()
    window.location.href = '/'
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      <div className='max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center'>
        <div className='mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4'>
          <AlertTriangle className='w-8 h-8 text-red-600' />
        </div>

        <h1 className='text-xl font-semibold text-gray-900 mb-2'>
          Something went wrong
        </h1>

        <p className='text-gray-600 mb-6'>
          An unexpected error occurred. Please try refreshing the page or go
          back to the home page.
        </p>

        {import.meta.env.DEV && (
          <details className='mb-6 text-left'>
            <summary className='cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900'>
              Error Details
            </summary>
            <div className='mt-2 p-3 bg-gray-100 rounded-lg overflow-auto'>
              <p className='text-sm text-red-600 font-mono mb-2'>
                {error.message}
              </p>
              <pre className='text-xs text-gray-600 whitespace-pre-wrap'>
                {error.stack}
              </pre>
            </div>
          </details>
        )}

        <div className='flex gap-3 justify-center'>
          <button
            onClick={resetErrorBoundary}
            className='inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors'
          >
            <RefreshCw className='w-4 h-4' />
            Try Again
          </button>
          <button
            onClick={handleGoHome}
            className='inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors'
          >
            <Home className='w-4 h-4' />
            Go Home
          </button>
        </div>
      </div>
    </div>
  )
}

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

export function ErrorBoundary({ children, fallback }: Props) {
  const handleError = (error: Error, info: React.ErrorInfo) => {
    console.error('Error caught by ErrorBoundary:', error, info)
  }

  if (fallback) {
    return (
      <ReactErrorBoundary fallback={fallback} onError={handleError}>
        {children}
      </ReactErrorBoundary>
    )
  }

  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
      {children}
    </ReactErrorBoundary>
  )
}
