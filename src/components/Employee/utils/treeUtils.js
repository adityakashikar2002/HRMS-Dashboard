// // In treeUtils.js
// export const buildTree = (employees) => {
//   const employeeMap = {};
//   const tree = [];
  
//   // Find CEO first (no manager)
//   const ceo = employees.find(e => 
//     e.position.toLowerCase().includes('ceo') && !e.managerId
//   );
  
//   if (ceo) {
//     employeeMap[ceo.id] = {
//       ...ceo,
//       name: `${ceo.firstName} ${ceo.lastName}`,
//       children: []
//     };
//     tree.push(employeeMap[ceo.id]);
//   }
  
//   // Then process other executives/department heads
//   const departmentHeads = employees.filter(e => 
//     e.position.toLowerCase().includes('director') || 
//     e.position.toLowerCase().includes('vp') ||
//     e.position.toLowerCase().includes('head') ||
//     e.position.toLowerCase().includes('cto') ||
//     e.position.toLowerCase().includes('cfo')
//   );
  
//   departmentHeads.forEach(head => {
//     if (!employeeMap[head.id] && head.managerId === ceo?.id) {
//       employeeMap[head.id] = {
//         ...head,
//         name: `${head.firstName} ${head.lastName}`,
//         children: []
//       };
//       if (ceo) {
//         employeeMap[ceo.id].children.push(employeeMap[head.id]);
//       } else {
//         tree.push(employeeMap[head.id]);
//       }
//     }
//   });
  
//   // Then process remaining employees
//   employees.forEach(employee => {
//     if (!employeeMap[employee.id]) {
//       employeeMap[employee.id] = {
//         ...employee,
//         name: `${employee.firstName} ${employee.lastName}`,
//         children: []
//       };
      
//       if (employee.managerId && employeeMap[employee.managerId]) {
//         employeeMap[employee.managerId].children.push(employeeMap[employee.id]);
//       } else if (!employee.managerId && !employee.position.toLowerCase().includes('ceo')) {
//         // If no manager and not CEO, add to root
//         tree.push(employeeMap[employee.id]);
//       }
//     }
//   });
  
//   return tree;
// };

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



// // src/utils/treeUtils.js
// export const buildTree = (employees, departments) => {
//   const employeeMap = {};
//   const tree = [];
  
//   // First build department hierarchy
//   const departmentMap = {};
//   departments.forEach(dept => {
//     departmentMap[dept.id] = {
//       ...dept,
//       type: 'department',
//       children: []
//     };
//   });

//   // Build department tree structure
//   const departmentTree = [];
//   departments.forEach(dept => {
//     if (!dept.parentId && !dept.isSubDepartment) {
//       departmentTree.push(departmentMap[dept.id]);
//     } else if (dept.parentId && departmentMap[dept.parentId]) {
//       departmentMap[dept.parentId].children.push(departmentMap[dept.id]);
//     }
//   });

//   // Then add employees to the department structure
//   employees.forEach(employee => {
//     const employeeNode = {
//       ...employee,
//       type: 'employee',
//       name: `${employee.firstName} ${employee.lastName}`,
//       children: []
//     };

//     // Find the department this employee belongs to
//     let foundDepartment = null;
//     const traverse = (nodes) => {
//       for (const node of nodes) {
//         if (node.name === employee.department && node.type === 'department') {
//           foundDepartment = node;
//           return true;
//         }
//         if (node.children && traverse(node.children)) {
//           return true;
//         }
//       }
//       return false;
//     };

//     traverse(departmentTree);

//     if (foundDepartment) {
//       // If we found the department, add employee to it
//       foundDepartment.children.push(employeeNode);
//     } else {
//       // If no department found, add to root
//       tree.push(employeeNode);
//     }
//   });

//   // Combine department tree with any employees not in departments
//   return [...departmentTree, ...tree];
// };

// export const updateTree = (currentTree, employees, departments, newEmployee) => {
//   // Rebuild the entire tree when adding a new employee
//   return buildTree([...employees, newEmployee], departments);
// };


// // src/utils/treeUtils.js
// export const buildTree = (employees, departments) => {
//   // Create CEO node
//   const ceo = employees.find(e => e.position.toLowerCase().includes('ceo'));
//   const ceoNode = ceo ? {
//     ...ceo,
//     id: 'ceo-root',
//     name: `${ceo.firstName} ${ceo.lastName}`,
//     type: 'employee',
//     position: 'CEO',
//     children: []
//   } : null;

//   // Build department hierarchy
//   const departmentMap = {};
//   departments.forEach(dept => {
//     departmentMap[dept.id] = {
//       ...dept,
//       type: 'department',
//       children: []
//     };
//   });

//   // Build department tree structure under CEO
//   if (ceoNode) {
//     departments.forEach(dept => {
//       if (!dept.isSubDepartment) {
//         ceoNode.children.push(departmentMap[dept.id]);
//       } else if (dept.parentId && departmentMap[dept.parentId]) {
//         departmentMap[dept.parentId].children.push(departmentMap[dept.id]);
//       }
//     });
//   }

//   // Add employees to their departments
//   employees.forEach(employee => {
//     if (employee.position.toLowerCase().includes('ceo')) return; // Skip CEO

//     const employeeNode = {
//       ...employee,
//       type: 'employee',
//       name: `${employee.firstName} ${employee.lastName}`,
//       children: []
//     };

//     // Find the department this employee belongs to
//     let foundDepartment = null;
//     const traverse = (nodes) => {
//       for (const node of nodes) {
//         if (node.name === employee.department && node.type === 'department') {
//           foundDepartment = node;
//           return true;
//         }
//         if (node.children && traverse(node.children)) {
//           return true;
//         }
//       }
//       return false;
//     };

//     if (ceoNode) {
//       traverse(ceoNode.children);
//     }

//     if (foundDepartment) {
//       foundDepartment.children.push(employeeNode);
//     } else if (ceoNode) {
//       // If no department found, add directly under CEO
//       ceoNode.children.push(employeeNode);
//     }
//   });

//   return ceoNode ? [ceoNode] : [];
// };

// export const updateTree = (currentTree, employees, departments, newEmployee) => {
//   return buildTree([...employees, newEmployee], departments);
// };


// // src/utils/treeUtils.js WORKS 99
// export const buildTree = (employees, departments) => {
//   // Create CEO node
//   const ceo = employees.find(e => e.position?.toLowerCase().includes('ceo'));
//   const ceoNode = ceo ? {
//     ...ceo,
//     id: 'ceo-root',
//     name: `${ceo.firstName} ${ceo.lastName}`,
//     type: 'employee',
//     position: 'CEO',
//     children: []
//   } : null;

//   // Build department hierarchy
//   const departmentMap = {};
//   departments?.forEach(dept => {
//     departmentMap[dept.id] = {
//       ...dept,
//       type: 'department',
//       children: []
//     };
//   });

//   // Build department tree structure under CEO
//   if (ceoNode && departments) {
//     departments.forEach(dept => {
//       if (!dept.isSubDepartment) {
//         ceoNode.children.push(departmentMap[dept.id]);
//       } else if (dept.parentId && departmentMap[dept.parentId]) {
//         departmentMap[dept.parentId].children.push(departmentMap[dept.id]);
//       }
//     });
//   }

//   // Add employees to their departments
//   employees?.forEach(employee => {
//     if (employee.position?.toLowerCase().includes('ceo')) return; // Skip CEO

//     const employeeNode = {
//       ...employee,
//       type: 'employee',
//       name: `${employee.firstName} ${employee.lastName}`,
//       children: []
//     };

//     // Find the department this employee belongs to
//     let foundDepartment = null;
//     const traverse = (nodes) => {
//       if (!nodes) return false;
//       for (const node of nodes) {
//         if (node.name === employee.department && node.type === 'department') {
//           foundDepartment = node;
//           return true;
//         }
//         if (node.children && traverse(node.children)) {
//           return true;
//         }
//       }
//       return false;
//     };

//     if (ceoNode) {
//       traverse(ceoNode.children);
//     }

//     if (foundDepartment) {
//       foundDepartment.children.push(employeeNode);
//     } else if (ceoNode) {
//       // If no department found, add directly under CEO
//       ceoNode.children.push(employeeNode);
//     }
//   });

//   return ceoNode ? [ceoNode] : [];
// };

// export const updateTree = (currentTree, employees, departments, newEmployee) => {
//   return buildTree([...employees, newEmployee], departments);
// };






export const buildTree = (employees, departments) => {
  // Create CEO node
  const ceo = employees.find(e => e.position?.toLowerCase().includes('ceo'));
  const ceoNode = ceo ? {
    ...ceo,
    id: 'ceo-root',
    name: `${ceo.firstName} ${ceo.lastName}`,
    type: 'employee',
    position: 'CEO',
    children: []
  } : null;

  // Build department hierarchy
  const departmentMap = {};
  departments?.forEach(dept => {
    departmentMap[dept.id] = {
      ...dept,
      type: 'department',
      children: []
    };
  });

  // Build department tree structure under CEO
  if (ceoNode && departments) {
    departments.forEach(dept => {
      ceoNode.children.push(departmentMap[dept.id]);
    });
  }

  // Add employees to their departments
  employees?.forEach(employee => {
    if (employee.position?.toLowerCase().includes('ceo')) return; // Skip CEO

    const employeeNode = {
      ...employee,
      type: 'employee',
      name: `${employee.firstName} ${employee.lastName}`,
      children: []
    };

    // Find the department this employee belongs to
    let foundDepartment = null;
    const traverse = (nodes) => {
      if (!nodes) return false;
      for (const node of nodes) {
        if (node.name === employee.department && node.type === 'department') {
          foundDepartment = node;
          return true;
        }
        if (node.children && traverse(node.children)) {
          return true;
        }
      }
      return false;
    };

    if (ceoNode) {
      traverse(ceoNode.children);
    }

    if (foundDepartment) {
      foundDepartment.children.push(employeeNode);
    } else if (ceoNode) {
      // If no department found, add directly under CEO
      ceoNode.children.push(employeeNode);
    }
  });

  return ceoNode ? [ceoNode] : [];
};

export const updateTree = (currentTree, employees, departments, newEmployee) => {
  return buildTree([...employees, newEmployee], departments);
};