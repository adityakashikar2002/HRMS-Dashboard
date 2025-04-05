// import React from 'react';
// import { motion } from 'framer-motion';
// import { formatDistanceToNow } from 'date-fns';

// const TaskCard = ({ task, status, onClick, onChangeStatus }) => {
//   const deadline = new Date(`${task.deadlineDate}T${task.deadlineTime}`);
//   const now = new Date();
//   const isOverdue = now > deadline && status !== 'completed';
  
//   const statusClasses = {
//     todo: 'border-l-4 border-red-500 bg-red-50',
//     inProgress: 'border-l-4 border-yellow-500 bg-yellow-50',
//     completed: 'border-l-4 border-green-500 bg-green-50',
//     overdue: 'border-l-4 border-red-700 bg-red-100'
//   };

//   const statusColors = {
//     todo: 'bg-red-500',
//     inProgress: 'bg-yellow-500',
//     completed: 'bg-green-500',
//     overdue: 'bg-red-700'
//   };

//   const priorityColors = {
//     high: 'bg-red-500',
//     medium: 'bg-yellow-500',
//     low: 'bg-green-500'
//   };

//   const currentStatus = isOverdue ? 'overdue' : status;

//   return (
//     <motion.div 
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//       className={`task-card mb-3 p-4 rounded-lg shadow-sm cursor-pointer ${statusClasses[currentStatus]}`}
//       onClick={onClick}
//     >
//       <div className="flex items-start">
//         <div className={`w-2 h-2 rounded-full mt-1.5 mr-2 flex-shrink-0 ${statusColors[currentStatus]}`}></div>
//         <div className="flex-1">
//           <div className="flex justify-between items-start mb-2">
//             <div>
//               <h4 className={`font-semibold ${isOverdue ? 'text-red-700' : `text-${status}-500`}`}>
//                 {task.title}
//               </h4>
//               <div className="flex items-center mt-1 space-x-2">
//                 <span className={`inline-block w-2 h-2 rounded-full ${priorityColors[task.priority]}`}></span>
//                 <span className="text-xs text-gray-500">
//                   {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
//                 </span>
//               </div>
//             </div>
//             {isOverdue && (
//               <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
//                 OVERDUE
//               </span>
//             )}
//           </div>
          
//           <p className="task-description text-sm text-gray-600 mb-3 line-clamp-2">
//             {task.description}
//           </p>
          
//           <div className="flex justify-between items-center">
//             <div className="text-xs text-gray-500">
//               <span className="font-medium">Due:</span> {task.deadlineDate} at {task.deadlineTime}
//             </div>
            
//             <div className="flex space-x-2">
//               {status === 'todo' && (
//                 <button 
//                   className={`px-3 py-1 text-xs rounded-md text-white ${
//                     isOverdue 
//                       ? 'bg-red-600 hover:bg-red-700' 
//                       : 'bg-yellow-500 hover:bg-yellow-600'
//                   } transition-colors`}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     onChangeStatus('inProgress');
//                   }}
//                 >
//                   Start
//                 </button>
//               )}
              
//               {status === 'inProgress' && (
//                 <button 
//                   className="bg-green-500 text-white px-3 py-1 text-xs rounded-md hover:bg-green-600 transition-colors"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     onChangeStatus('completed');
//                   }}
//                 >
//                   Complete
//                 </button>
//               )}
              
//               {status === 'completed' && (
//                 <span className="bg-green-500 text-white px-3 py-1 text-xs rounded-md">
//                   Done
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default TaskCard;


import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

const TaskCard = ({ task, status, onClick, onChangeStatus }) => {
  const deadline = new Date(`${task.deadlineDate}T${task.deadlineTime}`);
  const now = new Date();
  const isOverdue = now > deadline && status !== 'completed';
  
  const statusClasses = {
    todo: 'border-l-4 border-red-500 bg-red-50 hover:bg-red-75',
    inProgress: 'border-l-4 border-yellow-500 bg-yellow-50 hover:bg-yellow-75',
    completed: 'border-l-4 border-green-500 bg-green-50 hover:bg-green-75',
    overdue: 'border-l-4 border-red-700 bg-red-100 hover:bg-red-150'
  };

  const statusColors = {
    todo: 'bg-red-500',
    inProgress: 'bg-yellow-500',
    completed: 'bg-green-500',
    overdue: 'bg-red-700'
  };

  const priorityColors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500'
  };

  const fileTypeIcons = {
    'image/': '🖼️',
    'application/pdf': '📄',
    'application/msword': '📝',
    'application/vnd.ms-excel': '📊',
    'default': '📎'
  };

  const getFileIcon = (fileType) => {
    for (const [type, icon] of Object.entries(fileTypeIcons)) {
      if (fileType.includes(type)) return icon;
    }
    return fileTypeIcons.default;
  };

  const currentStatus = isOverdue ? 'overdue' : status;

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`task-card mb-3 p-4 rounded-lg shadow-sm cursor-pointer transition-colors ${statusClasses[currentStatus]}`}
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className={`w-2 h-2 rounded-full mt-1.5 mr-2 flex-shrink-0 ${statusColors[currentStatus]}`}></div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className={`font-semibold ${isOverdue ? 'text-red-800' : `text-${status}-600`}`}>
                {task.title}
              </h4>
              <div className="flex items-center mt-1 space-x-2">
                <span className={`inline-block w-2 h-2 rounded-full ${priorityColors[task.priority]}`}></span>
                <span className="text-xs text-gray-600">
                  {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>
            {isOverdue && (
              <span className="bg-red-700 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                OVERDUE
              </span>
            )}
          </div>
          
          <p className="task-description text-sm text-gray-700 mb-3 line-clamp-2">
            {task.description}
          </p>

          {/* Attachments Section */}
          {task.attachments?.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-2">
                {task.attachments.map((file, index) => (
                  <a
                    key={index}
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center px-2 py-1 bg-white bg-opacity-70 rounded-md text-xs text-gray-700 hover:bg-opacity-100 border border-gray-200 hover:shadow-xs transition-all"
                    title={`${file.name} (${Math.round(file.size / 1024)} KB)`}
                  >
                    <span className="mr-1">{getFileIcon(file.type)}</span>
                    <span className="truncate max-w-[80px]">{file.name.split('.')[0]}</span>
                    <span className="text-gray-400 ml-1">.{file.name.split('.').pop()}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-600">
              <span className="font-medium">Due:</span> {task.deadlineDate} at {task.deadlineTime}
            </div>
            
            <div className="flex space-x-2">
              {status === 'todo' && (
                <button 
                  className={`px-3 py-1 text-xs rounded-md text-white font-medium ${
                    isOverdue 
                      ? 'bg-red-600 hover:bg-red-700 shadow-red-sm' 
                      : 'bg-yellow-500 hover:bg-yellow-600 shadow-yellow-sm'
                  } transition-all shadow-sm`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onChangeStatus('inProgress');
                  }}
                >
                  Start
                </button>
              )}
              
              {status === 'inProgress' && (
                <button 
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 text-xs rounded-md font-medium transition-all shadow-sm shadow-green-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChangeStatus('completed');
                  }}
                >
                  Complete
                </button>
              )}
              
              {status === 'completed' && (
                <span className="bg-green-500 text-white px-3 py-1 text-xs rounded-md font-medium shadow-sm shadow-green-sm">
                  Done
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;