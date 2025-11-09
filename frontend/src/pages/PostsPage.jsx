import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function processGoogleMapsEmbeds(html) {
  return html.replace(
    /https:\/\/www\.google\.com\/maps\/embed\?pb=[^"'\s<]+/g,
    (match) => {
      return `<iframe 
        src="${match}" 
        width="600" 
        height="450" 
        style="border:0;" 
        allowfullscreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>`;
    }
  );
}

function getPreview(html) {
  const marker = '[preview-break]';
  const index = html.indexOf(marker);

  if (index !== -1) {
    return html.slice(0, index); // ✅ returns only content before the marker
  }

  // fallback: strip HTML and truncate plain text
  const stripped = html.replace(/<[^>]+>/g, '').replace(marker, '');
  return stripped.length > 200 ? stripped.slice(0, 200) + '...' : stripped;
}


export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/posts?page=${page}`)
      .then(res => res.json())
      .then(data => setPosts(data));
  }, [page]);

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">Blog Posts</h1>

      {posts.map(post => (
        <div key={post.id} className="card mb-4 shadow-sm">
          <div className="card-body">
            <h3 className="card-title">{post.title}</h3>
            <p className="text-muted small">Post #{post.id}</p>
            <div
              className="card-text"
              dangerouslySetInnerHTML={{ __html: getPreview(processGoogleMapsEmbeds(post.body)) }}
            />
            <Link to={`/posts/${post.id}`} className="btn btn-outline-primary btn-sm mt-3">
              Read More →
            </Link>
          </div>
        </div>
      ))}

      <div className="d-flex justify-content-between mt-5">
        <button className="btn btn-outline-secondary" onClick={() => setPage(p => Math.max(1, p - 1))}>
          ← Prev
        </button>
        <button className="btn btn-outline-secondary" onClick={() => setPage(p => p + 1)}>
          Next →
        </button>
      </div>
    </div>
  );
}
