// ========================================
// STORAGE SERVICE
// Abstraction over localStorage with per-user namespacing
// Future-ready for Firebase swap
// ========================================

import { STORAGE_KEYS } from '../utils/constants';

/**
 * Get data from localStorage for a specific user
 * @param {string} userId
 * @param {string} key - storage key suffix
 * @returns {*} parsed data or null
 */
export const getUserData = (userId, key) => {
  try {
    const fullKey = `${key}_${userId}`;
    const data = localStorage.getItem(fullKey);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error reading ${key} for user ${userId}:`, error);
    return null;
  }
};

/**
 * Set data in localStorage for a specific user
 * @param {string} userId
 * @param {string} key - storage key suffix
 * @param {*} value - data to store
 */
export const setUserData = (userId, key, value) => {
  try {
    const fullKey = `${key}_${userId}`;
    localStorage.setItem(fullKey, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key} for user ${userId}:`, error);
  }
};

/**
 * Remove data from localStorage for a specific user
 * @param {string} userId
 * @param {string} key
 */
export const removeUserData = (userId, key) => {
  try {
    const fullKey = `${key}_${userId}`;
    localStorage.removeItem(fullKey);
  } catch (error) {
    console.error(`Error removing ${key} for user ${userId}:`, error);
  }
};

/**
 * Clear all data for a specific user
 * @param {string} userId
 */
export const clearUserData = (userId) => {
  Object.values(STORAGE_KEYS).forEach((key) => {
    removeUserData(userId, key);
  });
};

/**
 * Get global (non-user-specific) data
 * @param {string} key
 * @returns {*}
 */
export const getGlobalData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error reading global ${key}:`, error);
    return null;
  }
};

/**
 * Set global (non-user-specific) data
 * @param {string} key
 * @param {*} value
 */
export const setGlobalData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing global ${key}:`, error);
  }
};

/**
 * Remove global data
 * @param {string} key
 */
export const removeGlobalData = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing global ${key}:`, error);
  }
};
