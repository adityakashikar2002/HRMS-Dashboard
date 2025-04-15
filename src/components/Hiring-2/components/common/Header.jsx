import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header-hiring">
      <div className="header-content">
        <div className="user-info">
          <div className="user-avatar">
            <i className="fas fa-user"></i>
          </div>
          <div className="user-details">
            <span className="user-name">Admin User</span>
            <span className="user-role">Hiring Manager</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="notification-button">
            <i className="fas fa-bell"></i>
            <span className="notification-badge">3</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;