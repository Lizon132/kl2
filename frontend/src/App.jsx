import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PostsPage from './pages/PostsPage';
import EditorPage from './pages/EditorPage';
import FullPostPage from './pages/FullPostPage';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<PostsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/edit" element={<EditorPage />} />
        <Route path="/posts/:id" element={<FullPostPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
