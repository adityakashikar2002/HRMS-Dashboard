export const defaultPositions = [
    { id: 'pos-1', title: 'CEO', department: 'Executive', level: 'C-Level' },
    { id: 'pos-2', title: 'CTO', department: 'Technology', level: 'C-Level' },
    { id: 'pos-3', title: 'CFO', department: 'Finance', level: 'C-Level' },
    { id: 'pos-4', title: 'Director', department: 'Various', level: 'Director' },
    { id: 'pos-5', title: 'Engineering Manager', department: 'Engineering', level: 'Manager' },
    { id: 'pos-6', title: 'Product Manager', department: 'Product', level: 'Manager' },
    { id: 'pos-7', title: 'Senior Software Engineer', department: 'Engineering', level: 'Senior' },
    { id: 'pos-8', title: 'Software Engineer', department: 'Engineering', level: 'Mid' },
    { id: 'pos-9', title: 'UX Designer', department: 'Design', level: 'Mid' },
    { id: 'pos-10', title: 'HR Manager', department: 'Human Resources', level: 'Manager' },
    { id: 'pos-11', title: 'Marketing Specialist', department: 'Marketing', level: 'Junior' },
    { id: 'pos-12', title: 'Sales Representative', department: 'Sales', level: 'Junior' },
  ];

// // src/utils/positions.js
// export const initialPositions = [
//   // Executive
//   { 
//     id: 'pos-1', 
//     title: 'Chief Executive Officer', 
//     shortTitle: 'CEO',
//     departmentId: 'dep-1',
//     level: 'C-Level',
//     isHead: true,
//     description: 'Overall company leadership'
//   },
  
//   // Human Resources
//   { 
//     id: 'pos-10', 
//     title: 'HR Director', 
//     shortTitle: 'HR Director',
//     departmentId: 'dep-2',
//     level: 'Director',
//     isHead: true,
//     description: 'Leads HR department'
//   },
//   { 
//     id: 'pos-11', 
//     title: 'HR Manager', 
//     shortTitle: 'HR Manager',
//     departmentId: 'dep-2',
//     level: 'Manager',
//     isHead: false,
//     description: 'Manages HR operations'
//   },
//   { 
//     id: 'pos-12', 
//     title: 'Recruitment Specialist', 
//     shortTitle: 'Recruiter',
//     departmentId: 'dep-2',
//     level: 'Specialist',
//     isHead: false,
//     description: 'Handles hiring process'
//   },
  
//   // Sales
//   { 
//     id: 'pos-20', 
//     title: 'Sales Director', 
//     shortTitle: 'Sales Director',
//     departmentId: 'dep-3',
//     level: 'Director',
//     isHead: true,
//     description: 'Leads sales department'
//   },
//   { 
//     id: 'pos-21', 
//     title: 'Sales Manager', 
//     shortTitle: 'Sales Manager',
//     departmentId: 'dep-3',
//     level: 'Manager',
//     isHead: false,
//     description: 'Manages sales team'
//   },
  
//   // Engineering
//   { 
//     id: 'pos-30', 
//     title: 'CTO', 
//     shortTitle: 'CTO',
//     departmentId: 'dep-4',
//     level: 'C-Level',
//     isHead: true,
//     description: 'Chief Technology Officer'
//   },
//   { 
//     id: 'pos-31', 
//     title: 'Engineering Manager', 
//     shortTitle: 'Eng Manager',
//     departmentId: 'dep-4',
//     level: 'Manager',
//     isHead: false,
//     description: 'Manages engineering team'
//   }
// ];

// export const getDepartmentPositions = (departmentId, positions) => {
//   return positions.filter(p => p.departmentId === departmentId);
// };

// export const getHeadPosition = (departmentId, positions) => {
//   return positions.find(p => p.departmentId === departmentId && p.isHead);
// };