import React, { useState, useEffect } from 'react';

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:3001/posts?page=${page}`)
      .then(res => res.json())
      .then(data => setPosts(data));
  }, [page]);

  return (
    <div>
      <h2>Posts</h2>
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
          <hr />
        </div>
      ))}
      <button onClick={() => setPage(p => Math.max(1, p - 1))}>← Prev</button>
      <button onClick={() => setPage(p => p + 1)}>Next →</button>
    </div>
  );
}
