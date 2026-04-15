import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTransactions } from '../../context/TransactionContext';
import { useToast } from '../../context/ToastContext';
import { validateTransaction } from '../../utils/validators';
import { DEFAULT_CATEGORIES, TRANSACTION_TYPE_OPTIONS } from '../../utils/constants';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

const INITIAL_FORM = {
  type: '',
  category: '',
  description: '',
  amount: '',
};

const TransactionForm = () => {
  const { addTransaction } = useTransactions();
  const toast = useToast();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateTransaction(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);

    // Small delay for UX feedback
    await new Promise((resolve) => setTimeout(resolve, 300));

    addTransaction(formData);

    const isExpense = formData.type === 'expense';
    toast.success(isExpense ? 'Expense Added ✅' : 'Earning Added 💰');

    setFormData(INITIAL_FORM);
    setErrors({});
    setLoading(false);
  };

  const categoryOptions = DEFAULT_CATEGORIES.map((cat) => ({
    value: cat.id,
    label: `${cat.emoji} ${cat.name}`,
  }));

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <h3 className="text-lg font-semibold text-theme-text mb-4 flex items-center gap-2">
        <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
          style={{ background: 'var(--gradient-primary)' }}>
          ➕
        </span>
        Add Transaction
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          name="type"
          label="Type"
          placeholder="Earning or Expense"
          options={TRANSACTION_TYPE_OPTIONS}
          value={formData.type}
          onChange={handleChange}
          error={errors.type}
          required
          id="transaction-type"
        />

        <Select
          name="category"
          label="Category"
          placeholder="Select category"
          options={categoryOptions}
          value={formData.category}
          onChange={handleChange}
          error={errors.category}
          required
          id="transaction-category"
        />

        <Input
          name="description"
          label="Description"
          placeholder="e.g., Pizza, Uber Ride"
          value={formData.description}
          onChange={handleChange}
          error={errors.description}
          required
          id="transaction-description"
        />

        <Input
          name="amount"
          label="Amount (₹)"
          type="number"
          placeholder="0.00"
          value={formData.amount}
          onChange={handleChange}
          error={errors.amount}
          required
          id="transaction-amount"
        />
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          type="submit"
          loading={loading}
          icon="💸"
          id="add-transaction-btn"
        >
          Add Transaction
        </Button>
      </div>
    </motion.form>
  );
};

export default TransactionForm;
