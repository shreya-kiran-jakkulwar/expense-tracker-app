import React from 'react';
import { motion } from 'framer-motion';
import { HiTrendingUp, HiTrendingDown, HiCash } from 'react-icons/hi';
import { useTransactions } from '../../context/TransactionContext';
import AnimatedCounter from '../shared/AnimatedCounter';
import Card from '../ui/Card';

const SummaryCards = () => {
  const { summary } = useTransactions();

  const formatter = (val) => {
    const absVal = Math.abs(val);
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(absVal);
  };

  const cards = [
    {
      title: 'Total Earnings',
      value: summary.totalEarnings,
      icon: <HiTrendingUp className="w-6 h-6" />,
      iconBg: 'bg-emerald-500/15',
      iconColor: 'text-emerald-400',
      borderColor: 'border-l-emerald-400',
    },
    {
      title: 'Total Expenses',
      value: summary.totalExpenses,
      icon: <HiTrendingDown className="w-6 h-6" />,
      iconBg: 'bg-red-500/15',
      iconColor: 'text-red-400',
      borderColor: 'border-l-red-400',
    },
    {
      title: 'Balance',
      value: summary.balance,
      icon: <HiCash className="w-6 h-6" />,
      iconBg: 'bg-blue-500/15',
      iconColor: 'text-blue-400',
      borderColor: 'border-l-blue-400',
      isBalance: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card, i) => (
        <Card
          key={card.title}
          className={`border-l-4 ${card.borderColor}`}
          hover
        >
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-theme-text-secondary">
                {card.title}
              </p>
              <div className={`p-2 rounded-xl ${card.iconBg} ${card.iconColor}`}>
                {card.icon}
              </div>
            </div>
            <div className={`text-2xl font-bold ${
              card.isBalance
                ? summary.balance >= 0
                  ? 'text-emerald-400'
                  : 'text-red-400'
                : 'text-theme-text'
            }`}>
              <AnimatedCounter
                value={card.value}
                formatter={formatter}
                duration={1200}
              />
            </div>
            <p className="text-xs text-theme-text-muted mt-1">This month</p>
          </motion.div>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCards;
