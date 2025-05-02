import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Feed from './components/Feed';
import AdminDashboard from './components/AdminDashboard';
import Register from './components/Register';
import SavedPosts from './components/SavedPosts';
import UpgradePlan from './components/UpgradePlan';

const ProtectedRoute = ({ children, adminOnly }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && role !== 'Admin') {
    return <Navigate to="/feed" />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved"
          element={
            <ProtectedRoute>
              <SavedPosts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upgrade"
          element={
            <ProtectedRoute>
              <UpgradePlan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;