import React from 'react';

const DepartmentFilter = ({ departments, selectedDepartment, onChange }) => {
  return (
    <div className="department-filter">
      <select value={selectedDepartment} onChange={onChange}>
        {departments.map(dept => (
          <option key={dept} value={dept}>{dept}</option>
        ))}
      </select>
    </div>
  );
};

export default DepartmentFilter;