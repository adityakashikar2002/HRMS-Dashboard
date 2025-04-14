import React from 'react';
import { format, parseISO } from 'date-fns';

const OvertimeHistory = ({ history, loading }) => {
  if (loading) return <div className="card-skeleton" />;

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Overtime History</h3>
        <button className="card-action">View All</button>
      </div>
      <div className="card-body">
        {history.map(item => (
          <div key={item.id} className="overtime-item">
            <div className="overtime-date">
              {format(parseISO(item.date), 'dd MM yyyy')}
            </div>
            <div className="overtime-details">
              <div className="overtime-info">
                <span className="overtime-name">{item.name}</span>
                <span className="overtime-role">{item.role}</span>
              </div>
              <div className="overtime-hours">
                <span className="hours-value">{item.hours}</span>
                <span className="hours-label">overtime</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OvertimeHistory;