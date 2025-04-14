import React from 'react';

const YearFilter = ({ years, selectedYear, onChange }) => {
  return (
    <div className="year-filter">
      <select value={selectedYear} onChange={onChange}>
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </div>
  );
};

export default YearFilter;