import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import '../index.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function HomePage() {
  const getSavedData = (key) => {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : 0;
  };

  const [manualIncome, setManualIncome] = useState(getSavedData('manualIncome'));
  const [manualExpenses, setManualExpenses] = useState(getSavedData('manualExpenses'));
  const [transactionIncome, setTransactionIncome] = useState(getSavedData('income'));
  const [transactionExpenses, setTransactionExpenses] = useState(getSavedData('expenses'));
  const [balance, setBalance] = useState(getSavedData('balance'));

  useEffect(() => {
    const totalIncome = manualIncome + transactionIncome;
    const totalExpenses = manualExpenses + transactionExpenses;
    const calculatedBalance = totalIncome - totalExpenses;
    setBalance(calculatedBalance);

    localStorage.setItem('balance', JSON.stringify(calculatedBalance));
    localStorage.setItem('manualIncome', JSON.stringify(manualIncome));
    localStorage.setItem('manualExpenses', JSON.stringify(manualExpenses));
  }, [manualIncome, manualExpenses, transactionIncome, transactionExpenses]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalIncome = manualIncome + transactionIncome;
    const totalExpenses = manualExpenses + transactionExpenses;
    setBalance(totalIncome - totalExpenses);
  };

  const data = {
    labels: ['Income', 'Expenses', 'Balance'],
    datasets: [
      {
        label: 'Amount',
        data: [manualIncome + transactionIncome, manualExpenses + transactionExpenses, balance],
        backgroundColor: ['#4caf50', '#f44336', '#ff9800'],
        borderColor: ['#388e3c', '#d32f2f', '#f57c00'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="dashboard">
      <div className="form-container">
        <div className="form-balance">
          <form onSubmit={handleSubmit}>
            <label>
              Total Income:
              <input
                type="number"
                value={manualIncome}
                onChange={(e) => setManualIncome(Number(e.target.value))}
              />
            </label>
            <label>
              Total Expense:
              <input
                type="number"
                value={manualExpenses}
                onChange={(e) => setManualExpenses(Number(e.target.value))}
              />
            </label>
            <button type="submit">Calculate Balance</button>
          </form>
        </div>
        <div className="summary">
          <h3>Summary</h3>
          <p style={{fontWeight:"bold"}}>Total Income: <span style={{color:'green'}}>${manualIncome + transactionIncome}</span></p>
          <p style={{fontWeight:"bold"}}>Total Expenses: <span style={{color:'red'}}>${manualExpenses + transactionExpenses}</span></p>
          <p style={{fontWeight:"bold"}}>Balance: ${balance}</p>
        </div>
      </div>
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default HomePage;
