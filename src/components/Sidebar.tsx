import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  FileText,
  MessageSquare,
  CheckSquare,
} from 'lucide-react'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/users', label: 'Users', icon: Users },
  { to: '/posts', label: 'Posts', icon: FileText },
  { to: '/comments', label: 'Comments', icon: MessageSquare },
  { to: '/todos', label: 'Todos', icon: CheckSquare },
]

// Claros Analytics Logo Component
function ClarosLogo() {
  return (
    <div className='flex items-center gap-3'>
      {/* Geometric Icon */}
      <div className='relative w-10 h-10'>
        <svg viewBox='0 0 40 40' className='w-full h-full'>
          {/* Background triangular shape */}
          <path
            d='M5 35 L20 5 L35 35 Z'
            fill='none'
            stroke='#0d9488'
            strokeWidth='2'
            className='opacity-30'
          />
          {/* Inner geometric pattern */}
          <path d='M12 28 L20 12 L28 28 Z' fill='#0d9488' className='opacity-60' />
          <path d='M16 28 L20 18 L24 28 Z' fill='#14b8a6' />
          {/* Accent line */}
          <path d='M8 32 L20 8' stroke='#0891b2' strokeWidth='2' strokeLinecap='round' />
        </svg>
      </div>
      {/* Text */}
      <div className='flex flex-col'>
        <span className='text-lg font-bold tracking-tight text-slate-800'>
          CLAROS
        </span>
        <span className='text-[10px] font-medium tracking-[0.2em] text-teal-600 -mt-0.5'>
          ANALYTICS
        </span>
      </div>
    </div>
  )
}

export default function Sidebar() {
  return (
    <aside className='w-60 bg-white h-screen border-r border-gray-100 flex flex-col shrink-0 sticky top-0 shadow-sm'>
      {/* Logo Section */}
      <div className='p-5 border-b border-gray-100'>
        <ClarosLogo />
      </div>

      {/* Navigation */}
      <nav className='px-3 py-4 flex-1 overflow-y-auto'>
        <ul className='space-y-1'>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-linear-to-r from-teal-500 to-cyan-500 text-white shadow-md shadow-teal-500/20'
                      : 'text-gray-600 hover:bg-teal-50 hover:text-teal-700'
                  }`
                }
              >
                <item.icon size={20} />
                <span className='font-medium'>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className='p-4 border-t border-gray-100'>
        <div className='text-xs text-gray-400 text-center'>
          v1.0.0
        </div>
      </div>
    </aside>
  )
}
