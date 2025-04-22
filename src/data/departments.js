const DEPARTMENTS_KEY = 'efficio_departments';

const initialDepartments = [
  {
    id: 1,
    name: 'Human Resources',
    access: ['employees', 'hiring', 'attendance'],
    description: 'Handles recruitment, employee relations, and benefits'
  },
  {
    id: 2,
    name: 'Finance',
    access: ['payroll'],
    description: 'Manages company finances and accounting'
  },
  {
    id: 3,
    name: 'Engineering',
    access: ['projects'],
    description: 'Software development and technical operations'
  }
];

const loadDepartments = () => {
  const storedDepartments = localStorage.getItem(DEPARTMENTS_KEY);
  return storedDepartments ? JSON.parse(storedDepartments) : [...initialDepartments];
};

let departments = loadDepartments();

const saveDepartments = () => {
  localStorage.setItem(DEPARTMENTS_KEY, JSON.stringify(departments));
};

export const getDepartments = () => departments;

export const getDepartmentById = (id) => departments.find(d => d.id === id);

export const addDepartment = (department) => {
  const newDepartment = {
    ...department,
    id: departments.length ? Math.max(...departments.map(d => d.id)) + 1 : 1
  };
  departments.push(newDepartment);
  saveDepartments();
  return newDepartment;
};

export const updateDepartment = (id, updatedData) => {
  const index = departments.findIndex(d => d.id === id);
  if (index !== -1) {
    departments[index] = { ...departments[index], ...updatedData };
    saveDepartments();
    return true;
  }
  return false;
};

export const deleteDepartment = (id) => {
  const index = departments.findIndex(d => d.id === id);
  if (index !== -1) {
    departments.splice(index, 1);
    saveDepartments();
    return true;
  }
  return false;
};

export const resetDepartments = () => {
  departments = [...initialDepartments];
  saveDepartments();
};