// // // src/data/mockData.js--Personal Acc
// // export const employees = [
// //   {
// //     id: 'PYRL120124',
// //     name: 'Aarav Sharma',
// //     avatar: 'https://storage.googleapis.com/a1aa/image/222568c2-0e2c-43b4-1289-68fead7c06de.jpg',
// //     role: 'Lead UI/UX Designer',
// //     date: '21 Mar, 2025 - 05.05 pm',
// //     salary: 125000,
// //     basic: 75000,
// //     hra: 37500,
// //     da: 12500,
// //     tax: 18750,
// //     reimbursement: 25000,
// //     status: 'Completed'
// //   },
// //   // Add more employees with different months...
// //   {
// //     id: 'PYRL120125',
// //     name: 'Priya Patel',
// //     avatar: 'https://storage.googleapis.com/a1aa/image/bbbbd8b9-21d7-4d41-77b5-19841c955190.jpg',
// //     role: 'Sr UI/UX Designer',
// //     date: '22 Feb, 2025 - 05.03 pm',
// //     salary: 115000,
// //     basic: 69000,
// //     hra: 34500,
// //     da: 11500,
// //     tax: 17250,
// //     reimbursement: 5000,
// //     status: 'Completed'
// //   },
// //   {
// //     id: 'PYRL120126',
// //     name: 'Rahul Singh',
// //     avatar: 'https://storage.googleapis.com/a1aa/image/5d14e59f-9f96-4087-5f8e-70c2a69b7aca.jpg',
// //     role: 'Jr Graphics Designer',
// //     date: '23 Jan, 2025 - 05.01 pm',
// //     salary: 80000,
// //     basic: 48000,
// //     hra: 24000,
// //     da: 8000,
// //     tax: 12000,
// //     reimbursement: 50000,
// //     status: 'Pending'
// //   },
// //   // Add more months as needed...
// // ];

// // export const payrollMetrics = {
// //   payrollCost: 1250000,
// //   totalExpense: 256000,
// //   pendingPayments: 470000,
// //   totalPayrolls: 4,
// //   newEmployees: 0
// // };

// // export const bonusesData = {
// //   total: 1050000,
// //   bonuses: 510000,
// //   incentives: 540000
// // };

// // export const payrollTrends = [
// //   { month: 'Jan', year: 2025, cost: 1200000, expense: 240000 },
// //   { month: 'Feb', year: 2025, cost: 1250000, expense: 250000 },
// //   { month: 'Mar', year: 2025, cost: 1300000, expense: 260000 },
// //   { month: 'Apr', year: 2025, cost: 1350000, expense: 270000 },
// //   { month: 'May', year: 2025, cost: 1400000, expense: 280000 },
// //   { month: 'Jun', year: 2025, cost: 1450000, expense: 290000 },
// //   { month: 'Jul', year: 2025, cost: 1500000, expense: 300000 }
// // ];
// // //----------------------------------------------
// // export const taxSlabs = [
// //   { min: 0, max: 250000, rate: 0 },
// //   { min: 250001, max: 500000, rate: 0.05 },
// //   { min: 500001, max: 750000, rate: 0.1 },
// //   { min: 750001, max: 1000000, rate: 0.15 },
// //   { min: 1000001, max: 1250000, rate: 0.2 },
// //   { min: 1250001, max: 1500000, rate: 0.25 },
// //   { min: 1500001, max: Infinity, rate: 0.3 }
// // ];

// // export const pfRate = 0.12; // Employee PF contribution
// // export const esicRate = 0.0075; // Employee ESIC contribution (0.75%)
// // export const esicThreshold = 21000; // ESIC applicable if salary <= this amount




// // src/data/mockData.js
// export const employees = [
//   {
//     id: 'PYRL120124',
//     name: 'Aarav Sharma',
//     avatar: 'https://storage.googleapis.com/a1aa/image/222568c2-0e2c-43b4-1289-68fead7c06de.jpg',
//     role: 'Lead UI/UX Designer',
//     date: '21 Jan, 2025 - 05.05 pm',
//     salary: 125000,
//     basic: 75000,
//     hra: 37500,
//     da: 12500,
//     tax: 18750,
//     reimbursement: 25000,
//     status: 'Completed'
//   },
//   {
//     id: 'PYRL120125',
//     name: 'Priya Patel',
//     avatar: 'https://storage.googleapis.com/a1aa/image/bbbbd8b9-21d7-4d41-77b5-19841c955190.jpg',
//     role: 'Sr UI/UX Designer',
//     date: '22 Feb, 2025 - 05.03 pm',
//     salary: 115000,
//     basic: 69000,
//     hra: 34500,
//     da: 11500,
//     tax: 17250,
//     reimbursement: 5000,
//     status: 'Completed'
//   },
//   {
//     id: 'PYRL120126',
//     name: 'Rahul Singh',
//     avatar: 'https://storage.googleapis.com/a1aa/image/5d14e59f-9f96-4087-5f8e-70c2a69b7aca.jpg',
//     role: 'Jr Graphics Designer',
//     date: '23 Mar, 2025 - 05.01 pm',
//     salary: 80000,
//     basic: 48000,
//     hra: 24000,
//     da: 8000,
//     tax: 12000,
//     reimbursement: 50000,
//     status: 'Pending'
//   },
// ];

// export const payrollMetrics = {
//   payrollCost: 1250000,
//   totalExpense: 256000,
//   pendingPayments: 470000,
//   totalPayrolls: 4,
//   newEmployees: 0
// };

// export const bonusesData = {
//   total: 1050000,
//   bonuses: 510000,
//   incentives: 540000
// };

// // Only include data up to current month
// const currentDate = new Date();
// const currentMonth = currentDate.getMonth();
// const currentYear = currentDate.getFullYear();

// export const payrollTrends = [
//   { month: 'Jan', year: 2025, cost: 1200000, expense: 240000 },
//   { month: 'Feb', year: 2025, cost: 1250000, expense: 250000 },
//   { month: 'Mar', year: 2025, cost: 1300000, expense: 260000 },
// ].filter(t => {
//   const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
//                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(t.month);
//   return (
//     t.year < currentYear || 
//     (t.year === currentYear && monthIndex <= currentMonth)
//   );
// });

// export const taxSlabs = [
//   { min: 0, max: 250000, rate: 0 },
//   { min: 250001, max: 500000, rate: 0.05 },
//   { min: 500001, max: 750000, rate: 0.1 },
//   { min: 750001, max: 1000000, rate: 0.15 },
//   { min: 1000001, max: 1250000, rate: 0.2 },
//   { min: 1250001, max: 1500000, rate: 0.25 },
//   { min: 1500001, max: Infinity, rate: 0.3 }
// ];

// export const pfRate = 0.12;
// export const esicRate = 0.0075;
// export const esicThreshold = 21000;




export const employees = [
  {
    id: 'PYRL120124',
    name: 'Aarav Sharma',
    avatar: 'https://storage.googleapis.com/a1aa/image/222568c2-0e2c-43b4-1289-68fead7c06de.jpg',
    role: 'Lead UI/UX Designer',
    date: '21 Jan, 2025 - 05.05 pm',
    salary: 125000,
    basic: 75000,
    hra: 37500,
    da: 12500,
    tax: 18750,
    reimbursement: 25000,
    status: 'Completed'
  },
  {
    id: 'PYRL120125',
    name: 'Priya Patel',
    avatar: 'https://storage.googleapis.com/a1aa/image/bbbbd8b9-21d7-4d41-77b5-19841c955190.jpg',
    role: 'Sr UI/UX Designer',
    date: '22 Feb, 2025 - 05.03 pm',
    salary: 115000,
    basic: 69000,
    hra: 34500,
    da: 11500,
    tax: 17250,
    reimbursement: 5000,
    status: 'Completed'
  },
  {
    id: 'PYRL120126',
    name: 'Rahul Singh',
    avatar: 'https://storage.googleapis.com/a1aa/image/5d14e59f-9f96-4087-5f8e-70c2a69b7aca.jpg',
    role: 'Jr Graphics Designer',
    date: '23 Mar, 2025 - 05.01 pm',
    salary: 80000,
    basic: 48000,
    hra: 24000,
    da: 8000,
    tax: 12000,
    reimbursement: 50000,
    status: 'Pending'
  },
];

export const payrollMetrics = {
  payrollCost: 1250000,
  totalExpense: 256000,
  pendingPayments: 470000,
  totalPayrolls: 4,
  newEmployees: 0
};

export const bonusesData = {
  total: 1050000,
  bonuses: 510000,
  incentives: 540000
};

// Calculate payroll trends based on actual employee data
export const payrollTrends = [
  {
    month: 'Jan',
    year: 2025,
    cost: 125000, // Only Aarav Sharma's salary for Jan
    expense: 25000 // Only Aarav Sharma's reimbursement for Jan
  },
  {
    month: 'Feb',
    year: 2025,
    cost: 115000, // Only Priya Patel's salary for Feb
    expense: 5000 // Only Priya Patel's reimbursement for Feb
  },
  {
    month: 'Mar',
    year: 2025,
    cost: 80000, // Only Rahul Singh's salary for Mar
    expense: 50000 // Only Rahul Singh's reimbursement for Mar
  }
];

export const taxSlabs = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250001, max: 500000, rate: 0.05 },
  { min: 500001, max: 750000, rate: 0.1 },
  { min: 750001, max: 1000000, rate: 0.15 },
  { min: 1000001, max: 1250000, rate: 0.2 },
  { min: 1250001, max: 1500000, rate: 0.25 },
  { min: 1500001, max: Infinity, rate: 0.3 }
];

export const pfRate = 0.12;
export const esicRate = 0.0075;
export const esicThreshold = 21000;