// export const buildTree = (employees) => {
//     const employeeMap = {};
//     const tree = [];
    
//     // First pass: create a map of all employees
//     employees.forEach(employee => {
//       employeeMap[employee.id] = {
//         ...employee,
//         children: []
//       };
//     });
    
//     // Second pass: build the tree structure
//     employees.forEach(employee => {
//       if (employee.managerId && employeeMap[employee.managerId]) {
//         employeeMap[employee.managerId].children.push(employeeMap[employee.id]);
//       } else if (!employee.managerId) {
//         tree.push(employeeMap[employee.id]);
//       }
//     });
    
//     return tree;
//   };
  
  // export const updateTree = (currentTree, employees, newEmployee) => {
  //   // If no manager, add to root
  //   if (!newEmployee.managerId) {
  //     return [
  //       ...currentTree,
  //       {
  //         id: newEmployee.id,
  //         name: `${newEmployee.firstName} ${newEmployee.lastName}`,
  //         position: newEmployee.position,
  //         children: []
  //       }
  //     ];
  //   }
    
  //   // Otherwise, find the manager and add to their children
  //   const addToTree = (nodes) => {
  //     for (let node of nodes) {
  //       if (node.id === newEmployee.managerId) {
  //         node.children.push({
  //           id: newEmployee.id,
  //           name: `${newEmployee.firstName} ${newEmployee.lastName}`,
  //           position: newEmployee.position,
  //           children: []
  //         });
  //         return true;
  //       }
  //       if (node.children && addToTree(node.children)) {
  //         return true;
  //       }
  //     }
  //     return false;
  //   };
    
  //   const updatedTree = JSON.parse(JSON.stringify(currentTree));
  //   addToTree(updatedTree);
  //   return updatedTree;
  // };

// In treeUtils.js
export const buildTree = (employees) => {
  const employeeMap = {};
  const tree = [];
  
  // Find CEO first (no manager)
  const ceo = employees.find(e => 
    e.position.toLowerCase().includes('ceo') && !e.managerId
  );
  
  if (ceo) {
    employeeMap[ceo.id] = {
      ...ceo,
      name: `${ceo.firstName} ${ceo.lastName}`,
      children: []
    };
    tree.push(employeeMap[ceo.id]);
  }
  
  // Then process other executives/department heads
  const departmentHeads = employees.filter(e => 
    e.position.toLowerCase().includes('director') || 
    e.position.toLowerCase().includes('vp') ||
    e.position.toLowerCase().includes('head') ||
    e.position.toLowerCase().includes('cto') ||
    e.position.toLowerCase().includes('cfo')
  );
  
  departmentHeads.forEach(head => {
    if (!employeeMap[head.id] && head.managerId === ceo?.id) {
      employeeMap[head.id] = {
        ...head,
        name: `${head.firstName} ${head.lastName}`,
        children: []
      };
      if (ceo) {
        employeeMap[ceo.id].children.push(employeeMap[head.id]);
      } else {
        tree.push(employeeMap[head.id]);
      }
    }
  });
  
  // Then process remaining employees
  employees.forEach(employee => {
    if (!employeeMap[employee.id]) {
      employeeMap[employee.id] = {
        ...employee,
        name: `${employee.firstName} ${employee.lastName}`,
        children: []
      };
      
      if (employee.managerId && employeeMap[employee.managerId]) {
        employeeMap[employee.managerId].children.push(employeeMap[employee.id]);
      } else if (!employee.managerId && !employee.position.toLowerCase().includes('ceo')) {
        // If no manager and not CEO, add to root
        tree.push(employeeMap[employee.id]);
      }
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



// // src/utils/treeUtils.js
// export const buildOrganizationTree = (departments, positions, employees) => {
//   // Build department hierarchy
//   const buildDeptHierarchy = (parentId = null) => {
//     return departments
//       .filter(dept => dept.parentId === parentId)
//       .map(dept => {
//         const headPosition = positions.find(p => p.id === dept.headPositionId);
//         const headEmployee = employees.find(e => e.positionId === dept.headPositionId);
        
//         const departmentNode = {
//           id: dept.id,
//           type: 'department',
//           name: dept.name,
//           description: dept.description,
//           headPosition,
//           headEmployee,
//           children: []
//         };
        
//         // Add sub-departments
//         const subDepartments = buildDeptHierarchy(dept.id);
//         departmentNode.children.push(...subDepartments);
        
//         // Add positions and employees
//         const deptPositions = positions.filter(p => p.departmentId === dept.id && !p.isHead);
//         deptPositions.forEach(pos => {
//           const positionEmployees = employees.filter(e => e.positionId === pos.id);
          
//           const positionNode = {
//             id: pos.id,
//             type: 'position',
//             name: pos.title,
//             level: pos.level,
//             employees: positionEmployees,
//             children: []
//           };
          
//           departmentNode.children.push(positionNode);
//         });
        
//         return departmentNode;
//       });
//   };
  
//   return buildDeptHierarchy();
// };

// export const getPossibleManagers = (departmentId, positions, employees) => {
//   // Get all positions in the department that can manage others
//   const managerPositions = positions.filter(p => 
//     p.departmentId === departmentId && 
//     (p.level === 'Manager' || p.level === 'Director' || p.level === 'C-Level')
//   );
  
//   // Get employees in those positions
//   return employees.filter(e => 
//     managerPositions.some(p => p.id === e.positionId)
//   );
// };