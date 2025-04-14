import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const WorkStatusChart = ({ atWork, idle, offline }) => {
  // Convert time strings to hours for chart
  const parseTime = (timeStr) => {
    const match = timeStr.match(/(\d+)h (\d+)m/);
    return match ? parseInt(match[1]) + parseInt(match[2]) / 60 : 0;
  };

  const chartData = {
    labels: ['At Work', 'Idle', 'Offline'],
    datasets: [
      {
        data: [parseTime(atWork), parseTime(idle), parseTime(offline)],
        backgroundColor: ['#3A57E8', '#F0AC4D', '#A30D11'],
        borderWidth: 0,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#5F6D7E',
          font: {
            size: 12,
          },
        },
        border: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="chart-container">
      <h3>Work Hour</h3>
      <div className="chart-wrapper" style={{ height: '200px' }}>
        <Bar data={chartData} options={options} />
      </div>
      <div className="chart-stats">
        <div className="stat-item">
          <span className="stat-label">At Work</span>
          <span className="stat-value">{atWork}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Idle</span>
          <span className="stat-value">{idle}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Offline</span>
          <span className="stat-value">{offline}</span>
        </div>
      </div>
    </div>
  );
};

export default WorkStatusChart;