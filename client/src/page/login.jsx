import React, { useEffect, useState } from 'react';
import { sendForm } from '../api/sendForm';
import { addlocalStore } from '../storage/addstore';

import './login.css';
import { formatNumber } from '../utils/formatNumber';

const LoginPage = () => {
  const [getForm, setForm] = useState({ email: '', number: '' });
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let timerInterval;
    const startTimer = () => {
      timerInterval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    };
    const stopTimer = () => {
      clearInterval(timerInterval);
      setTimer(0);
    };
    startTimer();
    try {
      const data = await sendForm({
        ...getForm,
        number: getForm.number.replace(/-/g, ''),
      });

      if (data.error) {
        setError(data.error);
        setResults([]);
      } else if (data.message) {
        setError(data.message);
        stopTimer();
      } else {
        setResults(data.users);
        setError('');
      }
    } catch (error) {
      setError(error.message);
      setResults([]);
    } finally {
      stopTimer();
    }
  };

  useEffect(() => {
    addlocalStore();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === 'number' ? formatNumber(value) : value,
    }));
  };

  return (
    <div className="login-page">
      <h1>Search Users</h1>
      <form className="custom-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={getForm.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="number">Number:</label>
          <input
            type="text"
            id="number"
            name="number"
            value={getForm.number}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      <div className="results-section">
        {timer ? <>request stopwatch: {timer}</> : ''}

        <h2>Results</h2>
        <ul>
          {error ? (
            <li className="error-message">{error}</li>
          ) : (
            results.map((user, index) => (
              <li key={index} className="result-item">
                {user.email} - {user.number}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default LoginPage;
