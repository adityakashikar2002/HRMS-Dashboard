import React from 'react';
import { statusTypes } from '../utils/data';

const StatusCards = ({ statusCounts = {}, loading }) => {
  return (
    <div className="status-grid">
      {statusTypes.map((status) => (
        <div 
          key={status.code} 
          className={`status-card ${loading ? 'loading' : ''}`}
          style={{ 
            backgroundColor: status.color,
            borderLeft: `4px solid ${status.textColor}`
          }}
        >
          <div className="status-icon" style={{ color: status.textColor }}>
            {status.icon}
          </div>
          <div className="status-info">
            <div className="status-name">{status.name}</div>
            <div 
              className="status-count" 
              style={{ color: status.textColor }}
            >
              {loading ? '...' : statusCounts[status.key] || 0}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusCards;