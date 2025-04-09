// import { useState, useEffect } from 'react';
// import EmployeeTree from '../components/Employee/EmployeeTree';
// import EmployeesList from '../components/Employee/EmployeesList';
// import AddEmployee from '../components/Employee/AddEmployee';
// import EmployeeDetails from '../components/Employee/EmployeeDetails';
// import Button from '../components/UI/Button';
// import { getEmployees, saveEmployees } from '../utils/storage';
// import { mockEmployees, mockTree } from '../utils/employeeData';

// const EmployeePage = () => {
//   const [view, setView] = useState('tree'); // 'tree', 'list', 'add', 'details'
//   const [employees, setEmployees] = useState([]);
//   const [employeeTree, setEmployeeTree] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);

//   useEffect(() => {
//     // Load from localStorage or use mock data
//     const storedEmployees = getEmployees();
//     const storedTree = getEmployees('employeeTree');
    
//     if (storedEmployees && storedEmployees.length > 0) {
//       setEmployees(storedEmployees);
//       setEmployeeTree(storedTree || mockTree);
//     } else {
//       // Initialize with mock data
//       setEmployees(mockEmployees);
//       setEmployeeTree(mockTree);
//       saveEmployees(mockEmployees);
//       saveEmployees(mockTree, 'employeeTree');
//     }
//   }, []);

//   const handleAddEmployee = (newEmployee) => {
//     const updatedEmployees = [...employees, newEmployee];
//     setEmployees(updatedEmployees);
//     saveEmployees(updatedEmployees);
    
//     // Simple tree update logic - in a real app this would be more complex
//     if (newEmployee.managerId) {
//       const updatedTree = JSON.parse(JSON.stringify(employeeTree));
//       // Find manager and add employee to their team
//       // This is simplified - you'd need a proper tree traversal function
//       const addToTree = (nodes) => {
//         for (let node of nodes) {
//           if (node.id === newEmployee.managerId) {
//             if (!node.children) node.children = [];
//             node.children.push({ 
//               id: newEmployee.id, 
//               name: `${newEmployee.firstName} ${newEmployee.lastName}`,
//               position: newEmployee.position,
//               children: [] 
//             });
//             return true;
//           }
//           if (node.children && addToTree(node.children)) {
//             return true;
//           }
//         }
//         return false;
//       };
      
//       addToTree(updatedTree);
//       setEmployeeTree(updatedTree);
//       saveEmployees(updatedTree, 'employeeTree');
//     }
    
//     setView('tree');
//   };

//   const handleEmployeeClick = (employeeId) => {
//     const employee = employees.find(emp => emp.id === employeeId);
//     setSelectedEmployee(employee);
//     setView('details');
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">Employee Management</h1>
//         <div className="flex space-x-4">
//           <Button 
//             onClick={() => setView('tree')} 
//             variant={view === 'tree' ? 'primary' : 'secondary'}
//           >
//             Organization Tree
//           </Button>
//           <Button 
//             onClick={() => setView('list')} 
//             variant={view === 'list' ? 'primary' : 'secondary'}
//           >
//             View All Employees
//           </Button>
//           <Button 
//             onClick={() => setView('add')} 
//             variant={view === 'add' ? 'primary' : 'secondary'}
//           >
//             Add Employee
//           </Button>
//         </div>
//       </div>

//       {view === 'tree' && (
//         <EmployeeTree 
//           treeData={employeeTree} 
//           onEmployeeClick={handleEmployeeClick} 
//         />
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
//           onSave={handleAddEmployee} 
//           onCancel={() => setView('tree')} 
//         />
//       )}

//       {view === 'details' && selectedEmployee && (
//         <EmployeeDetails 
//           employee={selectedEmployee} 
//           onClose={() => setView('tree')} 
//           onEdit={() => {
//             // Implement edit functionality
//           }} 
//         />
//       )}
//     </div>
//   );
// };

// export default EmployeePage;


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
          positions={positions}
          isEditing={isEditing}
          onEditToggle={() => setIsEditing(!isEditing)}
          onUpdate={handleUpdateEmployee}
          onClose={() => setView('tree')}
        />
      )}

      {view === 'positions' && (
        <PositionManager
          positions={positions}
          onAddPosition={handleAddPosition}
          onClose={() => setView('tree')}
        />
      )}
    </div>
  );
};

export default EmployeePage;