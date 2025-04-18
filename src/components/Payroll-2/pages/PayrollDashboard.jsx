// // src/pages/PayrollDashboard.jsx
// import React, { useState, useEffect } from 'react';
// import { employees as initialEmployees, payrollMetrics as initialMetrics, 
//         bonusesData as initialBonuses, payrollTrends as initialTrends } from '../data/mockData';
// import { saveToLocalStorage, loadFromLocalStorage, exportToCSV, generatePayslip, formatIndianCurrency } from '../utils';
// import Header from '../components/Header';
// import InfoAlert from '../components/InfoAlert';
// import MetricCard from '../components/MetricCard';
// import BarChart from '../components/BarChart';
// import ArcChart from '../components/ArcChart';
// import PayrollTable from '../components/PayrollTable';
// import PayslipModal from '../components/PayslipModal';
// import EmployeeFormModal from '../components/EmployeeFormModal';

// const PayrollDashboard = () => {
//   // State initialization with localStorage
//   const [employees, setEmployees] = useState(() => 
//     loadFromLocalStorage('payrollEmployees', initialEmployees));
//   const [filteredEmployees, setFilteredEmployees] = useState(employees);
//   const [metrics, setMetrics] = useState(() => 
//     loadFromLocalStorage('payrollMetrics', initialMetrics));
//   const [bonuses, setBonuses] = useState(() => 
//     loadFromLocalStorage('payrollBonuses', initialBonuses));
//   const [trends, setTrends] = useState(() => 
//     loadFromLocalStorage('payrollTrends', initialTrends));
  
//   const [currentPayslip, setCurrentPayslip] = useState(null);
//   const [showEmployeeForm, setShowEmployeeForm] = useState(false);
//   const [currentEmployee, setCurrentEmployee] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   // Update metrics when employees change
//   useEffect(() => {
//     const newMetrics = calculateMetrics(employees);
//     setMetrics(newMetrics);
//     saveToLocalStorage('payrollMetrics', newMetrics);
//   }, [employees]);

//   const calculateMetrics = (empList) => {
//     const totalSalary = empList.reduce((sum, emp) => sum + emp.salary, 0);
//     const totalExpense = empList.reduce((sum, emp) => sum + (emp.reimbursement || 0), 0);
//     const pendingPayments = empList.filter(emp => emp.status === 'Pending')
//                                  .reduce((sum, emp) => sum + emp.salary, 0);
    
//     return {
//       ...initialMetrics,
//       payrollCost: totalSalary,
//       totalExpense,
//       pendingPayments,
//       totalPayrolls: empList.length,
//       newEmployees: empList.filter(emp => 
//         new Date(emp.date).getMonth() === new Date().getMonth()
//       ).length
//     };
//   };

//   const handleSearch = (term) => {
//     setSearchTerm(term);
//     if (!term.trim()) {
//       setFilteredEmployees(employees);
//       return;
//     }
    
//     const filtered = employees.filter(emp => 
//       emp.name.toLowerCase().includes(term.toLowerCase()) || 
//       emp.id.toLowerCase().includes(term.toLowerCase()) ||
//       emp.role.toLowerCase().includes(term.toLowerCase())
//     );
//     setFilteredEmployees(filtered);
//   };

//   const handleStatusFilter = (status) => {
//     if (status === 'All Status') {
//       setFilteredEmployees(employees);
//     } else {
//       const filtered = employees.filter(emp => emp.status === status);
//       setFilteredEmployees(filtered);
//     }
//   };

//   const handleRoleFilter = (role) => {
//     if (role === 'All Role') {
//       setFilteredEmployees(employees);
//     } else {
//       const filtered = employees.filter(emp => emp.role.includes(role));
//       setFilteredEmployees(filtered);
//     }
//   };

//   const handleViewPayslip = (employee) => {
//     const payslip = generatePayslip(employee);
//     setCurrentPayslip(payslip);
//   };

//   const handleEditEmployee = (employee) => {
//     setCurrentEmployee(employee);
//     setShowEmployeeForm(true);
//   };

//   const handleDeleteEmployee = (id) => {
//     const updatedEmployees = employees.filter(emp => emp.id !== id);
//     setEmployees(updatedEmployees);
//     setFilteredEmployees(updatedEmployees);
//     saveToLocalStorage('payrollEmployees', updatedEmployees);
//   };

//   const handleExportAll = (selectedEmployees = filteredEmployees) => {
//     const payslips = selectedEmployees.map(emp => generatePayslip(emp));
//     exportToCSV(payslips, `payroll_export_${new Date().toISOString().slice(0,10)}.csv`);
//   };

//   const handleSaveEmployee = (employeeData) => {
//     let updatedEmployees;
    
//     if (employeeData.id) {
//       // Update existing employee
//       updatedEmployees = employees.map(emp => 
//         emp.id === employeeData.id ? { ...emp, ...employeeData } : emp
//       );
//     } else {
//       // Add new employee
//       const newId = `PYRL${Date.now().toString().slice(-6)}`;
//       const newEmployee = { 
//         ...employeeData, 
//         id: newId,
//         status: 'Pending',
//         date: new Date().toLocaleString('en-IN', { 
//           day: '2-digit', 
//           month: 'short', 
//           year: 'numeric', 
//           hour: '2-digit', 
//           minute: '2-digit' 
//         })
//       };
//       updatedEmployees = [...employees, newEmployee];
//     }
    
//     setEmployees(updatedEmployees);
//     setFilteredEmployees(updatedEmployees);
//     saveToLocalStorage('payrollEmployees', updatedEmployees);
//     setShowEmployeeForm(false);
//     setCurrentEmployee(null);
//   };

//   const handleProcessPayroll = () => {
//     const updatedEmployees = employees.map(emp => ({
//       ...emp,
//       status: 'Completed',
//       date: new Date().toLocaleString('en-IN', { 
//         day: '2-digit', 
//         month: 'short', 
//         year: 'numeric', 
//         hour: '2-digit', 
//         minute: '2-digit' 
//       })
//     }));
    
//     setEmployees(updatedEmployees);
//     setFilteredEmployees(updatedEmployees);
//     saveToLocalStorage('payrollEmployees', updatedEmployees);
    
//     // Update trends data with current payroll
//     const currentMonth = new Date().toLocaleString('default', { month: 'short' });
//     const currentYear = new Date().getFullYear();
    
//     const existingMonthIndex = trends.findIndex(t => t.month === currentMonth && t.year === currentYear);
//     const totalCost = updatedEmployees.reduce((sum, emp) => sum + emp.salary, 0);
//     const totalExpense = updatedEmployees.reduce((sum, emp) => sum + (emp.reimbursement || 0), 0);
    
//     let updatedTrends;
//     if (existingMonthIndex >= 0) {
//       updatedTrends = trends.map((t, i) => 
//         i === existingMonthIndex ? { ...t, cost: totalCost, expense: totalExpense } : t
//       );
//     } else {
//       updatedTrends = [
//         ...trends,
//         { month: currentMonth, year: currentYear, cost: totalCost, expense: totalExpense }
//       ].slice(-12); // Keep last 12 months
//     }
    
//     setTrends(updatedTrends);
//     saveToLocalStorage('payrollTrends', updatedTrends);
    
//     // Update bonuses data (randomized for demo)
//     const updatedBonuses = {
//       total: totalCost * 0.3,
//       bonuses: totalCost * 0.15,
//       incentives: totalCost * 0.12
//     };
//     setBonuses(updatedBonuses);
//     saveToLocalStorage('payrollBonuses', updatedBonuses);
//   };

//   return (
//     <div className="bg-white text-gray-700 min-h-screen p-4 sm:p-6 md:p-8">
//       <div className="max-w-[1280px] mx-auto">
//         <Header onSearch={handleSearch} />
//         <InfoAlert />
        
//         {/* Date selector and export/new payroll */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-3 sm:space-y-0">
//           <div>
//             <select className="border border-gray-300 rounded-md text-gray-700 text-sm px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600">
//               <option>01 July - 31 July 2024</option>
//               <option>01 June - 30 June 2024</option>
//               <option>01 May - 31 May 2024</option>
//             </select>
//           </div>
//           <div className="flex space-x-2 justify-end">
//             <button 
//               className="flex items-center space-x-1 border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50" 
//               onClick={() => handleExportAll()}
//             >
//               <i className="fas fa-download"></i>
//               <span>Export All</span>
//             </button>
//             <button 
//               className="flex items-center space-x-1 border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
//               onClick={handleProcessPayroll}
//             >
//               <i className="fas fa-cog"></i>
//               <span>Process Payroll</span>
//             </button>
//             <button 
//               className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-4 py-1.5 text-sm font-semibold" 
//               onClick={() => setShowEmployeeForm(true)}
//             >
//               + New Payroll
//             </button>
//           </div>
//         </div>
        
//         {/* Summary cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//           <MetricCard 
//             title="Payrolls Cost" 
//             value={metrics.payrollCost} 
//             change="20%" 
//             changeType="positive" 
//             description="last month" 
//           />
//           <MetricCard 
//             title="Total Expense" 
//             value={metrics.totalExpense} 
//             change="0.1%" 
//             changeType="positive" 
//             description="last month" 
//           />
//           <MetricCard 
//             title="Pending payments" 
//             value={metrics.pendingPayments} 
//             change="-50" 
//             changeType="negative" 
//             description="Total Employee" 
//           />
//           <MetricCard 
//             title="Total Payrolls" 
//             value={metrics.totalPayrolls} 
//             change={`+${metrics.newEmployees}`} 
//             changeType="positive" 
//             description="New Employee" 
//           />
//         </div>
        
//         {/* Payroll Cost Overview and Bonuses */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
//           {/* Payroll Cost Overview */}
//           <section className="border border-gray-200 rounded-md p-4 col-span-2">
//             <div className="flex justify-between items-center mb-3">
//               <h2 className="text-sm font-semibold text-gray-700">Payroll Cost Overview (in ₹)</h2>
//               <button className="text-xs text-gray-400 hover:text-gray-600 flex items-center space-x-1">
//                 <span>More details</span>
//                 <i className="fas fa-chevron-right"></i>
//               </button>
//             </div>
//             <BarChart data={trends} />
//           </section>
          
//           {/* Bonuses and Incentives */}
//           <section className="border border-gray-200 rounded-md p-4">
//             <div className="flex justify-between items-center mb-3">
//               <h2 className="text-sm font-semibold text-gray-700">Bonuses and Incentives (in ₹)</h2>
//               <button className="text-gray-400 hover:text-gray-600">
//                 <i className="fas fa-ellipsis-v"></i>
//               </button>
//             </div>
//             <ArcChart 
//               total={bonuses.total} 
//               bonuses={bonuses.bonuses} 
//               incentives={bonuses.incentives} 
//             />
//           </section>
//         </div>
        
//         {/* Payroll list */}
//         <PayrollTable 
//           employees={filteredEmployees} 
//           searchTerm={searchTerm}
//           onSearch={handleSearch}
//           onStatusFilter={handleStatusFilter}
//           onRoleFilter={handleRoleFilter}
//           onEdit={handleEditEmployee}
//           onDelete={handleDeleteEmployee}
//           onViewPayslip={handleViewPayslip}
//           onExportAll={handleExportAll}
//         />
        
//         {/* Payslip Modal */}
//         {currentPayslip && (
//           <PayslipModal 
//             payslip={currentPayslip} 
//             onClose={() => setCurrentPayslip(null)}
//           />
//         )}
        
//         {/* Employee Form Modal */}
//         {showEmployeeForm && (
//           <EmployeeFormModal 
//             employee={currentEmployee}
//             onSave={handleSaveEmployee}
//             onClose={() => {
//               setShowEmployeeForm(false);
//               setCurrentEmployee(null);
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default PayrollDashboard;

// src/pages/PayrollDashboard.jsx
import React, { useState, useEffect } from 'react';
import { employees as initialEmployees, payrollMetrics as initialMetrics, 
        bonusesData as initialBonuses, payrollTrends as initialTrends } from '../data/mockData';
import { saveToLocalStorage, loadFromLocalStorage, exportToCSV, generatePayslip, 
        formatIndianCurrency, getCurrentMonthYear, getMonthsInRange } from '../utils';
import Header from '../components/Header';
import InfoAlert from '../components/InfoAlert';
import MetricCard from '../components/MetricCard';
import BarChart from '../components/BarChart';
import ArcChart from '../components/ArcChart';
import PayrollTable from '../components/PayrollTable';
import PayslipModal from '../components/PayslipModal';
import EmployeeFormModal from '../components/EmployeeFormModal';

const PayrollDashboard = () => {
  // State initialization with localStorage
  const [employees, setEmployees] = useState(() => 
    loadFromLocalStorage('payrollEmployees', initialEmployees));
  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const [metrics, setMetrics] = useState(() => 
    loadFromLocalStorage('payrollMetrics', initialMetrics));
  const [bonuses, setBonuses] = useState(() => 
    loadFromLocalStorage('payrollBonuses', initialBonuses));
  const [trends, setTrends] = useState(() => 
    loadFromLocalStorage('payrollTrends', initialTrends));
  
  const [currentPayslip, setCurrentPayslip] = useState(null);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthYear());

  // Generate month/year options for dropdown
  const monthYearOptions = getMonthsInRange(
    new Date(2025, 0, 1), // Jan 2025
    new Date() // Current month
  ).map(date => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return {
      value: `${date.getFullYear()}-${date.getMonth()}`,
      label: `${monthNames[date.getMonth()]} ${date.getFullYear()}`
    };
  }).reverse();

  // Update metrics when employees or filters change
  useEffect(() => {
    const newMetrics = calculateMetrics(filteredEmployees);
    setMetrics(newMetrics);
    saveToLocalStorage('payrollMetrics', newMetrics);
  }, [filteredEmployees]);

  const calculateMetrics = (empList) => {
    const completedPayrolls = empList.filter(emp => emp.status === 'Completed');
    
    const totalSalary = completedPayrolls.reduce((sum, emp) => sum + emp.salary, 0);
    const totalExpense = completedPayrolls.reduce((sum, emp) => sum + (emp.reimbursement || 0), 0);
    const pendingPayments = empList.filter(emp => emp.status === 'Pending')
                                 .reduce((sum, emp) => sum + emp.salary, 0);
    
    return {
      payrollCost: totalSalary,
      totalExpense,
      pendingPayments,
      totalPayrolls: empList.length,
      newEmployees: empList.filter(emp => 
        new Date(emp.date).getMonth() === new Date().getMonth() &&
        new Date(emp.date).getFullYear() === new Date().getFullYear()
      ).length
    };
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredEmployees(employees);
      return;
    }
    
    const filtered = employees.filter(emp => 
      emp.name.toLowerCase().includes(term.toLowerCase()) || 
      emp.id.toLowerCase().includes(term.toLowerCase()) ||
      emp.role.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  const handleStatusFilter = (status) => {
    if (status === 'All Status') {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter(emp => emp.status === status);
      setFilteredEmployees(filtered);
    }
  };

  const handleRoleFilter = (role) => {
    if (role === 'All Role') {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter(emp => emp.role.includes(role));
      setFilteredEmployees(filtered);
    }
  };

  const handleMonthFilter = (value) => {
    const [year, month] = value.split('-').map(Number);
    setSelectedMonth({
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month],
      year
    });
    
    // Filter trends data for the selected month
    const filteredTrends = initialTrends.filter(t => 
      t.month === ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month] &&
      t.year === year
    );
    
    if (filteredTrends.length > 0) {
      setTrends(filteredTrends);
    }
  };

  const handleViewPayslip = (employee) => {
    const payslip = generatePayslip(employee);
    setCurrentPayslip(payslip);
  };

  const handleEditEmployee = (employee) => {
    setCurrentEmployee(employee);
    setShowEmployeeForm(true);
  };

  const handleDeleteEmployee = (id) => {
    const updatedEmployees = employees.filter(emp => emp.id !== id);
    setEmployees(updatedEmployees);
    setFilteredEmployees(updatedEmployees);
    saveToLocalStorage('payrollEmployees', updatedEmployees);
  };

  const handleExportAll = (selectedEmployees = filteredEmployees) => {
    const payslips = selectedEmployees.map(emp => generatePayslip(emp));
    exportToCSV(payslips, `payroll_export_${new Date().toISOString().slice(0,10)}.csv`);
  };

  const handleSaveEmployee = (employeeData) => {
    let updatedEmployees;
    
    if (employeeData.id) {
      // Update existing employee
      updatedEmployees = employees.map(emp => 
        emp.id === employeeData.id ? { 
          ...emp, 
          ...employeeData,
          // Don't update the date when editing
          date: emp.date
        } : emp
      );
    } else {
      // Add new employee
      const newId = `PYRL${Date.now().toString().slice(-6)}`;
      const newEmployee = { 
        ...employeeData, 
        id: newId,
        status: 'Pending',
        date: new Date().toLocaleString('en-IN', { 
          day: '2-digit', 
          month: 'short', 
          year: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };
      updatedEmployees = [...employees, newEmployee];
    }
    
    setEmployees(updatedEmployees);
    setFilteredEmployees(updatedEmployees);
    saveToLocalStorage('payrollEmployees', updatedEmployees);
    setShowEmployeeForm(false);
    setCurrentEmployee(null);
  };

  const handleProcessPayroll = () => {
    const updatedEmployees = employees.map(emp => ({
      ...emp,
      status: 'Completed',
      date: new Date().toLocaleString('en-IN', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    }));
    
    setEmployees(updatedEmployees);
    setFilteredEmployees(updatedEmployees);
    saveToLocalStorage('payrollEmployees', updatedEmployees);
    
    // Update trends data with current payroll
    const currentMonth = new Date().toLocaleString('default', { month: 'short' });
    const currentYear = new Date().getFullYear();
    
    const existingMonthIndex = trends.findIndex(t => 
      t.month === currentMonth && t.year === currentYear
    );
    
    const totalCost = updatedEmployees
      .filter(emp => emp.status === 'Completed')
      .reduce((sum, emp) => sum + emp.salary, 0);
      
    const totalExpense = updatedEmployees
      .filter(emp => emp.status === 'Completed')
      .reduce((sum, emp) => sum + (emp.reimbursement || 0), 0);
    
    let updatedTrends;
    if (existingMonthIndex >= 0) {
      updatedTrends = trends.map((t, i) => 
        i === existingMonthIndex ? { ...t, cost: totalCost, expense: totalExpense } : t
      );
    } else {
      updatedTrends = [
        ...trends,
        { month: currentMonth, year: currentYear, cost: totalCost, expense: totalExpense }
      ];
    }
    
    setTrends(updatedTrends);
    saveToLocalStorage('payrollTrends', updatedTrends);
    
    // Update bonuses data (randomized for demo)
    const updatedBonuses = {
      total: totalCost * 0.3,
      bonuses: totalCost * 0.15,
      incentives: totalCost * 0.12
    };
    setBonuses(updatedBonuses);
    saveToLocalStorage('payrollBonuses', updatedBonuses);
  };

  return (
    <div className="bg-white text-gray-700 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-[1280px] mx-auto">
        <Header onSearch={handleSearch} />
        <InfoAlert />
        
        {/* Date selector and export/new payroll */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-3 sm:space-y-0">
          <div>
            <select 
              className="border border-gray-300 rounded-md text-gray-700 text-sm px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600"
              onChange={(e) => handleMonthFilter(e.target.value)}
              value={`${selectedMonth.year}-${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(selectedMonth.month)}`}
            >
              {monthYearOptions.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div className="flex space-x-2 justify-end">
            <button 
              className="flex items-center space-x-1 border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50" 
              onClick={() => handleExportAll()}
            >
              <i className="fas fa-download"></i>
              <span>Export All</span>
            </button>
            <button 
              className="flex items-center space-x-1 border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
              onClick={handleProcessPayroll}
            >
              <i className="fas fa-cog"></i>
              <span>Process Payroll</span>
            </button>
            <button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-4 py-1.5 text-sm font-semibold" 
              onClick={() => setShowEmployeeForm(true)}
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
              <h2 className="text-sm font-semibold text-gray-700">Payroll Cost Overview (in ₹)</h2>
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
              <h2 className="text-sm font-semibold text-gray-700">Bonuses and Incentives (in ₹)</h2>
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
          searchTerm={searchTerm}
          onSearch={handleSearch}
          onStatusFilter={handleStatusFilter}
          onRoleFilter={handleRoleFilter}
          onEdit={handleEditEmployee}
          onDelete={handleDeleteEmployee}
          onViewPayslip={handleViewPayslip}
          onExportAll={handleExportAll}
        />
        
        {/* Payslip Modal */}
        {currentPayslip && (
          <PayslipModal 
            payslip={currentPayslip} 
            onClose={() => setCurrentPayslip(null)}
          />
        )}
        
        {/* Employee Form Modal */}
        {showEmployeeForm && (
          <EmployeeFormModal 
            employee={currentEmployee}
            onSave={handleSaveEmployee}
            onClose={() => {
              setShowEmployeeForm(false);
              setCurrentEmployee(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PayrollDashboard;