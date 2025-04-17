import React, { useContext, useEffect } from 'react';
import { PayrollProvider, PayrollContext } from './context/PayrollContext';
import { initialPayrolls, initialStats, initialBonuses, initialChartData } from './data/mockData';
import Header from './components/Header';
import Alert from './components/Alert';
import SummaryCards from './components/SummaryCards';
import BarChart from './components/BarChart';
import ArcChart from './components/ArcChart';
import PayrollList from './components/PayrollList';
import './styles/Payroll.css';

const PayrollContent = () => {
  const { 
    setPayrolls, 
    setStats, 
    setBonuses, 
    setChartData 
  } = useContext(PayrollContext);

  // Initialize with mock data if localStorage is empty
  useEffect(() => {
    const savedPayrolls = localStorage.getItem('payrolls');
    if (!savedPayrolls) setPayrolls(initialPayrolls);

    const savedStats = localStorage.getItem('payrollStats');
    if (!savedStats) setStats(initialStats);

    const savedBonuses = localStorage.getItem('bonuses');
    if (!savedBonuses) setBonuses(initialBonuses);

    const savedChartData = localStorage.getItem('chartData');
    if (!savedChartData) setChartData(initialChartData);
  }, [setPayrolls, setStats, setBonuses, setChartData]);

  return (
    <div className="bg-white text-gray-700 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-[1280px] mx-auto">
        <Header />
        <Alert />
        
        {/* Date selector and export/new payroll */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-3 sm:space-y-0">
          <div>
            <select className="border border-gray-300 rounded-md text-gray-700 text-sm px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600">
              <option>01 July - 31 July 2024</option>
            </select>
          </div>
          <div className="flex space-x-2 justify-end">
            <button className="flex items-center space-x-1 border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 btn" type="button">
              <i className="fas fa-download"></i>
              <span>Export</span>
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-4 py-1.5 text-sm font-semibold" type="button">
              + New Payroll
            </button>
          </div>
        </div>

        <SummaryCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <BarChart />
          <ArcChart />
        </div>

        <PayrollList />
      </div>
    </div>
  );
};

const Payroll = () => {
  return (
    <PayrollProvider>
      <PayrollContent />
    </PayrollProvider>
  );
};

export default Payroll;