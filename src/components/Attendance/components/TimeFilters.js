import React from 'react';
import { timeFilters } from '../utils/data';

const TimeFilters = ({ activeFilter, setActiveFilter }) => {
  return (
    <div className="time-filters">
      {timeFilters.map((filter) => (
        <button
          key={filter}
          className={`time-filter ${activeFilter === filter ? 'active' : ''}`}
          onClick={() => setActiveFilter(filter)}
        >
          {filter}
          {activeFilter === filter && <span className="filter-indicator" />}
        </button>
      ))}
      <button 
        className="today-btn"
        onClick={() => setActiveFilter('Day')}
      >
        Today
      </button>
    </div>
  );
};

export default TimeFilters;