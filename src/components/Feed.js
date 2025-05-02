import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'User';
  const role = localStorage.getItem('role') || 'User';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/feed`);
        setPosts(res.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };
    fetchPosts();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleSave = (post) => {
    const savedPosts = JSON.parse(localStorage.getItem('savedPosts')) || [];
    if (!savedPosts.some(savedPost => savedPost.title === post.title)) {
      savedPosts.push(post);
      localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
      alert(`Post "${post.title}" saved!`);
    } else {
      alert(`Post "${post.title}" is already saved!`);
    }
  };

  const handleShare = (post) => {
    const mockLink = `https://news.example.com/post/${encodeURIComponent(post.title)}`;
    navigator.clipboard.writeText(mockLink).then(() => {
      alert(`Link for "${post.title}" copied to clipboard: ${mockLink}`);
    }).catch(err => {
      console.error('Failed to copy link:', err);
      alert('Failed to copy link. Please try again.');
    });
  };

  const handleReport = (post) => {
    console.log('Reporting post:', post.title);
    alert(`Post "${post.title}" reported! (Mock action)`);
  };

  const handleUpgradePlan = () => {
    navigate('/upgrade');
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="text-primary">Social Media Feed {role === 'Admin' ? '(Admin)' : ''}</h2>
          <p className="text-muted">Welcome, {username}</p>
        </div>
        <div>
          <span className="me-3">Credits: {localStorage.getItem('credits') || 0} | Plan: {localStorage.getItem('plan') || 'Free'}</span>
          {role === 'Admin' && (
            <button className="btn btn-primary me-2" onClick={() => navigate('/admin')}>
              Back to Analytics
            </button>
          )}
          <button className="btn btn-primary me-2" onClick={() => navigate('/saved')}>Saved Posts</button>
          <button className="btn btn-primary me-2" onClick={handleUpgradePlan}>Upgrade Plan</button>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      {posts.map((post, index) => (
        <div key={index} className="card mb-3">
          <div className="card-body">
            <p className="card-text">{post.title}</p>
            <p className="card-text text-muted">Source: {post.source}</p>
            <div>
              <button className="btn btn-link p-0 me-3" onClick={() => handleSave(post)}>Save</button>
              <button className="btn btn-link p-0 me-3" onClick={() => handleShare(post)}>Share</button>
              <button className="btn btn-link p-0" onClick={() => handleReport(post)}>Report</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;