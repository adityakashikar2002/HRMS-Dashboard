import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar-hiring">
      <div className="sidebar-header">
        <h2>Hiring Dashboard</h2>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/hiring">
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/hiring/jobs">
            <i className="fas fa-briefcase"></i> Jobs
          </Link>
        </li>
        <li>
          <Link to="/hiring/candidates">
            <i className="fas fa-users"></i> Candidates
          </Link>
        </li>
        <li>
          <Link to="/hiring/interviews">
            <i className="fas fa-calendar-alt"></i> Interviews
          </Link>
        </li>
        <li>
          <Link to="/hiring/offers">
            <i className="fas fa-file-signature"></i> Offers
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;