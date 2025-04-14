import React, { useState } from 'react';
import { exportToCSV } from '../utils/exportUtils';

const statusColors = {
  Present: '#1F9254',
  Absent: '#A30D11',
  'Half Day': '#CD6200'
};

const AttendanceOverview = ({ data, timeRange }) => {
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleExport = () => {
    const headers = ['ID', 'Employee', 'Role', 'Department', 'Status', 'Check-in', 'Check-out', 'Work hours', 'Overtime'];
    const rows = data.map(employee => [
      employee.id,
      employee.name,
      employee.role,
      employee.department,
      employee.status,
      employee.checkIn,
      employee.checkOut,
      employee.workHours,
      employee.overtime
    ]);
    exportToCSV([headers, ...rows], `attendance-overview-${timeRange}`);
  };

  return (
    <div className="attendance-overview">
      <div className="overview-header">
        <h3>Attendance Overview</h3>
        <button className="export-btn" onClick={handleExport}>
          Export CSV
        </button>
      </div>
      <div className="overview-container">
        <div className="overview-header-row">
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
            <React.Fragment key={employee.id}>
              <div className="overview-row" onClick={() => toggleRow(employee.id)}>
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
              {expandedRow === employee.id && (
                <div className="row-details">
                  <div className="detail-item">
                    <span>Last Activity:</span>
                    <span>{employee.lastActivity || 'No recent activity'}</span>
                  </div>
                  <div className="detail-item">
                    <span>Device:</span>
                    <span>{employee.device || 'Unknown'}</span>
                  </div>
                  <div className="detail-item">
                    <span>Location:</span>
                    <span>{employee.location || 'Not available'}</span>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceOverview;