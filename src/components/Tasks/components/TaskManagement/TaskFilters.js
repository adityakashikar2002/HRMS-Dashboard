import React from 'react';

const TaskFilters = ({ filters, setFilters }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Tasks</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            type="text"
            id="search"
            placeholder="Search tasks..."
            value={filters.searchQuery}
            onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="assignee" className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
          <input
            type="text"
            id="assignee"
            placeholder="Filter by assignee"
            value={filters.assignee}
            onChange={(e) => setFilters({...filters, assignee: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            id="priority"
            value={filters.priority}
            onChange={(e) => setFilters({...filters, priority: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-end mt-4">
        <button
          onClick={() => setFilters({
            assignee: '',
            priority: '',
            searchQuery: ''
          })}
          className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default TaskFilters;