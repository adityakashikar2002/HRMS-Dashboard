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