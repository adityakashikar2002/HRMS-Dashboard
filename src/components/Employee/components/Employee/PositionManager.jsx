import { useState } from 'react';
import { Button, Modal } from '../UI';

const PositionManager = ({ positions, onAddPosition, onClose }) => {
  const [newPosition, setNewPosition] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddNewPosition = () => {
    if (newPosition.trim()) {
      onAddPosition({
        id: `pos-${Date.now()}`,
        title: newPosition.trim(),
        department: 'Custom',
        level: 'Other'
      });
      setNewPosition('');
      setIsAdding(false);
    }
  };

  return (
    <Modal onClose={onClose} title="Manage Positions" size="lg">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {positions.map(position => (
            <div 
              key={position.id} 
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-800">{position.title}</h3>
              <p className="text-sm text-gray-600">{position.department}</p>
              <span className="inline-block mt-2 px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                {position.level}
              </span>
            </div>
          ))}
        </div>

        {isAdding ? (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newPosition}
              onChange={(e) => setNewPosition(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter new position title"
              autoFocus
            />
            <Button 
              variant="success"
              onClick={handleAddNewPosition}
              disabled={!newPosition.trim()}
            >
              Add
            </Button>
            <Button 
              variant="outline"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </Button>
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