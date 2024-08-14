import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; 


function TransactionManagement() {

  const getSavedData = (key) => {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : [];
  };
  const [transactions, setTransactions] = useState(getSavedData('transactions'));
  const [editId, setEditId] = useState(null);
  const [entry, setEntry] = useState({
    type: '',
    amount: '',
    category: '',
    date: '',
    description: '',
  });

  

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    if (editId !== null) {
      const item = transactions.find(t => t.id === editId);
      setEntry(item);
    }
  }, [editId, transactions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId !== null) {
      const updatedTransactions = transactions.map(t =>
        t.id === editId ? { ...t, ...entry } : t
      );
      setTransactions(updatedTransactions);
      setEditId(null);
    } else {
      const newTransaction = { ...entry, id: Date.now() };
      setTransactions([...transactions, newTransaction]);
    }
    setEntry({ type: '', amount: '', category: '', date: '', description: '' });
  };

  const handleChange = (e) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  const handleDelete = (id) => {
    const updatedTransactions = transactions.filter(t => t.id !== id);
    setTransactions(updatedTransactions);
  };

  const handleEdit = (id) => {
    setEditId(id);
  };

  return (
    <div className="transaction-container">
      <div className="form-container">
        <h2>Transaction Management</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Type:
            <select name="type" value={entry.type} onChange={handleChange}>
              <option value="">Select Type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </label>
          <label>
            Amount:
            <input type="number" name="amount" required value={entry.amount} onChange={handleChange} placeholder="Amount" />
          </label>
          <label>
            Category:
            <input type="text" name="category" required value={entry.category} onChange={handleChange} placeholder="Category" />
          </label>
          <label>
            Date:
            <input type="date" name="date"  required value={entry.date} onChange={handleChange} />
          </label>
          <label>
            Description:
            <textarea name="description" required value={entry.description} onChange={handleChange} placeholder="Description"></textarea>
          </label>
          <button type="submit">{editId ? 'Update' : 'Add'} Transaction</button>
        </form>
      </div>
      <div className="list-container">
        <h3>Transaction List</h3>
        <ul>
          {transactions.map(t => (
            <li key={t.id}>
              <p>{t.type}: ${t.amount} - {t.category} on {t.date} - {t.description}</p>
              <button onClick={() => handleEdit(t.id)}>Edit</button>
              <button onClick={() => handleDelete(t.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TransactionManagement;
