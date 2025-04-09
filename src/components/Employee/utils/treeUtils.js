export const buildTree = (employees) => {
    const employeeMap = {};
    const tree = [];
    
    // First pass: create a map of all employees
    employees.forEach(employee => {
      employeeMap[employee.id] = {
        ...employee,
        children: []
      };
    });
    
    // Second pass: build the tree structure
    employees.forEach(employee => {
      if (employee.managerId && employeeMap[employee.managerId]) {
        employeeMap[employee.managerId].children.push(employeeMap[employee.id]);
      } else if (!employee.managerId) {
        tree.push(employeeMap[employee.id]);
      }
    });
    
    return tree;
  };
  
  export const updateTree = (currentTree, employees, newEmployee) => {
    // If no manager, add to root
    if (!newEmployee.managerId) {
      return [
        ...currentTree,
        {
          id: newEmployee.id,
          name: `${newEmployee.firstName} ${newEmployee.lastName}`,
          position: newEmployee.position,
          children: []
        }
      ];
    }
    
    // Otherwise, find the manager and add to their children
    const addToTree = (nodes) => {
      for (let node of nodes) {
        if (node.id === newEmployee.managerId) {
          node.children.push({
            id: newEmployee.id,
            name: `${newEmployee.firstName} ${newEmployee.lastName}`,
            position: newEmployee.position,
            children: []
          });
          return true;
        }
        if (node.children && addToTree(node.children)) {
          return true;
        }
      }
      return false;
    };
    
    const updatedTree = JSON.parse(JSON.stringify(currentTree));
    addToTree(updatedTree);
    return updatedTree;
  };