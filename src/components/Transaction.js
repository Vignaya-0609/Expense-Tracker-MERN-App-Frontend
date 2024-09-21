import React from 'react'
import TransactionList from './TransactionList';

function Transaction() {
    const transactions = [
        { id: 1, amount: 200, date: '2023-09-12' },
        { id: 2, amount: 450, date: '2023-09-10' },
        { id: 3, amount: 300, date: '2023-09-11' },
        { id: 1, amount: 200, date: '2023-09-12' },
        { id: 3, amount: 300, date: '2023-09-11' },
        { id: 3, amount: 300, date: '2023-09-11' }
    ];
    return <TransactionList transactions={transactions} />;

}

export default Transaction