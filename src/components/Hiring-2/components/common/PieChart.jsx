import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './PieChart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, colors }) => {
  // Handle empty data
  if (!data || Object.keys(data).length === 0) {
    data = { 'No data': 1 };
    colors = ['#cccccc'];
  }

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="pie-chart">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;