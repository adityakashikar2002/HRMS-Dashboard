import React, { useContext } from 'react';
import { PayrollContext } from '../context/PayrollContext';

const PayrollStats = () => {
  const { stats } = useContext(PayrollContext);

  // Calculate percentage changes (mock data)
  const payrollCostChange = 20; // 20% increase
  const totalExpenseChange = 0.1; // 0.1% increase
  const pendingPaymentsChange = -50; // -50 decrease

  return (
    <div className="mb-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Payroll Cost Card */}
        <div className="border border-gray-200 rounded-md p-4 flex flex-col justify-between">
          <p className="text-xs text-gray-500 mb-1">Payrolls Cost</p>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-semibold text-gray-900">
              ${stats.payrollCost?.toLocaleString()}
            </span>
            <span className={`flex items-center text-xs ${payrollCostChange >= 0 ? 'text-green-500' : 'text-red-500'} font-semibold`}>
              <i className={`fas fa-arrow-${payrollCostChange >= 0 ? 'up' : 'down'} mr-0.5`}></i>
              {Math.abs(payrollCostChange)}%
            </span>
            <span className="text-xs text-gray-400">last month</span>
          </div>
        </div>

        {/* Total Expense Card */}
        <div className="border border-gray-200 rounded-md p-4 flex flex-col justify-between">
          <p className="text-xs text-gray-500 mb-1">Total Expense</p>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-semibold text-gray-900">
              ${stats.totalExpense?.toLocaleString()}
            </span>
            <span className={`flex items-center text-xs ${totalExpenseChange >= 0 ? 'text-green-500' : 'text-red-500'} font-semibold`}>
              <i className={`fas fa-arrow-${totalExpenseChange >= 0 ? 'up' : 'down'} mr-0.5`}></i>
              {Math.abs(totalExpenseChange)}%
            </span>
            <span className="text-xs text-gray-400">last month</span>
          </div>
        </div>

        {/* Pending Payments Card */}
        <div className="border border-gray-200 rounded-md p-4 flex flex-col justify-between">
          <p className="text-xs text-gray-500 mb-1">Pending payments</p>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-semibold text-gray-900">
              ${stats.pendingPayments?.toLocaleString()}
            </span>
            <span className={`flex items-center text-xs ${pendingPaymentsChange >= 0 ? 'text-green-500' : 'text-red-500'} font-semibold`}>
              {pendingPaymentsChange}
            </span>
            <span className="text-xs text-gray-400">Total Employee</span>
          </div>
        </div>

        {/* Total Payrolls Card */}
        <div className="border border-gray-200 rounded-md p-4 flex flex-col justify-between">
          <p className="text-xs text-gray-500 mb-1">Total Payrolls</p>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-semibold text-gray-900">
              {stats.totalPayrolls}
            </span>
            <span className="flex items-center text-xs text-green-500 font-semibold">
              +{stats.newEmployees}
            </span>
            <span className="text-xs text-gray-400">New Employee</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Payroll Cost Overview Chart */}
        <div className="border border-gray-200 rounded-md p-4 col-span-2">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold text-gray-700">Payroll Cost Overview</h2>
            <button className="text-xs text-gray-400 hover:text-gray-600 flex items-center space-x-1" type="button">
              <span>More details</span>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
          <PayrollCostChart />
        </div>

        {/* Bonuses and Incentives Chart */}
        <div className="border border-gray-200 rounded-md p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold text-gray-700">Bonuses and Incentives</h2>
            <button className="text-gray-400 hover:text-gray-600" type="button">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
          <BonusesChart />
        </div>
      </div>
    </div>
  );
};

// Sub-component for Payroll Cost Chart
const PayrollCostChart = () => {
  const { chartData } = useContext(PayrollContext);

  const maxValue = Math.max(...chartData.map(item => Math.max(item.cost, item.expense))) * 1.2;

  return (
    <div className="relative">
      <div className="bar-chart">
        {chartData.map((item, index) => {
          const costHeight = (item.cost / maxValue) * 160;
          const expenseHeight = (item.expense / maxValue) * 160;
          
          return (
            <div key={index} className="bar-group" style={{ height: '160px' }}>
              <div className="bar-bg" style={{ height: `${expenseHeight}px`, bottom: 0 }}></div>
              <div className="bar-fg" style={{ height: `${costHeight}px`, bottom: 0 }}></div>
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
  );
};

// Sub-component for Bonuses Chart
const BonusesChart = () => {
  const { bonuses } = useContext(PayrollContext);

  const bonusesPercentage = (bonuses.bonuses / bonuses.total) * 100;
  const incentivesPercentage = (bonuses.incentives / bonuses.total) * 100;

  const bonusesDashoffset = 251.2 - (251.2 * bonusesPercentage / 100);
  const incentivesDashoffset = 251.2 - (251.2 * incentivesPercentage / 100) + bonusesDashoffset;

  return (
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
          <span>${bonuses.total.toLocaleString()}</span>
        </div>
      </div>
      <div className="arc-chart-legend w-full mb-3">
        <div>
          <div className="bonuses-color"></div>
          <span>${bonuses.bonuses.toLocaleString()} Bonuses</span>
        </div>
        <div>
          <div className="incentives-color"></div>
          <span>${bonuses.incentives.toLocaleString()} Incentives</span>
        </div>
      </div>
      <button className="w-full border border-gray-200 rounded-md text-center text-xs text-gray-600 py-1 cursor-pointer hover:bg-gray-50 btn" type="button">
        More details
      </button>
    </div>
  );
};

export default PayrollStats;