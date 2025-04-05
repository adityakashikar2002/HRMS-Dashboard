// src/components/TaskManagement/KanbanView.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskCard from './TaskCard';

const KanbanView = ({ tasks, filteredTasks, onTaskClick, onChangeStatus }) => {
  const statuses = [
    { id: 'todo', title: 'To Do', color: 'red' },
    { id: 'inProgress', title: 'In Progress', color: 'yellow' },
    { id: 'completed', title: 'Completed', color: 'green' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statuses.map((status) => (
        <div key={status.id} className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center mb-4">
            <div className={`w-3 h-3 rounded-full bg-${status.color}-500 mr-2`}></div>
            <h3 className={`text-lg font-semibold text-${status.color}-500`}>{status.title}</h3>
            <span className={`ml-2 bg-${status.color}-100 text-${status.color}-800 text-xs font-medium px-2 py-0.5 rounded-full`}>
              {filteredTasks(status.id).length}
            </span>
          </div>
          
          <div className="space-y-3">
            <AnimatePresence>
              {filteredTasks(status.id).length === 0 ? (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-400 text-center py-6"
                >
                  No tasks in this column
                </motion.p>
              ) : (
                filteredTasks(status.id).map(task => (
                  <motion.div
                    key={task.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    <TaskCard 
                      task={task} 
                      status={status.id}
                      onClick={() => onTaskClick(task)}
                      onChangeStatus={(newStatus) => onChangeStatus(task.id, status.id, newStatus)}
                    />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanView;