import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SavedPosts = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem('savedPosts')) || [];
    setSavedPosts(posts);
  }, []);

  const handleShare = (post) => {
    const mockLink = `https://news.example.com/post/${encodeURIComponent(post.title)}`;
    navigator.clipboard.writeText(mockLink).then(() => {
      alert(`Link for "${post.title}" copied to clipboard: ${mockLink}`);
    }).catch(err => {
      console.error('Failed to copy link:', err);
      alert('Failed to copy link. Please try again.');
    });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">Saved Posts</h2>
        <div>
          <button className="btn btn-primary me-2" onClick={() => navigate('/feed')}>
            Back to Feed
          </button>
          <button className="btn btn-danger" onClick={() => navigate('/login')}>
            Logout
          </button>
        </div>
      </div>
      {savedPosts.length === 0 ? (
        <p>No saved posts yet.</p>
      ) : (
        savedPosts.map((post, index) => (
          <div key={index} className="card mb-3">
            <div className="card-body">
              <p className="card-text">{post.title}</p>
              <p className="card-text text-muted">Source: {post.source}</p>
              <div>
                <button className="btn btn-link p-0" onClick={() => handleShare(post)}>
                  Share
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedPosts;