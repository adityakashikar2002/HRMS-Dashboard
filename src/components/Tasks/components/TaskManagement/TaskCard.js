import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

const TaskCard = ({ task, status, onClick, onChangeStatus }) => {
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

  const priorityColors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500'
  };

  const currentStatus = isOverdue ? 'overdue' : status;

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`task-card mb-3 p-4 rounded-lg shadow-sm cursor-pointer ${statusClasses[currentStatus]}`}
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className={`w-2 h-2 rounded-full mt-1.5 mr-2 flex-shrink-0 ${statusColors[currentStatus]}`}></div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className={`font-semibold ${isOverdue ? 'text-red-700' : `text-${status}-500`}`}>
                {task.title}
              </h4>
              <div className="flex items-center mt-1 space-x-2">
                <span className={`inline-block w-2 h-2 rounded-full ${priorityColors[task.priority]}`}></span>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>
            {isOverdue && (
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                OVERDUE
              </span>
            )}
          </div>
          
          <p className="task-description text-sm text-gray-600 mb-3 line-clamp-2">
            {task.description}
          </p>
          
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">
              <span className="font-medium">Due:</span> {task.deadlineDate} at {task.deadlineTime}
            </div>
            
            <div className="flex space-x-2">
              {status === 'todo' && (
                <button 
                  className={`px-3 py-1 text-xs rounded-md text-white ${
                    isOverdue 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-yellow-500 hover:bg-yellow-600'
                  } transition-colors`}
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
                  className="bg-green-500 text-white px-3 py-1 text-xs rounded-md hover:bg-green-600 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChangeStatus('completed');
                  }}
                >
                  Complete
                </button>
              )}
              
              {status === 'completed' && (
                <span className="bg-green-500 text-white px-3 py-1 text-xs rounded-md">
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