// ========================================
// TRANSACTION SERVICE
// Business logic for managing transactions
// ========================================

import { STORAGE_KEYS } from '../utils/constants';
import { getUserData, setUserData } from './storageService';

/**
 * Generate a unique transaction ID
 * @returns {string}
 */
const generateId = () => {
  return `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Get all transactions for a user
 * @param {string} userId
 * @returns {Array}
 */
export const getTransactions = (userId) => {
  return getUserData(userId, STORAGE_KEYS.TRANSACTIONS) || [];
};

/**
 * Add a new transaction
 * @param {string} userId
 * @param {object} transactionData - { type, category, description, amount }
 * @returns {object} the created transaction
 */
export const addTransaction = (userId, transactionData) => {
  const transactions = getTransactions(userId);

  const newTransaction = {
    id: generateId(),
    type: transactionData.type,
    category: transactionData.category,
    description: transactionData.description,
    amount: Number(transactionData.amount),
    date: transactionData.date || new Date().toISOString(),
    timestamp: Date.now(),
  };

  transactions.push(newTransaction);
  setUserData(userId, STORAGE_KEYS.TRANSACTIONS, transactions);

  return newTransaction;
};

/**
 * Delete a transaction by ID
 * @param {string} userId
 * @param {string} transactionId
 * @returns {boolean} success
 */
export const deleteTransaction = (userId, transactionId) => {
  const transactions = getTransactions(userId);
  const filtered = transactions.filter((t) => t.id !== transactionId);

  if (filtered.length === transactions.length) return false;

  setUserData(userId, STORAGE_KEYS.TRANSACTIONS, filtered);
  return true;
};

/**
 * Get transactions filtered by date range
 * @param {string} userId
 * @param {Date} startDate
 * @param {Date} endDate
 * @returns {Array}
 */
export const getTransactionsByDateRange = (userId, startDate, endDate) => {
  const transactions = getTransactions(userId);
  return transactions.filter((t) => {
    const date = new Date(t.date);
    return date >= startDate && date <= endDate;
  });
};

/**
 * Get transactions for current month
 * @param {string} userId
 * @returns {Array}
 */
export const getCurrentMonthTransactions = (userId) => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  return getTransactionsByDateRange(userId, startOfMonth, endOfMonth);
};

/**
 * Calculate financial summary from transactions
 * @param {Array} transactions
 * @returns {{ totalEarnings: number, totalExpenses: number, balance: number }}
 */
export const calculateSummary = (transactions) => {
  let totalEarnings = 0;
  let totalExpenses = 0;

  transactions.forEach((t) => {
    if (t.type === 'earning') {
      totalEarnings += t.amount;
    } else {
      totalExpenses += t.amount;
    }
  });

  return {
    totalEarnings,
    totalExpenses,
    balance: totalEarnings - totalExpenses,
  };
};

/**
 * Calculate daily spending for a specific date
 * @param {Array} transactions
 * @param {Date} date
 * @returns {number}
 */
export const getDailySpending = (transactions, date) => {
  return transactions
    .filter((t) => {
      const tDate = new Date(t.date);
      return (
        t.type === 'expense' &&
        tDate.getFullYear() === date.getFullYear() &&
        tDate.getMonth() === date.getMonth() &&
        tDate.getDate() === date.getDate()
      );
    })
    .reduce((sum, t) => sum + t.amount, 0);
};

/**
 * Delete all transactions for a user
 * @param {string} userId
 */
export const clearAllTransactions = (userId) => {
  setUserData(userId, STORAGE_KEYS.TRANSACTIONS, []);
};
