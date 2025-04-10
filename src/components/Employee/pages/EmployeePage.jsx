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