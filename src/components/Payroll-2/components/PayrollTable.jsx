// import React, { useState } from 'react';
// import EmployeeRow from './EmployeeRow';

// const PayrollTable = ({ 
//   employees, 
//   onSearch, 
//   onStatusFilter, 
//   onRoleFilter,
//   onEdit,
//   onDelete
// }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All Status');
//   const [roleFilter, setRoleFilter] = useState('All Role');

//   const handleSearch = (e) => {
//     const term = e.target.value;
//     setSearchTerm(term);
//     onSearch(term);
//   };

//   const handleStatusFilter = (e) => {
//     const status = e.target.value;
//     setStatusFilter(status);
//     onStatusFilter(status);
//   };

//   const handleRoleFilter = (e) => {
//     const role = e.target.value;
//     setRoleFilter(role);
//     onRoleFilter(role);
//   };

//   return (
//     <section className="mb-8">
//       <div className="flex justify-between items-center mb-3">
//         <h2 className="text-sm font-semibold text-gray-700">Payroll list</h2>
//         <div className="flex space-x-2 items-center">
//           <div className="relative">
//             <input 
//               className="border border-gray-300 rounded-md text-sm text-gray-600 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600" 
//               placeholder="Search Employee" 
//               type="search"
//               value={searchTerm}
//               onChange={handleSearch}
//             />
//             <i className="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs"></i>
//           </div>
//           <select 
//             className="border border-gray-300 rounded-md text-sm text-gray-600 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600"
//             value={statusFilter}
//             onChange={handleStatusFilter}
//           >
//             <option>All Status</option>
//             <option>Completed</option>
//             <option>Pending</option>
//           </select>
//           <select 
//             className="border border-gray-300 rounded-md text-sm text-gray-600 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600"
//             value={roleFilter}
//             onChange={handleRoleFilter}
//           >
//             <option>All Role</option>
//             <option>UI/UX Designer</option>
//             <option>Graphics Designer</option>
//             <option>Animator</option>
//           </select>
//         </div>
//       </div>
//       <div className="overflow-x-auto scrollbar-hide border border-gray-200 rounded-md">
//         <table className="w-full text-xs text-left text-gray-500 border-collapse">
//           <thead className="bg-gray-50 text-gray-400">
//             <tr>
//               <th className="p-3 w-6">
//                 <input type="checkbox" />
//               </th>
//               <th className="p-3 min-w-[90px]">Payroll ID</th>
//               <th className="p-3 min-w-[140px]">Employee name</th>
//               <th className="p-3 min-w-[120px]">Role</th>
//               <th className="p-3 min-w-[140px]">Date & Time</th>
//               <th className="p-3 min-w-[100px]">Total Salary</th>
//               <th className="p-3 min-w-[100px]">Reimbursment</th>
//               <th className="p-3 min-w-[80px]">Status</th>
//               <th className="p-3 w-16">Action</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {employees.map(employee => (
//               <EmployeeRow 
//                 key={employee.id} 
//                 employee={employee} 
//                 onEdit={onEdit}
//                 onDelete={onDelete}
//               />
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </section>
//   );
// };

// export default PayrollTable;

// src/components/PayrollTable.jsx
import React, { useState } from 'react';
import EmployeeRow from './EmployeeRow';

const PayrollTable = ({ 
  employees, 
  onSearch, 
  onStatusFilter, 
  onRoleFilter,
  onEdit,
  onDelete,
  onViewPayslip,
  onExportAll
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [roleFilter, setRoleFilter] = useState('All Role');
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const handleStatusFilter = (e) => {
    const status = e.target.value;
    setStatusFilter(status);
    onStatusFilter(status);
  };

  const handleRoleFilter = (e) => {
    const role = e.target.value;
    setRoleFilter(role);
    onRoleFilter(role);
  };

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(employees.map(emp => emp.id));
    } else {
      setSelectedRows([]);
    }
  };

  const toggleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleBulkExport = () => {
    const selectedEmployees = employees.filter(emp => selectedRows.includes(emp.id));
    onExportAll(selectedEmployees);
  };

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-semibold text-gray-700">Payroll list</h2>
        <div className="flex space-x-2 items-center">
          {selectedRows.length > 0 && (
            <button 
              onClick={handleBulkExport}
              className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
            >
              <i className="fas fa-download mr-1"></i> Export Selected ({selectedRows.length})
            </button>
          )}
          <div className="relative">
            <input 
              className="border border-gray-300 rounded-md text-sm text-gray-600 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600" 
              placeholder="Search Employee" 
              type="search"
              value={searchTerm}
              onChange={handleSearch}
            />
            <i className="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs"></i>
          </div>
          <select 
            className="border border-gray-300 rounded-md text-sm text-gray-600 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600"
            value={statusFilter}
            onChange={handleStatusFilter}
          >
            <option>All Status</option>
            <option>Completed</option>
            <option>Pending</option>
          </select>
          <select 
            className="border border-gray-300 rounded-md text-sm text-gray-600 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600"
            value={roleFilter}
            onChange={handleRoleFilter}
          >
            <option>All Role</option>
            <option>UI/UX Designer</option>
            <option>Graphics Designer</option>
            <option>Animator</option>
            <option>Developer</option>
            <option>Manager</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto scrollbar-hide border border-gray-200 rounded-md">
        <table className="w-full text-xs text-left text-gray-500 border-collapse">
          <thead className="bg-gray-50 text-gray-400">
            <tr>
              <th className="p-3 w-6">
                <input 
                  type="checkbox" 
                  checked={selectedRows.length === employees.length && employees.length > 0}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="p-3 min-w-[90px]">Payroll ID</th>
              <th className="p-3 min-w-[140px]">Employee name</th>
              <th className="p-3 min-w-[120px]">Role</th>
              <th className="p-3 min-w-[140px]">Date & Time</th>
              <th className="p-3 min-w-[100px]">Total Salary</th>
              <th className="p-3 min-w-[100px]">Reimbursment</th>
              <th className="p-3 min-w-[80px]">Status</th>
              <th className="p-3 w-16">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {employees.map(employee => (
              <EmployeeRow 
                key={employee.id} 
                employee={employee} 
                onEdit={onEdit}
                onDelete={onDelete}
                onViewPayslip={onViewPayslip}
                isSelected={selectedRows.includes(employee.id)}
                onSelect={toggleSelectRow}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PayrollTable;