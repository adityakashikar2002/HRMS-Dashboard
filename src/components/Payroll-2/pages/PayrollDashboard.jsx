import React, { useState, useEffect } from 'react';
import { employees, payrollMetrics, bonusesData, payrollTrends } from '../data/mockData';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils';
import Header from '../components/Header';
import InfoAlert from '../components/InfoAlert';
import MetricCard from '../components/MetricCard';
import BarChart from '../components/BarChart';
import ArcChart from '../components/ArcChart';
import PayrollTable from '../components/PayrollTable';

const PayrollDashboard = () => {
  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const [metrics, setMetrics] = useState(payrollMetrics);
  const [bonuses, setBonuses] = useState(bonusesData);
  const [trends, setTrends] = useState(payrollTrends);

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedEmployees = loadFromLocalStorage('payrollEmployees', employees);
    const savedMetrics = loadFromLocalStorage('payrollMetrics', payrollMetrics);
    const savedBonuses = loadFromLocalStorage('payrollBonuses', bonusesData);
    const savedTrends = loadFromLocalStorage('payrollTrends', payrollTrends);

    setFilteredEmployees(savedEmployees);
    setMetrics(savedMetrics);
    setBonuses(savedBonuses);
    setTrends(savedTrends);
  }, []);

  const handleSearch = (term) => {
    const filtered = employees.filter(emp => 
      emp.name.toLowerCase().includes(term.toLowerCase()) || 
      emp.role.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredEmployees(filtered);
    saveToLocalStorage('payrollEmployees', filtered);
  };

  const handleStatusFilter = (status) => {
    if (status === 'All Status') {
      setFilteredEmployees(employees);
      saveToLocalStorage('payrollEmployees', employees);
    } else {
      const filtered = employees.filter(emp => emp.status === status);
      setFilteredEmployees(filtered);
      saveToLocalStorage('payrollEmployees', filtered);
    }
  };

  const handleRoleFilter = (role) => {
    if (role === 'All Role') {
      setFilteredEmployees(employees);
      saveToLocalStorage('payrollEmployees', employees);
    } else {
      const filtered = employees.filter(emp => emp.role.includes(role));
      setFilteredEmployees(filtered);
      saveToLocalStorage('payrollEmployees', filtered);
    }
  };

  const handleEditEmployee = (employee) => {
    // In a real app, this would open a modal or form
    console.log('Editing employee:', employee);
  };

  const handleDeleteEmployee = (id) => {
    // In a real app, this would show a confirmation dialog
    const updatedEmployees = employees.filter(emp => emp.id !== id);
    setFilteredEmployees(updatedEmployees);
    saveToLocalStorage('payrollEmployees', updatedEmployees);
  };

  const handleExport = () => {
    // In a real app, this would export data to CSV or PDF
    console.log('Exporting payroll data...');
  };

  const handleNewPayroll = () => {
    // In a real app, this would open a new payroll form
    console.log('Creating new payroll...');
  };

  return (
    <div className="bg-white text-gray-700 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-[1280px] mx-auto">
        <Header onSearch={handleSearch} />
        <InfoAlert />
        
        {/* Date selector and export/new payroll */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-3 sm:space-y-0">
          <div>
            <select className="border border-gray-300 rounded-md text-gray-700 text-sm px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600">
              <option>01 July - 31 July 2024</option>
            </select>
          </div>
          <div className="flex space-x-2 justify-end">
            <button 
              className="flex items-center space-x-1 border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50" 
              onClick={handleExport}
            >
              <i className="fas fa-download"></i>
              <span>Export</span>
            </button>
            <button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-4 py-1.5 text-sm font-semibold" 
              onClick={handleNewPayroll}
            >
              + New Payroll
            </button>
          </div>
        </div>
        
        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <MetricCard 
            title="Payrolls Cost" 
            value={metrics.payrollCost} 
            change="20%" 
            changeType="positive" 
            description="last month" 
          />
          <MetricCard 
            title="Total Expense" 
            value={metrics.totalExpense} 
            change="0.1%" 
            changeType="positive" 
            description="last month" 
          />
          <MetricCard 
            title="Pending payments" 
            value={metrics.pendingPayments} 
            change="-50" 
            changeType="negative" 
            description="Total Employee" 
          />
          <MetricCard 
            title="Total Payrolls" 
            value={metrics.totalPayrolls} 
            change={`+${metrics.newEmployees}`} 
            changeType="positive" 
            description="New Employee" 
          />
        </div>
        
        {/* Payroll Cost Overview and Bonuses */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Payroll Cost Overview */}
          <section className="border border-gray-200 rounded-md p-4 col-span-2">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-semibold text-gray-700">Payroll Cost Overview</h2>
              <button className="text-xs text-gray-400 hover:text-gray-600 flex items-center space-x-1">
                <span>More details</span>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
            <BarChart data={trends} />
          </section>
          
          {/* Bonuses and Incentives */}
          <section className="border border-gray-200 rounded-md p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-semibold text-gray-700">Bonuses and Incentives</h2>
              <button className="text-gray-400 hover:text-gray-600">
                <i className="fas fa-ellipsis-v"></i>
              </button>
            </div>
            <ArcChart 
              total={bonuses.total} 
              bonuses={bonuses.bonuses} 
              incentives={bonuses.incentives} 
            />
          </section>
        </div>
        
        {/* Payroll list */}
        <PayrollTable 
          employees={filteredEmployees} 
          onSearch={handleSearch}
          onStatusFilter={handleStatusFilter}
          onRoleFilter={handleRoleFilter}
          onEdit={handleEditEmployee}
          onDelete={handleDeleteEmployee}
        />
      </div>
    </div>
  );
};

export default PayrollDashboard;