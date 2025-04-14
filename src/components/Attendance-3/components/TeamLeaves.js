import React, { useState } from 'react';
import { exportToCSV } from '../utils/exportUtils';

const TeamLeaves = ({ leaves, timeRange }) => {
  const [expandedLeave, setExpandedLeave] = useState(null);

  const toggleLeave = (id) => {
    setExpandedLeave(expandedLeave === id ? null : id);
  };

  const handleExport = () => {
    const headers = ['Date', 'Employee', 'Role', 'Type', 'Days Left'];
    const rows = leaves.map(leave => [
      leave.date,
      leave.name,
      leave.role,
      leave.type,
      leave.daysLeft || 'N/A'
    ]);
    exportToCSV([headers, ...rows], `team-leaves-${timeRange}`);
  };

  return (
    <div className="team-leaves">
      <div className="section-header">
        <h3>Team Leaves</h3>
        <button className="export-btn" onClick={handleExport}>
          Export CSV
        </button>
      </div>
      <div className="leaves-list">
        {leaves.map((leave) => (
          <React.Fragment key={leave.id}>
            <div 
              className="leave-item" 
              onClick={() => toggleLeave(leave.id)}
            >
              <div className="leave-date">{leave.date}</div>
              <div className="leave-info">
                <div className="leave-name">{leave.name} - {leave.role}</div>
                <div className="leave-type">{leave.type}</div>
                {leave.daysLeft && <div className="leave-days">{leave.daysLeft}</div>}
              </div>
            </div>
            {expandedLeave === leave.id && (
              <div className="leave-details">
                <div className="detail-row">
                  <span>Start Date:</span>
                  <span>{leave.startDate || leave.date.split(' - ')[0]}</span>
                </div>
                <div className="detail-row">
                  <span>End Date:</span>
                  <span>{leave.endDate || leave.date.split(' - ')[1] || leave.date.split(' - ')[0]}</span>
                </div>
                <div className="detail-row">
                  <span>Reason:</span>
                  <span>{leave.reason || 'Not specified'}</span>
                </div>
                <div className="detail-row">
                  <span>Contact:</span>
                  <span>{leave.contact || 'Not provided'}</span>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TeamLeaves;