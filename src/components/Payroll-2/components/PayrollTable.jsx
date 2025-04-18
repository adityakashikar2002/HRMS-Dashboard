// src/components/PayrollTable.jsx
import React, { useState } from 'react';
import EmployeeRow from './EmployeeRow';
import { formatIndianCurrency } from '../utils';

const PayrollTable = ({ 
  employees, 
  searchTerm,
  onSearch, 
  onStatusFilter, 
  onRoleFilter,
  onEdit,
  onDelete,
  onViewPayslip,
  onExportAll
}) => {
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [roleFilter, setRoleFilter] = useState('All Role');
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSearch = (e) => {
    const term = e.target.value;
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
    setSelectedRows([]);
  };

  const handleBulkStatusChange = (newStatus) => {
    if (selectedRows.length === 0) return;
    
    const updatedEmployees = employees.map(emp => 
      selectedRows.includes(emp.id) ? { ...emp, status: newStatus } : emp
    );
    
    onEdit(updatedEmployees.find(emp => selectedRows.includes(emp.id)));
    setSelectedRows([]);
  };

  return (
    <section className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
        <h2 className="text-sm font-semibold text-gray-700">Payroll list</h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
          {selectedRows.length > 0 && (
            <div className="flex gap-2">
              <button 
                onClick={handleBulkExport}
                className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
              >
                <i className="fas fa-download mr-1"></i> Export ({selectedRows.length})
              </button>
              <button 
                onClick={() => handleBulkStatusChange('Completed')}
                className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
              >
                <i className="fas fa-check mr-1"></i> Mark Completed
              </button>
              <button 
                onClick={() => handleBulkStatusChange('Pending')}
                className="px-3 py-1.5 bg-yellow-600 text-white text-sm rounded-md hover:bg-yellow-700"
              >
                <i className="fas fa-clock mr-1"></i> Mark Pending
              </button>
            </div>
          )}
          <div className="flex gap-2">
            <div className="relative flex-grow sm:flex-grow-0 sm:w-48">
              <input 
                className="w-full border border-gray-300 rounded-md text-sm text-gray-600 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600" 
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
            {employees.length > 0 ? (
              employees.map(employee => (
                <EmployeeRow 
                  key={employee.id} 
                  employee={employee} 
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onViewPayslip={onViewPayslip}
                  isSelected={selectedRows.includes(employee.id)}
                  onSelect={toggleSelectRow}
                />
              ))
            ) : (
              <tr>
                <td colSpan="9" className="p-4 text-center text-gray-500">
                  No employees found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PayrollTable;