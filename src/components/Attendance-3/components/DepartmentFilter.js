import React from 'react';

const DepartmentFilter = ({ departments, selectedDepartment, onChange }) => {
  return (
    <div className="department-filter">
      <label htmlFor="department-select">Department:</label>
      <select 
        id="department-select"
        value={selectedDepartment} 
        onChange={onChange}
        className="filter-select"
      >
        {departments.map(dept => (
          <option key={dept} value={dept}>{dept}</option>
        ))}
      </select>
    </div>
  );
};

export default DepartmentFilter;