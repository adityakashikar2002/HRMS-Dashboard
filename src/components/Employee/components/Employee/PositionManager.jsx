import { useState } from 'react';
import { Button, Modal } from '../UI';

const PositionManager = ({ positions, onAddPosition, onUpdatePosition, onDeletePosition, onClose }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [positionData, setPositionData] = useState({
    title: '',
    department: '',
    level: '',
    description: ''
  });

  const departments = [
    'Executive', 'Technology', 'Finance', 'Engineering', 
    'Product', 'Design', 'Marketing', 'Sales', 
    'Human Resources', 'Operations', 'Other'
  ];

  const levels = [
    'C-Level', 'Director', 'Senior', 'Mid', 
    'Junior', 'Entry', 'Intern', 'Other'
  ];

  const handleEditPosition = (position) => {
    setIsEditing(position.id);
    setPositionData(position);
  };

  const handleSavePosition = () => {
    if (isEditing) {
      onUpdatePosition(positionData);
    } else {
      onAddPosition({
        id: `pos-${Date.now()}`,
        ...positionData
      });
    }
    setIsEditing(null);
    setIsAdding(false);
    setPositionData({
      title: '',
      department: '',
      level: '',
      description: ''
    });
  };

  const handleDeletePosition = (id) => {
    if (window.confirm('Are you sure you want to delete this position?')) {
      onDeletePosition(id);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPositionData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Modal onClose={onClose} title="Manage Positions" size="lg">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {positions.map(position => (
            <div key={position.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow relative">
              {isEditing !== position.id ? (
                <>
                  <h3 className="font-semibold text-gray-800">{position.title}</h3>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {position.department}
                    </span>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                      {position.level}
                    </span>
                  </div>
                  {position.description && (
                    <p className="text-sm text-gray-600 mt-2">{position.description}</p>
                  )}
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button 
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditPosition(position)}
                      icon="edit"
                    />
                    <Button 
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeletePosition(position.id)}
                      icon="trash"
                      className="text-red-500 hover:text-red-700"
                    />
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                      <input
                        type="text"
                        name="title"
                        value={positionData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        required
                        autoFocus
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <select
                        name="department"
                        value={positionData.department}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                      <select
                        name="level"
                        value={positionData.level}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="">Select Level</option>
                        {levels.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={positionData.description}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      rows="2"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline"
                      onClick={() => setIsEditing(null)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant="primary"
                      onClick={handleSavePosition}
                      disabled={!positionData.title.trim()}
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {isAdding ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                <input
                  type="text"
                  name="title"
                  value={positionData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  name="department"
                  value={positionData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                <select
                  name="level"
                  value={positionData.level}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Level</option>
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={positionData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                rows="2"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline"
                onClick={() => setIsAdding(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="primary"
                onClick={handleSavePosition}
                disabled={!positionData.title.trim()}
              >
                Add Position
              </Button>
            </div>
          </div>
        ) : (
          <Button 
            variant="primary"
            onClick={() => setIsAdding(true)}
            icon="plus"
          >
            Add New Position
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default PositionManager;