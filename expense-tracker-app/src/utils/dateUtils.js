// ========================================
// DATE UTILITY FUNCTIONS
// ========================================

/**
 * Get the number of days remaining in the current month
 * @returns {number}
 */
export const getDaysRemainingInMonth = () => {
  const now = new Date();
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return lastDay.getDate() - now.getDate();
};

/**
 * Get the total number of days in a given month
 * @param {number} year
 * @param {number} month - 0-indexed
 * @returns {number}
 */
export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Get the first day of the week (0 = Sun) for a given month
 * @param {number} year
 * @param {number} month - 0-indexed
 * @returns {number}
 */
export const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

/**
 * Get the start of today (midnight)
 * @returns {Date}
 */
export const getStartOfDay = (date = new Date()) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * Get the start of the current week (Sunday)
 * @param {Date} date
 * @returns {Date}
 */
export const getStartOfWeek = (date = new Date()) => {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * Get the start of the current month
 * @param {Date} date
 * @returns {Date}
 */
export const getStartOfMonth = (date = new Date()) => {
  const d = new Date(date);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * Get the start of the current year
 * @param {Date} date
 * @returns {Date}
 */
export const getStartOfYear = (date = new Date()) => {
  const d = new Date(date);
  d.setMonth(0, 1);
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * Check if two dates are the same day
 * @param {Date|string} date1
 * @param {Date|string} date2
 * @returns {boolean}
 */
export const isSameDay = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

/**
 * Check if a date is today
 * @param {Date|string} date
 * @returns {boolean}
 */
export const isToday = (date) => {
  return isSameDay(date, new Date());
};

/**
 * Check if a date is in the current month
 * @param {Date|string} date
 * @returns {boolean}
 */
export const isCurrentMonth = (date) => {
  const d = new Date(date);
  const now = new Date();
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
};

/**
 * Generate an array of dates for a calendar month view
 * Includes padding days from previous/next months
 * @param {number} year
 * @param {number} month - 0-indexed
 * @returns {Array<{ date: Date, isCurrentMonth: boolean, isToday: boolean }>}
 */
export const getCalendarDays = (year, month) => {
  const days = [];
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month);
  const daysInPrevMonth = getDaysInMonth(year, month - 1);
  const today = new Date();

  // Previous month padding
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, daysInPrevMonth - i),
      isCurrentMonth: false,
      isToday: false,
    });
  }

  // Current month
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    days.push({
      date,
      isCurrentMonth: true,
      isToday: isSameDay(date, today),
    });
  }

  // Next month padding (fill to 42 cells = 6 rows)
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
      isToday: false,
    });
  }

  return days;
};

/**
 * Get an array of the last N days
 * @param {number} n
 * @returns {Date[]}
 */
export const getLastNDays = (n) => {
  const days = [];
  const today = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    days.push(d);
  }
  return days;
};

/**
 * Get an array of the last N months
 * @param {number} n
 * @returns {{ month: number, year: number, label: string }[]}
 */
export const getLastNMonths = (n) => {
  const months = [];
  const now = new Date();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      month: d.getMonth(),
      year: d.getFullYear(),
      label: `${monthNames[d.getMonth()]} ${d.getFullYear()}`,
    });
  }

  return months;
};
