// ========================================
// APPLICATION CONSTANTS
// ========================================

export const APP_NAME = 'BudgetBuddy';
export const APP_DESCRIPTION = 'Track, analyze, and optimize your finances with a smooth and intuitive experience.';

// ========================================
// ROUTE PATHS
// ========================================

export const ROUTES = {
  LANDING: '/',
  HOME: '/home',
  ANALYTICS: '/analytics',
  CATEGORIES: '/categories',
  PROFILE: '/profile',
};

// ========================================
// TRANSACTION TYPES
// ========================================

export const TRANSACTION_TYPES = {
  EARNING: 'earning',
  EXPENSE: 'expense',
};

export const TRANSACTION_TYPE_OPTIONS = [
  { value: TRANSACTION_TYPES.EARNING, label: 'Earning 💰' },
  { value: TRANSACTION_TYPES.EXPENSE, label: 'Expense 💸' },
];

// ========================================
// CATEGORIES
// ========================================

export const DEFAULT_CATEGORIES = [
  { id: 'food', name: 'Food', emoji: '🍔', color: '#f97316' },
  { id: 'travel', name: 'Travel', emoji: '✈️', color: '#3b82f6' },
  { id: 'stationary', name: 'Stationary', emoji: '📚', color: '#8b5cf6' },
  { id: 'bills', name: 'Bills', emoji: '💡', color: '#eab308' },
  { id: 'shopping', name: 'Shopping', emoji: '🛍️', color: '#ec4899' },
  { id: 'entertainment', name: 'Entertainment', emoji: '🎬', color: '#14b8a6' },
  { id: 'health', name: 'Health', emoji: '🏥', color: '#ef4444' },
  { id: 'education', name: 'Education', emoji: '🎓', color: '#6366f1' },
  { id: 'salary', name: 'Salary', emoji: '💼', color: '#22c55e' },
  { id: 'freelance', name: 'Freelance', emoji: '💻', color: '#06b6d4' },
  { id: 'investment', name: 'Investment', emoji: '📈', color: '#10b981' },
  { id: 'other', name: 'Other', emoji: '📌', color: '#64748b' },
];

// ========================================
// THEME CONFIGURATIONS
// ========================================

export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
  PASTEL_RED: 'pastel-red',
  PASTEL_GREEN: 'pastel-green',
  PASTEL_BLUE: 'pastel-blue',
  LAVENDER: 'lavender',
};

export const PASTEL_THEMES = [
  { id: THEMES.PASTEL_RED, name: 'Soft Red', emoji: '🌸', color: '#f43f5e', bg: '#fff1f2' },
  { id: THEMES.PASTEL_GREEN, name: 'Mint Green', emoji: '🌿', color: '#10b981', bg: '#ecfdf5' },
  { id: THEMES.PASTEL_BLUE, name: 'Sky Blue', emoji: '☁️', color: '#3b82f6', bg: '#eff6ff' },
  { id: THEMES.LAVENDER, name: 'Lavender', emoji: '💜', color: '#8b5cf6', bg: '#f5f3ff' },
];

// ========================================
// STORAGE KEYS
// ========================================

export const STORAGE_KEYS = {
  USERS: 'budgetbuddy_users',
  CURRENT_USER: 'budgetbuddy_current_user',
  TRANSACTIONS: 'budgetbuddy_transactions',
  PROFILE: 'budgetbuddy_profile',
  THEME: 'budgetbuddy_theme',
  CATEGORIES: 'budgetbuddy_categories',
  ONBOARDING_DONE: 'budgetbuddy_onboarding_done',
};

// ========================================
// CHART COLORS
// ========================================

export const CHART_COLORS = [
  '#d0acfe', '#fe97b9', '#a0e0ff', '#34d399',
  '#c29eef', '#ee8aac', '#72c6eb', '#fbbf24',
  '#b491e1', '#81d4fa', '#f97316', '#22c55e',
];

// ========================================
// CALENDAR
// ========================================

export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// ========================================
// TIME PERIODS (for analytics)
// ========================================

export const TIME_PERIODS = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
};

// ========================================
// LOADING MESSAGES
// ========================================

export const LOADING_MESSAGES = [
  'Fetching financial data...',
  'Crunching your numbers...',
  'Analyzing spending patterns...',
  'Loading your dashboard...',
];
