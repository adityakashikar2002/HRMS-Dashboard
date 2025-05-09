// src/components/BarChart.jsx --Personal Acc
import React from 'react';
import { formatIndianCurrency } from '../utils';
import '../styles/Payroll.css';

const BarChart = ({ data, highlightedMonth }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-500">
        No data available for the chart
      </div>
    );
  }

  // Calculate max value for scaling
  const maxValue = Math.max(...data.map(item => Math.max(item.cost, item.expense)));
  const scaleFactor = 160 / (maxValue || 1); // Prevent division by zero

  // Y-axis labels - generate based on max value
  const yAxisLabels = [];
  const steps = 5;
  const stepValue = maxValue / steps;
  
  for (let i = steps; i >= 0; i--) {
    const value = Math.round((stepValue * i) / 1000) * 1000;
    yAxisLabels.push(formatIndianCurrency(value));
  }

  return (
    <div className="relative" style={{ minHeight: '200px' }}>
      {/* Y-axis labels */}
      <div className="y-axis-labels">
        {yAxisLabels.map((label, index) => (
          <span key={index}>{label}</span>
        ))}
      </div>
      
      <div className="bar-chart-container">
        <div className="bar-chart">
          {data.map((item, index) => {
            const costHeight = (item.cost || 0) * scaleFactor;
            const expenseHeight = (item.expense || 0) * scaleFactor;
            const maxHeight = Math.max(costHeight, expenseHeight);
            const isHighlighted = highlightedMonth !== null && 
              item.month === ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][highlightedMonth];
            
            return (
              <div key={index} className="bar-group" style={{ height: `${maxHeight}px` }}>
                <div 
                  className={`bar-bg ${isHighlighted ? 'bg-indigo-200' : 'bg-blue-100'}`} 
                  style={{ 
                    height: `${expenseHeight}px`, 
                    bottom: 0,
                    left: '4px',
                    width: 'calc(50% - 4px)'
                  }}
                ></div>
                <div 
                  className={`bar-fg ${isHighlighted ? 'bg-indigo-600' : 'bg-blue-600'}`} 
                  style={{ 
                    height: `${costHeight}px`, 
                    bottom: 0,
                    right: '4px',
                    width: 'calc(50% - 4px)'
                  }}
                ></div>
                <div className="tooltip">
                  <div className="font-semibold mb-1 text-gray-900">{item.month} {item.year || '2025'}</div>
                  <div><span className="dot cost"></span> Payroll Cost: {formatIndianCurrency(item.cost)}</div>
                  <div><span className="dot expense"></span> Total Expense: {formatIndianCurrency(item.expense)}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="x-axis-labels mt-1 px-2 flex justify-between text-xs text-gray-400 select-none">
          {data.map((item, index) => (
            <span 
              key={index}
              className={highlightedMonth !== null && 
                item.month === ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][highlightedMonth] ? 
                'font-semibold text-indigo-600' : ''}
            >
              {item.month}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarChart;