import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Wrench, 
  FolderOpen, 
  Users, 
  MessageSquare, 
  Menu, 
  X,
  HardHat,
  LogOut
} from 'lucide-react';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Services', href: '/admin/services', icon: Wrench },
    { name: 'Projects', href: '/admin/projects', icon: FolderOpen },
    { name: 'Team', href: '/admin/team', icon: Users },
    { name: 'Contact Messages', href: '/admin/contact', icon: MessageSquare },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: isSidebarOpen ? 256 : 64 }}
        animate={{ width: isSidebarOpen ? 256 : 64 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-900 text-white flex flex-col"
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <HardHat className="h-8 w-8 text-orange-500" />
              {isSidebarOpen && (
                <span className="font-bold text-xl">Admin</span>
              )}
            </div>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          <ul className="space-y-2 px-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {isSidebarOpen && (
                      <span className="font-medium">{item.name}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">A</span>
            </div>
            {isSidebarOpen && (
              <div className="flex-1">
                <div className="text-sm font-medium">Admin User</div>
                <div className="text-xs text-gray-400">admin@buildcraft.com</div>
              </div>
            )}
          </div>
          {isSidebarOpen && (
            <button className="mt-3 flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
              <LogOut className="h-4 w-4" />
              <span className="text-sm">Logout</span>
            </button>
          )}
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">
              {navigation.find(item => item.href === location.pathname)?.name || 'Admin Panel'}
            </h1>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                View Site
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;