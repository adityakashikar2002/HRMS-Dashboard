import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const WorkStatusChart = ({ atWork, idle, offline }) => {
  const parseTime = (timeStr) => {
    const [hours, minutes] = timeStr.split('h ').map(part => parseInt(part));
    return hours + (minutes / 60);
  };

  const data = {
    labels: ['At Work', 'Idle', 'Offline'],
    datasets: [{
      data: [
        parseTime(atWork),
        parseTime(idle),
        parseTime(offline)
      ],
      backgroundColor: ['#4361ee', '#f8961e', '#f72585'],
      borderRadius: 6,
      borderSkipped: false
    }]
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false
        },
        ticks: {
          display: false
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            const hours = Math.floor(value);
            const minutes = Math.round((value - hours) * 60);
            return `${hours}h ${minutes}m`;
          }
        }
      }
    },
    maintainAspectRatio: false
  };

  return (
    <div className="chart-card">
      <div className="card-header">
        <h3 className="card-title">Work Status Distribution</h3>
      </div>
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#4361ee' }} />
          <span className="legend-label">At Work: {atWork}</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#f8961e' }} />
          <span className="legend-label">Idle: {idle}</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#f72585' }} />
          <span className="legend-label">Offline: {offline}</span>
        </div>
      </div>
    </div>
  );
};

export default WorkStatusChart;