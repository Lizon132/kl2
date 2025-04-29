// File: frontend/src/pages/EditorPage.jsx

import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Youtube from '@tiptap/extension-youtube';

export default function EditorPage() {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [showCode, setShowCode] = useState(false);
  const [rawHtml, setRawHtml] = useState('');

  const editor = useEditor({
  extensions: [
    StarterKit,
    Image.configure({
      HTMLAttributes: {
        class: 'content-image', // You can adjust this or remove if you want
      },
    }),
    Link.configure({
      openOnClick: true,
      HTMLAttributes: {
        target: '_blank',
        rel: 'noopener noreferrer',
      },
    }),
    Youtube.configure({
      width: 640,
      height: 360,
      allowFullscreen: true,
    }),
  ],
  content: '', // Will be loaded dynamically
});

useEffect(() => {
    fetch('/posts/all')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error('Expected array but got:', data);
        }
      })
      .catch(err => console.error('Error loading posts:', err));
  }, []);

  const loadPost = async (post) => {
    const res = await fetch(`/posts/${post.id}`);
    const data = await res.json();
    setCurrentPost(data);
    editor.commands.setContent(data.body || '');
    setRawHtml(data.body || '');
  };

  const savePost = async () => {
    if (!editor || !currentPost) return;
  
    if (showCode) {
      // If user is in Source View, push rawHtml into the editor first
      editor.commands.setContent(rawHtml);
    }
  
    await fetch(`/posts/${currentPost.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body: editor.getHTML() }),
    });
  
    alert('Post saved.');
  };

  if (!Array.isArray(posts)) {
    return <p>Loading post list...</p>;
  }

  return (
    <div className="d-flex">
      <div className="p-3 border-end" style={{ width: '300px', height: '100vh', overflowY: 'auto' }}>
        <h4>Posts</h4>
        <ul className="list-group">
            {Array.isArray(posts) ? (
                posts.map(post => (
                  <li key={post.id} className="list-group-item list-group-item-action" onClick={() => loadPost(post)}>
                    {post.title || `Post #${post.id}`}
                </li>
                ))
            ) : (
                <p>Loading posts...</p>
            )}
        </ul>
      </div>

      <div className="p-4 flex-fill">
        {currentPost ? (
          <>
            <h4>Editing: {currentPost.title || `Post #${currentPost.id}`}</h4>
            <button className="btn btn-secondary btn-sm me-2" onClick={() => {
                if (showCode) {
                    // If we're switching FROM source TO editor, update the editor content
                    editor.commands.setContent(rawHtml);
                }
                setShowCode(!showCode);
                }}>
              {showCode ? 'Switch to Editor' : 'Show Source'}
            </button>
            <button className="btn btn-primary btn-sm" onClick={savePost}>Save</button>

            <div className="mt-3 border p-2 bg-light" style={{ minHeight: '400px' }}>
            {showCode ? (
                <textarea
                    value={rawHtml.replace(/></g, '>\n<')}
                    onChange={(e) => setRawHtml(e.target.value)}
                    style={{
                        width: '100%',
                        minHeight: '400px',
                        fontFamily: 'monospace',
                        whiteSpace: 'pre-wrap',
                        resize: 'vertical',
                        border: '1px solid #ced4da',
                        borderRadius: '0.25rem',
                        padding: '0.5rem',
                        display: 'block',
                        boxSizing: 'border-box',
                    }}
              />
                ) : (
                <EditorContent editor={editor} />
            )}

            </div>
          </>
        ) : (
          <p>Select a post from the list to begin editing.</p>
        )}
      </div>
    </div>
  );
}
