import React from 'react';

const ExpenseList = ({ transactions, deleteTransaction, editTransaction }) => {
  return (
    <div>
      <h3>Transactions</h3>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <p>
              {transaction.type.toUpperCase()} - ${transaction.amount} - {transaction.category} - {transaction.date} - {transaction.description}
            </p>
            <button onClick={() => editTransaction(transaction.id, transaction)}>Edit</button>
            <button onClick={() => deleteTransaction(transaction.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
