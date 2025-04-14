import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const AttendanceChart = ({ attendanceSource, loading }) => {
  if (loading) return <div className="chart-skeleton" />;

  const chartData = {
    labels: ['Device', 'App', 'Manual', 'Biometric'],
    datasets: [{
      data: [
        attendanceSource?.device || 0,
        attendanceSource?.app || 0,
        attendanceSource?.manual || 0,
        attendanceSource?.biometric || 0
      ],
      backgroundColor: ['#4361ee', '#4cc9f0', '#f8961e', '#7209b7'],
      borderColor: '#fff',
      borderWidth: 2,
      hoverOffset: 15
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            family: 'Inter, sans-serif'
          },
          padding: 20,
          usePointStyle: true
        }
      },
      datalabels: {
        formatter: (value) => `${value}%`,
        color: '#fff',
        font: {
          weight: 'bold'
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((context.raw / total) * 100);
            return `${context.label}: ${context.raw} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '65%',
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  return (
    <div className="chart-card">
      <div className="card-header">
        <h3 className="card-title">Attendance Sources</h3>
        <div className="card-badge">{Object.values(attendanceSource).reduce((a, b) => a + b, 0)} Total</div>
      </div>
      <div className="chart-container">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default AttendanceChart;