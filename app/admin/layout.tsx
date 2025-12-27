'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from './logout-action'; // ✅ 1. Import Logout Action

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  if (pathname === '/admin/login') return <>{children}</>;

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: '🏠' },
    { name: 'Categories', path: '/admin/categories', icon: '📂' },
    { name: 'Products', path: '/admin/products', icon: '📦' },
  ];

  return (
    <div className={darkMode ? "dark" : ""}>
      
      <style jsx global>{`
        /* --- GLOBAL STYLES (Same as before) --- */
        .admin-wrapper input, .admin-wrapper select, .admin-wrapper textarea { background-color: #ffffff !important; color: #111827 !important; border: 1px solid #d1d5db !important; transition: all 0.2s ease !important; width: 100% !important; }
        .dark .admin-wrapper input, .dark .admin-wrapper select, .dark .admin-wrapper textarea { background-color: #374151 !important; color: #ffffff !important; border: 1px solid #4b5563 !important; }
        .admin-card { background-color: #ffffff !important; color: #000000 !important; transition: background-color 0.3s ease !important; }
        .dark .admin-card { background-color: #1f2937 !important; color: #ffffff !important; }
        .admin-sidebar { background-color: #ffffff !important; border-right: 1px solid #e5e7eb !important; transition: background-color 0.3s ease, border-color 0.3s ease !important; }
        .dark .admin-sidebar { background-color: #1f2937 !important; border-right: 1px solid #374151 !important; }
        
        .admin-nav-item { color: #4b5563 !important; background-color: transparent !important; transition: all 0.2s ease-in-out !important; }
        .admin-nav-item:hover { background-color: #f3f4f6 !important; color: #000000 !important; transform: translateX(5px); }
        .dark .admin-nav-item { color: #d1d5db !important; }
        .dark .admin-nav-item:hover { background-color: #374151 !important; color: #ffffff !important; }
        .admin-nav-item.active { background-color: #ea580c !important; color: #ffffff !important; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
        .admin-nav-item.active:hover { background-color: #c2410c !important; color: #ffffff !important; transform: none !important; }
        
        .admin-header-title { color: #111827 !important; }
        .dark .admin-header-title { color: #ffffff !important; }

        /* iOS TOGGLE */
        .ios-toggle { position: relative; width: 44px; height: 24px; background-color: #e5e7eb; border-radius: 9999px; cursor: pointer; transition: background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .ios-toggle.active { background-color: #ea580c; }
        .dark .ios-toggle { background-color: #4b5563; }
        .dark .ios-toggle.active { background-color: #ea580c; }
        .ios-thumb { position: absolute; top: 2px; left: 2px; width: 20px; height: 20px; background-color: white; border-radius: 50%; box-shadow: 0 1px 3px rgba(0,0,0,0.3); transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .ios-toggle.active .ios-thumb { transform: translateX(20px); }
      `}</style>
      
      {/* Wrapper */}
      <div 
        className="admin-wrapper fixed inset-0 w-full h-full flex flex-col md:flex-row font-sans z-[9999]"
        style={{ 
          backgroundColor: darkMode ? '#111827' : '#F3F4F6', 
          color: darkMode ? '#F3F4F6' : '#111827',
          transition: 'background-color 0.3s ease, color 0.3s ease'
        }}
      >
        
        {/* Mobile Header */}
        <div className="md:hidden h-14 flex items-center justify-between px-4 border-b shrink-0 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <span className="font-bold text-orange-600 text-lg tracking-wider">ADMIN</span>
          <button onClick={() => setMobileMenuOpen(true)} className="p-2 text-2xl text-gray-600 dark:text-gray-200 focus:outline-none">☰</button>
        </div>

        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity" onClick={() => setMobileMenuOpen(false)}></div>
        )}

        {/* Sidebar */}
        <div className={`admin-sidebar fixed md:relative inset-y-0 left-0 z-50 w-64 flex flex-col justify-between shadow-2xl md:shadow-xl transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
          <div>
            <div className="h-16 flex items-center justify-center border-b" style={{ borderColor: darkMode ? '#374151' : '#E5E7EB' }}>
              <h1 className="text-xl font-bold text-orange-600 tracking-wider m-0">ADMIN PANEL</h1>
            </div>
            
            <div className="p-4 space-y-2">
              {menuItems.map((item) => (
                <Link key={item.name} href={item.path} onClick={() => setMobileMenuOpen(false)}>
                  <div className={`admin-nav-item px-4 py-3 rounded-lg font-medium cursor-pointer flex items-center gap-3 ${pathname === item.path ? 'active' : ''}`}>
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Section: Theme Switch & Logout */}
          <div className="p-4 border-t space-y-3" style={{ borderColor: darkMode ? '#374151' : '#E5E7EB' }}>
            
            {/* Theme Switch (Centered) */}
            <div className="flex justify-center px-3 py-2 rounded-lg transition-colors duration-300" style={{ backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : '#F3F4F6' }}>
              <div className={`ios-toggle ${darkMode ? 'active' : ''}`} onClick={() => setDarkMode(!darkMode)} title="Toggle Theme">
                <div className="ios-thumb"></div>
              </div>
            </div>

            {/* ✅ 2. LOGOUT BUTTON ADDED HERE */}
            <button 
              onClick={() => logout()} // Calls the server action
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <span>🚪</span> Logout
            </button>

          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          <div className="h-14 md:h-16 flex items-center px-4 md:px-8 justify-between shadow-sm shrink-0 w-full transition-colors duration-300" style={{ backgroundColor: darkMode ? '#1F2937' : '#FFFFFF', borderBottom: `1px solid ${darkMode ? '#374151' : '#E5E7EB'}` }}>
            <h2 className="admin-header-title text-lg md:text-xl font-bold m-0 p-0 text-left capitalize truncate">{pathname === '/admin' ? 'Dashboard' : pathname.split('/').pop() + ' Management'}</h2>
            <div className="hidden md:block text-sm font-medium opacity-70 admin-header-title">Welcome, Admin</div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-6xl mx-auto w-full">{children}</div>
          </div>
        </div>

      </div>
    </div>
  );
}
