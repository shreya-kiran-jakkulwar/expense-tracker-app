import { useEffect, useCallback } from 'react';

/**
 * Custom hook that detects when the browser tab regains focus
 * and triggers a callback for data refresh
 * @param {function} onFocus - callback to run when tab becomes visible
 */
const useTabFocus = (onFocus) => {
  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'visible' && onFocus) {
      onFocus();
    }
  }, [onFocus]);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Also handle window focus for additional coverage
    window.addEventListener('focus', onFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', onFocus);
    };
  }, [handleVisibilityChange, onFocus]);
};

export default useTabFocus;
