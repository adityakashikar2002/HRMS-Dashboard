import React, { useState, useEffect } from 'react';
import { getDepartments, deleteDepartment, updateDepartment } from '../../data/departments';
import { getUsersByDepartment } from '../../data/users';
import DepartmentForm from './DepartmentForm';
import { toast } from 'react-toastify';

const DepartmentAccess = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [accessSettings, setAccessSettings] = useState({
    employees: false,
    attendance: false,
    payroll: false,
    hiring: false
  });
  const [departmentEmployees, setDepartmentEmployees] = useState([]);

  useEffect(() => {
    setDepartments(getDepartments());
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      setAccessSettings({
        employees: selectedDepartment.access.includes('employees'),
        attendance: selectedDepartment.access.includes('attendance'),
        payroll: selectedDepartment.access.includes('payroll'),
        hiring: selectedDepartment.access.includes('hiring')
      });
      setDepartmentEmployees(getUsersByDepartment(selectedDepartment.id));
    }
  }, [selectedDepartment]);

  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
    setIsFormOpen(false);
  };

  const handleAccessChange = (e) => {
    const { name, checked } = e.target;
    setAccessSettings(prev => ({ ...prev, [name]: checked }));
  };

  const saveDepartmentAccess = () => {
    if (!selectedDepartment) return;
    
    const newAccess = Object.entries(accessSettings)
      .filter(([_, value]) => value)
      .map(([key]) => key);
    
    updateDepartment(selectedDepartment.id, { access: newAccess });
    setDepartments(getDepartments());
    toast.success(`Access updated for ${selectedDepartment.name} department`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      deleteDepartment(id);
      setDepartments(getDepartments());
      if (selectedDepartment && selectedDepartment.id === id) {
        setSelectedDepartment(null);
      }
      toast.success('Department deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">Department Access Control</h3>
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Add New Department
        </button>
      </div>

      {isFormOpen && (
        <DepartmentForm 
          onClose={() => setIsFormOpen(false)} 
          onSave={() => {
            setDepartments(getDepartments());
            setIsFormOpen(false);
          }}
          department={selectedDepartment}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-4 shadow-inner">
            <h4 className="font-medium text-gray-700 mb-3">Departments</h4>
            <ul className="space-y-2 max-h-96 overflow-y-auto">
              {departments.map(dept => (
                <li 
                  key={dept.id}
                  onClick={() => handleDepartmentSelect(dept)}
                  className={`p-3 rounded-md cursor-pointer transition ${selectedDepartment?.id === dept.id ? 'bg-blue-100 border-l-4 border-blue-500' : 'hover:bg-gray-100'}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{dept.name}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(dept.id);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{dept.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {selectedDepartment && (
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-4">Access Permissions for {selectedDepartment.name}</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {Object.entries(accessSettings).map(([key, value]) => (
                  <div key={key} className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <input
                      type="checkbox"
                      id={`dept-${key}`}
                      name={key}
                      checked={value}
                      onChange={handleAccessChange}
                      className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={`dept-${key}`} className="ml-2 capitalize text-gray-700">
                      {key}
                    </label>
                  </div>
                ))}
              </div>

              <button
                onClick={saveDepartmentAccess}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Save Department Access
              </button>
            </div>

            <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-4">Employees in {selectedDepartment.name}</h4>
              {departmentEmployees.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {departmentEmployees.map(emp => (
                    <div key={emp.id} className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
                      <img 
                        src={emp.avatar} 
                        alt={emp.name} 
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{emp.name}</p>
                        <p className="text-sm text-gray-500">{emp.email}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        emp.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {emp.role}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No employees in this department</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentAccess;