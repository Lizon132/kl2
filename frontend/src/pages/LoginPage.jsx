import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const res = await fetch('${import.meta.env.VITE_API_URL}/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
  
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username); 
      alert('Login successful!');
      navigate('/dashboard');
    } else {
      alert('Login failed');
    }
  };  

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} required />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Log In</button>
    </form>
  );
}
