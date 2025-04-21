// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../auth/AuthContext';
// import { users } from '../../data/users';
// import { toast } from 'react-toastify';

// const ManageAccess = () => {
//   const { user, updateUserAccess } = useAuth();
//   const [employees, setEmployees] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [accessSettings, setAccessSettings] = useState({
//     dashboard: true,
//     tasks: true,
//     inbox: true,
//     calendar: true,
//     projects: true,
//     employees: false,
//     attendance: false,
//     payroll: false,
//     hiring: false
//   });

//   useEffect(() => {
//     if (user?.role === 'admin') {
//       setEmployees(users.filter(u => u.role === 'employee'));
//     }
//   }, [user]);

//   useEffect(() => {
//     if (selectedEmployee) {
//       const defaultSettings = {
//         dashboard: true,
//         tasks: true,
//         inbox: true,
//         calendar: true,
//         projects: true,
//         employees: selectedEmployee.access.includes('employees'),
//         attendance: selectedEmployee.access.includes('attendance'),
//         payroll: selectedEmployee.access.includes('payroll'),
//         hiring: selectedEmployee.access.includes('hiring')
//       };
//       setAccessSettings(defaultSettings);
//     }
//   }, [selectedEmployee]);

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { getUsers } from '../../data/users';
import { toast } from 'react-toastify';

const ManageAccess = () => {
  const { user, updateUserAccess } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [accessSettings, setAccessSettings] = useState({
    dashboard: true,
    tasks: true,
    inbox: true,
    calendar: true,
    projects: true,
    employees: false,
    attendance: false,
    payroll: false,
    hiring: false
  });

  useEffect(() => {
    if (user?.role === 'admin') {
      setEmployees(getUsers().filter(u => u.role === 'employee'));
    }
  }, [user]);

  useEffect(() => {
    if (selectedEmployee) {
      const defaultSettings = {
        dashboard: true,
        tasks: true,
        inbox: true,
        calendar: true,
        projects: true,
        employees: selectedEmployee.access.includes('employees'),
        attendance: selectedEmployee.access.includes('attendance'),
        payroll: selectedEmployee.access.includes('payroll'),
        hiring: selectedEmployee.access.includes('hiring')
      };
      setAccessSettings(defaultSettings);
    }
  }, [selectedEmployee]);

  const handleEmployeeSelect = (e) => {
    const employeeId = parseInt(e.target.value);
    const employee = employees.find(emp => emp.id === employeeId);
    setSelectedEmployee(employee);
  };

  const handleAccessChange = (e) => {
    const { name, checked } = e.target;
    // Default routes cannot be changed
    if (['dashboard', 'tasks', 'inbox', 'calendar', 'projects'].includes(name)) return;
    setAccessSettings(prev => ({ ...prev, [name]: checked }));
  };

  const saveAccess = () => {
    if (!selectedEmployee) return;
    
    const newAccess = Object.entries(accessSettings)
      .filter(([_, value]) => value)
      .map(([key]) => key);
    
    updateUserAccess(selectedEmployee.id, newAccess);
    toast.success('Access updated successfully');
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Manage Employee Access</h2>
      
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Select Employee</label>
        <select
          className="w-full p-2 border rounded"
          onChange={handleEmployeeSelect}
          value={selectedEmployee?.id || ''}
        >
          <option value="">Select an employee</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>{emp.name}</option>
          ))}
        </select>
      </div>

      {selectedEmployee && (
        <>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Access Permissions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(accessSettings).map(([key, value]) => (
                <div key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    id={key}
                    name={key}
                    checked={value}
                    onChange={handleAccessChange}
                    disabled={['dashboard', 'tasks', 'inbox', 'calendar', 'projects'].includes(key)}
                    className="mr-2"
                  />
                  <label htmlFor={key} className="capitalize">
                    {key} {['dashboard', 'tasks', 'inbox', 'calendar', 'projects'].includes(key) && '(Default)'}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={saveAccess}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </>
      )}
    </div>
  );
};

export default ManageAccess;