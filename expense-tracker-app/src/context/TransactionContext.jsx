import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';
import * as transactionService from '../services/transactionService';
import { getDaysRemainingInMonth } from '../utils/dateUtils';

const TransactionContext = createContext(null);

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};

export const TransactionProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [syncStatus, setSyncStatus] = useState('synced'); // 'synced' | 'updating'
  const [lastSynced, setLastSynced] = useState(null);

  /**
   * Load transactions from storage
   */
  const loadTransactions = useCallback(() => {
    if (!currentUser) {
      setTransactions([]);
      return;
    }

    setSyncStatus('updating');
    const data = transactionService.getTransactions(currentUser.id);
    setTransactions(data);
    setSyncStatus('synced');
    setLastSynced(new Date());
  }, [currentUser]);

  // Load on user change
  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  // Refresh on tab focus
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && currentUser) {
        loadTransactions();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [currentUser, loadTransactions]);

  /**
   * Add a new transaction
   */
  const addTransaction = useCallback((transactionData) => {
    if (!currentUser) return null;

    setSyncStatus('updating');
    const newTransaction = transactionService.addTransaction(currentUser.id, transactionData);
    setTransactions((prev) => [...prev, newTransaction]);
    setSyncStatus('synced');
    setLastSynced(new Date());

    return newTransaction;
  }, [currentUser]);

  /**
   * Delete a transaction
   */
  const deleteTransaction = useCallback((transactionId) => {
    if (!currentUser) return false;

    setSyncStatus('updating');
    const success = transactionService.deleteTransaction(currentUser.id, transactionId);
    if (success) {
      setTransactions((prev) => prev.filter((t) => t.id !== transactionId));
    }
    setSyncStatus('synced');
    setLastSynced(new Date());

    return success;
  }, [currentUser]);

  // Computed values from current month transactions
  const now = new Date();
  const currentMonthTransactions = transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  const summary = transactionService.calculateSummary(currentMonthTransactions);
  const allTimeSummary = transactionService.calculateSummary(transactions);

  // Daily spend limit calculation
  const daysRemaining = getDaysRemainingInMonth();
  const dailyLimit = daysRemaining > 0 ? Math.max(0, summary.balance) / daysRemaining : 0;

  const value = {
    transactions,
    currentMonthTransactions,
    addTransaction,
    deleteTransaction,
    loadTransactions,
    summary,
    allTimeSummary,
    dailyLimit,
    daysRemaining,
    syncStatus,
    lastSynced,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContext;
