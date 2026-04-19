import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';

// Clear users as requested
if (!localStorage.getItem('users_cleared')) {
  localStorage.removeItem('budgetbuddy_users');
  localStorage.removeItem('budgetbuddy_current_user');
  localStorage.setItem('users_cleared', 'true');
  console.log('Cleared all existing users from expense tracker.');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
