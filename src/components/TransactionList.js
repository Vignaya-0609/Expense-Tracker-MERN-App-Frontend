import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import TransactionForm from './TransactionForm';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

const TransactionList = ({ onTransactionChange }) => {
  const [transactions, setTransactions] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("TransactionUser"));
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTransactionId, setselectedTransactionId] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

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

  const handleEdit = (transactionId) => {
    setselectedTransactionId(transactionId);
    setShowEditModal(true);
  };

  const handleDelete = (transactionId) => {
    setselectedTransactionId(transactionId);
    setShowDeleteModal(true);
  };

  const handleTransactionChange = async () => {
    await fetchTransactions();
    onTransactionChange(); // Notify parent to update transactions
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(new Date(dateString));
  };

  return (
    <div>
      <div className='d-flex align-items-center justify-content-between'>
        <h4 className='mb-3'>Transaction History</h4>
        <Button variant="" className='btn-clr mb-3' onClick={() => setShowModal(true)}>Add Transaction</Button>
      </div>
      <Table striped bordered responsive className='mt-3'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.slice().reverse().map(transaction => (
            <tr key={transaction._id}>
              <td>{transaction.description}</td>
              <td className={transaction.transactionType === 'income' ? 'text-success' : 'text-danger'}>
                {transaction.transactionType === 'income' ? '+' : '-'} &#8377;{Math.abs(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>{formatDate(transaction.updatedAt)}</td>
              <td>
                <FaEdit onClick={() => handleEdit(transaction._id)} className="me-3 icon-clr fs-5">Edit</FaEdit>
                <MdDelete onClick={() => handleDelete(transaction._id)} className="me-3 icon-clr fs-5">Delete</MdDelete>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <TransactionForm show={showModal} handleClose={() => setShowModal(false)} onTransactionChange={handleTransactionChange} />
      <EditModal show={showEditModal} handleClose={() => setShowEditModal(false)} transactionId={selectedTransactionId} onTransactionChange={handleTransactionChange} />
      <DeleteModal show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} transactionId={selectedTransactionId} onTransactionChange={handleTransactionChange} />
    </div>
  );
};

export default TransactionList;
