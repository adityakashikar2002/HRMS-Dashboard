// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { format } from 'date-fns';
// import TaskForm from './TaskForm';

// const TaskDetailsModal = ({ task, onClose, onUpdate, onDelete }) => {
//   const [isEditing, setIsEditing] = useState(false);

//   const handleDelete = () => {
//     if (window.confirm('Are you sure you want to delete this task?')) {
//       onDelete(task.id);
//     }
//   };

//   if (isEditing) {
//     return (
//       <TaskForm 
//         task={task}
//         onClose={() => setIsEditing(false)}
//         onSubmit={(updatedTask) => {
//           onUpdate(updatedTask);
//           setIsEditing(false);
//         }}
//         mode="edit"
//       />
//     );
//   }

//   return (
//     <motion.div 
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//       onClick={onClose}
//     >
//       <motion.div 
//         initial={{ y: 50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         exit={{ y: 50, opacity: 0 }}
//         className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold text-gray-800">Task Details</h2>
//             <button 
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-700 transition-colors"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>

//           <div className="space-y-4">
//             <div className="flex items-start">
//               <div className={`w-3 h-3 rounded-full mt-1.5 mr-2 flex-shrink-0 ${
//                 task.status === 'todo' ? 'bg-red-500' :
//                 task.status === 'inProgress' ? 'bg-yellow-500' : 'bg-green-500'
//               }`}></div>
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
//                 <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
//                   task.priority === 'high' ? 'bg-red-100 text-red-800' :
//                   task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
//                 }`}>
//                   {task.priority} priority
//                 </span>
//               </div>
//             </div>

//             <div className="bg-gray-50 p-4 rounded-lg">
//               <h4 className="text-sm font-medium text-gray-500 mb-2">Description</h4>
//               <p className="text-gray-700">{task.description}</p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <h4 className="text-sm font-medium text-gray-500 mb-1">Assigned By</h4>
//                 <p className="text-gray-700">{task.assignerName} ({task.assignerEmail})</p>
//               </div>
//               <div>
//                 <h4 className="text-sm font-medium text-gray-500 mb-1">Assigned To</h4>
//                 <p className="text-gray-700">{task.assigneeName} ({task.assigneeEmail})</p>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <h4 className="text-sm font-medium text-gray-500 mb-1">Date Assigned</h4>
//                 <p className="text-gray-700">{format(new Date(task.dateAssigned), 'MMM dd, yyyy')}</p>
//               </div>
//               <div>
//                 <h4 className="text-sm font-medium text-gray-500 mb-1">Deadline</h4>
//                 <p className="text-gray-700">{format(new Date(task.deadlineDate), 'MMM dd, yyyy')} at {task.deadlineTime}</p>
//               </div>
//             </div>

//             {task.attachments && task.attachments.length > 0 && (
//               <div>
//                 <h4 className="text-sm font-medium text-gray-500 mb-2">Attachments</h4>
//                 <div className="space-y-2">
//                   {task.attachments.map((file, index) => (
//                     <div key={index} className="flex items-center p-2 bg-gray-50 rounded border border-gray-200">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                       </svg>
//                       <span className="text-sm text-gray-700 truncate flex-1">{file.name}</span>
//                       <a 
//                         href={file.url} 
//                         target="_blank" 
//                         rel="noopener noreferrer"
//                         className="text-blue-500 hover:text-blue-700 text-sm font-medium"
//                       >
//                         View
//                       </a>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <div className="flex justify-end gap-3 pt-4">
//               <button
//                 onClick={handleDelete}
//                 className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
//               >
//                 Delete Task
//               </button>
//               <button
//                 onClick={() => setIsEditing(true)}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//               >
//                 Edit Task
//               </button>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default TaskDetailsModal;


// //WORKS 99
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { format } from 'date-fns';
// import TaskForm from './TaskForm';

// const TaskDetailsModal = ({ task, onClose, onUpdate, onDelete }) => {
//   const [isEditing, setIsEditing] = useState(false);

//   const handleDelete = () => {
//     if (window.confirm('Are you sure you want to delete this task?')) {
//       onDelete(task.id);
//     }
//   };

//   if (isEditing) {
//     return (
//       <TaskForm 
//         task={task}
//         onClose={() => setIsEditing(false)}
//         onSubmit={(updatedTask) => {
//           onUpdate(updatedTask);
//           setIsEditing(false);
//         }}
//         mode="edit"
//       />
//     );
//   }

//   return (
//     <motion.div 
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//       onClick={onClose}
//     >
//       <motion.div 
//         initial={{ y: 50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         exit={{ y: 50, opacity: 0 }}
//         className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold text-gray-800">Task Details</h2>
//             <button 
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-700 transition-colors"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>

//           <div className="space-y-4">
//             <div className="flex items-start">
//               <div className={`w-3 h-3 rounded-full mt-1.5 mr-2 flex-shrink-0 ${
//                 task.status === 'todo' ? 'bg-red-500' :
//                 task.status === 'inProgress' ? 'bg-yellow-500' : 'bg-green-500'
//               }`}></div>
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
//                 <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
//                   task.priority === 'high' ? 'bg-red-100 text-red-800' :
//                   task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
//                 }`}>
//                   {task.priority} priority
//                 </span>
//               </div>
//             </div>

//             <div className="bg-gray-50 p-4 rounded-lg">
//               <h4 className="text-sm font-medium text-gray-500 mb-2">Description</h4>
//               <p className="text-gray-700">{task.description}</p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <h4 className="text-sm font-medium text-gray-500 mb-1">Assigned By</h4>
//                 <p className="text-gray-700">{task.assignerName} ({task.assignerEmail})</p>
//               </div>
//               <div>
//                 <h4 className="text-sm font-medium text-gray-500 mb-1">Assigned To</h4>
//                 <p className="text-gray-700">{task.assigneeName} ({task.assigneeEmail})</p>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <h4 className="text-sm font-medium text-gray-500 mb-1">Date Assigned</h4>
//                 <p className="text-gray-700">{format(new Date(task.dateAssigned), 'MMM dd, yyyy')}</p>
//               </div>
//               <div>
//                 <h4 className="text-sm font-medium text-gray-500 mb-1">Deadline</h4>
//                 <p className="text-gray-700">{format(new Date(task.deadlineDate), 'MMM dd, yyyy')} at {task.deadlineTime}</p>
//               </div>
//             </div>

//             {task.attachments && task.attachments.length > 0 && (
//               <div>
//                 <h4 className="text-sm font-medium text-gray-500 mb-2">Attachments</h4>
//                 <div className="space-y-2">
//                 {task.attachments?.length > 0 && (
//                   <div className="mt-4">
//                     <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments</h4>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                       {task.attachments.map((file, index) => (
//                         <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100">
//                           <div className="flex-shrink-0 mr-3">
//                             {file.type.includes('image') ? (
//                               <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
//                                 <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                                 </svg>
//                               </div>
//                             ) : (
//                               <div className="w-10 h-10 bg-blue-50 rounded flex items-center justify-center">
//                                 <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                                 </svg>
//                               </div>
//                             )}
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
//                             <p className="text-xs text-gray-500">{Math.round(file.size / 1024)} KB</p>
//                           </div>
//                           <a 
//                             href={file.url} 
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="ml-2 text-blue-600 hover:text-blue-800"
//                             download
//                           >
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//                             </svg>
//                           </a>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//                 </div>
//               </div>
//             )}

//             <div className="flex justify-end gap-3 pt-4">
//               <button
//                 onClick={handleDelete}
//                 className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
//               >
//                 Delete Task
//               </button>
//               <button
//                 onClick={() => setIsEditing(true)}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//               >
//                 Edit Task
//               </button>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default TaskDetailsModal;




import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import TaskForm from './TaskForm';

const TaskDetailsModal = ({ task, onClose, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  const getFileIcon = (fileType) => {
    const fileTypeIcons = {
      'image/': '🖼️',
      'application/pdf': '📄',
      'application/msword': '📝',
      'application/vnd.ms-excel': '📊',
      'default': '📎'
    };

    for (const [type, icon] of Object.entries(fileTypeIcons)) {
      if (fileType.includes(type)) return icon;
    }
    return fileTypeIcons.default;
  };

  if (isEditing) {
    return (
      <TaskForm 
        task={task}
        onClose={() => setIsEditing(false)}
        onSubmit={(updatedTask) => {
          onUpdate(updatedTask);
          setIsEditing(false);
        }}
        mode="edit"
      />
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Task Details</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className={`w-3 h-3 rounded-full mt-1.5 mr-2 flex-shrink-0 ${
                task.status === 'todo' ? 'bg-red-500' :
                task.status === 'inProgress' ? 'bg-yellow-500' : 'bg-green-500'
              }`}></div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                  task.priority === 'high' ? 'bg-red-100 text-red-800' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                }`}>
                  {task.priority} priority
                </span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Description</h4>
              <p className="text-gray-700">{task.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Assigned By</h4>
                <p className="text-gray-700">{task.assignerName} ({task.assignerEmail})</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Assigned To</h4>
                <p className="text-gray-700">{task.assigneeName} ({task.assigneeEmail})</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Date Assigned</h4>
                <p className="text-gray-700">{format(new Date(task.dateAssigned), 'MMM dd, yyyy')}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Deadline</h4>
                <p className="text-gray-700">{format(new Date(task.deadlineDate), 'MMM dd, yyyy')} at {task.deadlineTime}</p>
              </div>
            </div>

            {task.attachments?.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {task.attachments.map((file, index) => (
                    <div key={index} className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex-shrink-0 mr-3 text-xl">
                        {getFileIcon(file.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {file.type.split('/')[1]?.toUpperCase() || 'FILE'} • {Math.round(file.size / 1024)} KB
                        </p>
                      </div>
                      <a 
                        href={file.url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 p-1 text-blue-600 hover:text-blue-800 rounded hover:bg-blue-50"
                        download
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Task
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Task
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TaskDetailsModal;