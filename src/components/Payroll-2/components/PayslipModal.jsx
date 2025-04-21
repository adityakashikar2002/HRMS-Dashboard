// src/components/PayslipModal.jsx
import React from 'react';
import { formatIndianCurrency } from '../utils';

const PayslipModal = ({ payslip, onClose }) => {
  if (!payslip) return null;

  const handlePrint = () => {
    const printContent = document.getElementById('payslip-content');
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Payslip - ${payslip.name}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            .payslip-container { max-width: 800px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; }
            .header { display: flex; justify-content: space-between; margin-bottom: 20px; }
            .company-info h2 { margin: 0; color: #333; }
            .employee-info { margin-top: 20px; }
            .section { margin-bottom: 20px; }
            .section-title { border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #f5f5f5; }
            .total { font-weight: bold; }
            .signature { margin-top: 40px; display: flex; justify-content: space-between; }
            .watermark { position: fixed; opacity: 0.1; font-size: 72px; transform: rotate(-45deg); top: 30%; left: 20%; }
            @media print {
              body { padding: 0; }
              .no-print { display: none !important; }
            }
          </style>
        </head>
        <body>
          <div class="payslip-container">
            <div class="watermark">PAYSLIP</div>
            <div class="header">
              <div class="company-info">
                <h2>Qloron</h2>
                <p>Hyderabad</p>
                <p>GSTIN: XXXXXX</p>
              </div>
              <div class="payslip-info">
                <h3>PAYSLIP</h3>
                <p>Month: ${payslip.month} ${payslip.year}</p>
                <p>Payment Date: ${payslip.paymentDate}</p>
              </div>
            </div>
            
            <div class="employee-info">
              <p><strong>Employee Name:</strong> ${payslip.name}</p>
              <p><strong>Employee ID:</strong> ${payslip.id}</p>
              <p><strong>Designation:</strong> ${payslip.role}</p>
              <p><strong>Status:</strong> ${payslip.status}</p>
            </div>
            
            <div class="section">
              <h4 class="section-title">Earnings</h4>
              <table>
                <thead>
                  <tr>
                    <th>Component</th>
                    <th>Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Basic Salary</td>
                    <td>${formatIndianCurrency(payslip.basic)}</td>
                  </tr>
                  <tr>
                    <td>House Rent Allowance (HRA)</td>
                    <td>${formatIndianCurrency(payslip.hra)}</td>
                  </tr>
                  <tr>
                    <td>Dearness Allowance (DA)</td>
                    <td>${formatIndianCurrency(payslip.da)}</td>
                  </tr>
                  <tr>
                    <td>Reimbursements</td>
                    <td>${formatIndianCurrency(payslip.reimbursement || 0)}</td>
                  </tr>
                  <tr class="total">
                    <td>Total Earnings</td>
                    <td>${formatIndianCurrency(payslip.grossSalary)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div class="section">
              <h4 class="section-title">Deductions</h4>
              <table>
                <thead>
                  <tr>
                    <th>Component</th>
                    <th>Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Income Tax (TDS)</td>
                    <td>${formatIndianCurrency(payslip.tax)}</td>
                  </tr>
                  <tr>
                    <td>Provident Fund (PF) - 12%</td>
                    <td>${formatIndianCurrency(payslip.pf)}</td>
                  </tr>
                  <tr>
                    <td>Employee State Insurance (ESIC) ${payslip.grossSalary <= 21000 ? '- 0.75%' : ''}</td>
                    <td>${formatIndianCurrency(payslip.esic)} ${payslip.grossSalary > 21000 ? '(Not applicable)' : ''}</td>
                  </tr>
                  <tr class="total">
                    <td>Total Deductions</td>
                    <td>${formatIndianCurrency(payslip.deductions)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div class="section">
              <h3 class="section-title">Net Salary</h3>
              <table>
                <tbody>
                  <tr class="total">
                    <td>Net Payable</td>
                    <td>${formatIndianCurrency(payslip.netSalary)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div class="signature no-print">
              <div>
                <p>Employee Signature</p>
              </div>
              <div>
                <p>Authorized Signatory</p>
              </div>
            </div>
            
            <div class="footer no-print">
              <p>This is a computer generated payslip and does not require signature.</p>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 500);
  };

  const handleDownload = () => {
    const payslipData = [{
      'Employee ID': payslip.id,
      'Employee Name': payslip.name,
      'Designation': payslip.role,
      'Month': `${payslip.month} ${payslip.year}`,
      'Payment Date': payslip.paymentDate,
      'Status': payslip.status,
      'Basic Salary': payslip.basic,
      'HRA': payslip.hra,
      'DA': payslip.da,
      'Reimbursements': payslip.reimbursement || 0,
      'Gross Earnings': payslip.grossSalary,
      'Income Tax (TDS)': payslip.tax,
      'Provident Fund (PF)': payslip.pf,
      'Employee State Insurance (ESIC)': payslip.esic,
      'Total Deductions': payslip.deductions,
      'Net Salary': payslip.netSalary
    }];
    
    // Use the exportToCSV function from utils
    import('../utils').then(({ exportToCSV }) => {
      exportToCSV(payslipData, `payslip_${payslip.id}_${payslip.month}_${payslip.year}.csv`);
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl" id="payslip-content">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Payslip - {payslip.month} {payslip.year}</h2>
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
                  <span>{formatIndianCurrency(payslip.basic)}</span>
                </div>
                <div className="flex justify-between">
                  <span>House Rent Allowance (HRA)</span>
                  <span>{formatIndianCurrency(payslip.hra)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dearness Allowance (DA)</span>
                  <span>{formatIndianCurrency(payslip.da)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Reimbursements</span>
                  <span>{formatIndianCurrency(payslip.reimbursement || 0)}</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                  <span>Gross Earnings</span>
                  <span>{formatIndianCurrency(payslip.grossSalary)}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-gray-700 border-b pb-1">Deductions</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Income Tax (TDS)</span>
                  <span>{formatIndianCurrency(payslip.tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Provident Fund (PF) - 12%</span>
                  <span>{formatIndianCurrency(payslip.pf)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Employee State Insurance (ESIC) {payslip.grossSalary <= 21000 ? '- 0.75%' : ''}</span>
                  <span>
                    {formatIndianCurrency(payslip.esic)}
                    {payslip.grossSalary > 21000 && (
                      <span className="text-xs text-gray-500 ml-1">(Not applicable)</span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                  <span>Total Deductions</span>
                  <span>{formatIndianCurrency(payslip.deductions)}</span>
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
                {formatIndianCurrency(payslip.netSalary)}
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