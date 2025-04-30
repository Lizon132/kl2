import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function FullPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const isLoggedIn = !!localStorage.getItem('token');

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
  

  useEffect(() => {
    fetch(`/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data));
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>{post.title}</h2>
  
      {isLoggedIn && (
        <div className="mb-3">
          <Link to={`/edit?id=${post.id}`} className="btn btn-outline-secondary btn-sm">
            ✏️ Edit This Post
          </Link>
        </div>
      )}
  
        <div dangerouslySetInnerHTML={{ __html: processGoogleMapsEmbeds(post.body.replace('[preview-break]', '')), }} />

    </div>
  );
}
