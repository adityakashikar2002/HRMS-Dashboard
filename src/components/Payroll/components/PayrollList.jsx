import React, { useContext } from 'react';
import { PayrollContext } from '../context/PayrollContext';

const PayrollList = () => {
  const { 
    payrolls, 
    filterStatus, 
    filterRole, 
    setFilterStatus, 
    setFilterRole 
  } = useContext(PayrollContext);

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-semibold text-gray-700">Payroll list</h2>
        <div className="flex space-x-2 items-center">
          <div className="relative">
            <input 
              className="border border-gray-300 rounded-md text-sm text-gray-600 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600" 
              placeholder="Search Employee" 
              type="search"
            />
            <i className="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs"></i>
          </div>
          <select 
            className="border border-gray-300 rounded-md text-sm text-gray-600 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option>All Status</option>
            <option>Completed</option>
            <option>Pending</option>
          </select>
          <select 
            className="border border-gray-300 rounded-md text-sm text-gray-600 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option>All Role</option>
            <option>UI/UX Designer</option>
            <option>Graphics Designer</option>
            <option>Animator</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto scrollbar-hide border border-gray-200 rounded-md">
        <table className="w-full text-xs text-left text-gray-500 border-collapse">
          <thead className="bg-gray-50 text-gray-400">
            <tr>
              <th className="p-3 w-6">
                <input type="checkbox" />
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
            {payrolls.map((payroll, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-3">
                  <input type="checkbox" />
                </td>
                <td className="p-3 font-semibold text-gray-700">{payroll.id}</td>
                <td className="p-3 flex items-center space-x-2">
                  <img 
                    alt={`Profile of ${payroll.employeeName}`} 
                    className="w-6 h-6 rounded-full" 
                    src={payroll.avatar} 
                  />
                  <span className="text-gray-900 font-semibold">{payroll.employeeName}</span>
                </td>
                <td className="p-3 text-gray-700">
                  <span className="font-semibold">{payroll.role.split(' ')[0]}</span> {payroll.role.split(' ').slice(1).join(' ')}
                </td>
                <td className="p-3">{payroll.date}</td>
                <td className="p-3 whitespace-nowrap">$ {payroll.salary.toLocaleString()}</td>
                <td className="p-3 whitespace-nowrap">$ {payroll.reimbursement.toLocaleString()}</td>
                <td className="p-3">
                  <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-md ${
                    payroll.status === 'Completed' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {payroll.status}
                  </span>
                </td>
                <td className="p-3 flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-gray-600" type="button">
                    <i className="fas fa-eye"></i>
                  </button>
                  <button className="text-gray-400 hover:text-gray-600" type="button">
                    <i className="fas fa-ellipsis-v"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PayrollList;