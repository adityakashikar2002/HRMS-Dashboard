import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { exportToCSV } from '../utils/exportUtils';

ChartJS.register(ArcElement, Tooltip, Legend);

const PunctualityChart = ({ onTime, late, timeRange, stats }) => {
  const chartData = {
    labels: ['On Time', 'Late'],
    datasets: [
      {
        data: [onTime, late],
        backgroundColor: ['#1F9254', '#A30D11'],
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
      ['Status', 'Percentage'],
      ['On Time', `${onTime}%`],
      ['Late', `${late}%`]
    ];
    exportToCSV(data, `punctuality-${timeRange}`);
  };

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>On Time / Late</h3>
        <button className="export-btn" onClick={handleExport}>
          Export CSV
        </button>
      </div>
      <div className="chart-wrapper">
        <Doughnut data={chartData} options={options} />
      </div>
      <div className="chart-center-text">
        <span className="percentage">{onTime}%</span>
        <span className="label">On Time</span>
      </div>
      <div className="chart-footer">
        <div className="footer-item">
          <span className="indicator on-time"></span>
          <span>On Time: {onTime}%</span>
        </div>
        <div className="footer-item">
          <span className="indicator late"></span>
          <span>Late: {late}%</span>
        </div>
      </div>
    </div>
  );
};

export default PunctualityChart;