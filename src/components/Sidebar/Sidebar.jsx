// // src/components/Sidebar/Sidebar.js - Works 100
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Sidebar.css';
// import SidebarItem from './SidebarItem';
// import UserProfile from './UserProfile';

// const Sidebar = () => {
//   const navigate = useNavigate();
  
//   const menuSections = [
//     {
//       title: 'Main Menu',
//       items: [
//         { icon: 'fas fa-tachometer-alt', label: 'Dashboard', path: '/dashboard' },
//         { icon: 'fas fa-tasks', label: 'Tasks', path: '/tasks' },
//         { icon: 'fas fa-inbox', label: 'Inbox', path: '/inbox' },
//         { icon: 'fas fa-calendar-alt', label: 'Calendar', path: '/calendar' },
//         { icon: 'fas fa-project-diagram', label: 'Projects', path: '/projects' },
//       ],
//     },
//     {
//       title: 'HR Management',
//       items: [
//         { icon: 'fas fa-users', label: 'Employees', path: '/employees' },
//         { icon: 'fas fa-user-check', label: 'Attendance', path: '/attendance' },
//         { icon: 'fas fa-dollar-sign', label: 'Payroll', path: '/payroll' },
//         { icon: 'fas fa-briefcase', label: 'Hiring', path: '/hiring' },
//       ],
//     },
//     {
//       title: 'Analytics & Reports',
//       items: [
//         { icon: 'fas fa-chart-line', label: 'Manage Access', path: '/access' },
//         { icon: 'fas fa-cog', label: 'Settings', path: '/settings' },
//         { icon: 'fas fa-question-circle', label: 'Help & Support', path: '/help' },
//       ],
//     },
//   ];

//   const handleItemClick = (path) => {
//     navigate(path);
//   };

//   return (
//     <div className="sidebar w-64 bg-white shadow-md">
//       <div className="p-4 flex items-center">
//         <img
//           alt="Efficio Logo"
//           className="w-10 h-10 rounded-full"
//           src="https://storage.googleapis.com/a1aa/image/xD2Ko84yiCTpP_BuCLb1Ac2VUcGbV5L5ltrSaIhiLWk.jpg"
//         />
//         <span className="ml-2 text-xl font-semibold">Efficio</span>
//       </div>
//       <div className="p-4">
//         <UserProfile
//           name="Aditya Kashikar"
//           email="adityakashikar02@gmail.com"
//           avatar="https://storage.googleapis.com/a1aa/image/M_ndFiXb_v1UvWw1xBPEm68Oge9VVCbOhtoHGeH8y3E.jpg"
//         />
//         <nav>
//           {menuSections.map((section, index) => (
//             <div key={index} className="mb-4">
//               <h3 className="text-sm font-semibold text-gray-600 mb-2 text-center">
//                 {section.title}
//               </h3>
//               <ul>
//                 {section.items.map((item, itemIndex) => (
//                   <SidebarItem 
//                     key={itemIndex} 
//                     icon={item.icon} 
//                     label={item.label}
//                     onClick={() => handleItemClick(item.path)}
//                   />
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </nav>
//         <button className="flex items-center mt-4 text-gray-700 hover:bg-gray-200 p-2 rounded w-full text-left">
//           <i className="fas fa-sign-out-alt mr-2"></i>
//           Log Out
//         </button>
//         <div className="bg-gray-100 p-4 rounded-lg">
//           <p className="text-sm font-semibold">Basic Plan</p>
//           <p className="text-xs text-gray-500">Trial ends in 4 days</p>
//           <a className="text-blue-500 text-xs" href="/pricing">Basic plan on monthly billing</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import SidebarItem from './SidebarItem';
import UserProfile from './UserProfile';
import { useAuth } from '../../auth/AuthContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const menuSections = [
    {
      title: 'Main Menu',
      items: [
        { icon: 'fas fa-tachometer-alt', label: 'Dashboard', path: '/dashboard', access: 'dashboard' },
        { icon: 'fas fa-tasks', label: 'Tasks', path: '/tasks', access: 'tasks' },
        { icon: 'fas fa-inbox', label: 'Inbox', path: '/inbox', access: 'inbox' },
        { icon: 'fas fa-calendar-alt', label: 'Calendar', path: '/calendar', access: 'calendar' },
        { icon: 'fas fa-project-diagram', label: 'Projects', path: '/projects', access: 'projects' },
      ],
    },
    {
      title: 'HR Management',
      items: [
        { icon: 'fas fa-users', label: 'Employees', path: '/employees', access: 'employees' },
        { icon: 'fas fa-user-check', label: 'Attendance', path: '/attendance', access: 'attendance' },
        { icon: 'fas fa-dollar-sign', label: 'Payroll', path: '/payroll', access: 'payroll' },
        { icon: 'fas fa-briefcase', label: 'Hiring', path: '/hiring', access: 'hiring' },
      ],
    },
    ...(user?.role === 'admin' ? [{
      title: 'Admin',
      items: [
        { icon: 'fas fa-chart-line', label: 'Manage Access', path: '/access', access: 'access' },
      ],
    }] : []),
    {
      title: 'Other',
      items: [
        { icon: 'fas fa-cog', label: 'Settings', path: '/settings' },
        { icon: 'fas fa-question-circle', label: 'Help & Support', path: '/help' },
      ],
    },
  ];

  const handleItemClick = (path) => {
    navigate(path);
  };

  if (!user) return null;

  return (
    <div className="sidebar w-64 bg-white shadow-md">
      <div className="p-4 flex items-center">
        <img
          alt="Efficio Logo"
          className="w-10 h-10 rounded-full"
          src="https://storage.googleapis.com/a1aa/image/xD2Ko84yiCTpP_BuCLb1Ac2VUcGbV5L5ltrSaIhiLWk.jpg"
        />
        <span className="ml-2 text-xl font-semibold">Efficio</span>
      </div>
      <div className="p-4">
        <UserProfile
          name={user.name}
          email={user.email}
          avatar={user.avatar}
        />
        <nav>
          {menuSections.map((section, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-sm font-semibold text-gray-600 mb-2 text-center">
                {section.title}
              </h3>
              <ul>
                {section.items.map((item, itemIndex) => {
                  // Check if user has access to this item
                  if (item.access && !user.access.includes(item.access)) return null;
                  return (
                    <SidebarItem 
                      key={itemIndex} 
                      icon={item.icon} 
                      label={item.label}
                      onClick={() => handleItemClick(item.path)}
                    />
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
        <button 
          onClick={logout}
          className="flex items-center mt-4 text-gray-700 hover:bg-gray-200 p-2 rounded w-full text-left"
        >
          <i className="fas fa-sign-out-alt mr-2"></i>
          Log Out
        </button>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm font-semibold">Basic Plan</p>
          <p className="text-xs text-gray-500">Trial ends in 4 days</p>
          <a className="text-blue-500 text-xs" href="/pricing">Basic plan on monthly billing</a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;