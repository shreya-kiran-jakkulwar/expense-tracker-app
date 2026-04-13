import React from 'react';

/**
 * Skeleton loader with shimmer animation
 * Variants: text, card, chart, calendar, circle, avatar
 */
const SkeletonLoader = ({
  variant = 'text',
  width,
  height,
  count = 1,
  className = '',
}) => {
  const baseClass = 'skeleton animate-shimmer';

  const variantStyles = {
    text: { width: width || '100%', height: height || '16px', borderRadius: '8px' },
    heading: { width: width || '60%', height: height || '24px', borderRadius: '8px' },
    card: { width: width || '100%', height: height || '120px', borderRadius: '16px' },
    chart: { width: width || '100%', height: height || '200px', borderRadius: '16px' },
    calendar: { width: width || '100%', height: height || '300px', borderRadius: '16px' },
    circle: { width: width || '40px', height: height || '40px', borderRadius: '50%' },
    avatar: { width: width || '48px', height: height || '48px', borderRadius: '50%' },
    button: { width: width || '100px', height: height || '40px', borderRadius: '12px' },
  };

  const style = variantStyles[variant] || variantStyles.text;

  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {items.map((i) => (
        <div
          key={i}
          className={baseClass}
          style={{
            ...style,
            ...(variant === 'text' && i > 0 ? { width: `${Math.random() * 40 + 60}%` } : {}),
          }}
        />
      ))}
    </div>
  );
};

/**
 * Dashboard skeleton - full loading state
 */
export const DashboardSkeleton = () => (
  <div className="space-y-6 p-6">
    {/* Header skeleton */}
    <div className="flex items-center justify-between">
      <SkeletonLoader variant="heading" width="200px" />
      <div className="flex gap-3">
        <SkeletonLoader variant="circle" width="36px" height="36px" />
        <SkeletonLoader variant="circle" width="36px" height="36px" />
        <SkeletonLoader variant="circle" width="36px" height="36px" />
      </div>
    </div>

    {/* Form skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <SkeletonLoader variant="button" width="100%" height="48px" />
      <SkeletonLoader variant="button" width="100%" height="48px" />
      <SkeletonLoader variant="button" width="100%" height="48px" />
      <SkeletonLoader variant="button" width="100%" height="48px" />
    </div>

    {/* Summary cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SkeletonLoader variant="card" height="140px" />
      <SkeletonLoader variant="card" height="140px" />
      <SkeletonLoader variant="card" height="140px" />
    </div>

    {/* Chart & Calendar */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SkeletonLoader variant="chart" height="280px" />
      <SkeletonLoader variant="calendar" height="280px" />
    </div>
  </div>
);

/**
 * Analytics skeleton
 */
export const AnalyticsSkeleton = () => (
  <div className="space-y-6 p-6">
    <SkeletonLoader variant="heading" width="180px" />
    <div className="flex gap-3">
      {[...Array(4)].map((_, i) => (
        <SkeletonLoader key={i} variant="button" width="80px" height="36px" />
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SkeletonLoader variant="chart" height="300px" />
      <SkeletonLoader variant="chart" height="300px" />
    </div>
    <SkeletonLoader variant="card" height="160px" />
  </div>
);

export default SkeletonLoader;
