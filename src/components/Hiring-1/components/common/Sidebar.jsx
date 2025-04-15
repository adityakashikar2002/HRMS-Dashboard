import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/components.css';

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    { path: '/', icon: '📊', label: 'Dashboard' },
    { path: '/jobs', icon: '💼', label: 'Jobs' },
    { path: '/interviews', icon: '🎤', label: 'Interviews' },
    { path: '/candidates', icon: '👥', label: 'Candidates' },
    { path: '/offers', icon: '📝', label: 'Offers' }
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `menu-item ${isActive ? 'active' : ''}`
            }
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;