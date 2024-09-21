import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const currentUser = JSON.parse(localStorage.getItem("TransactionUser"));

  // Fetch all transactions for the current user
  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:5000/transactionApi/transactions');
      const allTransactions = await response.json();
      
      // Filter transactions by current user's ID
      const userTransactions = allTransactions.filter(transaction => transaction.userId === currentUser._id);

      // Calculate total income, expense, and balance
      let totalIncome = 0;
      let totalExpense = 0;

      userTransactions.forEach(transaction => {
        if (transaction.transactionType === 'income') {
          totalIncome += transaction.amount;
        } else if (transaction.transactionType === 'expense') {
          totalExpense += transaction.amount;
        }
      });

      setIncome(totalIncome);
      setExpense(totalExpense);
      setBalance(totalIncome - totalExpense);

    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchTransactions();
    }
  });

  return (
    <Row xs={1} sm={2} md={3} className="g-4 mb-5">
      <Col>
        <Card className='dashboard-card'>
          <Card.Body>
            <Card.Title>Balance</Card.Title>
            <Card.Text>
              &#8377;{balance}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className='dashboard-card'>
          <Card.Body>
            <Card.Title>Income</Card.Title>
            <Card.Text>
              &#8377;{income}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className='dashboard-card'>
          <Card.Body>
            <Card.Title>Expense</Card.Title>
            <Card.Text>
              &#8377;{expense}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard;
