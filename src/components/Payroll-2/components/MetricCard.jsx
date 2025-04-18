// src/components/MetricCard.jsx
import React from 'react';

const MetricCard = ({ title, value, change, changeType, description }) => {
  const isPositive = changeType === 'positive';
  const changeClass = isPositive ? 'text-green-500' : 'text-red-500';
  const changeIcon = isPositive ? 'fa-arrow-up' : 'fa-arrow-down';

  return (
    <div className="border border-gray-200 rounded-md p-4 flex flex-col justify-between">
      <p className="text-xs text-gray-500 mb-1">{title}</p>
      <div className="flex items-center space-x-2">
        <span className="text-xl font-semibold text-gray-900">
          {typeof value === 'number' ? `₹${value.toLocaleString('en-IN')}` : value}
        </span>
        {change && (
          <span className={`flex items-center text-xs font-semibold ${changeClass}`}>
            <i className={`fas ${changeIcon} mr-0.5`}></i>
            {change}
          </span>
        )}
        <span className="text-xs text-gray-400">{description}</span>
      </div>
    </div>
  );
};

export default MetricCard;