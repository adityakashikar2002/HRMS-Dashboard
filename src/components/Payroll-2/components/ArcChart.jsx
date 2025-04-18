// // src/components/ArcChart.jsx
// import React from 'react';

// const ArcChart = ({ total, bonuses, incentives }) => {
//   const circumference = 2 * Math.PI * 40;
//   // Calculate offsets based on percentages
//   const bonusesPercentage = (bonuses / total) * 100;
//   const incentivesPercentage = (incentives / total) * 100;
  
//   const bonusesOffset = circumference - (circumference * bonusesPercentage / 100);
//   const incentivesOffset = circumference - (circumference * incentivesPercentage / 100);

//   return (
//     <div className="flex flex-col items-center">
//       <div className="arc-chart" role="img" aria-label="Circular chart showing bonuses and incentives">
//         <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
//           <circle 
//             className="arc-bg" 
//             cx="64" cy="64" r="40" 
//             stroke="#e5e7eb" 
//             strokeWidth="8" 
//             fill="none"
//           />
//           <circle 
//             className="arc-bonuses" 
//             cx="64" cy="64" r="40" 
//             stroke="#22d3ee" 
//             strokeWidth="8" 
//             fill="none" 
//             strokeDasharray={circumference} 
//             strokeDashoffset={bonusesOffset}
//           />
//           <circle 
//             className="arc-incentives" 
//             cx="64" cy="64" r="40" 
//             stroke="#4ade80" 
//             strokeWidth="8" 
//             fill="none" 
//             strokeDasharray={circumference} 
//             strokeDashoffset={incentivesOffset}
//           />
//         </svg>
//         <div className="arc-total">
//           <span>Totals</span>
//           <span>₹{total.toLocaleString('en-IN')}</span>
//         </div>
//       </div>
//       <div className="arc-chart-legend w-full mb-3">
//         <div>
//           <div className="bonuses-color"></div>
//           <span>₹{bonuses.toLocaleString('en-IN')} Bonuses</span>
//         </div>
//         <div>
//           <div className="incentives-color"></div>
//           <span>₹{incentives.toLocaleString('en-IN')} Incentives</span>
//         </div>
//       </div>
//       <button className="w-full border border-gray-200 rounded-md text-center text-xs text-gray-600 py-1 cursor-pointer hover:bg-gray-50">
//         More details
//       </button>
//     </div>
//   );
// };

// export default ArcChart;




// src/components/ArcChart.jsx
import React from 'react';
import { formatIndianCurrency } from '../utils';

const ArcChart = ({ total, bonuses, incentives }) => {
  const circumference = 2 * Math.PI * 40;
  
  // Calculate percentages with checks for zero values
  const bonusesValue = bonuses || 0;
  const incentivesValue = incentives || 0;
  const totalValue = total || 1; // Prevent division by zero
  
  const bonusesPercentage = (bonusesValue / totalValue) * 100;
  const incentivesPercentage = (incentivesValue / totalValue) * 100;
  
  const bonusesOffset = circumference - (circumference * bonusesPercentage / 100);
  const incentivesOffset = circumference - (circumference * incentivesPercentage / 100);

  return (
    <div className="flex flex-col items-center">
      <div className="arc-chart" role="img" aria-label="Circular chart showing bonuses and incentives">
        <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
          <circle 
            className="arc-bg" 
            cx="64" cy="64" r="40" 
            stroke="#e5e7eb" 
            strokeWidth="8" 
            fill="none"
          />
          <circle 
            className="arc-bonuses" 
            cx="64" cy="64" r="40" 
            stroke="#22d3ee" 
            strokeWidth="8" 
            fill="none" 
            strokeDasharray={circumference} 
            strokeDashoffset={bonusesOffset}
            transform="rotate(-90 64 64)"
          />
          <circle 
            className="arc-incentives" 
            cx="64" cy="64" r="40" 
            stroke="#4ade80" 
            strokeWidth="8" 
            fill="none" 
            strokeDasharray={circumference} 
            strokeDashoffset={incentivesOffset}
            transform="rotate(-90 64 64)"
          />
        </svg>
        <div className="arc-total">
          <span>Totals</span>
          <span>{formatIndianCurrency(total)}</span>
        </div>
      </div>
      <div className="arc-chart-legend w-full mb-3">
        <div>
          <div className="bonuses-color"></div>
          <span>{formatIndianCurrency(bonuses)} Bonuses</span>
        </div>
        <div>
          <div className="incentives-color"></div>
          <span>{formatIndianCurrency(incentives)} Incentives</span>
        </div>
      </div>
      <button className="w-full border border-gray-200 rounded-md text-center text-xs text-gray-600 py-1 cursor-pointer hover:bg-gray-50">
        More details
      </button>
    </div>
  );
};

export default ArcChart;