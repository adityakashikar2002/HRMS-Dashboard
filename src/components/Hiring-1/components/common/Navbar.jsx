import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components.css';

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-btn" onClick={toggleSidebar}>
          <span className="menu-icon">☰</span>
        </button>
        <Link to="/" className="logo">
          Hiring Dashboard
        </Link>
      </div>
      <div className="navbar-right">
        <div className="user-profile">
          <span className="user-name">Admin</span>
          <div className="user-avatar">A</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;