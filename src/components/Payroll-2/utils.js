// export const calculateTax = (annualSalary) => {
//   const taxSlabs = [
//     { min: 0, max: 250000, rate: 0 },
//     { min: 250001, max: 500000, rate: 0.05 },
//     { min: 500001, max: 750000, rate: 0.1 },
//     { min: 750001, max: 1000000, rate: 0.15 },
//     { min: 1000001, max: 1250000, rate: 0.2 },
//     { min: 1250001, max: 1500000, rate: 0.25 },
//     { min: 1500001, max: Infinity, rate: 0.3 }
//   ];

//   let tax = 0;
//   let remainingSalary = annualSalary;

//   for (const slab of taxSlabs) {
//     if (remainingSalary <= 0) break;
    
//     const slabAmount = Math.min(remainingSalary, slab.max - slab.min);
//     if (slabAmount > 0) {
//       tax += slabAmount * slab.rate;
//       remainingSalary -= slabAmount;
//     }
//   }

//   return tax / 12; // Return monthly tax
// };

// export const generatePayslip = (employee) => {
//   const basic = employee.basic || employee.salary * 0.6;
//   const hra = employee.hra || basic * 0.5;
//   const da = employee.da || basic * 0.1;
//   const annualSalary = (basic + hra + da) * 12;
//   const tax = calculateTax(annualSalary);
//   const pf = basic * 0.12; // Employee PF contribution
//   const esic = (basic + hra + da) <= 21000 ? (basic + hra + da) * 0.0175 : 0; // ESIC if gross <= 21,000
  
//   const grossSalary = basic + hra + da;
//   const deductions = tax + pf + esic;
//   const netSalary = grossSalary + (employee.reimbursement || 0) - deductions;

//   return {
//     ...employee,
//     basic,
//     hra,
//     da,
//     tax: Math.round(tax),
//     pf: Math.round(pf),
//     esic: Math.round(esic),
//     grossSalary: Math.round(grossSalary),
//     deductions: Math.round(deductions),
//     netSalary: Math.round(netSalary),
//     paymentDate: new Date().toLocaleDateString('en-IN')
//   };
// };

// export const exportToCSV = (data, filename) => {
//   const headers = Object.keys(data[0]);
//   let csv = headers.join(',') + '\n';
  
//   data.forEach(row => {
//     const values = headers.map(header => {
//       const value = row[header];
//       return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
//     });
//     csv += values.join(',') + '\n';
//   });

//   const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//   const link = document.createElement('a');
//   const url = URL.createObjectURL(blob);
  
//   link.setAttribute('href', url);
//   link.setAttribute('download', filename);
//   link.style.visibility = 'hidden';
  
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

// // src/utils.js
// export const saveToLocalStorage = (key, data) => {
//   try {
//     localStorage.setItem(key, JSON.stringify(data));
//   } catch (error) {
//     console.error('Error saving to localStorage:', error);
//   }
// };

// export const loadFromLocalStorage = (key, defaultValue) => {
//   try {
//     const data = localStorage.getItem(key);
//     return data ? JSON.parse(data) : defaultValue;
//   } catch (error) {
//     console.error('Error loading from localStorage:', error);
//     return defaultValue;
//   }
// };

// export const calculateIndianTax = (annualSalary) => {
//   const taxSlabs = [
//     { min: 0, max: 250000, rate: 0 },
//     { min: 250001, max: 500000, rate: 0.05 },
//     { min: 500001, max: 750000, rate: 0.1 },
//     { min: 750001, max: 1000000, rate: 0.15 },
//     { min: 1000001, max: 1250000, rate: 0.2 },
//     { min: 1250001, max: 1500000, rate: 0.25 },
//     { min: 1500001, max: Infinity, rate: 0.3 }
//   ];

//   let tax = 0;
//   let remainingSalary = annualSalary;

//   // Standard deduction (Section 16)
//   if (annualSalary > 50000) {
//     remainingSalary -= 50000;
//   }

//   for (const slab of taxSlabs) {
//     if (remainingSalary <= 0) break;
    
//     const slabAmount = Math.min(remainingSalary, slab.max - slab.min);
//     if (slabAmount > 0) {
//       tax += slabAmount * slab.rate;
//       remainingSalary -= slabAmount;
//     }
//   }

//   // Health and Education Cess (4%)
//   tax += tax * 0.04;

//   return Math.round(tax / 12); // Return monthly tax
// };

// export const calculatePF = (basicSalary) => {
//   // Employee contribution (12% of basic, capped at ₹1,800)
//   return Math.min(basicSalary * 0.12, 1800);
// };

// export const calculateESIC = (grossSalary) => {
//   // Employee contribution (0.75% of gross if gross ≤ ₹21,000)
//   return grossSalary <= 21000 ? grossSalary * 0.0075 : 0;
// };

// export const generateIndianPayslip = (employee) => {
//   const basic = employee.basic || employee.salary * 0.6;
//   const hra = employee.hra || basic * 0.5;
//   const da = employee.da || basic * 0.1;
//   const annualSalary = (basic + hra + da) * 12;
  
//   const tax = calculateIndianTax(annualSalary);
//   const pf = calculatePF(basic);
//   const esic = calculateESIC(basic + hra + da);
  
//   const grossSalary = basic + hra + da;
//   const deductions = tax + pf + esic;
//   const netSalary = grossSalary + (employee.reimbursement || 0) - deductions;

//   return {
//     ...employee,
//     basic,
//     hra,
//     da,
//     tax: Math.round(tax),
//     pf: Math.round(pf),
//     esic: Math.round(esic),
//     grossSalary: Math.round(grossSalary),
//     deductions: Math.round(deductions),
//     netSalary: Math.round(netSalary),
//     paymentDate: new Date().toLocaleDateString('en-IN'),
//     financialYear: getIndianFinancialYear(new Date())
//   };
// };

// export const getIndianFinancialYear = (date) => {
//   const year = date.getFullYear();
//   const month = date.getMonth();
//   return month < 3 ? `${year-1}-${year.toString().slice(-2)}` : `${year}-${(year+1).toString().slice(-2)}`;
// };

// export const exportToExcel = (data, filename) => {
//   const headers = Object.keys(data[0]);
//   let csv = headers.join(',') + '\n';
  
//   data.forEach(row => {
//     const values = headers.map(header => {
//       const value = row[header];
//       return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
//     });
//     csv += values.join(',') + '\n';
//   });

//   const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//   const link = document.createElement('a');
//   const url = URL.createObjectURL(blob);
  
//   link.setAttribute('href', url);
//   link.setAttribute('download', filename);
//   link.style.visibility = 'hidden';
  
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

// export const formatIndianCurrency = (amount) => {
//   return '₹' + amount.toLocaleString('en-IN');
// };


// src/utils.js
export const calculateIndianTax = (annualSalary) => {
  // Updated tax slabs as per current Indian tax laws (FY 2023-24)
  const taxSlabs = [
    { min: 0, max: 250000, rate: 0 },
    { min: 250001, max: 500000, rate: 0.05 },
    { min: 500001, max: 750000, rate: 0.1 },
    { min: 750001, max: 1000000, rate: 0.15 },
    { min: 1000001, max: 1250000, rate: 0.2 },
    { min: 1250001, max: 1500000, rate: 0.25 },
    { min: 1500001, max: Infinity, rate: 0.3 }
  ];

  // Standard deduction (Section 16)
  const taxableIncome = Math.max(annualSalary - 50000, 0);
  
  let tax = 0;
  let remainingIncome = taxableIncome;

  for (const slab of taxSlabs) {
    if (remainingIncome <= 0) break;
    
    const slabRange = slab.max - slab.min;
    const taxableAmount = remainingIncome > slabRange ? slabRange : remainingIncome;
    
    tax += taxableAmount * slab.rate;
    remainingIncome -= taxableAmount;
  }

  // Add health and education cess (4%)
  tax += tax * 0.04;

  return Math.round(tax / 12); // Monthly tax
};

export const calculatePF = (basicSalary) => {
  // Employee PF contribution (12% of basic, max ₹1800)
  return Math.min(Math.round(basicSalary * 0.12), 1800);
};

export const calculateESIC = (grossSalary) => {
  // Employee ESIC contribution (0.75% of gross if gross ≤ ₹21000)
  return grossSalary <= 21000 ? Math.round(grossSalary * 0.0075) : 0;
};

export const generatePayslip = (employee) => {
  // Validate and calculate salary components
  const basic = Math.round(employee.basic || employee.salary * 0.5);
  const hra = Math.round(employee.hra || basic * 0.4);
  const da = Math.round(employee.da || basic * 0.1);
  
  const monthlyGross = basic + hra + da;
  const annualGross = monthlyGross * 12;
  
  // Calculate deductions
  const tax = calculateIndianTax(annualGross);
  const pf = calculatePF(basic);
  const esic = calculateESIC(monthlyGross);
  
  const totalDeductions = tax + pf + esic;
  const netSalary = monthlyGross + (employee.reimbursement || 0) - totalDeductions;
  
  // Get current month/year
  const now = new Date();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[now.getMonth()];
  const year = now.getFullYear();

  return {
    ...employee,
    basic,
    hra,
    da,
    tax,
    pf,
    esic,
    grossSalary: monthlyGross,
    deductions: totalDeductions,
    netSalary: Math.round(netSalary),
    paymentDate: now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    month,
    year,
    financialYear: getIndianFinancialYear(now)
  };
};

export const getIndianFinancialYear = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return month < 3 ? `${year-1}-${year.toString().slice(-2)}` : `${year}-${(year+1).toString().slice(-2)}`;
};

export const exportToCSV = (data, filename) => {
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvRows = [];
  
  // Add headers
  csvRows.push(headers.join(','));
  
  // Add data rows
  data.forEach(row => {
    const values = headers.map(header => {
      let value = row[header];
      
      // Handle special cases
      if (header === 'paymentDate') {
        value = `"${value}"`;
      } else if (typeof value === 'string') {
        value = `"${value.replace(/"/g, '""')}"`;
      } else if (value === undefined || value === null) {
        value = '';
      }
      return value;
    });
    csvRows.push(values.join(','));
  });

  // Create CSV file
  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  // Create download link
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename || 'payslip.csv');
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

export const formatIndianCurrency = (amount) => {
  return '₹' + (amount || 0).toLocaleString('en-IN');
};  