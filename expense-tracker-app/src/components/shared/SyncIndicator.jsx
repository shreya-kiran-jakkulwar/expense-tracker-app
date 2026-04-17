import React from 'react';
import { useTransactions } from '../../context/TransactionContext';

const SyncIndicator = () => {
  const { syncStatus } = useTransactions();

  return (
    <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium">
      {syncStatus === 'synced' ? (
        <>
          <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
          <span className="text-theme-text-muted hidden sm:inline">Synced</span>
        </>
      ) : (
        <>
          <svg className="w-3 h-3 animate-spin text-theme-primary" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-theme-text-muted hidden sm:inline">Updating...</span>
        </>
      )}
    </div>
  );
};

export default SyncIndicator;
