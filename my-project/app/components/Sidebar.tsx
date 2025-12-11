"use client"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  onToggle: () => void
  activeTab: string
  onTabChange: (tab: string) => void
  userData: {
    id: string
    email: string
    userType: string
  } | null
}

export default function Sidebar({ isOpen, onClose, onToggle, activeTab, onTabChange, userData }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'properties', icon: '🏠', label: 'Properties' },
    { id: 'users', icon: '👥', label: 'Users' },
    { id: 'inquiries', icon: '💬', label: 'Inquiries' },
    { id: 'analytics', icon: '📈', label: 'Analytics' },
    { id: 'settings', icon: '⚙️', label: 'Settings' }
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-gray-900 text-white z-50 
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          w-64 shadow-2xl flex flex-col 
        `}
      >
        {/* Toggle Button - always attached to sidebar */}
        <button
        onClick={onToggle}
        className="
        absolute top-6 -right-10
        w-10 h-12 bg-black text-white rounded-r-lg
        flex items-center justify-center shadow-lg
       duration-300 hover:shadow-[0_0_20px_black] hover:shadow-black-/50 transition cursor-pointer"
        >
        {isOpen ? '◀' : '▶'}
        </button>

        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className=" w-10 h-10 bg-linear-to-br from-black-500 to-purple-600 rounded-xl flex items-center justify-center font-bold text-lg">
                A
              </div>
              <div>
                <h2 className="font-bold text-lg">Admin Panel</h2>
                <p className="text-xs text-gray-400">Real Estate CMS</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden text-gray-400 hover:text-white transition"
            >
              ✕
            </button>
          </div>
        </div>

        {/* User Info */}
        {userData && (
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-semibold">
                {userData.email?.[0]?.toUpperCase() || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{userData.email}</p>
                <p className="text-xs text-gray-400 capitalize">{userData.userType}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    onTabChange(item.id)
                    if (window.innerWidth < 1024) onClose()
                  }}
                  className={`
                    cursor-pointer w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                    transition-all duration-200 text-left
                    ${activeTab === item.id
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }
                  `}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-800">
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-all">
            <span className="text-xl">❓</span>
            <span className="font-medium cursor-pointer">Help & Support</span>
          </button>
        </div>
      </aside>
    </>
  )
}