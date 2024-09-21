import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import TransactionList from './TransactionList';

const FetchTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("TransactionUser"));

  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:5000/transactionApi/transactions');
      const allTransactions = await response.json();
      const userTransactions = allTransactions.filter(transaction => transaction.userId === currentUser._id);
      setTransactions(userTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleTransactionChange = () => {
    fetchTransactions();
  };

  return (
    <div>
      <Dashboard transactions={transactions} />
      <TransactionList onTransactionChange={handleTransactionChange} />
    </div>
  );
};

export default FetchTransaction;
