
// src/components/Sidebar/SidebarItem.js
import React from 'react';

const SidebarItem = ({ icon, label, onClick }) => {
  return (
    <li 
      className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-100 rounded cursor-pointer transition-colors"
      onClick={onClick}
    >
      <i className={`${icon} mr-3 text-gray-500`}></i>
      <span>{label}</span>
    </li>
  );
};

export default SidebarItem;