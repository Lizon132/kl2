// File: frontend/src/pages/EditorPage.jsx

import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Youtube from '@tiptap/extension-youtube';
import { useSearchParams } from 'react-router-dom';



export default function EditorPage() {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [showCode, setShowCode] = useState(false);
  const [rawHtml, setRawHtml] = useState('');
  const [searchParams] = useSearchParams();
  const autoLoadId = searchParams.get('id');

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
  fetch(`${import.meta.env.VITE_API_URL}/posts/all`)
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

useEffect(() => {
  if (!autoLoadId || !editor) return;

  fetch(`${import.meta.env.VITE_API_URL}/posts/${autoLoadId}`)
    .then(res => res.json())
    .then(data => {
      setCurrentPost(data);
      editor.commands.setContent(data.body || '');
    })
    .catch(err => console.error('Error loading post by ID:', err));
}, [autoLoadId, editor]);


  const loadPost = async (post) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${post.id}`);
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
  
    await fetch(`${import.meta.env.VITE_API_URL}/posts/${currentPost.id}`, {
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
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 border-end vh-100 overflow-auto p-3">
          <h5 className="mb-3">Posts</h5>
          <ul className="list-group">
            {Array.isArray(posts) && posts.length > 0 ? (
              posts.map(post => (
                <li
                  key={post.id}
                  className="list-group-item list-group-item-action"
                  onClick={() => loadPost(post)}
                  style={{ cursor: 'pointer' }}
                >
                  {post.title || `Post #${post.id}`}
                </li>
              ))
            ) : (
              <p className="text-muted">No posts found.</p>
            )}
          </ul>
        </div>

        {/* Editor Area */}
        <div className="col-md-9 p-4">
          {currentPost ? (
            <>
              <div className="mb-3">
                <h4>{currentPost.title || `Post #${currentPost.id}`}</h4>
                <div className="btn-group mb-3">
                <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  if (!showCode && editor) {
                    setRawHtml(editor.getHTML().replace(/></g, '>\n<')); // pretty format when entering source
                  } else if (showCode && editor && rawHtml) {
                    editor.commands.setContent(rawHtml);
                  }
                  setShowCode(!showCode);
                }}
              >
                {showCode ? 'Switch to Editor' : 'Show Source'}
              </button>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => editor.chain().focus().insertContent('[preview-break]').run()}
                  >
                    Insert Preview Break
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={savePost}>Save</button>
                </div>
                <div className="mb-2 text-muted small">
                  Insert <code>[preview-break]</code> to mark where the preview ends.
                </div>
              </div>

              <div className="card shadow-sm">
                <div className="card-body bg-light">
                  {showCode ? (
                    <textarea
                    className="form-control"
                    style={{ minHeight: '400px', fontFamily: 'monospace' }}
                    value={rawHtml}
                    onChange={e => setRawHtml(e.target.value)}
                  />
                  ) : (
                    <EditorContent editor={editor} />
                  )}
                </div>
              </div>
            </>
          ) : (
            <p className="text-muted">Select a post to begin editing.</p>
          )}
        </div>
      </div>
    </div>
  );
}
