import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from 'emailjs-com';
import './TasksPage.css';

// Initialize EmailJS with your credentials
emailjs.init(process.env.REACT_APP_EMAILJS_USER_ID); // Replace with your EmailJS user ID

const TasksPage = () => {
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    completed: []
  });
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dateAssigned: '',
    deadlineDate: '',
    deadlineTime: '',
    assignerName: '',
    assigneeName: '',
    assignerEmail: '',
    assigneeEmail: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const sendEmailNotification = (task) => {
    const emailParams = {
      to_email: task.assigneeEmail,
      from_email: task.assignerEmail,
      assigner_name: task.assignerName,
      assignee_name: task.assigneeName,
      task_title: task.title,
      task_description: task.description,
      date_assigned: task.dateAssigned,
      deadline: `${task.deadlineDate} at ${task.deadlineTime}`,
      task_status: 'To Do'
    };

    emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,  // Replace with your EmailJS service ID
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID, // Replace with your EmailJS template ID
      emailParams
    )
    .then((response) => {
      console.log('Email sent successfully!', response.status, response.text);
    })
    .catch((error) => {
      console.error('Failed to send email:', error);
      toast.error('Failed to send email notification');
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskWithId = { 
      ...newTask, 
      id: Date.now(), 
      status: 'todo',
      deadline: `${newTask.deadlineDate} at ${newTask.deadlineTime}`
    };
    
    setTasks(prev => ({
      ...prev,
      todo: [...prev.todo, taskWithId]
    }));
    
    // Send email notification
    sendEmailNotification(taskWithId);
    
    toast.success('Task assigned successfully!');
    setShowCreateTaskModal(false);
    setNewTask({
      title: '',
      description: '',
      dateAssigned: '',
      deadlineDate: '',
      deadlineTime: '',
      assignerName: '',
      assigneeName: '',
      assignerEmail: '',
      assigneeEmail: ''
    });
  };

  const startWorking = (taskId) => {
    const task = tasks.todo.find(t => t.id === taskId);
    setTasks(prev => ({
      todo: prev.todo.filter(t => t.id !== taskId),
      inProgress: [...prev.inProgress, { ...task, status: 'inProgress' }],
      completed: prev.completed
    }));
    toast.info('Task moved to In Progress');
  };

  const markAsComplete = (taskId) => {
    const task = tasks.inProgress.find(t => t.id === taskId);
    setTasks(prev => ({
      todo: prev.todo,
      inProgress: prev.inProgress.filter(t => t.id !== taskId),
      completed: [...prev.completed, { ...task, status: 'completed' }]
    }));
    toast.success('Task completed!');
  };

  return (
    <div className="tasks-page p-6">
      <div className="tasks-header flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Task Management</h1>
        <button 
          className="create-task-btn bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => setShowCreateTaskModal(true)}
        >
          Create Task
        </button>
      </div>

      {showCreateTaskModal && (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="create-task-modal bg-white rounded-lg p-6 w-full max-w-2xl relative">
            <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
            <button 
              className="close-modal absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowCreateTaskModal(false)}
            >
              &times;
            </button>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                <input
                  type="text"
                  name="title"
                  value={newTask.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={newTask.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md min-h-[100px]"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Assigned</label>
                  <input
                    type="date"
                    name="dateAssigned"
                    value={newTask.dateAssigned}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deadline Date</label>
                  <input
                    type="date"
                    name="deadlineDate"
                    value={newTask.deadlineDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deadline Time</label>
                  <input
                    type="time"
                    name="deadlineTime"
                    value={newTask.deadlineTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assigner Name</label>
                  <input
                    type="text"
                    name="assignerName"
                    value={newTask.assignerName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assignee Name</label>
                  <input
                    type="text"
                    name="assigneeName"
                    value={newTask.assigneeName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assigner Email</label>
                  <input
                    type="email"
                    name="assignerEmail"
                    value={newTask.assignerEmail}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assignee Email</label>
                  <input
                    type="email"
                    name="assigneeEmail"
                    value={newTask.assigneeEmail}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Assign Task
              </button>
            </form>
          </div>
        </div>
      )}

    <div className="task-board grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="task-column bg-white p-4 rounded-lg shadow">
                <div className="flex items-center mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <h3 className="text-lg font-semibold text-red-500">To Do</h3>
                <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    {tasks.todo.length}
                </span>
                </div>
                {tasks.todo.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No tasks to display</p>
                ) : (
                tasks.todo.map(task => (
                    <TaskCard 
                    key={task.id} 
                    task={task} 
                    onStartWorking={startWorking}
                    status="todo"
                    />
                ))
                )}
            </div>
            
            <div className="task-column bg-white p-4 rounded-lg shadow">
                <div className="flex items-center mb-4">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <h3 className="text-lg font-semibold text-yellow-500">In Progress</h3>
                <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    {tasks.inProgress.length}
                </span>
                </div>
                {tasks.inProgress.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No tasks in progress</p>
                ) : (
                tasks.inProgress.map(task => (
                    <TaskCard 
                    key={task.id} 
                    task={task} 
                    onMarkComplete={markAsComplete}
                    status="inProgress"
                    />
                ))
                )}
            </div>
            
            <div className="task-column bg-white p-4 rounded-lg shadow">
                <div className="flex items-center mb-4">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <h3 className="text-lg font-semibold text-green-500">Completed</h3>
                <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    {tasks.completed.length}
                </span>
                </div>
                {tasks.completed.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No completed tasks</p>
                ) : (
                tasks.completed.map(task => (
                    <TaskCard 
                    key={task.id} 
                    task={task} 
                    status="completed"
                    />
                ))
                )}
            </div>
        </div>
    </div>
  );
};

// const TaskCard = ({ task, onStartWorking, onMarkComplete, status }) => {
//     const deadline = new Date(`${task.deadlineDate}T${task.deadlineTime}`);
//     const now = new Date();
//     const isOverdue = now > deadline && status !== 'completed';
    
//     const statusClasses = {
//       todo: 'border-l-4 border-red-500 bg-red-50',
//       inProgress: 'border-l-4 border-yellow-500 bg-yellow-50',
//       completed: 'border-l-4 border-green-500 bg-green-50',
//       overdue: 'border-l-4 border-red-700 bg-red-100'
//     };
  
//     const statusColors = {
//       todo: 'bg-red-500',
//       inProgress: 'bg-yellow-500',
//       completed: 'bg-green-500',
//       overdue: 'bg-red-700'
//     };
  
//     const textColors = {
//       todo: 'text-red-500',
//       inProgress: 'text-yellow-500',
//       completed: 'text-green-500',
//       overdue: 'text-red-700'
//     };
  
//     const currentStatus = isOverdue ? 'overdue' : status;
  
//     return (
//       <div className={`task-card mb-4 p-4 rounded ${statusClasses[currentStatus]}`}>
//         <div className="flex items-start">
//           <div className={`w-2 h-2 rounded-full mt-1.5 mr-2 flex-shrink-0 ${statusColors[currentStatus]}`}></div>
//           <div className="flex-1">
//             <div className="task-card-header flex justify-between items-center mb-2">
//               <h4 className={`font-medium ${textColors[currentStatus]}`}>{task.title}</h4>
//               {isOverdue && <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">OVERDUE</span>}
//             </div>
//             <p className="task-description text-sm text-gray-600 mb-3">{task.description}</p>
//             <div className="task-details text-xs text-gray-500 space-y-1 mb-3">
//               <p><span className="font-medium">Assigned:</span> {task.dateAssigned}</p>
//               <p><span className="font-medium">Deadline:</span> {task.deadlineDate} at {task.deadlineTime}</p>
//               <p><span className="font-medium">Assignee:</span> {task.assigneeName}</p>
//               <p><span className="font-medium">Assigned by:</span> {task.assignerName}</p>
//             </div>
//             <div className="task-actions flex justify-end">
//               {status === 'todo' && !isOverdue && (
//                 <button 
//                   className="bg-yellow-500 text-white px-3 py-1 text-sm rounded hover:bg-yellow-600 transition-colors"
//                   onClick={() => onStartWorking(task.id)}
//                 >
//                   Start Working
//                 </button>
//               )}
//               {status === 'inProgress' && (
//                 <button 
//                   className="bg-green-500 text-white px-3 py-1 text-sm rounded hover:bg-green-600 transition-colors"
//                   onClick={() => onMarkComplete(task.id)}
//                 >
//                   Mark as Complete
//                 </button>
//               )}
//               {status === 'completed' && (
//                 <span className="bg-green-500 text-white px-3 py-1 text-sm rounded">COMPLETED</span>
//               )}
//               {isOverdue && status !== 'completed' && (
//                 <span className="bg-red-600 text-white px-3 py-1 text-sm rounded">OVERDUE</span>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };
const TaskCard = ({ task, onStartWorking, onMarkComplete, status }) => {
    const deadline = new Date(`${task.deadlineDate}T${task.deadlineTime}`);
    const now = new Date();
    const isOverdue = now > deadline && status !== 'completed';
    
    const statusClasses = {
      todo: 'border-l-4 border-red-500 bg-red-50',
      inProgress: 'border-l-4 border-yellow-500 bg-yellow-50',
      completed: 'border-l-4 border-green-500 bg-green-50',
      overdue: 'border-l-4 border-red-700 bg-red-100'
    };
  
    const statusColors = {
      todo: 'bg-red-500',
      inProgress: 'bg-yellow-500',
      completed: 'bg-green-500',
      overdue: 'bg-red-700'
    };
  
    const textColors = {
      todo: 'text-red-500',
      inProgress: 'text-yellow-500',
      completed: 'text-green-500',
      overdue: 'text-red-700'
    };
  
    const currentStatus = isOverdue ? 'overdue' : status;
  
    return (
      <div className={`task-card mb-4 p-4 rounded ${statusClasses[currentStatus]}`}>
        <div className="flex items-start">
          <div className={`w-2 h-2 rounded-full mt-1.5 mr-2 flex-shrink-0 ${statusColors[currentStatus]}`}></div>
          <div className="flex-1">
            <div className="task-card-header flex justify-between items-center mb-2">
              <h4 className={`font-medium ${textColors[currentStatus]}`}>{task.title}</h4>
              {isOverdue && <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">OVERDUE</span>}
            </div>
            <p className="task-description text-sm text-gray-600 mb-3 font-bold">{task.description}</p>
            <div className="task-details text-xs text-gray-500 space-y-1 mb-3">
              <p><span className="font-bold">Assigned:</span> {task.dateAssigned}</p>
              <p><span className="font-bold">Deadline:</span> {task.deadlineDate} at {task.deadlineTime}</p>
              <p><span className="font-bold">Assignee:</span> {task.assigneeName}</p>
              <p><span className="font-bold">Assigned by:</span> {task.assignerName}</p>
            </div>
            <div className="task-actions flex justify-end">
              {status === 'todo' && (
                <button 
                  className={`px-3 py-1 text-sm rounded text-white ${
                    isOverdue 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-yellow-500 hover:bg-yellow-600'
                  } transition-colors`}
                  onClick={() => onStartWorking(task.id)}
                >
                  {isOverdue ? 'Start Working (Overdue)' : 'Start Working'}
                </button>
              )}
              {status === 'inProgress' && (
                <button 
                  className="bg-green-500 text-white px-3 py-1 text-sm rounded hover:bg-green-600 transition-colors"
                  onClick={() => onMarkComplete(task.id)}
                >
                  Mark as Complete
                </button>
              )}
              {status === 'completed' && (
                <span className="bg-green-500 text-white px-3 py-1 text-sm rounded">COMPLETED</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

export default TasksPage;



