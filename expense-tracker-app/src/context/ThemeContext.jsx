import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { THEMES, STORAGE_KEYS } from '../utils/constants';
import { getUserData, setUserData } from '../services/storageService';
import { useAuth } from './AuthContext';

const ThemeContext = createContext(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [theme, setThemeState] = useState(THEMES.DARK);
  const [showSpotlight, setShowSpotlight] = useState(false);

  // Load theme from storage when user changes
  useEffect(() => {
    if (currentUser) {
      const savedTheme = getUserData(currentUser.id, STORAGE_KEYS.THEME);
      if (savedTheme && Object.values(THEMES).includes(savedTheme)) {
        setThemeState(savedTheme);
      } else {
        setThemeState(THEMES.DARK);
      }
    } else {
      setThemeState(THEMES.DARK);
    }
  }, [currentUser]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    // Toggle dark class for Tailwind dark: utilities
    if (theme === THEMES.DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  /**
   * Set and persist theme
   */
  const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme);
    if (currentUser) {
      setUserData(currentUser.id, STORAGE_KEYS.THEME, newTheme);
    }
  }, [currentUser]);

  /**
   * Toggle between dark and light mode
   */
  const toggleDarkMode = useCallback(() => {
    const newTheme = theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    setTheme(newTheme);
  }, [theme, setTheme]);

  /**
   * Check if current theme is a dark theme
   */
  const isDark = theme === THEMES.DARK;

  /**
   * Check if current theme is a light/pastel theme
   */
  const isLight = theme !== THEMES.DARK;

  /**
   * Trigger spotlight onboarding
   */
  const triggerSpotlight = useCallback(() => {
    if (currentUser) {
      const onboardingDone = getUserData(currentUser.id, STORAGE_KEYS.ONBOARDING_DONE);
      if (!onboardingDone) {
        setShowSpotlight(true);
      }
    }
  }, [currentUser]);

  /**
   * Dismiss spotlight
   */
  const dismissSpotlight = useCallback(() => {
    setShowSpotlight(false);
    if (currentUser) {
      setUserData(currentUser.id, STORAGE_KEYS.ONBOARDING_DONE, true);
    }
  }, [currentUser]);

  const value = {
    theme,
    setTheme,
    toggleDarkMode,
    isDark,
    isLight,
    showSpotlight,
    triggerSpotlight,
    dismissSpotlight,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
