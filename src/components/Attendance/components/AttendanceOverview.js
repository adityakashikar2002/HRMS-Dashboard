import React from 'react';

const AttendanceOverview = ({ data = [], loading }) => {
  const columns = [
    { label: 'ID', accessor: 'id' },
    { label: 'Name', accessor: 'name' },
    { label: 'Department', accessor: 'department' },
    {
      label: 'Status',
      accessor: 'status',
      Cell: (value) => (
        <span className={`status-badge ${value.toLowerCase().replace(' ', '-')}`}>
          {value}
        </span>
      ),
    },
    { label: 'Check In', accessor: 'checkIn' },
    { label: 'Check Out', accessor: 'checkOut' },
    { label: 'Work Hours', accessor: 'workHours' },
    { label: 'Overtime', accessor: 'overtime' },
  ];

  if (loading) return <div className="table-skeleton" />;

  return (
    <div className="table-card">
      <div className="card-header">
        <h3 className="card-title">Employee Attendance</h3>
        <div className="card-badge">{data.length} Employees</div>
      </div>
      <div className="table-responsive">
        <table className="attendance-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.accessor}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col) => {
                  const cellValue = row[col.accessor];
                  return (
                    <td key={col.accessor}>
                      {col.Cell ? col.Cell(cellValue) : cellValue}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceOverview;
