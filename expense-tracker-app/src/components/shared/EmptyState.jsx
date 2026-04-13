import React from 'react';
import { motion } from 'framer-motion';

const EmptyState = ({
  icon = '📭',
  title = 'No data yet',
  description = 'Start adding entries to see your data here.',
  action,
  actionLabel,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 px-6 text-center"
    >
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-theme-text mb-2">{title}</h3>
      <p className="text-sm text-theme-text-muted max-w-xs mb-6">{description}</p>
      {action && actionLabel && (
        <button
          onClick={action}
          className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg"
          style={{ background: 'var(--gradient-primary)' }}
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
};

export default EmptyState;
