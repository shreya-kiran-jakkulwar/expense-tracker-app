// ========================================
// FORMATTING UTILITIES
// ========================================

/**
 * Format a number as Indian Rupee currency
 * @param {number} amount
 * @param {boolean} showSign - Whether to show +/- prefix
 * @returns {string}
 */
export const formatCurrency = (amount, showSign = false) => {
  const absAmount = Math.abs(amount);
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(absAmount);

  if (showSign && amount !== 0) {
    return amount > 0 ? `+${formatted}` : `-${formatted}`;
  }

  return formatted;
};

/**
 * Format a number with commas (Indian numbering)
 * @param {number} num
 * @returns {string}
 */
export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-IN').format(num);
};

/**
 * Format a date to readable string
 * @param {Date|string} date
 * @param {string} format - 'short', 'long', 'iso'
 * @returns {string}
 */
export const formatDate = (date, format = 'short') => {
  const d = new Date(date);

  switch (format) {
    case 'short':
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    case 'long':
      return d.toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    case 'iso':
      return d.toISOString().split('T')[0];
    case 'time':
      return d.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
      });
    default:
      return d.toLocaleDateString('en-IN');
  }
};

/**
 * Format a date relative to now
 * @param {Date|string} date
 * @returns {string}
 */
export const formatRelativeDate = (date) => {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now - d;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(date, 'short');
};

/**
 * Truncate text with ellipsis
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const truncateText = (text, maxLength = 20) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Format a percentage
 * @param {number} value
 * @param {number} total
 * @returns {string}
 */
export const formatPercentage = (value, total) => {
  if (total === 0) return '0%';
  return `${((value / total) * 100).toFixed(1)}%`;
};
