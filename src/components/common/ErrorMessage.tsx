import { AlertCircle, X, RefreshCw } from 'lucide-react'

interface ErrorMessageProps {
  error: string
  onDismiss?: () => void
  onRetry?: () => void
}

export function ErrorMessage({ error, onDismiss, onRetry }: ErrorMessageProps) {
  return (
    <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
      <div className='flex items-start gap-3'>
        <AlertCircle className='text-red-500 shrink-0 mt-0.5' size={20} />
        <div className='flex-1'>
          <h3 className='text-red-800 font-semibold'>Error</h3>
          <p className='text-red-600 text-sm mt-1'>{error}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className='mt-3 inline-flex items-center gap-2 text-sm text-red-700 hover:text-red-800 font-medium'
            >
              <RefreshCw size={16} />
              Try again
            </button>
          )}
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className='text-red-400 hover:text-red-600'
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  )
}
