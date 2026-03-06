import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  TrendingUp,
  Building2,
  ShoppingBag,
  Settings,
  BarChart3,
  Database,
  Bell,
  Brain,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
    color: 'text-blue-500',
  },
  {
    label: 'Tendencias Tech',
    icon: TrendingUp,
    path: '/tech-trends',
    color: 'text-indigo-500',
  },
  {
    label: 'Reputación',
    icon: Building2,
    path: '/business-reputation',
    color: 'text-purple-500',
  },
  {
    label: 'Productos Virales',
    icon: ShoppingBag,
    path: '/viral-products',
    color: 'text-green-500',
  },
  {
    label: 'Análisis',
    icon: BarChart3,
    path: '/analytics',
    color: 'text-orange-500',
  },
  {
    label: 'Datos',
    icon: Database,
    path: '/data',
    color: 'text-cyan-500',
  },
];

const bottomMenuItems = [
  {
    label: 'Notificaciones',
    icon: Bell,
    path: '/notifications',
    badge: 3,
  },
  {
    label: 'Configuración',
    icon: Settings,
    path: '/settings',
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 shadow-2xl transition-transform duration-300 lg:translate-x-0 lg:static lg:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-lg opacity-40 rounded-full" />
                <Brain className="h-8 w-8 relative text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  DataScope
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">AI Platform</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6 px-3">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => window.innerWidth < 1024 && onClose()}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon
                        className={`h-5 w-5 transition-colors ${
                          isActive ? item.color : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                        }`}
                      />
                      <span className="font-medium text-sm">{item.label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-gray-200 dark:border-gray-800" />

            {/* Bottom items */}
            <div className="space-y-1">
              {bottomMenuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => window.innerWidth < 1024 && onClose()}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`
                  }
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="text-xs text-center text-gray-500 dark:text-gray-400">
              © 2026 DataScope AI
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
