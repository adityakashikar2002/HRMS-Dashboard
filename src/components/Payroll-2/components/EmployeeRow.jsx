// // src/components/EmployeeRow.jsx
// import React, { useState } from 'react';
// import { generatePayslip, formatIndianCurrency } from '../utils';

// const EmployeeRow = ({ 
//   employee, 
//   onEdit, 
//   onDelete, 
//   onViewPayslip,
//   isSelected,
//   onSelect
// }) => {
//   const [showDetails, setShowDetails] = useState(false);
//   const statusClass = employee.status === 'Completed' 
//     ? 'bg-green-100 text-green-600' 
//     : 'bg-yellow-100 text-yellow-600';

//   const toggleDetails = () => {
//     setShowDetails(!showDetails);
//   };

//   const handleCheckboxChange = () => {
//     onSelect(employee.id);
//   };

//   const payslip = generatePayslip(employee);

//   return (
//     <>
//       <tr className="hover:bg-gray-50">
//         <td className="p-3">
//           <input 
//             type="checkbox" 
//             checked={isSelected}
//             onChange={handleCheckboxChange}
//           />
//         </td>
//         <td className="p-3 font-semibold text-gray-700">
//           {employee.id}
//         </td>
//         <td className="p-3 flex items-center space-x-2">
//           <img 
//             alt={`Profile of ${employee.name}`} 
//             className="w-6 h-6 rounded-full" 
//             src={employee.avatar} 
//           />
//           <span className="text-gray-900 font-semibold">
//             {employee.name}
//           </span>
//         </td>
//         <td className="p-3 text-gray-700">
//           {employee.role}
//         </td>
//         <td className="p-3">
//           {employee.date}
//         </td>
//         <td className="p-3 whitespace-nowrap">
//           {formatIndianCurrency(employee.salary)}
//         </td>
//         <td className="p-3 whitespace-nowrap">
//           {formatIndianCurrency(employee.reimbursement)}
//         </td>
//         <td className="p-3">
//           <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-md ${statusClass}`}>
//             {employee.status}
//           </span>
//         </td>
//         <td className="p-3 flex items-center space-x-2">
//           <button 
//             className="text-gray-400 hover:text-gray-600" 
//             onClick={() => onViewPayslip(payslip)}
//             title="View Payslip"
//           >
//             <i className="fas fa-eye"></i>
//           </button>
//           <button 
//             className="text-gray-400 hover:text-gray-600" 
//             onClick={() => onEdit(employee)}
//             title="Edit Employee"
//           >
//             <i className="fas fa-edit"></i>
//           </button>
//           <button 
//             className="text-gray-400 hover:text-gray-600" 
//             onClick={() => onDelete(employee.id)}
//             title="Delete Employee"
//           >
//             <i className="fas fa-trash"></i>
//           </button>
//         </td>
//       </tr>
//       {showDetails && (
//         <tr className="bg-gray-50">
//           <td colSpan="9" className="p-4">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//               <div>
//                 <h4 className="font-semibold mb-2">Salary Breakdown</h4>
//                 <div className="space-y-1">
//                   <div className="flex justify-between">
//                     <span>Basic Salary:</span>
//                     <span>{formatIndianCurrency(payslip.basic)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>HRA:</span>
//                     <span>{formatIndianCurrency(payslip.hra)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>DA:</span>
//                     <span>{formatIndianCurrency(payslip.da)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Reimbursements:</span>
//                     <span>{formatIndianCurrency(payslip.reimbursement)}</span>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <h4 className="font-semibold mb-2">Deductions</h4>
//                 <div className="space-y-1">
//                   <div className="flex justify-between">
//                     <span>Income Tax:</span>
//                     <span>{formatIndianCurrency(payslip.tax)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>PF Contribution:</span>
//                     <span>{formatIndianCurrency(payslip.pf)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>ESIC:</span>
//                     <span>{formatIndianCurrency(payslip.esic)}</span>
//                   </div>
//                   <div className="flex justify-between font-semibold">
//                     <span>Total Deductions:</span>
//                     <span>{formatIndianCurrency(payslip.deductions)}</span>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <h4 className="font-semibold mb-2">Net Salary</h4>
//                 <div className="bg-blue-50 p-3 rounded-md">
//                   <div className="flex justify-between font-semibold text-lg">
//                     <span>Net Pay:</span>
//                     <span>{formatIndianCurrency(payslip.netSalary)}</span>
//                   </div>
//                   <div className="text-xs text-gray-500 mt-2">
//                     Payment Date: {payslip.paymentDate}
//                   </div>
//                 </div>
//                 <button 
//                   className="mt-2 text-blue-600 text-sm hover:underline"
//                   onClick={() => onViewPayslip(payslip)}
//                 >
//                   View Full Payslip
//                 </button>
//               </div>
//             </div>
//           </td>
//         </tr>
//       )}
//     </>
//   );
// };

// export default EmployeeRow;

// src/components/EmployeeRow.jsx
import React, { useState } from 'react';
import { generatePayslip, formatIndianCurrency } from '../utils';

const EmployeeRow = ({ 
  employee, 
  onEdit, 
  onDelete, 
  onViewPayslip,
  isSelected,
  onSelect
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const statusClass = employee.status === 'Completed' 
    ? 'bg-green-100 text-green-600' 
    : 'bg-yellow-100 text-yellow-600';

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleCheckboxChange = () => {
    onSelect(employee.id);
  };

  const payslip = generatePayslip(employee);

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="p-3">
          <input 
            type="checkbox" 
            checked={isSelected}
            onChange={handleCheckboxChange}
          />
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
          {formatIndianCurrency(employee.salary)}
        </td>
        <td className="p-3 whitespace-nowrap">
          {formatIndianCurrency(employee.reimbursement)}
        </td>
        <td className="p-3">
          <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-md ${statusClass}`}>
            {employee.status}
          </span>
        </td>
        <td className="p-3 flex items-center space-x-2">
          <button 
            className="text-gray-400 hover:text-gray-600" 
            onClick={() => onViewPayslip(payslip)}
            title="View Payslip"
          >
            <i className="fas fa-eye"></i>
          </button>
          <button 
            className="text-gray-400 hover:text-gray-600" 
            onClick={() => onEdit(employee)}
            title="Edit Employee"
          >
            <i className="fas fa-edit"></i>
          </button>
          <button 
            className="text-gray-400 hover:text-gray-600" 
            onClick={() => onDelete(employee.id)}
            title="Delete Employee"
          >
            <i className="fas fa-trash"></i>
          </button>
        </td>
      </tr>
      {showDetails && (
        <tr className="bg-gray-50">
          <td colSpan="9" className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Salary Breakdown</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Basic Salary:</span>
                    <span>{formatIndianCurrency(payslip.basic)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>HRA:</span>
                    <span>{formatIndianCurrency(payslip.hra)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DA:</span>
                    <span>{formatIndianCurrency(payslip.da)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reimbursements:</span>
                    <span>{formatIndianCurrency(payslip.reimbursement)}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Deductions</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Income Tax:</span>
                    <span>{formatIndianCurrency(payslip.tax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>PF Contribution (12%):</span>
                    <span>{formatIndianCurrency(payslip.pf)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ESIC {payslip.grossSalary <= 21000 ? '(0.75%)' : ''}:</span>
                    <span>
                      {formatIndianCurrency(payslip.esic)}
                      {payslip.grossSalary > 21000 && (
                        <span className="text-xs text-gray-500 ml-1">(Not applicable)</span>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total Deductions:</span>
                    <span>{formatIndianCurrency(payslip.deductions)}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Net Salary</h4>
                <div className="bg-blue-50 p-3 rounded-md">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Net Pay:</span>
                    <span>{formatIndianCurrency(payslip.netSalary)}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Payment Date: {payslip.paymentDate}
                  </div>
                </div>
                <button 
                  className="mt-2 text-blue-600 text-sm hover:underline"
                  onClick={() => onViewPayslip(payslip)}
                >
                  View Full Payslip
                </button>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default EmployeeRow;