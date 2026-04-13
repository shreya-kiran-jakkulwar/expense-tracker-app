import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCheckCircle, HiXCircle, HiInformationCircle, HiExclamation } from 'react-icons/hi';
import { useToast } from '../../context/ToastContext';

const iconMap = {
  success: HiCheckCircle,
  error: HiXCircle,
  info: HiInformationCircle,
  warning: HiExclamation,
};

const colorMap = {
  success: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
  error: 'bg-red-500/15 border-red-500/30 text-red-400',
  info: 'bg-blue-500/15 border-blue-500/30 text-blue-400',
  warning: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
};

const iconColorMap = {
  success: 'text-emerald-400',
  error: 'text-red-400',
  info: 'text-blue-400',
  warning: 'text-amber-400',
};

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = iconMap[toast.type] || HiInformationCircle;

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`
                pointer-events-auto
                flex items-center gap-3 px-4 py-3
                rounded-xl border
                backdrop-blur-md shadow-lg
                ${colorMap[toast.type]}
              `}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${iconColorMap[toast.type]}`} />
              <p className="text-sm font-medium text-theme-text flex-1">
                {toast.message}
              </p>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
              >
                <svg className="w-4 h-4 text-theme-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
