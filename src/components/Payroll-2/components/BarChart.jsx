// import React from 'react';
// // import './BarChart.css';
// import '../styles/Payroll.css';
// const BarChart = ({ data }) => {
//   // Calculate the maximum value for scaling
//   const maxValue = Math.max(...data.map(item => Math.max(item.cost, item.expense)));
//   const scaleFactor = 160 / maxValue;

//   // Y-axis labels
//   const yAxisLabels = ['$15k', '$12k', '$9k', '$6k', '$3k', '$0'];

//   return (
//     <div className="relative">
//       <div className="bar-chart">
//         {data.map((item, index) => {
//           const costHeight = item.cost * scaleFactor;
//           const expenseHeight = item.expense * scaleFactor;
          
//           return (
//             <div key={index} className="bar-group" style={{ height: '160px' }}>
//               <div 
//                 className="bar-bg" 
//                 style={{ 
//                   height: `${expenseHeight}px`, 
//                   bottom: 0 
//                 }}
//               ></div>
//               <div 
//                 className="bar-fg" 
//                 style={{ 
//                   height: `${costHeight}px`, 
//                   bottom: 0 
//                 }}
//               ></div>
//               <div className="tooltip">
//                 <div className="font-semibold mb-1 text-gray-900">{item.month} 2024</div>
//                 <div><span className="dot cost"></span> ${item.cost.toLocaleString()}</div>
//                 <div><span className="dot expense"></span> ${item.expense.toLocaleString()}</div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       <div className="x-axis-labels mt-1 px-2 flex justify-between text-xs text-gray-400 select-none">
//         {data.map((item, index) => (
//           <span key={index}>{item.month}</span>
//         ))}
//       </div>
//       <div className="y-axis-labels">
//         {yAxisLabels.map((label, index) => (
//           <span key={index}>{label}</span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BarChart;

import React from 'react';
import '../styles/Payroll.css';

const BarChart = ({ data }) => {
  const maxValue = Math.max(...data.map(item => Math.max(item.cost, item.expense)));
  const scaleFactor = 160 / maxValue;

  // Y-axis labels - adjusted to match your design
  const yAxisLabels = ['$15k', '$12k', '$9k', '$6k', '$3k', '$0'];

  return (
    <div className="relative" style={{ minHeight: '200px' }}>
      {/* Y-axis labels - moved outside the bar-chart container */}
      <div className="y-axis-labels">
        {yAxisLabels.map((label, index) => (
          <span key={index}>{label}</span>
        ))}
      </div>
      
      <div className="bar-chart-container">
        <div className="bar-chart">
          {data.map((item, index) => {
            const costHeight = item.cost * scaleFactor;
            const expenseHeight = item.expense * scaleFactor;
            
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
                  <div className="font-semibold mb-1 text-gray-900">{item.month} 2024</div>
                  <div><span className="dot cost"></span> ${item.cost.toLocaleString()}</div>
                  <div><span className="dot expense"></span> ${item.expense.toLocaleString()}</div>
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