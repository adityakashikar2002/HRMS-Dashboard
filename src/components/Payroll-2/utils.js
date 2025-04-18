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
  const netSalary = monthlyGross - totalDeductions;
  
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

export const getMonthsInRange = (startDate, endDate) => {
  const months = [];
  const currentDate = new Date(startDate);
  const endDateObj = new Date(endDate);
  
  while (currentDate <= endDateObj) {
    months.push(new Date(currentDate));
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  
  return months;
};

export const getCurrentMonthYear = () => {
  const now = new Date();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return {
    month: monthNames[now.getMonth()],
    year: now.getFullYear()
  };
};