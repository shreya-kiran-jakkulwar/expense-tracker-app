import React, { useEffect, useState, useRef } from 'react';

/**
 * Animated counter that smoothly counts from 0 to target value
 */
const AnimatedCounter = ({
  value,
  duration = 1000,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  formatter,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const prevValueRef = useRef(0);
  const animationRef = useRef(null);

  useEffect(() => {
    const startValue = prevValueRef.current;
    const endValue = typeof value === 'number' ? value : 0;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (endValue - startValue) * eased;

      setDisplayValue(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        prevValueRef.current = endValue;
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, duration]);

  const formatted = formatter
    ? formatter(displayValue)
    : displayValue.toFixed(decimals);

  return (
    <span className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
};

export default AnimatedCounter;
