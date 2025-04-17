import React from 'react';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import './InterviewStats.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const InterviewStats = ({ interviews }) => {
  const getStats = () => {
    const types = ['Technical', 'Technical Advanced', 'HR', 'Managerial', 'Cultural Fit'];
    const statuses = ['Scheduled', 'Completed', 'Cancelled'];
    
    const typeCounts = {};
    const statusCounts = {};
    
    types.forEach(type => {
      typeCounts[type] = interviews.filter(i => i.interviewType === type).length;
    });
    
    statuses.forEach(status => {
      statusCounts[status] = interviews.filter(i => i.status === status).length;
    });
    
    return { typeCounts, statusCounts };
  };
  
  const { typeCounts, statusCounts } = getStats();
  
  const typeData = {
    labels: Object.keys(typeCounts),
    datasets: [
      {
        label: 'Interviews by Type',
        data: Object.values(typeCounts),
        borderColor: '#6366F1',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: '#6366F1',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true,
      },
    ],
  };
  
  const statusData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: 'Interviews by Status',
        data: Object.values(statusCounts),
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: '#10B981',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true,
      },
    ],
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 14,
            family: 'Inter, sans-serif'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: {
          size: 16,
          weight: 'bold'
        },
        bodyFont: {
          size: 14
        },
        padding: 12,
        usePointStyle: true,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          stepSize: 1,
          font: {
            family: 'Inter, sans-serif'
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: 'Inter, sans-serif'
          }
        }
      }
    },
    maintainAspectRatio: false
  };

  return (
    <div className="interview-stats-container">
      <div className="chart-card">
        <div className="chart-header">
          <h3>Interviews by Type</h3>
          <div className="chart-value">{interviews.length} Total</div>
        </div>
        <div className="chart-wrapper">
          <Line data={typeData} options={options} />
        </div>
      </div>
      
      <div className="chart-card">
        <div className="chart-header">
          <h3>Interviews by Status</h3>
          <div className="chart-value">{interviews.length} Total</div>
        </div>
        <div className="chart-wrapper">
          <Line data={statusData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default InterviewStats;