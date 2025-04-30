import React, { useEffect, useState } from 'react';

export default function DashboardPage() {
  const username = localStorage.getItem('username');
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    fetch('/posts/all')
      .then(res => res.json())
      .then(data => {
        setPostCount(data.length);
      });
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Welcome back, {username || 'User'}!</h2>

      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Posts Created</h5>
              <p className="display-6">{postCount}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Quick Links</h5>
              <ul className="list-unstyled mb-0">
                <li><a href="/edit" className="text-decoration-none">✏️ Edit Posts</a></li>
                <li><a href="/posts" className="text-decoration-none">📄 View Blog</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Optional: recent activity, account settings, etc. */}
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Coming Soon</h5>
              <p className="text-muted">Activity log, account settings, and more...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
