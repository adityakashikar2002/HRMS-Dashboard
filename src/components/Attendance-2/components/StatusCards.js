import React from 'react';
import { statusTypes } from '../utils/data';

const StatusCards = ({ statusCounts, loading, setLoading }) => {
  // Demonstrate using setLoading
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <div className="status-cards">
      {statusTypes.map((status) => (
        <div 
          key={status.code} 
          className={`status-card ${loading ? 'loading' : ''}`}
          onClick={handleRefresh}
        >
          <div className="status-code" style={{ color: status.textColor }}>
            {status.code}
          </div>
          <div className="status-info">
            <div className="status-name" style={{ color: status.textColor }}>
              {status.name}
            </div>
            <div className="status-count" style={{ color: status.textColor }}>
              {loading ? '...' : statusCounts[status.name.replace(' ', '').toLowerCase()]}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusCards;