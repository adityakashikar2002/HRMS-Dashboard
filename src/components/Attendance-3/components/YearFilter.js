import React from 'react';

const YearFilter = ({ years, selectedYear, onChange }) => {
  return (
    <div className="year-filter">
      <label htmlFor="year-select">Year:</label>
      <select 
        id="year-select"
        value={selectedYear} 
        onChange={onChange}
        className="filter-select"
      >
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </div>
  );
};

export default YearFilter;