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

  const [income, setIncome] = useState(getSavedData('income'));
  const [expenses, setExpenses] = useState(getSavedData('expenses'));
  const [balance, setBalance] = useState(getSavedData('balance'));

  useEffect(() => {
    
    localStorage.setItem('income', JSON.stringify(income));
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('balance', JSON.stringify(balance));
  }, [income, expenses, balance]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setBalance(income - expenses);
  };

  const data = {
    labels: ['Income', 'Expenses', 'Balance'],
    datasets: [
      {
        label: 'Amount',
        data: [income, expenses, balance],
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
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
              />
            </label>
            <label>
              Total Expenses:
              <input
                type="number"
                value={expenses}
                onChange={(e) => setExpenses(Number(e.target.value))}
              />
            </label>
            <button type="submit">Calculate Balance</button>
          </form>
        </div>
        <div className="summary">
          <h3>Summary</h3>
          <p>Income: ${income}</p>
          <p>Expenses: ${expenses}</p>
          <p>Balance: ${balance}</p>
        </div>
      </div>
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default HomePage;
