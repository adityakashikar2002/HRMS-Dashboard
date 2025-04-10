export const getEmployees = (key = 'employees') => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };
  
  export const saveEmployees = (data, key = 'employees') => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  
  export const clearEmployees = () => {
    localStorage.removeItem('employees');
    localStorage.removeItem('employeeTree');
  };

// // src/utils/storage.js
// export const getEmployees = (key = 'employees') => {
//   const data = localStorage.getItem(key);
//   return data ? JSON.parse(data) : null;
// };

// export const saveEmployees = (data, key = 'employees') => {
//   localStorage.setItem(key, JSON.stringify(data));
// };

// export const getDepartments = () => {
//   const data = localStorage.getItem('departments');
//   return data ? JSON.parse(data) : null;
// };

// export const saveDepartments = (data) => {
//   localStorage.setItem('departments', JSON.stringify(data));
// };

// export const getPositions = () => {
//   const data = localStorage.getItem('positions');
//   return data ? JSON.parse(data) : null;
// };

// export const savePositions = (data) => {
//   localStorage.setItem('positions', JSON.stringify(data));
// };

// export const getOrganizationTree = () => {
//   const data = localStorage.getItem('organizationTree');
//   return data ? JSON.parse(data) : null;
// };

// export const saveOrganizationTree = (data) => {
//   localStorage.setItem('organizationTree', JSON.stringify(data));
// };

// export const clearAllData = () => {
//   localStorage.removeItem('employees');
//   localStorage.removeItem('departments');
//   localStorage.removeItem('positions');
//   localStorage.removeItem('organizationTree');
// };