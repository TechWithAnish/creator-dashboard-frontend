import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState({ totalUsers: 0, activeUsers: 0, totalCreditsSpent: 0 });
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
        try {
          const token = localStorage.getItem('token');
          const analyticsRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/analytics`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const usersRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/users`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setAnalytics(analyticsRes.data);
          setUsers(usersRes.data);
        } catch (err) {
          console.error('Error fetching admin data:', err);
        }
      };
    fetchData();
  }, []);

  const handleAdjustCredits = async (userId, credits) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/admin/users/${userId}/credits`,
        { credits },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(users.map(user => user._id === userId ? { ...user, credits } : user));
    } catch (err) {
      console.error('Error adjusting credits:', err);
      alert('Failed to adjust credits. Please try again.');
    }
  };
  
  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/admin/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(users.filter(user => user._id !== userId));
        alert('User deleted successfully!');
      } catch (err) {
        console.error('Error deleting user:', err);
        alert('Failed to delete user. Please try again.');
      }
    }
  };
  
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">Admin Dashboard</h2>
      <div className="mb-3">
        <button className="btn btn-primary me-2" onClick={() => navigate('/feed')}>
          Feed
        </button>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Analytics</h3>
        </div>
        <div className="card-body">
          <p><strong>Total Users:</strong> {analytics.totalUsers}</p>
          <p><strong>Active Users:</strong> {analytics.activeUsers}</p>
          <p><strong>Total Credits Spent:</strong> {analytics.totalCreditsSpent}</p>
        </div>
      </div>
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Users</h3>
        </div>
        <ul className="list-group list-group-flush">
          {users.map(user => (
            <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{user.username}</strong> ({user.email}) - Credits: {user.credits} - Role: {user.role}
              </div>
              <div>
                <input
                  type="number"
                  className="form-control d-inline-block w-auto me-2"
                  defaultValue={user.credits}
                  onBlur={(e) => handleAdjustCredits(user._id, parseInt(e.target.value))}
                />
                {user.role !== 'Admin' && (
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(user._id)}>
                    Delete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;