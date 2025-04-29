import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className='container'>
        <Link to="/">Home</Link> | 
        <Link to="/posts">Posts</Link> | 
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
