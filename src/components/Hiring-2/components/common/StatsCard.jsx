import React from 'react';
import './StatsCard.css';

const StatsCard = ({ title, value, subValue }) => {
  return (
    <div className="stats-card">
      <div className="stats-value">{value}</div>
      <div className="stats-title">{title}</div>
      {subValue && <div className="stats-sub-value">{subValue}</div>}
    </div>
  );
};

export default StatsCard;