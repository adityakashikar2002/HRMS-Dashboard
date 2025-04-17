import React, { useContext } from 'react';
import { PayrollContext } from '../context/PayrollContext';

const SummaryCards = () => {
  const { stats } = useContext(PayrollContext);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="border border-gray-200 rounded-md p-4 flex flex-col justify-between">
        <p className="text-xs text-gray-500 mb-1">Payrolls Cost</p>
        <div className="flex items-center space-x-2">
          <span className="text-xl font-semibold text-gray-900">${stats.payrollCost?.toLocaleString()}</span>
          <span className="flex items-center text-xs text-green-500 font-semibold">
            <i className="fas fa-arrow-up mr-0.5"></i>
            20%
          </span>
          <span className="text-xs text-gray-400">last month</span>
        </div>
      </div>
      <div className="border border-gray-200 rounded-md p-4 flex flex-col justify-between">
        <p className="text-xs text-gray-500 mb-1">Total Expense</p>
        <div className="flex items-center space-x-2">
          <span className="text-xl font-semibold text-gray-900">${stats.totalExpense?.toLocaleString()}</span>
          <span className="flex items-center text-xs text-green-500 font-semibold">
            <i className="fas fa-arrow-up mr-0.5"></i>
            0.1%
          </span>
          <span className="text-xs text-gray-400">last month</span>
        </div>
      </div>
      <div className="border border-gray-200 rounded-md p-4 flex flex-col justify-between">
        <p className="text-xs text-gray-500 mb-1">Pending payments</p>
        <div className="flex items-center space-x-2">
          <span className="text-xl font-semibold text-gray-900">${stats.pendingPayments?.toLocaleString()}</span>
          <span className="flex items-center text-xs text-red-500 font-semibold">-50</span>
          <span className="text-xs text-gray-400">Total Employee</span>
        </div>
      </div>
      <div className="border border-gray-200 rounded-md p-4 flex flex-col justify-between">
        <p className="text-xs text-gray-500 mb-1">Total Payrolls</p>
        <div className="flex items-center space-x-2">
          <span className="text-xl font-semibold text-gray-900">{stats.totalPayrolls}</span>
          <span className="flex items-center text-xs text-green-500 font-semibold">+{stats.newEmployees}</span>
          <span className="text-xs text-gray-400">New Employee</span>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;