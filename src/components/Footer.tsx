export function Footer() {
  return (
    <footer className='bg-linear-to-r from-cyan-50 via-cyan-50 to-sky-50 border-t border-gray-200 px-4 sm:px-6 py-5'>
      <div className='max-w-7xl mx-auto text-center'>
        <p className='text-sm font-semibold text-gray-800 animate-pulse'>
          Task Assignment for Frontend Developer Application
        </p>
        <p className='text-xs text-gray-500 mt-2 flex items-center justify-center gap-2 flex-wrap'>
          <span className='inline-flex items-center gap-1 hover:text-cyan-600 transition-colors duration-300'>
            Built with
          </span>
          <span className='inline-flex items-center gap-1.5'>
            <span className='px-2 py-0.5 bg-cyan-100 text-cyan-700 rounded-full text-[10px] font-medium hover:bg-cyan-200 transition-all duration-300 hover:scale-105'>
              React
            </span>
            <span className='px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[10px] font-medium hover:bg-blue-200 transition-all duration-300 hover:scale-105'>
              TypeScript
            </span>
            <span className='px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-[10px] font-medium hover:bg-purple-200 transition-all duration-300 hover:scale-105'>
              Redux Toolkit
            </span>
            <span className='px-2 py-0.5 bg-cyan-100 text-cyan-700 rounded-full text-[10px] font-medium hover:bg-cyan-200 transition-all duration-300 hover:scale-105'>
              Tailwind CSS
            </span>
          </span>
        </p>
        <div className='mt-3 text-xs text-gray-400 flex items-center justify-center gap-2'>
          <span className='hover:text-gray-600 transition-colors duration-300'>
            &copy; {new Date().getFullYear()} Claros Analytics
          </span>
          <span>|</span>
          <span className='hover:text-gray-600 transition-colors duration-300'>v1.0.0</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
