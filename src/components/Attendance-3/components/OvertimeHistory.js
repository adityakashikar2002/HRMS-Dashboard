import React, { useState } from 'react';
import { exportToCSV } from '../utils/exportUtils';

const OvertimeHistory = ({ history, timeRange }) => {
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleItem = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const handleExport = () => {
    const headers = ['Date', 'Employee', 'Role', 'Hours', 'Approval Status'];
    const rows = history.map(item => [
      item.date,
      item.name,
      item.role,
      item.hours,
      item.approvalStatus || 'Pending'
    ]);
    exportToCSV([headers, ...rows], `overtime-history-${timeRange}`);
  };

  return (
    <div className="overtime-history">
      <div className="section-header">
        <h3>Overtime History</h3>
        <button className="export-btn" onClick={handleExport}>
          Export CSV
        </button>
      </div>
      <div className="history-list">
        {history.map((item) => (
          <React.Fragment key={item.id}>
            <div 
              className="overtime-item" 
              onClick={() => toggleItem(item.id)}
            >
              <div className="overtime-date">{item.date}</div>
              <div className="overtime-info">
                <div className="overtime-name">{item.name} - {item.role}</div>
                <div className="overtime-hours">{item.hours}</div>
              </div>
            </div>
            {expandedItem === item.id && (
              <div className="overtime-details">
                <div className="detail-row">
                  <span>Approval Status:</span>
                  <span className={`status-${item.approvalStatus?.toLowerCase() || 'pending'}`}>
                    {item.approvalStatus || 'Pending'}
                  </span>
                </div>
                <div className="detail-row">
                  <span>Reason:</span>
                  <span>{item.reason || 'No reason provided'}</span>
                </div>
                <div className="detail-row">
                  <span>Manager:</span>
                  <span>{item.manager || 'Not assigned'}</span>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default OvertimeHistory;