import React from 'react';

const LabelSelector = ({ selectedLabel, onSelect }) => {
  const labels = [
    { name: 'Business', color: 'bg-purple-500' },
    { name: 'Management', color: 'bg-red-500' },
    { name: 'Team', color: 'bg-teal-500' },
    { name: 'Mail', color: 'bg-yellow-500' }
  ];

  return (
    <div className="flex space-x-2">
      {labels.map(label => (
        <button
          key={label.name}
          type="button"
          onClick={() => onSelect(label.name)}
          className={`flex items-center px-2 py-1 rounded-full text-xs text-black ${selectedLabel === label.name ? 'bg-opacity-100' : 'bg-opacity-20'} ${label.color}`}
        >
          <span className={`w-2 h-2 rounded-full mr-1 ${label.color}`}></span>
          {label.name}
        </button>
      ))}
    </div>
  );
};

export default LabelSelector;