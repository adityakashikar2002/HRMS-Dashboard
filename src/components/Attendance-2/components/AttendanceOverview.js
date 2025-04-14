import React from 'react';

const statusColors = {
  Present: '#1F9254',
  Absent: '#A30D11',
  'Half Day': '#CD6200'
};

const AttendanceOverview = ({ data }) => {
  return (
    <div className="attendance-overview">
      <h3>Attendance Overview</h3>
      <div className="overview-container">
        <div className="overview-header">
          <span>ID</span>
          <span>Employee</span>
          <span>Role</span>
          <span>Dept.</span>
          <span>Status</span>
          <span>Check-in</span>
          <span>Check-out</span>
          <span>Work hours</span>
          <span>Overtime</span>
        </div>
        <div className="overview-body">
          {data.map((employee) => (
            <div key={employee.id} className="overview-row">
              <span>{employee.id}</span>
              <span>{employee.name}</span>
              <span>{employee.role}</span>
              <span>{employee.department}</span>
              <span 
                className="status-cell"
                style={{ 
                  color: statusColors[employee.status] || '#5F6D7E',
                  fontWeight: 600
                }}
              >
                {employee.status}
              </span>
              <span>{employee.checkIn}</span>
              <span>{employee.checkOut}</span>
              <span>{employee.workHours}</span>
              <span>{employee.overtime}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceOverview;