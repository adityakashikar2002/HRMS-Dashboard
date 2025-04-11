// src/utils/treeUtils.js
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
      name: dept.name,
      children: []
    };
  });

  // Build department tree structure under CEO
  if (ceoNode && departments) {
    departments.forEach(dept => {
      ceoNode.children.push(departmentMap[dept.id]);
    });
  }

  // Add employees to their departments or managers
  employees?.forEach(employee => {
    if (employee.position?.toLowerCase().includes('ceo')) return; // Skip CEO

    const employeeNode = {
      ...employee,
      type: 'employee',
      name: `${employee.firstName} ${employee.lastName}`,
      position: `${employee.position}`,
      children: []
    };

      if (employee.managerId && employee.managerId.startsWith('dept-')) {
        const deptName = employee.managerId.replace('dept-', '');
        const department = ceoNode?.children.find(
          node => node.type === 'department' && node.name === deptName
        );
        if (department) {
          department.children.push(employeeNode);
        }
      } else if (employee.managerId) {
        let managerFound = false;
      
      // Recursive function to find manager in the tree
      const findAndAddToManager = (nodes) => {
        for (const node of nodes) {
          if (node.id === employee.managerId) {
            node.children.push(employeeNode);
            managerFound = true;
            return true;
          }
          if (node.children && findAndAddToManager(node.children)) {
            return true;
          }
        }
        return false;
      };

      if (ceoNode) {
        findAndAddToManager([ceoNode]);
      }

      // If manager not found, add to department or CEO
      if (!managerFound) {
        if (employee.department) {
          const department = ceoNode?.children.find(
            node => node.type === 'department' && node.name === employee.department
          );
          if (department) {
            department.children.push(employeeNode);
          } else if (ceoNode) {
            ceoNode.children.push(employeeNode);
          }
        } else if (ceoNode) {
          ceoNode.children.push(employeeNode);
        }
      }
    }
    // If no manager and no department, add directly under CEO
    else if (ceoNode) {
      ceoNode.children.push(employeeNode);
    }
  });

  return ceoNode ? [ceoNode] : [];
};

export const updateTree = (currentTree, employees, departments, newEmployee) => {
  return buildTree([...employees, newEmployee], departments);
};