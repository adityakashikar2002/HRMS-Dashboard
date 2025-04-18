// src/components/Header.jsx
import React from 'react';

const Header = ({ onSearch }) => {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
      <h1 className="text-gray-900 text-lg font-normal mb-3 sm:mb-0">Indian Payroll Management</h1>
      <form 
        className="flex items-center w-full sm:w-auto border border-gray-300 rounded-md px-3 py-1.5 text-gray-400 text-sm focus-within:text-gray-600 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600"
        onSubmit={(e) => {
          e.preventDefault();
          const searchTerm = e.target.elements.search.value;
          onSearch(searchTerm);
        }}
      >
        <input 
          name="search"
          className="outline-none bg-transparent w-full sm:w-48 text-sm" 
          placeholder="Search employee or ID..." 
          type="search"
        />
        <button type="submit" className="ml-2 text-gray-400 hover:text-gray-600">
          <i className="fas fa-search"></i>
        </button>
      </form>
      <div className="flex items-center space-x-3 mt-3 sm:mt-0">
        <button className="p-2 rounded-md hover:bg-gray-100 text-gray-600 border border-gray-200" type="button">
          <i className="far fa-envelope"></i>
        </button>
        <button className="p-2 rounded-md hover:bg-gray-100 text-gray-600 border border-gray-200" type="button">
          <i className="fas fa-file-export"></i>
        </button>
        <div className="flex -space-x-2">
          <img 
            alt="Profile avatar" 
            className="w-8 h-8 rounded-full border-2 border-white" 
            src="https://randomuser.me/api/portraits/men/32.jpg" 
          />
          <img 
            alt="Profile avatar" 
            className="w-8 h-8 rounded-full border-2 border-white" 
            src="https://randomuser.me/api/portraits/women/44.jpg" 
          />
          <img 
            alt="Profile avatar" 
            className="w-8 h-8 rounded-full border-2 border-white" 
            src="https://randomuser.me/api/portraits/men/75.jpg" 
          />
          <span className="w-8 h-8 rounded-full border-2 border-white bg-gray-300 text-xs font-semibold text-gray-600 flex items-center justify-center">
            +5
          </span>
        </div>
        <button className="flex items-center space-x-1 border border-gray-300 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-50" type="button">
          <i className="fas fa-user-plus"></i>
          <span>Add Staff</span>
        </button>
      </div>
    </header>
  );
};

export default Header;