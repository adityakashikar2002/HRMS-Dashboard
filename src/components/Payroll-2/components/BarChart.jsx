// // src/components/BarChart.jsx
// import React from 'react';
// import '../styles/Payroll.css';

// const BarChart = ({ data }) => {
//   const maxValue = Math.max(...data.map(item => Math.max(item.cost, item.expense)));
//   const scaleFactor = 160 / maxValue;

//   // Y-axis labels - adjusted for Indian payroll amounts
//   const yAxisLabels = ['₹1.5L', '₹1.2L', '₹90k', '₹60k', '₹30k', '₹0'];

//   return (
//     <div className="relative" style={{ minHeight: '200px' }}>
//       {/* Y-axis labels - moved outside the bar-chart container */}
//       <div className="y-axis-labels">
//         {yAxisLabels.map((label, index) => (
//           <span key={index}>{label}</span>
//         ))}
//       </div>
      
//       <div className="bar-chart-container">
//         <div className="bar-chart">
//           {data.map((item, index) => {
//             const costHeight = item.cost * scaleFactor;
//             const expenseHeight = item.expense * scaleFactor;
            
//             return (
//               <div key={index} className="bar-group" style={{ height: '160px' }}>
//                 <div 
//                   className="bar-bg" 
//                   style={{ 
//                     height: `${expenseHeight}px`, 
//                     bottom: 0 
//                   }}
//                 ></div>
//                 <div 
//                   className="bar-fg" 
//                   style={{ 
//                     height: `${costHeight}px`, 
//                     bottom: 0 
//                   }}
//                 ></div>
//                 <div className="tooltip">
//                   <div className="font-semibold mb-1 text-gray-900">{item.month} 2024</div>
//                   <div><span className="dot cost"></span> ₹{item.cost.toLocaleString('en-IN')}</div>
//                   <div><span className="dot expense"></span> ₹{item.expense.toLocaleString('en-IN')}</div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//         <div className="x-axis-labels mt-1 px-2 flex justify-between text-xs text-gray-400 select-none">
//           {data.map((item, index) => (
//             <span key={index}>{item.month}</span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BarChart;


// src/components/BarChart.jsx
import React from 'react';
import { formatIndianCurrency } from '../utils';
import '../styles/Payroll.css';

const BarChart = ({ data }) => {
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
            
            return (
              <div key={index} className="bar-group" style={{ height: '160px' }}>
                <div 
                  className="bar-bg" 
                  style={{ 
                    height: `${expenseHeight}px`, 
                    bottom: 0 
                  }}
                ></div>
                <div 
                  className="bar-fg" 
                  style={{ 
                    height: `${costHeight}px`, 
                    bottom: 0 
                  }}
                ></div>
                <div className="tooltip">
                  <div className="font-semibold mb-1 text-gray-900">{item.month} {item.year || '2024'}</div>
                  <div><span className="dot cost"></span> {formatIndianCurrency(item.cost)}</div>
                  <div><span className="dot expense"></span> {formatIndianCurrency(item.expense)}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="x-axis-labels mt-1 px-2 flex justify-between text-xs text-gray-400 select-none">
          {data.map((item, index) => (
            <span key={index}>{item.month}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarChart;