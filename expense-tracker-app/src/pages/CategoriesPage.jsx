import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header';
import PageTransition from '../components/layout/PageTransition';
import Card from '../components/ui/Card';
import EmptyState from '../components/shared/EmptyState';
import { AnalyticsSkeleton } from '../components/ui/SkeletonLoader';
import useAnalytics from '../hooks/useAnalytics';
import { useTransactions } from '../context/TransactionContext';
import { formatCurrency } from '../utils/formatters';
import { DEFAULT_CATEGORIES } from '../utils/constants';

const CategoriesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { transactions } = useTransactions();
  const { categoryBreakdown } = useAnalytics();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-theme-bg transition-theme">
        <Header variant="dashboard" />
        <main className="max-w-7xl mx-auto">
          <AnalyticsSkeleton />
        </main>
      </div>
    );
  }

  const expenseTransactions = transactions.filter((t) => t.type === 'expense');
  const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);

  // All categories, even those without spending
  const allCategories = DEFAULT_CATEGORIES.map((cat) => {
    const breakdownItem = categoryBreakdown.find((b) => b.id === cat.id);
    return {
      ...cat,
      total: breakdownItem?.total || 0,
      count: breakdownItem?.count || 0,
      percentage: breakdownItem?.percentage || 0,
    };
  }).sort((a, b) => b.total - a.total);

  return (
    <div className="min-h-screen bg-theme-bg transition-theme">
      <Header variant="dashboard" />

      <PageTransition>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-theme-text">Categories</h1>
            <p className="text-sm text-theme-text-muted">
              Spending breakdown by category • Total: {formatCurrency(totalExpenses)}
            </p>
          </div>

          {categoryBreakdown.length === 0 ? (
            <Card hover={false}>
              <EmptyState
                icon="📂"
                title="No spending data"
                description="Add some expenses to see your category breakdown."
              />
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allCategories.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="group">
                    <div className="flex items-start gap-4">
                      {/* Category icon */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: `${cat.color}20` }}
                      >
                        {cat.emoji}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-sm font-semibold text-theme-text">{cat.name}</h3>
                          <span className="text-sm font-bold text-theme-text">
                            {formatCurrency(cat.total)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-theme-text-muted">
                            {cat.count} transaction{cat.count !== 1 ? 's' : ''}
                          </span>
                          <span className="text-xs font-medium" style={{ color: cat.color }}>
                            {cat.percentage.toFixed(1)}%
                          </span>
                        </div>

                        {/* Progress bar */}
                        <div className="h-2 bg-theme-bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${cat.percentage}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.05 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: cat.color }}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </PageTransition>
    </div>
  );
};

export default CategoriesPage;
