import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants';
import { getGlobalData, setGlobalData, getUserData, setUserData, clearUserData, removeGlobalData } from '../services/storageService';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const savedSession = getGlobalData(STORAGE_KEYS.CURRENT_USER);
    if (savedSession) {
      setCurrentUser(savedSession);
    }
    setIsLoading(false);
  }, []);

  /**
   * Register a new user
   */
  const register = useCallback((userId, password, name) => {
    const users = getGlobalData(STORAGE_KEYS.USERS) || {};

    if (users[userId]) {
      return { success: false, error: 'User ID already exists' };
    }

    // Create user
    users[userId] = {
      id: userId,
      password,
      createdAt: new Date().toISOString(),
    };
    setGlobalData(STORAGE_KEYS.USERS, users);

    // Create profile
    const profile = {
      name: name || userId,
      contact: '',
      profession: '',
      dateOfBirth: '',
    };
    setUserData(userId, STORAGE_KEYS.PROFILE, profile);

    // Set session
    const session = { id: userId, name: profile.name };
    setCurrentUser(session);
    setGlobalData(STORAGE_KEYS.CURRENT_USER, session);

    return { success: true };
  }, []);

  /**
   * Login with credentials
   */
  const login = useCallback((userId, password) => {
    const users = getGlobalData(STORAGE_KEYS.USERS) || {};

    if (!users[userId]) {
      return { success: false, error: 'User not found' };
    }

    if (users[userId].password !== password) {
      return { success: false, error: 'Incorrect password' };
    }

    const profile = getUserData(userId, STORAGE_KEYS.PROFILE) || { name: userId };
    const session = { id: userId, name: profile.name };
    setCurrentUser(session);
    setGlobalData(STORAGE_KEYS.CURRENT_USER, session);

    return { success: true };
  }, []);

  /**
   * Logout current user
   */
  const logout = useCallback(() => {
    setCurrentUser(null);
    removeGlobalData(STORAGE_KEYS.CURRENT_USER);
  }, []);

  /**
   * Delete current user's account
   */
  const deleteAccount = useCallback(() => {
    if (!currentUser) return;

    const userId = currentUser.id;

    // Remove from users registry
    const users = getGlobalData(STORAGE_KEYS.USERS) || {};
    delete users[userId];
    setGlobalData(STORAGE_KEYS.USERS, users);

    // Clear user data
    clearUserData(userId);

    // Logout
    logout();
  }, [currentUser, logout]);

  /**
   * Update the session's display name
   */
  const updateSessionName = useCallback((name) => {
    if (!currentUser) return;
    const updated = { ...currentUser, name };
    setCurrentUser(updated);
    setGlobalData(STORAGE_KEYS.CURRENT_USER, updated);
  }, [currentUser]);

  const value = {
    currentUser,
    isLoading,
    isAuthenticated: !!currentUser,
    login,
    register,
    logout,
    deleteAccount,
    updateSessionName,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
