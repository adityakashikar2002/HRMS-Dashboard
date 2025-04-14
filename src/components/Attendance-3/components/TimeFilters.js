import React from 'react';
import { timeFilters } from '../utils/data';

const TimeFilters = ({ activeFilter, setActiveFilter, onTodayClick }) => {
  return (
    <div className="time-filters">
      <div className="filter-buttons">
        {timeFilters.map((filter) => (
          <button
            key={filter}
            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <button className="today-btn" onClick={onTodayClick}>
        <span className="icon">📅</span>
        Today
      </button>
    </div>
  );
};

export default TimeFilters;