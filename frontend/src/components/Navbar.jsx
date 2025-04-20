import React from 'react';
import { Link } from 'react-router-dom';
// import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="navbar-logo">Digital Dinner</h2>
      <ul className="navbar-links">
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/order">Order</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
