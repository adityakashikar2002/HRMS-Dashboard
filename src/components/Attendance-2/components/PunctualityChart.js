import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PunctualityChart = ({ onTime, late }) => {
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

  return (
    <div className="chart-container">
      <h3>On Time / Late</h3>
      <div className="chart-wrapper">
        <Doughnut data={chartData} options={options} />
      </div>
      <div className="chart-center-text">
        <span className="percentage">{onTime}%</span>
        <span className="label">On Time</span>
      </div>
    </div>
  );
};

export default PunctualityChart;