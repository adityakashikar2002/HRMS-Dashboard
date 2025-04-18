// export const employees = [
//   {
//     id: 'PYRL120124',
//     name: 'Hazel Nutt',
//     avatar: 'https://storage.googleapis.com/a1aa/image/222568c2-0e2c-43b4-1289-68fead7c06de.jpg',
//     role: 'Lead UI/UX Designer',
//     date: '21 Jun, 2024 - 05.05 pm',
//     salary: 2500.00,
//     reimbursement: 500.00,
//     status: 'Completed'
//   },
//   {
//     id: 'PYRL120125',
//     name: 'Simon Cyrene',
//     avatar: 'https://storage.googleapis.com/a1aa/image/bbbbd8b9-21d7-4d41-77b5-19841c955190.jpg',
//     role: 'Sr UI/UX Designer',
//     date: '21 Jun, 2024 - 05.03 pm',
//     salary: 2300.00,
//     reimbursement: 100.00,
//     status: 'Completed'
//   },
//   {
//     id: 'PYRL120126',
//     name: 'Aida Bugg',
//     avatar: 'https://storage.googleapis.com/a1aa/image/5d14e59f-9f96-4087-5f8e-70c2a69b7aca.jpg',
//     role: 'Jr Graphics Designer',
//     date: '21 Jun, 2024 - 05.01 pm',
//     salary: 2000.00,
//     reimbursement: 1000.00,
//     status: 'Pending'
//   },
//   {
//     id: 'PYRL120127',
//     name: 'Peg Legge',
//     avatar: 'https://storage.googleapis.com/a1aa/image/186aa038-b9eb-42ce-ba4b-b507a3c91703.jpg',
//     role: 'Jr Animator',
//     date: '21 Jun, 2024 - 05.00 pm',
//     salary: 2100.00,
//     reimbursement: 500.00,
//     status: 'Pending'
//   }
// ];

// export const payrollMetrics = {
//   payrollCost: 12500,
//   totalExpense: 2560,
//   pendingPayments: 4700,
//   totalPayrolls: 200,
//   newEmployees: 10
// };

// export const bonusesData = {
//   total: 10500,
//   bonuses: 5100,
//   incentives: 5400
// };

// export const payrollTrends = [
//   { month: 'Mar', cost: 3000, expense: 1500 },
//   { month: 'Apr', cost: 6000, expense: 4000 },
//   { month: 'May', cost: 9000, expense: 7000 },
//   { month: 'Jun', cost: 5000, expense: 3000 },
//   { month: 'Jul', cost: 8740, expense: 2110 },
//   { month: 'Aug', cost: 3000, expense: 1500 },
//   { month: 'Sep', cost: 6000, expense: 4000 },
//   { month: 'Oct', cost: 5000, expense: 3000 },
//   { month: 'Nov', cost: 9000, expense: 7000 }
// ];

// src/data/mockData.js
export const employees = [
  {
    id: 'PYRL120124',
    name: 'Aarav Sharma',
    avatar: 'https://storage.googleapis.com/a1aa/image/222568c2-0e2c-43b4-1289-68fead7c06de.jpg',
    role: 'Lead UI/UX Designer',
    date: '21 Jun, 2024 - 05.05 pm',
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
    date: '21 Jun, 2024 - 05.03 pm',
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
    date: '21 Jun, 2024 - 05.01 pm',
    salary: 80000,
    basic: 48000,
    hra: 24000,
    da: 8000,
    tax: 12000,
    reimbursement: 50000,
    status: 'Pending'
  },
  {
    id: 'PYRL120127',
    name: 'Neha Gupta',
    avatar: 'https://storage.googleapis.com/a1aa/image/186aa038-b9eb-42ce-ba4b-b507a3c91703.jpg',
    role: 'Jr Animator',
    date: '21 Jun, 2024 - 05.00 pm',
    salary: 85000,
    basic: 51000,
    hra: 25500,
    da: 8500,
    tax: 12750,
    reimbursement: 25000,
    status: 'Pending'
  }
];

export const payrollMetrics = {
  payrollCost: 1250000,
  totalExpense: 256000,
  pendingPayments: 470000,
  totalPayrolls: 200,
  newEmployees: 10
};

export const bonusesData = {
  total: 1050000,
  bonuses: 510000,
  incentives: 540000
};

export const payrollTrends = [
  { month: 'Mar', cost: 300000, expense: 150000 },
  { month: 'Apr', cost: 600000, expense: 400000 },
  { month: 'May', cost: 900000, expense: 700000 },
  { month: 'Jun', cost: 500000, expense: 300000 },
  { month: 'Jul', cost: 874000, expense: 211000 },
  { month: 'Aug', cost: 300000, expense: 150000 },
  { month: 'Sep', cost: 600000, expense: 400000 },
  { month: 'Oct', cost: 500000, expense: 300000 },
  { month: 'Nov', cost: 900000, expense: 700000 }
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

export const pfRate = 0.12; // Employee PF contribution
export const esicRate = 0.0175; // Employee ESIC contribution