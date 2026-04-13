import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiHome, HiChartBar, HiFolder, HiUser, HiLogout } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { ROUTES, APP_NAME } from '../../utils/constants';

const menuItems = [
  { path: ROUTES.HOME, icon: HiHome, label: 'Home' },
  { path: ROUTES.ANALYTICS, icon: HiChartBar, label: 'Analytics' },
  { path: ROUTES.CATEGORIES, icon: HiFolder, label: 'Categories' },
  { path: ROUTES.PROFILE, icon: HiUser, label: 'Profile' },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { logout, currentUser } = useAuth();
  const location = useLocation();
  const toast = useToast();

  const handleLogout = () => {
    onClose();
    logout();
    toast.info('Logged out successfully 👋');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sidebar panel */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 z-50 h-full w-72 bg-[var(--color-sidebar-bg)] border-r border-theme-border shadow-theme-lg"
          >
            {/* Header */}
            <div className="p-6 border-b border-theme-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                    style={{ background: 'var(--gradient-primary)' }}>
                    💰
                  </div>
                  <span className="text-xl font-bold gradient-text">{APP_NAME}</span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-theme-text-muted hover:text-theme-text hover:bg-theme-primary-light transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* User info */}
              {currentUser && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-theme-primary-light">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ background: 'var(--gradient-primary)' }}>
                    {currentUser.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-theme-text">{currentUser.name}</p>
                    <p className="text-xs text-theme-text-muted">@{currentUser.id}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Menu items */}
            <nav className="p-4 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl
                      transition-all duration-200 group
                      ${isActive(item.path)
                        ? 'bg-theme-primary text-white shadow-lg'
                        : 'text-theme-text-secondary hover:bg-theme-primary-light hover:text-theme-primary'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    {isActive(item.path) && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="ml-auto w-2 h-2 rounded-full bg-white"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Logout */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-theme-border">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-200"
              >
                <HiLogout className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
