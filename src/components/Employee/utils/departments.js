// src/utils/departments.js
export const initialDepartments = [
    {
      id: 'dep-1',
      name: 'Executive',
      parentId: null,
      headPositionId: 'pos-1', // CEO
      description: 'Top level executives'
    },
    {
      id: 'dep-2',
      name: 'Human Resources',
      parentId: null,
      headPositionId: 'pos-10', // HR Manager
      description: 'Human resources department'
    },
    {
      id: 'dep-3',
      name: 'Sales',
      parentId: null,
      headPositionId: 'pos-12', // Sales Manager
      description: 'Sales and business development'
    },
    {
      id: 'dep-4',
      name: 'Engineering',
      parentId: null,
      headPositionId: 'pos-5', // Engineering Manager
      description: 'Product engineering'
    }
  ];
  
  export const getDepartmentHeads = (departments, positions, employees) => {
    return departments.map(dept => {
      const headPosition = positions.find(p => p.id === dept.headPositionId);
      const headEmployee = employees.find(e => e.positionId === dept.headPositionId);
      return {
        ...dept,
        headPosition,
        headEmployee
      };
    });
  };
  
  export const getSubDepartments = (departmentId, departments) => {
    return departments.filter(d => d.parentId === departmentId);
  };