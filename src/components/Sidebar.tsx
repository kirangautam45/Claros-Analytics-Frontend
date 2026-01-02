import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, FileText, MessageSquare, CheckSquare, Images } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/users', label: 'Users', icon: Users },
  { to: '/posts', label: 'Posts', icon: FileText },
  { to: '/comments', label: 'Comments', icon: MessageSquare },
  { to: '/todos', label: 'Todos', icon: CheckSquare },
  { to: '/albums', label: 'Albums', icon: Images },
]

export default function Sidebar() {
  return (
    <aside className="w-56 bg-white min-h-screen border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-xl font-bold text-blue-600">Analytics Dashboard</h1>
      </div>
      <nav className="px-3">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                <item.icon size={20} />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
