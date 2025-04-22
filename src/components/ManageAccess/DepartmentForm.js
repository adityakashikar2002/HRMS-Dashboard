import React, { useState } from 'react';
import { toast } from 'react-toastify';

const DepartmentForm = ({ onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    access: {
      employees: false,
      attendance: false,
      payroll: false,
      hiring: false
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAccessChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      access: { ...prev.access, [name]: checked }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Department name is required');
      return;
    }

    const access = Object.entries(formData.access)
      .filter(([_, value]) => value)
      .map(([key]) => key);

    onSubmit({
      name: formData.name.trim(),
      description: formData.description.trim(),
      access
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Create New Department</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Department Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            rows="3"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Default Access Permissions</label>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(formData.access).map(([key, value]) => (
              <div key={key} className="flex items-center bg-gray-50 p-3 rounded-lg">
                <input
                  type="checkbox"
                  id={`new-dept-${key}`}
                  name={key}
                  checked={value}
                  onChange={handleAccessChange}
                  className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor={`new-dept-${key}`} className="ml-2 capitalize text-gray-700">
                  {key}
                </label>
              </div>
            ))}
          </div> */}
          <div className="flex flex-wrap gap-2 mb-4">
            {['dashboard', 'tasks', 'inbox', 'calendar', 'projects'].map(access => (
              <span 
                key={access}
                className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded"
              >
                {access}
              </span>
            ))}
          </div>          
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Department
          </button>
        </div>
      </form>
    </div>
  );
};

export default DepartmentForm;