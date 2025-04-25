//EmployeeAccess.js
import React, { useState, useEffect } from 'react';
import { getUsers, updateUserAccess, updateUserDepartment } from '../../data/users';
import { getDepartments } from '../../data/departments';
import { useAuth } from '../../auth/AuthContext';
import { toast } from 'react-toastify';

const EmployeeAccess = () => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [accessSettings, setAccessSettings] = useState({
    employees: false,
    attendance: false,
    payroll: false,
    hiring: false,
  });

  useEffect(() => {
    if (user?.role === 'admin') {
      setEmployees(getUsers().filter(u => u.role === 'employee'));
      setDepartments(getDepartments());
    }
  }, [user]);

  useEffect(() => {
    if (selectedEmployee) {
      setAccessSettings({
        employees: selectedEmployee.access.includes('employees'),
        attendance: selectedEmployee.access.includes('attendance'),
        payroll: selectedEmployee.access.includes('payroll'),
        hiring: selectedEmployee.access.includes('hiring')
      });
    }
  }, [selectedEmployee]);

  const handleEmployeeSelect = (e) => {
    const employeeId = parseInt(e.target.value);
    const employee = employees.find(emp => emp.id === employeeId);
    setSelectedEmployee(employee);
  };

  const handleAccessChange = (e) => {
    const { name, checked } = e.target;
    setAccessSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handleDepartmentChange = (e) => {
    const departmentId = e.target.value ? parseInt(e.target.value) : null;
    if (selectedEmployee) {
      updateUserDepartment(selectedEmployee.id, departmentId);
      setEmployees(getUsers().filter(u => u.role === 'employee'));
      setSelectedEmployee({ ...selectedEmployee, departmentId });
      toast.success('Department updated successfully');
    }
  };

  const saveAccess = () => {
    if (!selectedEmployee) return;
    
    // Start with default access
    const defaultAccess = ['dashboard', 'tasks', 'inbox', 'calendar', 'projects'];
    
    // Add selected access
    const newAccess = [...defaultAccess, ...Object.entries(accessSettings)
      .filter(([_, value]) => value)
      .map(([key]) => key)];
    
    updateUserAccess(selectedEmployee.id, newAccess);
    setEmployees(getUsers().filter(u => u.role === 'employee'));
    toast.success(`Access updated for ${selectedEmployee.name}`);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-800">Individual Employee Access Control</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6 shadow-inner">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Select Employee</label>
            <select
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={handleEmployeeSelect}
              value={selectedEmployee?.id || ''}
            >
              <option value="">Select an employee</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} ({emp.email})
                </option>
              ))}
            </select>
          </div>

          {selectedEmployee && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Department</label>
              <select
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                onChange={handleDepartmentChange}
                value={selectedEmployee.departmentId || ''}
              >
                <option value="">No department</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {selectedEmployee && (
          <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
            <h4 className="font-medium text-gray-800 mb-4">Additional Access Permissions</h4>
            <div className="grid grid-cols-1 gap-3 mb-6">
              {Object.entries(accessSettings).map(([key, value]) => (
                <div key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`emp-${key}`}
                    name={key}
                    checked={value}
                    onChange={handleAccessChange}
                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`emp-${key}`} className="ml-2 capitalize text-gray-700">
                    {key}
                  </label>
                </div>
              ))}
            </div>
            
            <button
              onClick={saveAccess}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Save Employee Access
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeAccess;