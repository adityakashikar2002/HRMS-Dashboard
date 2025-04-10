import { useState, useEffect } from 'react';
import EmployeeTree from '../components/Employee/EmployeeTree';
import EmployeesList from '../components/Employee/EmployeesList';
import AddEmployee from '../components/Employee/AddEmployee';
import EmployeeDetails from '../components/Employee/EmployeeDetails';
import PositionManager from '../components/Employee/PositionManager';
import { Button } from '../components/UI';
import { getEmployees, saveEmployees } from '../utils/storage';
import { mockEmployees, mockTree } from '../utils/employeeData';
import { defaultPositions } from '../utils/positions';
import { buildTree, updateTree } from '../utils/treeUtils';

const EmployeePage = () => {
  const [view, setView] = useState('tree'); // 'tree', 'list', 'add', 'details', 'positions'
  const [employees, setEmployees] = useState([]);
  const [employeeTree, setEmployeeTree] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [positions, setPositions] = useState(defaultPositions);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load from localStorage or use mock data
    const storedEmployees = getEmployees();
    const storedTree = getEmployees('employeeTree');
    const storedPositions = getEmployees('positions');
    
    if (storedEmployees && storedEmployees.length > 0) {
      setEmployees(storedEmployees);
      setEmployeeTree(storedTree || mockTree);
      setPositions(storedPositions || defaultPositions);
    } else {
      // Initialize with mock data
      setEmployees(mockEmployees);
      setEmployeeTree(mockTree);
      setPositions(defaultPositions);
      saveEmployees(mockEmployees);
      saveEmployees(mockTree, 'employeeTree');
      saveEmployees(defaultPositions, 'positions');
    }
  }, []);

  const handleAddEmployee = (newEmployee) => {
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    saveEmployees(updatedEmployees);
    
    // Update tree
    const updatedTree = updateTree(employeeTree, employees, newEmployee);
    setEmployeeTree(updatedTree);
    saveEmployees(updatedTree, 'employeeTree');
    
    setView('tree');
  };

  const handleUpdateEmployee = (updatedEmployee) => {
    const updatedEmployees = employees.map(emp => 
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    );
    setEmployees(updatedEmployees);
    saveEmployees(updatedEmployees);
    
    // Update tree
    const updatedTree = buildTree(updatedEmployees);
    setEmployeeTree(updatedTree);
    saveEmployees(updatedTree, 'employeeTree');
    
    setSelectedEmployee(updatedEmployee);
    setIsEditing(false);
  };

  const handleEmployeeClick = (employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    setSelectedEmployee(employee);
    setView('details');
  };

  const handleAddPosition = (newPosition) => {
    const updatedPositions = [...positions, newPosition];
    setPositions(updatedPositions);
    saveEmployees(updatedPositions, 'positions');
  };

  const handleUpdatePosition = (updatedPosition) => {
    const updatedPositions = positions.map(pos => 
      pos.id === updatedPosition.id ? updatedPosition : pos
    );
    setPositions(updatedPositions);
    saveEmployees(updatedPositions, 'positions');
  };

  const handleDeletePosition = (positionId) => {
    const updatedPositions = positions.filter(pos => pos.id !== positionId);
    setPositions(updatedPositions);
    saveEmployees(updatedPositions, 'positions');
  };

  const handleDeleteEmployee = (employeeId) => {
    const updatedEmployees = employees.filter(emp => emp.id !== employeeId);
    setEmployees(updatedEmployees);
    saveEmployees(updatedEmployees);
    
    // Rebuild tree
    const updatedTree = buildTree(updatedEmployees);
    setEmployeeTree(updatedTree);
    saveEmployees(updatedTree, 'employeeTree');
    
    setView('tree');
  };

  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Employee Management
        </h1>
        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={() => setView('tree')} 
            variant={view === 'tree' ? 'primary' : 'secondary'}
            icon="sitemap"
          >
            Organization Tree
          </Button>
          <Button 
            onClick={() => setView('list')} 
            variant={view === 'list' ? 'primary' : 'secondary'}
            icon="users"
          >
            View All
          </Button>
          <Button 
            onClick={() => setView('add')} 
            variant={view === 'add' ? 'primary' : 'secondary'}
            icon="user-plus"
          >
            Add Employee
          </Button>
          <Button 
            onClick={() => setView('positions')} 
            variant={view === 'positions' ? 'primary' : 'secondary'}
            icon="briefcase"
          >
            Manage Positions
          </Button>
        </div>
      </div>

      {view === 'tree' && (
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <EmployeeTree 
            treeData={employeeTree} 
            onEmployeeClick={handleEmployeeClick} 
          />
        </div>
      )}

      {view === 'list' && (
        <EmployeesList 
          employees={employees} 
          onEmployeeClick={handleEmployeeClick} 
        />
      )}

      {view === 'add' && (
        <AddEmployee 
          employees={employees}
          positions={positions}
          onSave={handleAddEmployee} 
          onCancel={() => setView('tree')} 
        />
      )}

      {view === 'details' && selectedEmployee && (
        <EmployeeDetails 
          employee={selectedEmployee}
          employees={employees}
          positions={positions}
          isEditing={isEditing}
          onEditToggle={() => setIsEditing(!isEditing)}
          onUpdate={handleUpdateEmployee}
          onDelete={handleDeleteEmployee}
          onClose={() => setView('tree')}
        />
      )}

      {view === 'positions' && (
        <PositionManager
          positions={positions}
          onAddPosition={handleAddPosition}
          onUpdatePosition={handleUpdatePosition}
          onDeletePosition={handleDeletePosition}
          onClose={() => setView('tree')}
        />
      )}
    </div>
  );
};

export default EmployeePage;

// // src/pages/EmployeePage.jsx
// import { useState, useEffect } from 'react';
// import EmployeeTree from '../components/Employee/EmployeeTree';
// import EmployeesList from '../components/Employee/EmployeesList';
// import AddEmployee from '../components/Employee/AddEmployee';
// import EmployeeDetails from '../components/Employee/EmployeeDetails';
// import PositionManager from '../components/Employee/PositionManager';
// import DepartmentManager from '../components/Employee/DepartmentManager';
// import { Button } from '../components/UI';
// import { getEmployees, saveEmployees } from '../utils/storage';
// import { mockEmployees } from '../utils/employeeData';
// import { initialDepartments, getDepartmentHeads } from '../utils/departments';
// import { initialPositions, getDepartmentPositions } from '../utils/positions';
// import { buildOrganizationTree } from '../utils/treeUtils';

// const EmployeePage = () => {
//   const [view, setView] = useState('tree');
//   const [employees, setEmployees] = useState([]);
//   const [positions, setPositions] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [organizationTree, setOrganizationTree] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [selectedDepartment, setSelectedDepartment] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);

//   // Load data from localStorage or initialize
//   useEffect(() => {
//     const storedEmployees = getEmployees('employees');
//     const storedPositions = getEmployees('positions');
//     const storedDepartments = getEmployees('departments');
//     const storedTree = getEmployees('organizationTree');

//     if (storedEmployees && storedPositions && storedDepartments) {
//       setEmployees(storedEmployees);
//       setPositions(storedPositions);
//       setDepartments(storedDepartments);
//       setOrganizationTree(storedTree || []);
//     } else {
//       // Initialize with default data
//       setEmployees(mockEmployees);
//       setPositions(initialPositions);
//       setDepartments(initialDepartments);
      
//       // Save to localStorage
//       saveEmployees(mockEmployees, 'employees');
//       saveEmployees(initialPositions, 'positions');
//       saveEmployees(initialDepartments, 'departments');
      
//       // Build initial tree
//       const tree = buildOrganizationTree(initialDepartments, initialPositions, mockEmployees);
//       setOrganizationTree(tree);
//       saveEmployees(tree, 'organizationTree');
//     }
//   }, []);

//   // Rebuild tree when data changes
//   useEffect(() => {
//     if (employees.length > 0 && positions.length > 0 && departments.length > 0) {
//       const tree = buildOrganizationTree(departments, positions, employees);
//       setOrganizationTree(tree);
//       saveEmployees(tree, 'organizationTree');
//     }
//   }, [employees, positions, departments]);

//   const handleAddEmployee = (newEmployee) => {
//     const updatedEmployees = [...employees, newEmployee];
//     setEmployees(updatedEmployees);
//     saveEmployees(updatedEmployees, 'employees');
//     setView('tree');
//   };

//   const handleUpdateEmployee = (updatedEmployee) => {
//     const updatedEmployees = employees.map(emp => 
//       emp.id === updatedEmployee.id ? updatedEmployee : emp
//     );
//     setEmployees(updatedEmployees);
//     saveEmployees(updatedEmployees, 'employees');
//     setSelectedEmployee(updatedEmployee);
//     setIsEditing(false);
//   };

//   const handleEmployeeClick = (employeeId) => {
//     const employee = employees.find(emp => emp.id === employeeId);
//     setSelectedEmployee(employee);
//     setView('details');
//   };

//   const handleDepartmentClick = (departmentId) => {
//     const department = departments.find(dep => dep.id === departmentId);
//     setSelectedDepartment(department);
//     // Could show department details if needed
//   };

//   const handleAddPosition = (newPosition) => {
//     const updatedPositions = [...positions, newPosition];
//     setPositions(updatedPositions);
//     saveEmployees(updatedPositions, 'positions');
//   };

//   const handleUpdatePosition = (updatedPosition) => {
//     const updatedPositions = positions.map(pos => 
//       pos.id === updatedPosition.id ? updatedPosition : pos
//     );
//     setPositions(updatedPositions);
//     saveEmployees(updatedPositions, 'positions');
//   };

//   const handleDeletePosition = (positionId) => {
//     const updatedPositions = positions.filter(pos => pos.id !== positionId);
//     setPositions(updatedPositions);
//     saveEmployees(updatedPositions, 'positions');
//   };

//   const handleAddDepartment = (newDepartment) => {
//     const updatedDepartments = [...departments, newDepartment];
//     setDepartments(updatedDepartments);
//     saveEmployees(updatedDepartments, 'departments');
//   };

//   const handleUpdateDepartment = (updatedDepartment) => {
//     const updatedDepartments = departments.map(dep => 
//       dep.id === updatedDepartment.id ? updatedDepartment : dep
//     );
//     setDepartments(updatedDepartments);
//     saveEmployees(updatedDepartments, 'departments');
//   };

//   const handleDeleteDepartment = (departmentId) => {
//     const updatedDepartments = departments.filter(dep => dep.id !== departmentId);
//     setDepartments(updatedDepartments);
//     saveEmployees(updatedDepartments, 'departments');
//   };

//   const handleDeleteEmployee = (employeeId) => {
//     const updatedEmployees = employees.filter(emp => emp.id !== employeeId);
//     setEmployees(updatedEmployees);
//     saveEmployees(updatedEmployees, 'employees');
//     setView('tree');
//   };

//   return (
//     <div className="container mx-auto p-4 lg:p-6">
//       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
//         <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//           Organization Management
//         </h1>
//         <div className="flex flex-wrap gap-2">
//           <Button 
//             onClick={() => setView('tree')} 
//             variant={view === 'tree' ? 'primary' : 'secondary'}
//             icon="sitemap"
//           >
//             Organization Tree
//           </Button>
//           <Button 
//             onClick={() => setView('list')} 
//             variant={view === 'list' ? 'primary' : 'secondary'}
//             icon="users"
//           >
//             View All Employees
//           </Button>
//           <Button 
//             onClick={() => setView('add')} 
//             variant={view === 'add' ? 'primary' : 'secondary'}
//             icon="user-plus"
//           >
//             Add Employee
//           </Button>
//           <Button 
//             onClick={() => setView('departments')} 
//             variant={view === 'departments' ? 'primary' : 'secondary'}
//             icon="building"
//           >
//             Manage Departments
//           </Button>
//           <Button 
//             onClick={() => setView('positions')} 
//             variant={view === 'positions' ? 'primary' : 'secondary'}
//             icon="briefcase"
//           >
//             Manage Positions
//           </Button>
//         </div>
//       </div>

//       {view === 'tree' && (
//         <div className="bg-white rounded-xl shadow-xl overflow-hidden">
//           <EmployeeTree 
//             treeData={organizationTree} 
//             onEmployeeClick={handleEmployeeClick}
//             onDepartmentClick={handleDepartmentClick}
//           />
//         </div>
//       )}

//       {view === 'list' && (
//         <EmployeesList 
//           employees={employees} 
//           onEmployeeClick={handleEmployeeClick} 
//         />
//       )}

//       {view === 'add' && (
//         <AddEmployee 
//           employees={employees}
//           departments={departments}
//           positions={positions}
//           onSave={handleAddEmployee} 
//           onCancel={() => setView('tree')} 
//         />
//       )}

//       {view === 'details' && selectedEmployee && (
//         <EmployeeDetails 
//           employee={selectedEmployee}
//           employees={employees}
//           departments={departments}
//           positions={positions}
//           isEditing={isEditing}
//           onEditToggle={() => setIsEditing(!isEditing)}
//           onUpdate={handleUpdateEmployee}
//           onDelete={handleDeleteEmployee}
//           onClose={() => setView('tree')}
//         />
//       )}

//       {view === 'positions' && (
//         <PositionManager
//           positions={positions}
//           departments={departments}
//           onAddPosition={handleAddPosition}
//           onUpdatePosition={handleUpdatePosition}
//           onDeletePosition={handleDeletePosition}
//           onClose={() => setView('tree')}
//         />
//       )}

//       {view === 'departments' && (
//         <DepartmentManager
//           departments={departments}
//           positions={positions}
//           employees={employees}
//           onAddDepartment={handleAddDepartment}
//           onUpdateDepartment={handleUpdateDepartment}
//           onDeleteDepartment={handleDeleteDepartment}
//           onClose={() => setView('tree')}
//         />
//       )}
//     </div>
//   );
// };

// export default EmployeePage;