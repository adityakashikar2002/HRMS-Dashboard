import React from 'react';

const OvertimeHistory = ({ history }) => {
  return (
    <div className="overtime-history">
      <h3>Overtime History</h3>
      {history.map((item) => (
        <div key={item.id} className="overtime-item">
          <div className="overtime-date">{item.date}</div>
          <div className="overtime-info">
            <div className="overtime-name">{item.name} - {item.role}</div>
            <div className="overtime-hours">{item.hours}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OvertimeHistory;