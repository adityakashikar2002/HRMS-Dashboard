import React, { useContext } from 'react';
import { PayrollContext } from '../context/PayrollContext';

const BarChart = () => {
  const { chartData } = useContext(PayrollContext);

  const maxValue = Math.max(...chartData.map(item => Math.max(item.cost, item.expense))) * 1.2;

  return (
    <section className="border border-gray-200 rounded-md p-4 col-span-2">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-semibold text-gray-700">Payroll Cost Overview</h2>
        <button className="text-xs text-gray-400 hover:text-gray-600 flex items-center space-x-1" type="button">
          <span>More details</span>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      <div className="relative">
        <div className="bar-chart">
          {chartData.map((item, index) => {
            const costHeight = (item.cost / maxValue) * 160;
            const expenseHeight = (item.expense / maxValue) * 160;
            
            return (
              <div key={index} className="bar-group" style={{ height: '160px' }}>
                <div className="bar-bg" style={{ height: `${costHeight}px`, bottom: 0 }}></div>
                <div className="bar-fg" style={{ height: `${expenseHeight}px`, bottom: 0 }}></div>
                <div className="tooltip">
                  <div className="font-semibold mb-1 text-gray-900">{item.month} 2024</div>
                  <div><span className="dot cost"></span> ${item.cost.toLocaleString()}</div>
                  <div><span className="dot expense"></span> ${item.expense.toLocaleString()}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="x-axis-labels mt-1 px-2 flex justify-between text-xs text-gray-400 select-none">
          {chartData.map((item, index) => (
            <span key={index}>{item.month}</span>
          ))}
        </div>
        <div className="y-axis-labels">
          <span>${(maxValue / 1000).toFixed(0)}k</span>
          <span>${(maxValue * 0.8 / 1000).toFixed(0)}k</span>
          <span>${(maxValue * 0.6 / 1000).toFixed(0)}k</span>
          <span>${(maxValue * 0.4 / 1000).toFixed(0)}k</span>
          <span>${(maxValue * 0.2 / 1000).toFixed(0)}k</span>
          <span>$0</span>
        </div>
      </div>
    </section>
  );
};

export default BarChart;