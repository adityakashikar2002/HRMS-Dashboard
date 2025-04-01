// import React from 'react';

// const TaskBoard = () => {
//   const tasks = {
//     newRequest: {
//       title: "New Request",
//       color: "blue-500",
//       items: [
//         {
//           category: "Recruitment",
//           categoryColor: "blue-500",
//           status: "Compliance",
//           statusColor: "green-500",
//           title: "Employee Onboarding Approval",
//           description: "A new onboarding request has been submitted for Jane Smith (Marketing Department). HR needs to verify the required documents, approve the onboarding process, and schedule an introduction meeting with the team."
//         }
//       ]
//     },
//     inProgress: {
//       title: "In Progress",
//       color: "yellow-500",
//       items: [
//         {
//           category: "Finance",
//           categoryColor: "pink-500",
//           status: "Compensation",
//           statusColor: "red-500",
//           title: "Payroll Processing",
//           description: "HR and the finance team are calculating salaries, bonuses, deductions, and overtime pay. Any discrepancies need to be resolved before the final payroll submission on March 10."
//         }
//       ]
//     },
//     complete: {
//       title: "Complete",
//       color: "green-500",
//       items: [
//         {
//           category: "Feedback",
//           categoryColor: "pink-500",
//           status: "Engagement",
//           statusColor: "purple-500",
//           title: "Employee Satisfaction Survey",
//           description: "The HR team has gathered feedback from all departments and is now analyzing the results to identify key areas for improvement."
//         }
//       ]
//     }
//   };

//   return (
//     <div className="bg-white p-4 rounded-lg shadow">
//       <div className="flex justify-between items-center mb-4">
//         <p className="text-gray-500">Task</p>
//         <div className="flex items-center">
//           <button className="p-2 bg-gray-200 text-gray-700 rounded-lg">
//             <i className="fas fa-th-large"></i> Kanban
//           </button>
//           <button className="ml-2 p-2 bg-gray-200 text-gray-700 rounded-lg">
//             <i className="fas fa-table"></i> Table
//           </button>
//           <button className="ml-2 p-2 bg-gray-200 text-gray-700 rounded-lg">
//             <i className="fas fa-list"></i> List View
//           </button>
//         </div>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {Object.entries(tasks).map(([key, column]) => (
//           <div key={key} className="bg-gray-100 p-4 rounded-lg">
//             <div className="flex justify-between items-center mb-2">
//               <p className={`text-${column.color}`}>{column.title}</p>
//               <i className="fas fa-plus text-gray-500"></i>
//             </div>
//             {column.items.map((item, index) => (
//               <div key={index} className="bg-white p-4 rounded-lg shadow mb-4">
//                 <div className="flex justify-between items-center mb-2">
//                   <p className={`text-${item.categoryColor}`}>{item.category}</p>
//                   <p className={`text-${item.statusColor}`}>{item.status}</p>
//                 </div>
//                 <p className="text-gray-500">{item.title}</p>
//                 <p className="text-sm text-gray-500">{item.description}</p>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TaskBoard;

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faInfoCircle, faEllipsisH, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
// import React from 'react';

// const TaskBoard = () => {
//   const tasks = {
//     'New Request': [
//       {
//         id: 1,
//         title: 'Employee Onboarding Approval',
//         tags: ['Recruitment', 'Compliance'],
//         description: 'A new onboarding request has been submitted for Jane Smith (Marketing Department). HR needs to verify the required documents, approve the onboarding process, and schedule an introduction meeting with the team.',
//         people: ['person1.jpg', 'person2.jpg'], // Replace with actual image paths
//       },
//       // ... more tasks
//     ],
//     'In Progress': [
//       {
//         id: 2,
//         title: 'Payroll Processing',
//         tags: ['Finance', 'Compensation'],
//         description: 'HR and the finance team are calculating salaries, bonuses, tax deductions, and overtime pay. Any discrepancies need to be resolved before the final payroll submission on March 10.',
//         people: ['person3.jpg', 'person4.jpg', 'person5.jpg'], // Replace with actual image paths
//       },
//       // ... more tasks
//     ],
//     'Complete': [
//       {
//         id: 3,
//         title: 'Employee Satisfaction Survey',
//         tags: ['Feedback', 'Engagement'],
//         description: 'The HR team has gathered feedback from all departments and is now analyzing the results to identify key areas for improvement.',
//         people: ['person6.jpg', 'person7.jpg', 'person8.jpg', 'person9.jpg'], // Replace with actual image paths
//       },
//       // ... more tasks
//     ],
//   };

//   return (
//     <div className="bg-white p-4 rounded-lg shadow mb-6">
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex items-center">
//           <p className="text-gray-700 font-semibold m-2">Task</p>
//           {/* <span className="bg-gray-200 rounded-full px-2 py-1 text-xs text-gray-600">i</span> */}
//           <button className="text-gray-500">
//             <FontAwesomeIcon icon={faInfoCircle} />
//           </button>
//         </div>
//         <div className="flex items-center">
//           <input className="p-2 border border-gray-300 rounded-lg mr-2" type="date" />
//           <button className="p-2 bg-gray-200 text-gray-700 rounded-lg">
//             <i className="fas fa-filter"></i> Filter
//           </button>
//         </div>
//       </div>
//       <div className="flex mb-4">
//         {/* <button className="bg-gray-200 text-gray-700 rounded-lg px-4 py-2 mr-2">Kanban</button>
//         <button className="text-gray-700">Table</button>
//         <button className="text-gray-700 ml-2">List View</button> */}
//         <button className="p-2 bg-gray-200 text-gray-700 rounded-lg">
//           <i className="fas fa-th-large"></i> Kanban
//         </button>
//         <button className="ml-2 p-2 bg-gray-200 text-gray-700 rounded-lg">
//           <i className="fas fa-table"></i> Table
//         </button>
//         <button className="ml-2 p-2 bg-gray-200 text-gray-700 rounded-lg">
//           <i className="fas fa-list"></i> List View
//         </button>
//       </div>
//       <div className="flex">
//         {Object.entries(tasks).map(([status, taskList]) => (
//           <div key={status} className="w-1/3 pr-4">
//             <div className="flex items-center mb-2">
//               <span className="bg-green-500 rounded-full w-2 h-2 mr-2"></span> 
//               <p className="text-sm font-semibold">{status}</p>
//               {/* <span className="bg-gray-200 rounded-full px-2 py-1 text-xs text-gray-600 ml-2">{taskList.length}</span> */}
//               <span className="bg-gray-200 rounded-full px-2 py-1 text-xs text-gray-600 ml-2">{taskList.length}</span>
//               <button className="ml-auto text-gray-500">...</button>
//             </div>
//             <div className="border border-gray-300 rounded-lg p-4">
//               <button className="bg-gray-200 w-full text-gray-600 rounded-lg py-2 mb-4">+</button>
//               {taskList.map((task) => (
//                 <div key={task.id} className="bg-white rounded-lg p-4 mb-4 shadow">
//                   <div className="flex flex-wrap mb-2">
//                     {task.tags.map((tag, index) => {
//                       const tagColors = ['bg-blue-200 text-blue-800', 'bg-green-200 text-green-800', 'bg-pink-200 text-pink-800', 'bg-purple-200 text-purple-800'];
//                       return (
//                         <span key={index} className={`${tagColors[index % tagColors.length]} rounded-full px-2 py-1 text-xs mr-1 mb-1`}>{tag}</span>
//                       );
//                     })}
//                     <button className="ml-auto text-gray-500">...</button>
//                   </div>
//                   <p className="font-semibold mb-2">{task.title}</p>
//                   <p className="text-sm text-gray-600 mb-4">{task.description}</p>
//                   <div className="flex items-center">
//                     {task.people.map((person, index) => (
//                       <img key={index} src={person} alt="Person" className="rounded-full w-6 h-6 mr-1" />
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TaskBoard;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faEllipsisH, faFilter, faPlus, faThLarge, faTable, faList } from '@fortawesome/free-solid-svg-icons';

const TaskBoard = () => {
  const tasks = {
    'New Request': {
      count: 3,
      color: 'text-blue-500',
      items: [
        {
          id: 1,
          title: 'Employee Onboarding Approval',
          tags: [
            { text: 'Recruitment', color: 'bg-blue-500' },
            { text: 'Compliance', color: 'bg-green-500' }
          ],
          description: 'A new onboarding request has been submitted for Jane Smith (Marketing Department). HR needs to verify the required documents, approve the onboarding process, and schedule an introduction meeting with the team.'
        }
      ]
    },
    'In Progress': {
      count: 6,
      color: 'text-yellow-500',
      items: [
        {
          id: 2,
          title: 'Payroll Processing',
          tags: [
            { text: 'Finance', color: 'bg-pink-500' },
            { text: 'Compensation', color: 'bg-orange-500' }
          ],
          description: 'HR and the finance team are calculating salaries, bonuses, tax deductions, and overtime pay. Any discrepancies need to be resolved before the final payroll submission on March 10.'
        }
      ]
    },
    'Complete': {
      count: 12,
      color: 'text-green-500',
      items: [
        {
          id: 3,
          title: 'Employee Satisfaction Survey',
          tags: [
            { text: 'Feedback', color: 'bg-purple-500' },
            { text: 'Engagement', color: 'bg-blue-500' }
          ],
          description: 'The HR team has gathered feedback from all departments and is now analyzing the results to identify key areas for improvement.'
        }
      ]
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="max-w-12xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold">Task</h1>
            <FontAwesomeIcon icon={faInfoCircle} className="text-gray-500" />
          </div>
          <div className="flex items-center space-x-4">
            <input type="date" className="px-4 py-2 border rounded-full" defaultValue="2025-03-01" />
            <button className="px-4 py-2 bg-gray-200 rounded-full flex items-center space-x-2">
              <FontAwesomeIcon icon={faFilter} />
              <span>Filter</span>
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <button className="px-4 py-2 bg-gray-200 rounded-full flex items-center space-x-2">
            <FontAwesomeIcon icon={faThLarge} />
            <span>Kanban</span>
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-full flex items-center space-x-2">
            <FontAwesomeIcon icon={faTable} />
            <span>Table</span>
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-full flex items-center space-x-2">
            <FontAwesomeIcon icon={faList} />
            <span>List View</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(tasks).map(([status, { count, color, items }]) => (
            <div key={status} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <span className={`${color} text-2xl`}>•</span>
                  <h2 className="text-lg font-semibold">{status}</h2>
                  <span className="text-gray-500">{count}</span>
                </div>
                <FontAwesomeIcon icon={faEllipsisH} className="text-gray-500" />
              </div>
              <div className="bg-gray-100 rounded-lg p-4 mb-4 text-center">
                <button className="text-gray-500">
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow p-4 mb-4">
                  <div className="flex space-x-2 mb-2">
                    {item.tags.map((tag, index) => (
                      <span key={index} className={`${tag.color} text-white px-2 py-1 rounded-full text-xs`}>
                        {tag.text}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;