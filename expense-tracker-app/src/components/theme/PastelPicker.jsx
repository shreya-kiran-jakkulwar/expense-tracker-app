import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PASTEL_THEMES, THEMES } from '../../utils/constants';

const PastelPicker = ({ isOpen, onSelect, onClose, currentTheme }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={onClose} />

          {/* Picker dropdown */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 z-50 p-3 rounded-xl bg-theme-card border border-theme-border shadow-theme-lg min-w-[220px]"
          >
            <p className="text-xs font-semibold text-theme-text-muted uppercase tracking-wider mb-3 px-1">
              Choose your vibe ✨
            </p>

            {/* Default light option */}
            <button
              onClick={() => onSelect(THEMES.LIGHT)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1
                transition-all duration-200 text-left
                ${currentTheme === THEMES.LIGHT
                  ? 'bg-theme-primary-light ring-2 ring-theme-primary'
                  : 'hover:bg-theme-primary-light'
                }
              `}
            >
              <div
                className="w-8 h-8 rounded-lg border-2 border-gray-200 flex items-center justify-center text-sm"
                style={{ background: '#f8fafc' }}
              >
                ☀️
              </div>
              <div>
                <p className="text-sm font-medium text-theme-text">Default Light</p>
                <p className="text-xs text-theme-text-muted">Clean & minimal</p>
              </div>
              {currentTheme === THEMES.LIGHT && (
                <span className="ml-auto text-theme-primary">✓</span>
              )}
            </button>

            {/* Pastel options */}
            {PASTEL_THEMES.map((pastel) => (
              <button
                key={pastel.id}
                onClick={() => onSelect(pastel.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1
                  transition-all duration-200 text-left
                  ${currentTheme === pastel.id
                    ? 'bg-theme-primary-light ring-2 ring-theme-primary'
                    : 'hover:bg-theme-primary-light'
                  }
                `}
              >
                <div
                  className="w-8 h-8 rounded-lg border-2 flex items-center justify-center text-sm"
                  style={{
                    background: pastel.bg,
                    borderColor: `${pastel.color}40`,
                  }}
                >
                  {pastel.emoji}
                </div>
                <div>
                  <p className="text-sm font-medium text-theme-text">{pastel.name}</p>
                  <p className="text-xs text-theme-text-muted">{pastel.emoji} Pastel</p>
                </div>
                {currentTheme === pastel.id && (
                  <span className="ml-auto text-theme-primary">✓</span>
                )}
              </button>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PastelPicker;
