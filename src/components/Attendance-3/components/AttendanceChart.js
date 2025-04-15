import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { exportToCSV } from '../utils/exportUtils';

ChartJS.register(ArcElement, Tooltip, Legend);

const AttendanceChart = ({ attendanceSource, timeRange }) => {
  if (!attendanceSource) {
    return <div className="chart-container">Loading attendance data...</div>;
  }

  const chartData = {
    labels: ['Device', 'App', 'Manual', 'Biometric'],
    datasets: [
      {
        data: [
          attendanceSource.device || 0,
          attendanceSource.app || 0,
          attendanceSource.manual || 0,
          attendanceSource.biometric || 0
        ],
        backgroundColor: ['#3A57E8', '#00B3A0', '#F0AC4D', '#8F4ED8'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
    },
    cutout: '70%',
  };

  const handleExport = () => {
    const data = [
      ['Source', 'Count'],
      ['Device', attendanceSource.device || 0],
      ['App', attendanceSource.app || 0],
      ['Manual', attendanceSource.manual || 0],
      ['Biometric', attendanceSource.biometric || 0],
      ['Active Devices', attendanceSource.activeDevices || 0],
      ['Inactive Devices', attendanceSource.inactiveDevices || 0]
    ];
    exportToCSV(data, `attendance-source-${timeRange}`);
  };

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>Attendance Source</h3>
        <button className="export-btn" onClick={handleExport}>
          Export CSV
        </button>
      </div>
      <div className="chart-wrapper" style={{ height: '200px', width: '400px'}}>
        <Pie data={chartData} options={options}/>
      </div>
      <div className="chart-stats">
        <div className="stat-item">
          <span className="stat-label">Device</span>
          <span className="stat-value">{attendanceSource.device || 0}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Active Devices</span>
          <span className="stat-value">{attendanceSource.activeDevices || 0}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Manual</span>
          <span className="stat-value">{attendanceSource.manual || 0}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">App</span>
          <span className="stat-value">{attendanceSource.app || 0}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Inactive Devices</span>
          <span className="stat-value">{attendanceSource.inactiveDevices || 0}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Biometric</span>
          <span className="stat-value">{attendanceSource.biometric || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;