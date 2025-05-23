// src/components/EmployeeFormModal.jsx --Personal Acc
import React, { useState, useEffect } from 'react';

const EmployeeFormModal = ({ employee, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    role: 'UI/UX Designer',
    salary: 0,
    basic: 0,
    hra: 0,
    da: 0,
    reimbursement: 0,
    avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
    status: 'Pending'
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        id: employee.id,
        name: employee.name,
        role: employee.role,
        salary: employee.salary,
        basic: employee.basic || Math.round(employee.salary * 0.5),
        hra: employee.hra || Math.round(employee.salary * 0.4),
        da: employee.da || Math.round(employee.salary * 0.1),
        reimbursement: employee.reimbursement,
        avatar: employee.avatar,
        status: employee.status || 'Pending',
        date: employee.date || new Date().toLocaleString('en-IN', { 
          day: '2-digit', 
          month: 'short', 
          year: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      });
    } else {
      // Reset form for new employee
      setFormData({
        id: '',
        name: '',
        role: 'UI/UX Designer',
        salary: 0,
        basic: 0,
        hra: 0,
        da: 0,
        reimbursement: 0,
        avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
        status: 'Pending'
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'salary' || name === 'basic' || name === 'hra' || name === 'da' || name === 'reimbursement' 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Preserve the original date if editing
    const savedData = employee ? { 
      ...formData,
      date: employee.date // Keep original date when editing
    } : {
      ...formData,
      date: new Date().toLocaleString('en-IN', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
    
    onSave(savedData);
  };

  const calculateComponents = () => {
    if (formData.salary > 0) {
      const basic = Math.round(formData.salary * 0.5);
      const hra = Math.round(basic * 0.4);
      const da = Math.round(basic * 0.1);
      
      setFormData(prev => ({
        ...prev,
        basic,
        hra,
        da
      }));
    }
  };

  // Add ESIC information display
  const showESICInfo = formData.salary > 0 && formData.salary <= 21000;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              {employee ? 'Edit Employee' : 'Add New Employee'}
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                >
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="Graphics Designer">Graphics Designer</option>
                  <option value="Animator">Animator</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Project Manager">Project Manager</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Salary (₹)</label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  onBlur={calculateComponents}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                  required
                />
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Basic (50%)</label>
                  <input
                    type="number"
                    name="basic"
                    value={formData.basic}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">HRA (40% of Basic)</label>
                  <input
                    type="number"
                    name="hra"
                    value={formData.hra}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">DA (10% of Basic)</label>
                  <input
                    type="number"
                    name="da"
                    value={formData.da}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reimbursements (₹)</label>
                <input
                  type="number"
                  name="reimbursement"
                  value={formData.reimbursement}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                />
              </div>
              
              {showESICInfo && (
                <div className="bg-blue-50 p-2 rounded-md text-sm text-blue-800">
                  <i className="fas fa-info-circle mr-1"></i>
                  ESIC will be deducted (0.75%) as salary is ≤ ₹21,000
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image URL</label>
                <input
                  type="text"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                {employee ? 'Update Employee' : 'Add Employee'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeFormModal;