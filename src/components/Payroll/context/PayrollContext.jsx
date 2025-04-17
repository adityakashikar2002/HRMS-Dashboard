import React, { createContext, useState, useEffect } from 'react';

export const PayrollContext = createContext();

export const PayrollProvider = ({ children }) => {
  const [payrolls, setPayrolls] = useState([]);
  const [stats, setStats] = useState({});
  const [bonuses, setBonuses] = useState({});
  const [chartData, setChartData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [filterRole, setFilterRole] = useState('All Role');
  const [alert, setAlert] = useState({
    show: true,
    message: 'payroll submission for the current pay period is due in 2 days, review and finalize all employee payroll details.',
    type: 'info'
  });

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedPayrolls = localStorage.getItem('payrolls');
    const savedStats = localStorage.getItem('payrollStats');
    const savedBonuses = localStorage.getItem('bonuses');
    const savedChartData = localStorage.getItem('chartData');

    if (savedPayrolls) setPayrolls(JSON.parse(savedPayrolls));
    if (savedStats) setStats(JSON.parse(savedStats));
    if (savedBonuses) setBonuses(JSON.parse(savedBonuses));
    if (savedChartData) setChartData(JSON.parse(savedChartData));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('payrolls', JSON.stringify(payrolls));
    localStorage.setItem('payrollStats', JSON.stringify(stats));
    localStorage.setItem('bonuses', JSON.stringify(bonuses));
    localStorage.setItem('chartData', JSON.stringify(chartData));
  }, [payrolls, stats, bonuses, chartData]);

  const addPayroll = (newPayroll) => {
    setPayrolls([...payrolls, newPayroll]);
  };

  const updatePayrollStatus = (id, status) => {
    setPayrolls(payrolls.map(payroll => 
      payroll.id === id ? { ...payroll, status } : payroll
    ));
  };

  const filteredPayrolls = payrolls.filter(payroll => {
    const matchesSearch = payroll.employeeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All Status' || payroll.status === filterStatus;
    const matchesRole = filterRole === 'All Role' || payroll.role.includes(filterRole);
    return matchesSearch && matchesStatus && matchesRole;
  });

  const updateStats = (newStats) => {
    setStats(prev => ({
      ...prev,
      ...newStats
    }));
  };
  
  const updateChartData = (month, newData) => {
    setChartData(prev => 
      prev.map(item => 
        item.month === month ? { ...item, ...newData } : item
      )
    );
  };
  
  const updateBonuses = (newBonuses) => {
    setBonuses(prev => ({
      ...prev,
      ...newBonuses
    }));
  };

  return (
    <PayrollContext.Provider value={{
      payrolls: filteredPayrolls,
      stats,
      bonuses,
      chartData,
      alert,
      searchTerm,
      filterStatus,
      filterRole,
      setSearchTerm,
      setFilterStatus,
      setFilterRole,
      setAlert,
      addPayroll,
      updatePayrollStatus,
      setPayrolls,
      setStats,
      setBonuses,
      setChartData,
      updateStats,
      updateChartData,
      updateBonuses
    }}>
      {children}
    </PayrollContext.Provider>
  );
};