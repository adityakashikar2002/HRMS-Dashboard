// Works 99.999
import { useState, useEffect } from 'react';
import EmployeeTree from '../components/Employee/EmployeeTree';
import EmployeesList from '../components/Employee/EmployeesList';
import AddEmployee from '../components/Employee/AddEmployee';
import EmployeeDetails from '../components/Employee/EmployeeDetails';
import DepartmentManager from '../components/Employee/DepartmentManager';
import { Button } from '../components/UI';
import { getEmployees, saveEmployees } from '../utils/storage';
import { mockEmployees, mockTree } from '../utils/employeeData';
import { buildTree, updateTree } from '../utils/treeUtils';
import PositionManager from '../components/Employee/PositionManager';

const EmployeePage = () => {
  const [view, setView] = useState('tree');
  const [employees, setEmployees] = useState([]);
  const [employeeTree, setEmployeeTree] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [positions, setPositions] = useState([]);
  const [showPositionManager, setShowPositionManager] = useState(false);

  useEffect(() => {
    const storedEmployees = getEmployees();
    const storedDepartments = getEmployees('departments');
    
    if (storedEmployees && storedEmployees.length > 0) {
      setEmployees(storedEmployees);
      setDepartments(storedDepartments);
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
        }
      ];

      const initialDepartments = [
        {
          id: 'dep-1',
          name: 'Sales',
          description: 'Sales department',
          head: {
            firstName: 'Michael',
            lastName: 'Williams',
            email: 'michael.w@example.com',
            phone: '555-0103',
            position: 'Sales Manager',
            salary: '110000'
          },
          positions: [
            {
              title: 'Sales Manager',
              level: 'Manager',
              description: 'Manages sales team'
            },
            {
              title: 'Sales Representative',
              level: 'Mid',
              description: 'Handles customer sales'
            }
          ]
        },
        {
          id: 'dep-2',
          name: 'Human Resources',
          description: 'HR department',
          head: {
            firstName: 'Sarah',
            lastName: 'Johnson',
            email: 'sarah.j@example.com',
            phone: '555-0102',
            position: 'HR Manager',
            salary: '95000'
          },
          positions: [
            {
              title: 'HR Manager',
              level: 'Manager',
              description: 'Manages HR team'
            },
            {
              title: 'HR Assistant',
              level: 'Junior',
              description: 'Assists HR manager'
            }
          ]
        }
      ];

      setEmployees(initialEmployees);
      setDepartments(initialDepartments);
      saveEmployees(initialEmployees);
      saveEmployees(initialDepartments, 'departments');
      setEmployeeTree(buildTree(initialEmployees, initialDepartments));
    }

    const storedPositions = getEmployees('positions');
      if (storedPositions && storedPositions.length > 0) {
        setPositions(storedPositions);
      } else {
        // Initialize with some positions
        const initialPositions = [
          {
            id: 'pos-1',
            title: 'Software Engineer',
            department: 'Sales',
            level: 'Mid',
            description: 'Develops software applications'
          },
          {
            id: 'pos-2',
            title: 'Product Manager',
            department: 'Sales',
            level: 'Senior',
            description: 'Manages product development'
          }
        ];
        setPositions(initialPositions);
        saveEmployees(initialPositions, 'positions');
      }
  }, []);

  // Add these functions
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

    const updatedTree = buildTree(updatedEmployees, departments);
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

  const handleAddDepartment = (newDepartment) => {
    // Add department head as an employee
    const headEmployee = {
      id: `emp-${Date.now()}`,
      firstName: newDepartment.head.firstName,
      lastName: newDepartment.head.lastName,
      email: newDepartment.head.email,
      phone: newDepartment.head.phone,
      position: newDepartment.head.position,
      department: newDepartment.name,
      salary: newDepartment.head.salary,
      salaryType: 'annual',
      hireDate: new Date().toISOString().split('T')[0],
      managerId: employees.find(e => e.position === 'CEO')?.id || '',
      employmentType: 'full-time',
      address: '',
      skills: ['Management', 'Leadership']
    };
  
    const updatedEmployees = [...employees, headEmployee];
    setEmployees(updatedEmployees);
    saveEmployees(updatedEmployees);
  
    const updatedDepartments = [...departments, newDepartment];
    setDepartments(updatedDepartments);
    saveEmployees(updatedDepartments, 'departments');
  
    // Process positions - add department reference
    const deptPositions = newDepartment.positions.map(pos => ({
      ...pos,
      department: newDepartment.name,
      id: `pos-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }));
    
    // Merge with existing positions, avoiding duplicates
    const updatedPositions = [
      ...positions.filter(p => p.department !== newDepartment.name),
      ...deptPositions
    ];
    
    setPositions(updatedPositions);
    saveEmployees(updatedPositions, 'positions');
  
    // Rebuild tree with new department
    const updatedTree = buildTree(updatedEmployees, updatedDepartments);
    setEmployeeTree(updatedTree);
    saveEmployees(updatedTree, 'employeeTree');
  };

  const handleUpdateDepartment = (updatedDepartment) => {
    // Find and update the department head employee
    const headEmployee = employees.find(e => 
      e.firstName === updatedDepartment.head.firstName && 
      e.lastName === updatedDepartment.head.lastName &&
      e.position === updatedDepartment.head.position
    );

    let updatedEmployees = [...employees];
    if (headEmployee) {
      updatedEmployees = employees.map(emp => {
        if (emp.id === headEmployee.id) {
          return {
            ...emp,
            firstName: updatedDepartment.head.firstName,
            lastName: updatedDepartment.head.lastName,
            email: updatedDepartment.head.email,
            phone: updatedDepartment.head.phone,
            position: updatedDepartment.head.position,
            salary: updatedDepartment.head.salary
          };
        }
        return emp;
      });
    }

    setEmployees(updatedEmployees);
    saveEmployees(updatedEmployees);

    // Update department
    const updatedDepartments = departments.map(dept =>
      dept.id === updatedDepartment.id ? updatedDepartment : dept
    );
    setDepartments(updatedDepartments);
    saveEmployees(updatedDepartments, 'departments');

    // Update positions for this department
    const updatedDeptPositions = updatedDepartment.positions.map(pos => ({
      ...pos,
      department: updatedDepartment.name,
      id: pos.id || `pos-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }));
    
    const updatedPositions = [
      ...positions.filter(p => p.department !== updatedDepartment.name),
      ...updatedDeptPositions
    ];
    
    setPositions(updatedPositions);
    saveEmployees(updatedPositions, 'positions');

    // Rebuild tree
    const updatedTree = buildTree(updatedEmployees, updatedDepartments);
    setEmployeeTree(updatedTree);
    saveEmployees(updatedTree, 'employeeTree');
  };

  const handleDeleteDepartment = (departmentId) => {
    const departmentToDelete = departments.find(d => d.id === departmentId);
    if (!departmentToDelete) return;

    // Remove employees in this department
    const updatedEmployees = employees.filter(emp => 
      emp.department !== departmentToDelete.name
    );
    setEmployees(updatedEmployees);
    saveEmployees(updatedEmployees);

    const updatedDepartments = departments.filter(dept => dept.id !== departmentId);
    setDepartments(updatedDepartments);
    saveEmployees(updatedDepartments, 'departments');

    const updatedTree = buildTree(updatedEmployees, updatedDepartments);
    setEmployeeTree(updatedTree);
    saveEmployees(updatedTree, 'employeeTree');
  };

  const handleDeleteEmployee = (employeeId) => {
    const updatedEmployees = employees.filter(emp => emp.id !== employeeId);
    setEmployees(updatedEmployees);
    saveEmployees(updatedEmployees);

    const updatedTree = buildTree(updatedEmployees, departments);
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
            onClick={() => setShowPositionManager(true)}
            variant="secondary"
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
          departments={departments}
          positions={positions} // Add this line
          onSave={handleAddEmployee}
          onCancel={() => setView('tree')}
        />
      )}

      {view === 'details' && selectedEmployee && (
        <EmployeeDetails
          employee={selectedEmployee}
          employees={employees}
          departments={departments}
          isEditing={isEditing}
          onEditToggle={() => setIsEditing(!isEditing)}
          onUpdate={handleUpdateEmployee}
          onDelete={handleDeleteEmployee}
          onClose={() => setView('tree')}
        />
      )}

      {view === 'departments' && (
        <DepartmentManager
          departments={departments}
          employees={employees}
          onAddDepartment={handleAddDepartment}
          onUpdateDepartment={handleUpdateDepartment}
          onDeleteDepartment={handleDeleteDepartment}
          onClose={() => setView('tree')}
        />
      )}
      {showPositionManager && (
        <PositionManager
          positions={positions}
          departments={departments}
          onAddPosition={handleAddPosition}
          onUpdatePosition={handleUpdatePosition}
          onDeletePosition={handleDeletePosition}
          onClose={() => setShowPositionManager(false)}
        />
      )}
    </div>
  );
};

export default EmployeePage;