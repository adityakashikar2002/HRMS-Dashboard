// import React from 'react';

// const SidebarItem = ({ icon, label }) => {
//   return (
//     <li className="mb-2">
//       <a className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded" href="#">
//         <i className={`${icon} mr-2`}></i>
//         {label}
//       </a>
//     </li>
//   );
// };

// export default SidebarItem;
// import React from 'react';

// const SidebarItem = ({ icon, label }) => {
//   return (
//     <li className="mb-2">
//       <button className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded w-full text-left">
//         <i className={`${icon} mr-2`}></i>
//         {label}
//       </button>
//     </li>
//   );
// };

// export default SidebarItem;
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