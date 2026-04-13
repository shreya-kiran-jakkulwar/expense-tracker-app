import React, { useState, useRef } from 'react';
import { HiSun, HiMoon } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { THEMES } from '../../utils/constants';
import PastelPicker from './PastelPicker';

const ThemeToggle = () => {
  const { theme, isDark, setTheme } = useTheme();
  const [showPastelPicker, setShowPastelPicker] = useState(false);
  const buttonRef = useRef(null);

  const handleClick = () => {
    if (isDark) {
      // Switch to light - show pastel picker
      setTheme(THEMES.LIGHT);
      setShowPastelPicker(true);
    } else {
      // Switch to dark
      setTheme(THEMES.DARK);
      setShowPastelPicker(false);
    }
  };

  const handlePastelSelect = (themeId) => {
    setTheme(themeId);
    setShowPastelPicker(false);
  };

  return (
    <div className="relative" id="theme-toggle-wrapper">
      <motion.button
        ref={buttonRef}
        id="theme-toggle-btn"
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-2 rounded-xl text-theme-text-secondary hover:text-theme-primary hover:bg-theme-primary-light transition-all duration-200 relative"
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <HiMoon className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <HiSun className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <PastelPicker
        isOpen={showPastelPicker}
        onSelect={handlePastelSelect}
        onClose={() => setShowPastelPicker(false)}
        currentTheme={theme}
      />
    </div>
  );
};

export default ThemeToggle;
