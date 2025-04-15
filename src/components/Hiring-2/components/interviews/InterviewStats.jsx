import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './InterviewStats.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InterviewStats = ({ interviews }) => {
  const getStats = () => {
    const types = ['Technical', 'Technical Advanced', 'HR', 'Managerial', 'Cultural Fit'];
    const statuses = ['scheduled', 'completed', 'cancelled'];
    
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
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  const statusData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: 'Interviews by Status',
        data: Object.values(statusCounts),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  return (
    <div className="interview-stats">
      <div className="stats-chart">
        <h3>Interviews by Type</h3>
        <Bar data={typeData} options={options} />
      </div>
      <div className="stats-chart">
        <h3>Interviews by Status</h3>
        <Bar data={statusData} options={options} />
      </div>
    </div>
  );
};

export default InterviewStats;