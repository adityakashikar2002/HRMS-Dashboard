// // import React from 'react';
// // import './Sidebar.css';
// // import SidebarItem from './SidebarItem';
// // import UserProfile from './UserProfile';

// // const Sidebar = () => {
// //   const menuItems = [
// //     { icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
// //     { icon: 'fas fa-tasks', label: 'Tasks' },
// //     { icon: 'fas fa-inbox', label: 'Inbox' },
// //     { icon: 'fas fa-calendar-alt', label: 'Calendar' },
// //     { icon: 'fas fa-project-diagram', label: 'Projects' },
// //     { icon: 'fas fa-users', label: 'Employees' },
// //     { icon: 'fas fa-user-check', label: 'Attendance' },
// //     { icon: 'fas fa-dollar-sign', label: 'Payroll' },
// //     { icon: 'fas fa-briefcase', label: 'Hiring' },
// //     { icon: 'fas fa-chart-line', label: 'Analytics & Reports' },
// //     { icon: 'fas fa-cog', label: 'Settings' },
// //     { icon: 'fas fa-question-circle', label: 'Help & Support' },
// //   ];

// //   return (
// //     <div className="sidebar w-64 bg-white shadow-md">
// //       <div className="p-4 flex items-center">
// //         <img 
// //           alt="Efficio Logo" 
// //           className="w-10 h-10 rounded-full" 
// //           src="https://storage.googleapis.com/a1aa/image/xD2Ko84yiCTpP_BuCLb1Ac2VUcGbV5L5ltrSaIhiLWk.jpg" 
// //         />
// //         <span className="ml-2 text-xl font-semibold">Efficio</span>
// //       </div>
// //       <div className="p-4">
// //         <UserProfile 
// //           name="Arnold Smith" 
// //           email="arnoldsmith@gmail.com" 
// //           avatar="https://storage.googleapis.com/a1aa/image/M_ndFiXb_v1UvWw1xBPEm68Oge9VVCbOhtoHGeH8y3E.jpg" 
// //         />
// //         <nav>
// //           <ul>
// //             {menuItems.map((item, index) => (
// //               <SidebarItem key={index} icon={item.icon} label={item.label} />
// //             ))}
// //           </ul>
// //         </nav>
// //       </div>
// //       <div className="p-4">
// //         <div className="bg-gray-100 p-4 rounded-lg">
// //           <p className="text-sm font-semibold">Basic Plan</p>
// //           <p className="text-xs text-gray-500">Trial ends in 4 days</p>
// //           {/* <a className="text-blue-500 text-xs" href="#">Basic plan on monthly billing</a> */}
// //           <a className="text-blue-500 text-xs" href="/pricing">Basic plan on monthly billing</a>
// //         </div>
// //         {/* <a className="flex items-center mt-4 text-gray-700 hover:bg-gray-200 p-2 rounded" href="#">
// //           <i className="fas fa-sign-out-alt mr-2"></i>
// //           Log Out
// //         </a> */}
// //         <button className="flex items-center mt-4 text-gray-700 hover:bg-gray-200 p-2 rounded w-full text-left">
// //           <i className="fas fa-sign-out-alt mr-2"></i>
// //           Log Out
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Sidebar;

// import React from 'react';
// import './Sidebar.css';
// import SidebarItem from './SidebarItem';
// import UserProfile from './UserProfile';

// const Sidebar = () => {
//   const menuSections = [
//     {
//       title: 'Main Menu',
//       items: [
//         { icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
//         { icon: 'fas fa-tasks', label: 'Tasks' },
//         { icon: 'fas fa-inbox', label: 'Inbox' },
//         { icon: 'fas fa-calendar-alt', label: 'Calendar' },
//         { icon: 'fas fa-project-diagram', label: 'Projects' },
//       ],
//     },
//     {
//       title: 'HR Management',
//       items: [
//         { icon: 'fas fa-users', label: 'Employees' },
//         { icon: 'fas fa-user-check', label: 'Attendance' },
//         { icon: 'fas fa-dollar-sign', label: 'Payroll' },
//         { icon: 'fas fa-briefcase', label: 'Hiring' },
//       ],
//     },
//     {
//       title: 'Analytics & Reports',
//       items: [
//         { icon: 'fas fa-chart-line', label: 'Analytics & Reports' },
//         { icon: 'fas fa-cog', label: 'Settings' },
//         { icon: 'fas fa-question-circle', label: 'Help & Support' },
//       ],
//     },
//   ];

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
//                   <SidebarItem key={itemIndex} icon={item.icon} label={item.label} />
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </nav>
//       {/* </div>
//       <div className="p-4"> */}
//       <button className="flex items-center mt-4 text-gray-700 hover:bg-gray-200 p-2 rounded w-full text-left">
//           <i className="fas fa-sign-out-alt mr-2"></i>
//           Log Out
//       </button>

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
// src/components/Sidebar/Sidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import SidebarItem from './SidebarItem';
import UserProfile from './UserProfile';

const Sidebar = () => {
  const navigate = useNavigate();
  
  const menuSections = [
    {
      title: 'Main Menu',
      items: [
        { icon: 'fas fa-tachometer-alt', label: 'Dashboard', path: '/dashboard' },
        { icon: 'fas fa-tasks', label: 'Tasks', path: '/tasks' },
        { icon: 'fas fa-inbox', label: 'Inbox', path: '/inbox' },
        { icon: 'fas fa-calendar-alt', label: 'Calendar', path: '/calendar' },
        { icon: 'fas fa-project-diagram', label: 'Projects', path: '/projects' },
      ],
    },
    {
      title: 'HR Management',
      items: [
        { icon: 'fas fa-users', label: 'Employees', path: '/employees' },
        { icon: 'fas fa-user-check', label: 'Attendance', path: '/attendance' },
        { icon: 'fas fa-dollar-sign', label: 'Payroll', path: '/payroll' },
        { icon: 'fas fa-briefcase', label: 'Hiring', path: '/hiring' },
      ],
    },
    {
      title: 'Analytics & Reports',
      items: [
        { icon: 'fas fa-chart-line', label: 'Analytics', path: '/analytics' },
        { icon: 'fas fa-cog', label: 'Settings', path: '/settings' },
        { icon: 'fas fa-question-circle', label: 'Help & Support', path: '/help' },
      ],
    },
  ];

  const handleItemClick = (path) => {
    navigate(path);
  };

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
          name="Aditya Kashikar"
          email="adityakashikar02@gmail.com"
          avatar="https://storage.googleapis.com/a1aa/image/M_ndFiXb_v1UvWw1xBPEm68Oge9VVCbOhtoHGeH8y3E.jpg"
        />
        <nav>
          {menuSections.map((section, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-sm font-semibold text-gray-600 mb-2 text-center">
                {section.title}
              </h3>
              <ul>
                {section.items.map((item, itemIndex) => (
                  <SidebarItem 
                    key={itemIndex} 
                    icon={item.icon} 
                    label={item.label}
                    onClick={() => handleItemClick(item.path)}
                  />
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <button className="flex items-center mt-4 text-gray-700 hover:bg-gray-200 p-2 rounded w-full text-left">
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