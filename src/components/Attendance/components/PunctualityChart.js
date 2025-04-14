import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PunctualityChart = ({ onTime, late }) => {
  const data = {
    labels: ['On Time', 'Late'],
    datasets: [{
      data: [onTime, late],
      backgroundColor: ['#4cc9f0', '#f72585'],
      borderColor: '#fff',
      borderWidth: 2,
      hoverOffset: 10
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            family: 'Inter, sans-serif'
          }
        }
      },
      datalabels: {
        formatter: (value) => `${value}%`,
        color: '#fff',
        font: {
          weight: 'bold',
          size: 14
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}%`
        }
      }
    },
    cutout: '75%',
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  return (
    <div className="chart-card">
      <div className="card-header">
        <h3 className="card-title">Punctuality</h3>
        <div className="card-badge">{onTime}% On Time</div>
      </div>
      <div className="chart-container">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default PunctualityChart;