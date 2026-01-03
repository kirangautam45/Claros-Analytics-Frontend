import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { Footer } from './Footer'
import { Menu } from 'lucide-react'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className='flex h-screen bg-gray-50'>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-40 lg:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - hidden on mobile, visible on lg+ */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className='flex-1 flex flex-col min-w-0'>
        {/* Mobile Header */}
        <header className='lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-30'>
          <button
            onClick={() => setSidebarOpen(true)}
            className='p-2 rounded-lg hover:bg-gray-100 transition-colors'
            aria-label='Open menu'
          >
            <Menu className='w-6 h-6 text-gray-600' />
          </button>
          <span className='font-bold text-slate-800'>CLAROS</span>
          <div className='w-10' />
        </header>

        {/* Scrollable Main Content */}
        <main className='flex-1 overflow-auto'>
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}
