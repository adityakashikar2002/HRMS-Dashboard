import React, { useContext } from 'react';
import { PayrollContext } from '../context/PayrollContext';

const ArcChart = () => {
  const { bonuses } = useContext(PayrollContext);

//   const bonusesPercentage = (bonuses.bonuses / bonuses.total) * 100;
//   const incentivesPercentage = (bonuses.incentives / bonuses.total) * 100;

//   const bonusesDashoffset = 251.2 - (251.2 * bonusesPercentage / 100);
//   const incentivesDashoffset = 251.2 - (251.2 * incentivesPercentage / 100) + bonusesDashoffset;

const bonusesPercentage = bonuses?.bonuses && bonuses?.total ? (bonuses.bonuses / bonuses.total) * 100 : 0;
const incentivesPercentage = bonuses?.incentives && bonuses?.total ? (bonuses.incentives / bonuses.total) * 100 : 0;

const bonusesDashoffset = 251.2 - (251.2 * bonusesPercentage / 100);
const incentivesDashoffset = 251.2 - (251.2 * incentivesPercentage / 100) + bonusesDashoffset;


  return (
    <section className="border border-gray-200 rounded-md p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-semibold text-gray-700">Bonuses and Incentives</h2>
        <button className="text-gray-400 hover:text-gray-600" type="button">
          <i className="fas fa-ellipsis-v"></i>
        </button>
      </div>
      <div className="flex flex-col items-center">
        <div className="arc-chart" role="img" aria-label="Circular chart showing bonuses and incentives">
          <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <circle className="arc-bg" cx="64" cy="64" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
            <circle 
              className="arc-bonuses" 
              cx="64" 
              cy="64" 
              r="40" 
              stroke="#22d3ee" 
              strokeWidth="8" 
              fill="none" 
              strokeDasharray="251.2" 
              strokeDashoffset={bonusesDashoffset}
            />
            <circle 
              className="arc-incentives" 
              cx="64" 
              cy="64" 
              r="40" 
              stroke="#4ade80" 
              strokeWidth="8" 
              fill="none" 
              strokeDasharray="251.2" 
              strokeDashoffset={incentivesDashoffset}
            />
          </svg>
          <div className="arc-total">
            <span>Totals</span>
            {/* <span>${bonuses.total.toLocaleString()}</span> */}
            <span>${bonuses?.total?.toLocaleString?.() || 0}</span>
          </div>
        </div>
        <div className="arc-chart-legend w-full mb-3">
          <div>
            <div className="bonuses-color"></div>
            {/* <span>${bonuses.bonuses.toLocaleString()} Bonuses</span> */}
            <span>${bonuses?.bonuses?.toLocaleString?.() || 0} Bonuses</span>
          </div>
          <div>
            <div className="incentives-color"></div>
            {/* <span>${bonuses.incentives.toLocaleString()} Incentives</span> */}
            <span>${bonuses?.incentives?.toLocaleString?.() || 0} Incentives</span>
          </div>
        </div>
        <button className="w-full border border-gray-200 rounded-md text-center text-xs text-gray-600 py-1 cursor-pointer hover:bg-gray-50 btn" type="button">
          More details
        </button>
      </div>
    </section>
  );
};

export default ArcChart;