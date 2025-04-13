import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; 

export default function HomePage() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.username);
      } catch (err) {
        console.error('Failed to decode token:', err);
      }
    }
  }, []);

  return (
    <div>
      <h1>Welcome to the site!</h1>
      {username && <p>You are logged in as <strong>{username}</strong>.</p>}
    </div>
  );
}
