import { Link, useNavigate } from 'react-router-dom'
import { Home, ArrowLeft, SearchX } from 'lucide-react'

export function NotFoundPage() {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className='flex-1 bg-gray-50 flex flex-col items-center justify-center p-4'>
      <div className='text-center max-w-md'>
        {/* Icon */}
        <div className='mb-6 flex justify-center'>
          <div className='w-24 h-24 bg-linear-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center'>
            <SearchX className='w-12 h-12 text-cyan-900 ' />
          </div>
        </div>

        {/* Error Code */}
        <h1 className='text-8xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-500 mb-4'>
          404
        </h1>

        {/* Message */}
        <h2 className='text-2xl font-semibold text-gray-900 mb-2'>
          Page Not Found
        </h2>
        <p className='text-gray-500 mb-8'>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className='flex flex-col sm:flex-row gap-3 justify-center'>
          <Link
            to='/'
            className='inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium'
          >
            <Home className='w-4 h-4' />
            Go to Dashboard
          </Link>
          <button
            onClick={handleGoBack}
            className='inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors font-medium'
          >
            <ArrowLeft className='w-4 h-4' />
            Go Back
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-50 blur-3xl' />
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full opacity-50 blur-3xl' />
      </div>
    </div>
  )
}

export default NotFoundPage
