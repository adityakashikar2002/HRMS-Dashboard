import React from 'react';
import { statusTypes } from '../utils/data';
import { exportToCSV } from '../utils/exportUtils';

const StatusCards = ({ statusCounts, loading, setLoading, timeRange }) => {
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleExport = () => {
    const headers = ['Status', 'Code', 'Count'];
    const rows = statusTypes.map(status => [
      status.name,
      status.code,
      statusCounts[status.name.replace(' ', '').toLowerCase()]
    ]);
    exportToCSV([headers, ...rows], `status-counts-${timeRange}`);
  };

  return (
    <div className="status-cards">
      <div className="section-header">
        <h3>Employee Status</h3>
        <button className="export-btn" onClick={handleExport}>
          Export CSV
        </button>
      </div>
      <div className="cards-container">
        {statusTypes.map((status) => (
          <div 
            key={status.code} 
            className={`status-card ${loading ? 'loading' : ''}`}
            onClick={handleRefresh}
            style={{ 
              backgroundColor: status.color,
              borderLeftColor: status.textColor
            }}
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
    </div>
  );
};

export default StatusCards;