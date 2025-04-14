import { useState } from 'react';
import { Modal, Button } from '../UI';

const DepartmentManager = ({ 
  departments = [], 
  employees = [],
  onAddDepartment,
  onUpdateDepartment,
  onDeleteDepartment,
  onClose 
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  
  const [departmentData, setDepartmentData] = useState({
    name: '',
    description: '',
    head: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      position: 'Department Head'
    },
    positions: [
      {
        title: 'Department Head',
        level: 'Manager',
        description: 'Head of the department'
      }
    ]
  });

  const levels = ['C-Level', 'Director', 'Manager', 'Senior', 'Mid', 'Junior', 'Entry', 'Intern'];

  const handleEditDepartment = (department) => {
    setIsEditing(department.id);
    setDepartmentData(department);
  };

  const handleSaveDepartment = () => {
    const departmentToSave = {
      ...departmentData,
      id: isEditing || `dep-${Date.now()}`
    };

    if (isEditing) {
      onUpdateDepartment(departmentToSave);
    } else {
      onAddDepartment(departmentToSave);
    }
    resetForm();
  };

  const resetForm = () => {
    setIsEditing(null);
    setIsAdding(false);
    setDepartmentData({
      name: '',
      description: '',
      head: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: 'Department Head',
        salary: '',
      },
      positions: [
        {
          title: 'Department Head',
          level: 'Manager',
          description: 'Head of the department'
        }
      ]
    });
  };

  const handleDeleteDepartment = (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      onDeleteDepartment(id);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartmentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleHeadChange = (e) => {
    const { name, value } = e.target;
    setDepartmentData(prev => ({
      ...prev,
      head: {
        ...prev.head,
        [name]: value
      }
    }));
  };

  const handlePositionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPositions = [...departmentData.positions];
    updatedPositions[index] = {
      ...updatedPositions[index],
      [name]: value
    };
    setDepartmentData(prev => ({
      ...prev,
      positions: updatedPositions
    }));
  };

  const addPosition = () => {
    setDepartmentData(prev => ({
      ...prev,
      positions: [
        ...prev.positions,
        {
          title: '',
          level: 'Mid',
          description: ''
        }
      ]
    }));
  };

  const removePosition = (index) => {
    const updatedPositions = [...departmentData.positions];
    updatedPositions.splice(index, 1);
    setDepartmentData(prev => ({
      ...prev,
      positions: updatedPositions
    }));
  };

  return (
    <Modal onClose={onClose} title="Manage Departments" size="lg">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {departments.map(dept => (
            <div key={dept.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow relative">
              {isEditing !== dept.id ? (
                <>
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-800">{dept.name}</h3>
                  </div>
                  
                  {dept.description && (
                    <p className="text-sm text-gray-600 mt-2">{dept.description}</p>
                  )}
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Department Head</h4>
                    <p className="text-gray-800">
                      {dept.head.firstName} {dept.head.lastName} - {dept.head.position}
                    </p>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Positions</h4>
                    <div className="flex flex-wrap gap-1">
                      {dept.positions.map((pos, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600">
                          {pos.title} ({pos.level})
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button 
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditDepartment(dept)}
                      icon="edit"
                    />
                    <Button 
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteDepartment(dept.id)}
                      icon="trash"
                      className="text-red-500 hover:text-red-700"
                    />
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={departmentData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      required
                      autoFocus
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={departmentData.description}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      rows="2"
                    />
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Department Head</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                        <input
                          type="text"
                          name="firstName"
                          value={departmentData.head.firstName}
                          onChange={handleHeadChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                        <input
                          type="text"
                          name="lastName"
                          value={departmentData.head.lastName}
                          onChange={handleHeadChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                        <input
                          type="email"
                          name="email"
                          value={departmentData.head.email}
                          onChange={handleHeadChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
                        <input
                          type="tel"
                          name="phone"
                          value={departmentData.head.phone}
                          onChange={handleHeadChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-sm font-medium text-gray-700">Department Positions</h4>
                      <Button 
                        size="sm"
                        onClick={addPosition}
                        icon="plus"
                      >
                        Add Position
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {departmentData.positions.map((pos, idx) => (
                        <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-gray-50 rounded-lg">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Title*</label>
                            <input
                              type="text"
                              name="title"
                              value={pos.title}
                              onChange={(e) => handlePositionChange(idx, e)}
                              className="w-full px-3 py-1 border border-gray-300 rounded-lg text-sm"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Level*</label>
                            <select
                              name="level"
                              value={pos.level}
                              onChange={(e) => handlePositionChange(idx, e)}
                              className="w-full px-3 py-1 border border-gray-300 rounded-lg text-sm"
                              required
                            >
                              {levels.map(level => (
                                <option key={level} value={level}>{level}</option>
                              ))}
                            </select>
                          </div>
                          <div className="flex items-end">
                            <Button 
                              variant="danger"
                              size="sm"
                              onClick={() => removePosition(idx)}
                              icon="trash"
                              className="ml-auto"
                            />
                          </div>
                          <div className="md:col-span-3">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                              name="description"
                              value={pos.description}
                              onChange={(e) => handlePositionChange(idx, e)}
                              className="w-full px-3 py-1 border border-gray-300 rounded-lg text-sm"
                              rows="2"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button 
                      variant="outline"
                      onClick={resetForm}
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant="primary"
                      onClick={handleSaveDepartment}
                      disabled={!departmentData.name.trim() || 
                        !departmentData.head.firstName || 
                        !departmentData.head.lastName ||
                        departmentData.positions.some(p => !p.title.trim())}
                    >
                      {isEditing ? 'Save Changes' : 'Create Department'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {isAdding ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department Name*</label>
              <input
                type="text"
                name="name"
                value={departmentData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
                autoFocus
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={departmentData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                rows="2"
              />
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Department Head</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                  <input
                    type="text"
                    name="firstName"
                    value={departmentData.head.firstName}
                    onChange={handleHeadChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                  <input
                    type="text"
                    name="lastName"
                    value={departmentData.head.lastName}
                    onChange={handleHeadChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                  <input
                    type="email"
                    name="email"
                    value={departmentData.head.email}
                    onChange={handleHeadChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
                  <input
                    type="tel"
                    name="phone"
                    value={departmentData.head.phone}
                    onChange={handleHeadChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-medium text-gray-700">Department Positions</h4>
                <Button 
                  size="sm"
                  onClick={addPosition}
                  icon="plus"
                >
                  Add Position
                </Button>
              </div>
              
              <div className="space-y-4">
                {departmentData.positions.map((pos, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-gray-50 rounded-lg">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Title*</label>
                      <input
                        type="text"
                        name="title"
                        value={pos.title}
                        onChange={(e) => handlePositionChange(idx, e)}
                        className="w-full px-3 py-1 border border-gray-300 rounded-lg text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Level*</label>
                      <select
                        name="level"
                        value={pos.level}
                        onChange={(e) => handlePositionChange(idx, e)}
                        className="w-full px-3 py-1 border border-gray-300 rounded-lg text-sm"
                        required
                      >
                        {levels.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-end">
                      <Button 
                        variant="danger"
                        size="sm"
                        onClick={() => removePosition(idx)}
                        icon="trash"
                        className="ml-auto"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        name="description"
                        value={pos.description}
                        onChange={(e) => handlePositionChange(idx, e)}
                        className="w-full px-3 py-1 border border-gray-300 rounded-lg text-sm"
                        rows="2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                variant="outline"
                onClick={resetForm}
              >
                Cancel
              </Button>
              <Button 
                variant="primary"
                onClick={handleSaveDepartment}
                disabled={!departmentData.name.trim() || 
                  !departmentData.head.firstName || 
                  !departmentData.head.lastName ||
                  departmentData.positions.some(p => !p.title.trim())}
              >
                Create Department
              </Button>
            </div>
          </div>
        ) : (
          <Button 
            variant="primary"
            onClick={() => setIsAdding(true)}
            icon="plus"
          >
            Add New Department
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default DepartmentManager;