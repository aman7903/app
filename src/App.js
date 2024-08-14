import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './Components/HomePage';
import TransactionManagement from './Components/TransactionManagement';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
        <h2>Expense Tracker</h2>
          <ul>
          <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/transactions">Transactions</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/transactions" element={<TransactionManagement />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
