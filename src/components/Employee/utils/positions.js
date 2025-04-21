// src/utils/positions.js
export const defaultPositions = [
  // Executive
  { id: 'pos-1', title: 'CEO', department: 'Executive', level: 'C-Level' },
  
  // Technology
  { id: 'pos-2', title: 'CTO', department: 'Technology', level: 'C-Level' },
  { id: 'pos-3', title: 'VP of Engineering', department: 'Technology', level: 'Director' },
  
  // Finance
  { id: 'pos-4', title: 'CFO', department: 'Finance', level: 'C-Level' },
  { id: 'pos-5', title: 'Finance Manager', department: 'Finance', level: 'Manager' },
  
  // Engineering
  { id: 'pos-6', title: 'Engineering Manager', department: 'Engineering', level: 'Manager' },
  { id: 'pos-7', title: 'Senior Software Engineer', department: 'Engineering', level: 'Senior' },
  
  // HR
  { id: 'pos-8', title: 'HR Director', department: 'Human Resources', level: 'Director' },
  { id: 'pos-9', title: 'HR Manager', department: 'Human Resources', level: 'Manager' },
  
  // Sales
  { id: 'pos-10', title: 'Sales Director', department: 'Sales', level: 'Director' },
  { id: 'pos-11', title: 'Sales Manager', department: 'Sales', level: 'Manager' },
  
  // Marketing
  { id: 'pos-12', title: 'Marketing Director', department: 'Marketing', level: 'Director' },
  { id: 'pos-13', title: 'Marketing Manager', department: 'Marketing', level: 'Manager' }
];

export const departmentHierarchy = {
  'Executive': ['CEO'],
  'Technology': ['CTO', 'VP of Engineering', 'Engineering Manager'],
  'Finance': ['CFO', 'Finance Manager'],
  'Engineering': ['Engineering Manager', 'Senior Software Engineer'],
  'Human Resources': ['HR Director', 'HR Manager'],
  'Sales': ['Sales Director', 'Sales Manager'],
  'Marketing': ['Marketing Director', 'Marketing Manager']
};