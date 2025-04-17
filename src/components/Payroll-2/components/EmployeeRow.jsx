import React from 'react';

const EmployeeRow = ({ employee, onEdit, onDelete }) => {
  const statusClass = employee.status === 'Completed' 
    ? 'bg-green-100 text-green-600' 
    : 'bg-yellow-100 text-yellow-600';

  return (
    <tr className="hover:bg-gray-50">
      <td className="p-3">
        <input type="checkbox" />
      </td>
      <td className="p-3 font-semibold text-gray-700">
        {employee.id}
      </td>
      <td className="p-3 flex items-center space-x-2">
        <img 
          alt={`Profile of ${employee.name}`} 
          className="w-6 h-6 rounded-full" 
          src={employee.avatar} 
        />
        <span className="text-gray-900 font-semibold">
          {employee.name}
        </span>
      </td>
      <td className="p-3 text-gray-700">
        {employee.role}
      </td>
      <td className="p-3">
        {employee.date}
      </td>
      <td className="p-3 whitespace-nowrap">
        $ {employee.salary.toLocaleString()}
      </td>
      <td className="p-3 whitespace-nowrap">
        $ {employee.reimbursement.toLocaleString()}
      </td>
      <td className="p-3">
        <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-md ${statusClass}`}>
          {employee.status}
        </span>
      </td>
      <td className="p-3 flex items-center space-x-2">
        <button 
          className="text-gray-400 hover:text-gray-600" 
          onClick={() => onEdit(employee)}
        >
          <i className="fas fa-eye"></i>
        </button>
        <button 
          className="text-gray-400 hover:text-gray-600" 
          onClick={() => onDelete(employee.id)}
        >
          <i className="fas fa-ellipsis-v"></i>
        </button>
      </td>
    </tr>
  );
};

export default EmployeeRow;