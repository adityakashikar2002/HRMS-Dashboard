// src/components/PayslipModal.jsx
import React from 'react';
import { exportToCSV } from '../utils';

const PayslipModal = ({ payslip, onClose }) => {
  if (!payslip) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    exportToCSV([payslip], `payslip_${payslip.id}.csv`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Payslip - {payslip.month} 2024</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="border-b pb-4 mb-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{payslip.name}</h3>
                <p className="text-sm text-gray-600">{payslip.role}</p>
                <p className="text-sm text-gray-600">Employee ID: {payslip.id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm">Payment Date: {payslip.paymentDate}</p>
                <p className="text-sm">Status: <span className={`px-2 py-1 rounded ${payslip.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {payslip.status}
                </span></p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold mb-3 text-gray-700 border-b pb-1">Earnings</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Basic Salary</span>
                  <span>₹ {payslip.basic.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>House Rent Allowance (HRA)</span>
                  <span>₹ {payslip.hra.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dearness Allowance (DA)</span>
                  <span>₹ {payslip.da.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Reimbursements</span>
                  <span>₹ {payslip.reimbursement.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                  <span>Gross Earnings</span>
                  <span>₹ {payslip.grossSalary.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-gray-700 border-b pb-1">Deductions</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Income Tax (TDS)</span>
                  <span>₹ {payslip.tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Provident Fund (PF)</span>
                  <span>₹ {payslip.pf.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Employee State Insurance (ESIC)</span>
                  <span>₹ {payslip.esic.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                  <span>Total Deductions</span>
                  <span>₹ {payslip.deductions.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-700">Net Salary Payable</h4>
                <p className="text-sm text-gray-600">After all deductions and additions</p>
              </div>
              <div className="text-2xl font-bold text-blue-700">
                ₹ {payslip.netSalary.toLocaleString('en-IN')}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button 
              onClick={handleDownload}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              <i className="fas fa-download mr-2"></i>Download CSV
            </button>
            <button 
              onClick={handlePrint}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <i className="fas fa-print mr-2"></i>Print Payslip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayslipModal;