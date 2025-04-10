// import { useState, useEffect } from 'react';
// import EmployeeTree from '../components/Employee/EmployeeTree';
// import EmployeesList from '../components/Employee/EmployeesList';
// import AddEmployee from '../components/Employee/AddEmployee';
// import EmployeeDetails from '../components/Employee/EmployeeDetails';
// import PositionManager from '../components/Employee/PositionManager';
// import { Button } from '../components/UI';
// import { getEmployees, saveEmployees } from '../utils/storage';
// import { mockEmployees, mockTree } from '../utils/employeeData';
// import { defaultPositions } from '../utils/positions';
// import { buildTree, updateTree } from '../utils/treeUtils';

// const EmployeePage = () => {
//   const [view, setView] = useState('tree'); // 'tree', 'list', 'add', 'details', 'positions'
//   const [employees, setEmployees] = useState([]);
//   const [employeeTree, setEmployeeTree] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [positions, setPositions] = useState(defaultPositions);
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     // Load from localStorage or use mock data
//     const storedEmployees = getEmployees();
//     const storedTree = getEmployees('employeeTree');
//     const storedPositions = getEmployees('positions');
    
//     if (storedEmployees && storedEmployees.length > 0) {
//       setEmployees(storedEmployees);
//       setEmployeeTree(storedTree || mockTree);
//       setPositions(storedPositions || defaultPositions);
//     } else {
//       // Initialize with mock data
//       setEmployees(mockEmployees);
//       setEmployeeTree(mockTree);
//       setPositions(defaultPositions);
//       saveEmployees(mockEmployees);
//       saveEmployees(mockTree, 'employeeTree');
//       saveEmployees(defaultPositions, 'positions');
//     }
//   }, []);

//   const handleAddEmployee = (newEmployee) => {
//     const updatedEmployees = [...employees, newEmployee];
//     setEmployees(updatedEmployees);
//     saveEmployees(updatedEmployees);
    
//     // Update tree
//     const updatedTree = updateTree(employeeTree, employees, newEmployee);
//     setEmployeeTree(updatedTree);
//     saveEmployees(updatedTree, 'employeeTree');
    
//     setView('tree');
//   };

//   const handleUpdateEmployee = (updatedEmployee) => {
//     const updatedEmployees = employees.map(emp => 
//       emp.id === updatedEmployee.id ? updatedEmployee : emp
//     );
//     setEmployees(updatedEmployees);
//     saveEmployees(updatedEmployees);
    
//     // Update tree
//     const updatedTree = buildTree(updatedEmployees);
//     setEmployeeTree(updatedTree);
//     saveEmployees(updatedTree, 'employeeTree');
    
//     setSelectedEmployee(updatedEmployee);
//     setIsEditing(false);
//   };

//   const handleEmployeeClick = (employeeId) => {
//     const employee = employees.find(emp => emp.id === employeeId);
//     setSelectedEmployee(employee);
//     setView('details');
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

//   const handleDeleteEmployee = (employeeId) => {
//     const updatedEmployees = employees.filter(emp => emp.id !== employeeId);
//     setEmployees(updatedEmployees);
//     saveEmployees(updatedEmployees);
    
//     // Rebuild tree
//     const updatedTree = buildTree(updatedEmployees);
//     setEmployeeTree(updatedTree);
//     saveEmployees(updatedTree, 'employeeTree');
    
//     setView('tree');
//   };

//   return (
//     <div className="container mx-auto p-4 lg:p-6">
//       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
//         <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//           Employee Management
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
//             View All
//           </Button>
//           <Button 
//             onClick={() => setView('add')} 
//             variant={view === 'add' ? 'primary' : 'secondary'}
//             icon="user-plus"
//           >
//             Add Employee
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
//             treeData={employeeTree} 
//             onEmployeeClick={handleEmployeeClick} 
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
//           positions={positions}
//           onSave={handleAddEmployee} 
//           onCancel={() => setView('tree')} 
//         />
//       )}

//       {view === 'details' && selectedEmployee && (
//         <EmployeeDetails 
//           employee={selectedEmployee}
//           employees={employees}
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
//           onAddPosition={handleAddPosition}
//           onUpdatePosition={handleUpdatePosition}
//           onDeletePosition={handleDeletePosition}
//           onClose={() => setView('tree')}
//         />
//       )}
//     </div>
//   );
// };

// export default EmployeePage;

// src/pages/EmployeePage.jsx
import { useState, useEffect } from 'react';
import EmployeeTree from '../components/Employee/EmployeeTree';
import EmployeesList from '../components/Employee/EmployeesList';
import AddEmployee from '../components/Employee/AddEmployee';
import EmployeeDetails from '../components/Employee/EmployeeDetails';
import PositionManager from '../components/Employee/PositionManager';
import DepartmentManager from '../components/Employee/DepartmentManager';
import { Button } from '../components/UI';
import { getEmployees, saveEmployees } from '../utils/storage';
import { mockEmployees, mockTree } from '../utils/employeeData';
import { defaultPositions } from '../utils/positions';
import { buildTree, updateTree } from '../utils/treeUtils';

const EmployeePage = () => {
  const [view, setView] = useState('tree');
  const [employees, setEmployees] = useState([]);
  const [employeeTree, setEmployeeTree] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [positions, setPositions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedEmployees = getEmployees();
    const storedDepartments = getEmployees('departments');
    const storedPositions = getEmployees('positions');
    
    if (storedEmployees && storedEmployees.length > 0) {
      setEmployees(storedEmployees);
      setDepartments(storedDepartments);
      setPositions(storedPositions);
      setEmployeeTree(buildTree(storedEmployees, storedDepartments));
    } else {
      // Initialize with CEO and default departments
      const initialEmployees = [
        {
          id: 'emp-1',
          firstName: 'John',
          lastName: 'Smith',
          email: 'john.smith@example.com',
          phone: '555-0101',
          position: 'CEO',
          department: '',
          salary: '200000',
          salaryType: 'annual',
          hireDate: '2015-06-15',
          managerId: '',
          employmentType: 'full-time',
          address: '123 Main St, Anytown, USA',
          skills: ['Leadership', 'Strategy', 'Finance'],
          hasBonus: true,
          bonusAmount: '25000',
          bonusDescription: 'Signing bonus'
        },
        {
          id: 'emp-2',
          firstName: 'Sarah',
          lastName: 'Johnson',
          email: 'sarah.j@example.com',
          phone: '555-0102',
          position: 'HR Manager',
          department: 'Human Resources',
          salary: '95000',
          salaryType: 'annual',
          hireDate: '2018-03-22',
          managerId: 'emp-1',
          employmentType: 'full-time',
          address: '456 Oak Ave, Somewhere, USA',
          skills: ['Recruiting', 'Employee Relations', 'Benefits']
        },
        {
          id: 'emp-3',
          firstName: 'Michael',
          lastName: 'Williams',
          email: 'michael.w@example.com',
          phone: '555-0103',
          position: 'Sales Manager',
          department: 'Sales',
          salary: '110000',
          salaryType: 'annual',
          hireDate: '2017-11-05',
          managerId: 'emp-1',
          employmentType: 'full-time',
          address: '789 Pine Rd, Nowhere, USA',
          skills: ['Sales', 'Negotiation', 'CRM']
        },
        {
          id: 'emp-4',
          firstName: 'Emily',
          lastName: 'Brown',
          email: 'emily.b@example.com',
          phone: '555-0104',
          position: 'Marketing Specialist',
          department: 'Marketing',
          salary: '75000',
          salaryType: 'annual',
          hireDate: '2019-08-14',
          managerId: 'emp-1',
          employmentType: 'full-time',
          address: '321 Elm Blvd, Anywhere, USA',
          skills: ['Digital Marketing', 'SEO', 'Content Creation']
        },
        {
          id: 'emp-5',
          firstName: 'David',
          lastName: 'Jones',
          email: 'david.j@example.com',
          phone: '555-0105',
          position: 'Sales Representative',
          department: 'Sales',
          salary: '65000',
          salaryType: 'annual',
          hireDate: '2020-02-18',
          managerId: 'emp-3',
          employmentType: 'full-time',
          address: '654 Cedar Ln, Somewhere, USA',
          skills: ['Customer Service', 'Product Knowledge', 'Cold Calling']
        },
        {
          id: 'emp-6',
          firstName: 'Jessica',
          lastName: 'Garcia',
          email: 'jessica.g@example.com',
          phone: '555-0106',
          position: 'HR Assistant',
          department: 'Human Resources',
          salary: '50000',
          salaryType: 'annual',
          hireDate: '2021-05-30',
          managerId: 'emp-2',
          employmentType: 'full-time',
          address: '987 Maple Dr, Nowhere, USA',
          skills: ['Onboarding', 'Administration', 'Scheduling']
        },
        {
          id: 'emp-7',
          firstName: 'Robert',
          lastName: 'Miller',
          email: 'robert.m@example.com',
          phone: '555-0107',
          position: 'IT Manager',
          department: 'IT',
          salary: '120000',
          salaryType: 'annual',
          hireDate: '2016-09-12',
          managerId: 'emp-1',
          employmentType: 'full-time',
          address: '135 Walnut St, Anytown, USA',
          skills: ['Networking', 'Security', 'System Administration']
        },
        {
          id: 'emp-8',
          firstName: 'Jennifer',
          lastName: 'Davis',
          email: 'jennifer.d@example.com',
          phone: '555-0108',
          position: 'Software Engineer',
          department: 'IT',
          salary: '105000',
          salaryType: 'annual',
          hireDate: '2019-04-25',
          managerId: 'emp-7',
          employmentType: 'full-time',
          address: '246 Birch Ave, Anywhere, USA',
          skills: ['JavaScript', 'React', 'Node.js']
        },
        {
          id: 'emp-9',
          firstName: 'Linda',
          lastName: 'Clark',
          email: 'linda.c@example.com',
          phone: '555-0109',
          position: 'CTO',
          department: 'Technology',
          salary: '190000',
          salaryType: 'annual',
          hireDate: '2016-02-01',
          managerId: 'emp-1',
          employmentType: 'full-time',
          address: '159 Oak Circle, Tech City, USA',
          skills: ['Tech Strategy', 'Architecture', 'Leadership']
        },
        {
          id: 'emp-10',
          firstName: 'Brian',
          lastName: 'Lee',
          email: 'brian.l@example.com',
          phone: '555-0110',
          position: 'CFO',
          department: 'Finance',
          salary: '185000',
          salaryType: 'annual',
          hireDate: '2016-05-11',
          managerId: 'emp-1',
          employmentType: 'full-time',
          address: '753 Willow Dr, FinTown, USA',
          skills: ['Accounting', 'Forecasting', 'Budgeting']
        },
        {
          id: 'emp-11',
          firstName: 'Sophia',
          lastName: 'Taylor',
          email: 'sophia.t@example.com',
          phone: '555-0111',
          position: 'Director',
          department: 'Marketing',
          salary: '140000',
          salaryType: 'annual',
          hireDate: '2017-07-21',
          managerId: 'emp-1',
          employmentType: 'full-time',
          address: '864 Spruce Blvd, Anywhere, USA',
          skills: ['Brand Management', 'Leadership', 'Analytics']
        },
        {
          id: 'emp-12',
          firstName: 'Kevin',
          lastName: 'White',
          email: 'kevin.w@example.com',
          phone: '555-0112',
          position: 'Product Manager',
          department: 'Product',
          salary: '125000',
          salaryType: 'annual',
          hireDate: '2019-09-18',
          managerId: 'emp-9',
          employmentType: 'full-time',
          address: '398 Aspen St, Productville, USA',
          skills: ['Agile', 'Scrum', 'Stakeholder Communication']
        },
        {
          id: 'emp-13',
          firstName: 'Anna',
          lastName: 'Martinez',
          email: 'anna.m@example.com',
          phone: '555-0113',
          position: 'Senior Software Engineer',
          department: 'Engineering',
          salary: '115000',
          salaryType: 'annual',
          hireDate: '2018-12-05',
          managerId: 'emp-9',
          employmentType: 'full-time',
          address: '982 Cypress Ln, Devtown, USA',
          skills: ['Java', 'System Design', 'Microservices']
        },
        {
          id: 'emp-14',
          firstName: 'Tom',
          lastName: 'Anderson',
          email: 'tom.a@example.com',
          phone: '555-0114',
          position: 'UX Designer',
          department: 'Design',
          salary: '90000',
          salaryType: 'annual',
          hireDate: '2021-06-22',
          managerId: 'emp-12',
          employmentType: 'full-time',
          address: '333 Elm St, Designtown, USA',
          skills: ['Wireframing', 'User Research', 'Figma']
        }
      ];

      const initialDepartments = [
        { id: 'dep-1', name: 'Technology', isSubDepartment: false, parentId: 'ceo-root' },
        { id: 'dep-2', name: 'Human Resources', isSubDepartment: false, parentId: 'ceo-root' },
        // ... other departments
      ];

      setEmployees(initialEmployees);
      setDepartments(initialDepartments);
      setPositions(defaultPositions);
      saveEmployees(initialEmployees);
      saveEmployees(initialDepartments, 'departments');
      saveEmployees(defaultPositions, 'positions');
      setEmployeeTree(buildTree(initialEmployees, initialDepartments));
    }
  }, []);

  const handleAddEmployee = (newEmployee) => {
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    saveEmployees(updatedEmployees);
    
    const updatedTree = updateTree(employeeTree, employees, departments, newEmployee);
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

  const handleAddDepartment = (newDepartment) => {
    const updatedDepartments = [...departments, newDepartment];
    setDepartments(updatedDepartments);
    saveEmployees(updatedDepartments, 'departments');
    
    // Rebuild tree with new department
    const updatedTree = buildTree(employees, updatedDepartments);
    setEmployeeTree(updatedTree);
    saveEmployees(updatedTree, 'employeeTree');
  };


  const handleUpdateDepartment = (updatedDepartment) => {
    const updatedDepartments = departments.map(dept =>
      dept.id === updatedDepartment.id ? updatedDepartment : dept
    );
    setDepartments(updatedDepartments);
    saveEmployees(updatedDepartments, 'departments');
  };

  const handleDeleteDepartment = (departmentId) => {
    const updatedDepartments = departments.filter(dept => dept.id !== departmentId);
    setDepartments(updatedDepartments);
    saveEmployees(updatedDepartments, 'departments');
  };

  const handleDeleteEmployee = (employeeId) => {
    const updatedEmployees = employees.filter(emp => emp.id !== employeeId);
    setEmployees(updatedEmployees);
    saveEmployees(updatedEmployees);

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
          <Button
            onClick={() => setView('departments')}
            variant={view === 'departments' ? 'primary' : 'secondary'}
            icon="building"
          >
            Manage Departments
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
          departments={departments}
          onSave={handleAddEmployee}
          onCancel={() => setView('tree')}
        />
      )}

      {view === 'details' && selectedEmployee && (
        <EmployeeDetails
          employee={selectedEmployee}
          employees={employees}
          positions={positions}
          departments={departments}
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
          departments={departments}
          onAddPosition={handleAddPosition}
          onUpdatePosition={handleUpdatePosition}
          onDeletePosition={handleDeletePosition}
          onClose={() => setView('tree')}
        />
      )}

      {view === 'departments' && (
        <DepartmentManager
          departments={departments}
          positions={positions}
          employees={employees}
          onAddDepartment={handleAddDepartment}
          onUpdateDepartment={handleUpdateDepartment}
          onDeleteDepartment={handleDeleteDepartment}
          onClose={() => setView('tree')}
        />
      )}
    </div>
  );
};

export default EmployeePage;