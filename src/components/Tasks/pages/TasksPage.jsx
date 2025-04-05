// // src/pages/TasksPage.js
// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { motion, AnimatePresence } from 'framer-motion';
// import { saveTasks, loadTasks } from '../utils/taskStorage';
// import { fadeIn, stagger } from '../utils/animations';
// import KanbanView from '../components/TaskManagement/KanbanView';
// import ListView from '../components/TaskManagement/ListView';
// import TableView from '../components/TaskManagement/TableView';
// import TaskStats from '../components/TaskManagement/TaskStats';
// import TaskFilters from '../components/TaskManagement/TaskFilters';
// import TaskForm from '../components/TaskManagement/TaskForm';
// import TaskDetailsModal from '../components/TaskManagement/TaskDetailsModal';
// import '../styles/TaskManagement.css';

// const TasksPage = () => {
//   const [tasks, setTasks] = useState({
//     todo: [],
//     inProgress: [],
//     completed: []
//   });
//   const [viewMode, setViewMode] = useState('kanban');
//   const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     assignee: '',
//     priority: '',
//     searchQuery: ''
//   });

//   // Load tasks from localStorage on component mount
//   useEffect(() => {
//     const loadedTasks = loadTasks();
//     if (loadedTasks) {
//       setTasks(loadedTasks);
//     }
//     setIsLoading(false);
//   }, []);

//   // Save tasks to localStorage whenever they change
//   useEffect(() => {
//     if (!isLoading) {
//       saveTasks(tasks);
//     }
//   }, [tasks, isLoading]);

//   const handleCreateTask = (newTask) => {
//     const taskWithId = { 
//       ...newTask, 
//       id: Date.now(), 
//       status: 'todo',
//       priority: newTask.priority || 'medium',
//       attachments: [],
//       createdAt: new Date().toISOString()
//     };
    
//     setTasks(prev => ({
//       ...prev,
//       todo: [...prev.todo, taskWithId]
//     }));
    
//     toast.success('Task created successfully!');
//     setShowCreateTaskModal(false);
//   };

//   const handleUpdateTask = (updatedTask) => {
//     setTasks(prev => {
//       const newTasks = { ...prev };
//       // Remove from current status
//       Object.keys(newTasks).forEach(status => {
//         newTasks[status] = newTasks[status].filter(t => t.id !== updatedTask.id);
//       });
//       // Add to new status
//       newTasks[updatedTask.status] = [...newTasks[updatedTask.status], updatedTask];
//       return newTasks;
//     });
    
//     setSelectedTask(null);
//     toast.success('Task updated successfully!');
//   };

//   const handleDeleteTask = (taskId) => {
//     setTasks(prev => {
//       const newTasks = { ...prev };
//       Object.keys(newTasks).forEach(status => {
//         newTasks[status] = newTasks[status].filter(t => t.id !== taskId);
//       });
//       return newTasks;
//     });
    
//     setSelectedTask(null);
//     toast.info('Task deleted successfully!');
//   };

//   const changeTaskStatus = (taskId, fromStatus, toStatus) => {
//     setTasks(prev => {
//       const task = prev[fromStatus].find(t => t.id === taskId);
//       if (!task) return prev;
      
//       return {
//         ...prev,
//         [fromStatus]: prev[fromStatus].filter(t => t.id !== taskId),
//         [toStatus]: [...prev[toStatus], { ...task, status: toStatus }]
//       };
//     });
    
//     const statusMessages = {
//       'todo-inProgress': 'Task moved to In Progress',
//       'inProgress-completed': 'Task completed!',
//       'completed-inProgress': 'Task moved back to In Progress',
//       'inProgress-todo': 'Task moved back to To Do'
//     };
    
//     toast.info(statusMessages[`${fromStatus}-${toStatus}`] || 'Task status updated');
//   };

//   const filteredTasks = (status) => {
//     let statusTasks = tasks[status] || [];
    
//     return statusTasks.filter(task => {
//       const matchesAssignee = filters.assignee ? 
//         task.assigneeName.toLowerCase().includes(filters.assignee.toLowerCase()) : true;
//       const matchesPriority = filters.priority ? 
//         task.priority === filters.priority : true;
//       const matchesSearch = filters.searchQuery ?
//         task.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
//         task.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) : true;
      
//       return matchesAssignee && matchesPriority && matchesSearch;
//     });
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }


//   return (
//     <motion.div 
//       initial="hidden"
//       animate="visible"
//       variants={fadeIn}
//       className="tasks-page p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen"
//     >
//       <div className="max-w-7xl mx-auto">
//         <div className="tasks-header flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//           <motion.h1 
//             variants={stagger}
//             className="text-3xl font-bold text-gray-800 mb-4 md:mb-0"
//           >
//             Task Management Dashboard
//           </motion.h1>
          
//           <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
//             <div className="view-toggle flex bg-white rounded-lg shadow-sm p-1">
//               {['kanban', 'list', 'table'].map(view => (
//                 <button
//                   key={view}
//                   onClick={() => setViewMode(view)}
//                   className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
//                     viewMode === view 
//                       ? 'bg-blue-600 text-white' 
//                       : 'text-gray-600 hover:bg-gray-100'
//                   }`}
//                 >
//                   {view.charAt(0).toUpperCase() + view.slice(1)}
//                 </button>
//               ))}
//             </div>
            
//             <button 
//               onClick={() => setShowCreateTaskModal(true)}
//               className="create-task-btn bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
//               </svg>
//               Create Task
//             </button>
            
//           </div>
//         </div>

//         <TaskStats tasks={tasks} />
        
//         <TaskFilters filters={filters} setFilters={setFilters} />

//         <AnimatePresence mode="wait">
//           <motion.div
//             key={viewMode}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3 }}
//             className="mt-6"
//           >
//             {viewMode === 'kanban' && (
//               <KanbanView 
//                 tasks={tasks} 
//                 filteredTasks={filteredTasks}
//                 onTaskClick={setSelectedTask}
//                 onChangeStatus={changeTaskStatus}
//               />
//             )}
            
//             {viewMode === 'list' && (
//               <ListView 
//                 tasks={tasks} 
//                 filteredTasks={filteredTasks}
//                 onTaskClick={setSelectedTask}
//                 onChangeStatus={changeTaskStatus}
//               />
//             )}
            
//             {viewMode === 'table' && (
//               <TableView 
//                 tasks={tasks} 
//                 filteredTasks={filteredTasks}
//                 onTaskClick={setSelectedTask}
//                 onChangeStatus={changeTaskStatus}
//               />
//             )}
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {/* Create Task Modal */}
//       <AnimatePresence>
//         {showCreateTaskModal && (
//           <TaskForm 
//             onClose={() => setShowCreateTaskModal(false)}
//             onSubmit={handleCreateTask}
//             mode="create"
//           />
//         )}
//       </AnimatePresence>

//       {/* Task Details Modal */}
//       <AnimatePresence>
//         {selectedTask && (
//           <TaskDetailsModal
//             task={selectedTask}
//             onClose={() => setSelectedTask(null)}
//             onUpdate={handleUpdateTask}
//             onDelete={handleDeleteTask}
//           />
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// };

// export default TasksPage;





// src/components/Tasks/pages/TasksPage.jsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import { saveTasks, loadTasks, addMoreMockTasks } from '../utils/taskStorage';
import KanbanView from '../components/TaskManagement/KanbanView';
import ListView from '../components/TaskManagement/ListView';
import TableView from '../components/TaskManagement/TableView';
import TaskStats from '../components/TaskManagement/TaskStats';
import TaskFilters from '../components/TaskManagement/TaskFilters';
import TaskForm from '../components/TaskManagement/TaskForm';
import TaskDetailsModal from '../components/TaskManagement/TaskDetailsModal';
import '../styles/TaskManagement.css';

const TasksPage = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    completed: []
  });
  const [viewMode, setViewMode] = useState('kanban');
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    assignee: '',
    priority: '',
    searchQuery: ''
  });

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const loadedTasks = loadTasks();
    if (loadedTasks) {
      setTasks(loadedTasks);
    }
    setIsLoading(false);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      saveTasks(tasks);
    }
  }, [tasks, isLoading]);

  const handleCreateTask = (newTask) => {
    const taskWithId = { 
      ...newTask, 
      id: Date.now(), 
      status: 'todo',
      priority: newTask.priority || 'medium',
      attachments: [],
      createdAt: new Date().toISOString()
    };
    
    setTasks(prev => ({
      ...prev,
      todo: [...prev.todo, taskWithId]
    }));
    
    toast.success('Task created successfully!');
    setShowCreateTaskModal(false);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(prev => {
      const newTasks = { ...prev };
      // Remove from current status
      Object.keys(newTasks).forEach(status => {
        newTasks[status] = newTasks[status].filter(t => t.id !== updatedTask.id);
      });
      // Add to new status
      newTasks[updatedTask.status] = [...newTasks[updatedTask.status], updatedTask];
      return newTasks;
    });
    
    setSelectedTask(null);
    toast.success('Task updated successfully!');
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prev => {
      const newTasks = { ...prev };
      Object.keys(newTasks).forEach(status => {
        newTasks[status] = newTasks[status].filter(t => t.id !== taskId);
      });
      return newTasks;
    });
    
    setSelectedTask(null);
    toast.info('Task deleted successfully!');
  };

  const changeTaskStatus = (taskId, fromStatus, toStatus) => {
    setTasks(prev => {
      const task = prev[fromStatus].find(t => t.id === taskId);
      if (!task) return prev;
      
      return {
        ...prev,
        [fromStatus]: prev[fromStatus].filter(t => t.id !== taskId),
        [toStatus]: [...prev[toStatus], { ...task, status: toStatus }]
      };
    });
    
    const statusMessages = {
      'todo-inProgress': 'Task moved to In Progress',
      'inProgress-completed': 'Task completed!',
      'completed-inProgress': 'Task moved back to In Progress',
      'inProgress-todo': 'Task moved back to To Do'
    };
    
    toast.info(statusMessages[`${fromStatus}-${toStatus}`] || 'Task status updated');
  };

  const filteredTasks = (status) => {
    let statusTasks = tasks[status] || [];
    
    return statusTasks.filter(task => {
      const matchesAssignee = filters.assignee ? 
        task.assigneeName.toLowerCase().includes(filters.assignee.toLowerCase()) : true;
      const matchesPriority = filters.priority ? 
        task.priority === filters.priority : true;
      const matchesSearch = filters.searchQuery ?
        task.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) : true;
      
      return matchesAssignee && matchesPriority && matchesSearch;
    });
  };

  const handleAddMockData = () => {
    const updatedTasks = addMoreMockTasks(3); // Adds 3 new tasks
    setTasks(updatedTasks);
    toast.success('Added 3 new mock tasks!');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className="tasks-page p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        <div className="tasks-header flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Task Management Dashboard</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="view-toggle flex bg-white rounded-lg shadow-sm p-1">
              {['kanban', 'list', 'table'].map(view => (
                <button
                  key={view}
                  onClick={() => setViewMode(view)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    viewMode === view 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => setShowCreateTaskModal(true)}
              className="create-task-btn bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Create Task
            </button>

            <button 
              onClick={handleAddMockData}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
              </svg>
              Add Mock Data
            </button>
          </div>
        </div>

        <TaskStats tasks={tasks} />
        
        <TaskFilters filters={filters} setFilters={setFilters} />

        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            {viewMode === 'kanban' && (
              <KanbanView 
                tasks={tasks} 
                filteredTasks={filteredTasks}
                onTaskClick={setSelectedTask}
                onChangeStatus={changeTaskStatus}
              />
            )}
            
            {viewMode === 'list' && (
              <ListView 
                tasks={tasks} 
                filteredTasks={filteredTasks}
                onTaskClick={setSelectedTask}
                onChangeStatus={changeTaskStatus}
              />
            )}
            
            {viewMode === 'table' && (
              <TableView 
                tasks={tasks} 
                filteredTasks={filteredTasks}
                onTaskClick={setSelectedTask}
                onChangeStatus={changeTaskStatus}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Create Task Modal */}
      <AnimatePresence>
        {showCreateTaskModal && (
          <TaskForm 
            onClose={() => setShowCreateTaskModal(false)}
            onSubmit={handleCreateTask}
            mode="create"
          />
        )}
      </AnimatePresence>

      {/* Task Details Modal */}
      <AnimatePresence>
        {selectedTask && (
          <TaskDetailsModal
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TasksPage;