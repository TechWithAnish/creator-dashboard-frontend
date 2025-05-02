import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Inside handleSubmit in Login.js
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        email,
        password,
      });
      console.log('Login response:', res.data);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('credits', res.data.credits);
      localStorage.setItem('plan', res.data.plan);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('username', res.data.username);
      if (res.data.role === 'Admin') {
        console.log('Redirecting to /admin');
        navigate('/admin');
      } else {
        console.log('Redirecting to /feed');
        navigate('/feed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4 text-primary">Creator Dashboard</h1>
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0">Login</h2>
            </div>
            <div className="card-body">
              {error && <p className="text-danger">{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
              <p className="mt-3 text-center">
                New user? <Link to="/register">Register here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;