import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ListView = ({ tasks, filteredTasks, onTaskClick, onChangeStatus }) => {
  const allTasks = [
    ...filteredTasks('todo'),
    ...filteredTasks('inProgress'),
    ...filteredTasks('completed')
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="grid grid-cols-12 bg-gray-50 p-4 border-b border-gray-200">
        <div className="col-span-4 font-medium text-gray-500">Task</div>
        <div className="col-span-2 font-medium text-gray-500">Assignee</div>
        <div className="col-span-2 font-medium text-gray-500">Deadline</div>
        <div className="col-span-2 font-medium text-gray-500">Priority</div>
        <div className="col-span-2 font-medium text-gray-500">Status</div>
      </div>
      
      <AnimatePresence>
        {allTasks.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-gray-500"
          >
            No tasks found
          </motion.div>
        ) : (
          <div className="divide-y divide-gray-200">
            {allTasks.map(task => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-12 items-center p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => onTaskClick(task)}
              >
                <div className="col-span-4">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      task.status === 'todo' ? 'bg-red-500' :
                      task.status === 'inProgress' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div>
                      <h4 className="font-medium text-gray-800">{task.title}</h4>
                      <p className="text-sm text-gray-500 truncate">{task.description}</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 text-sm text-gray-700">{task.assigneeName}</div>
                <div className="col-span-2 text-sm text-gray-700">
                  {new Date(task.deadlineDate).toLocaleDateString()} at {task.deadlineTime}
                </div>
                <div className="col-span-2">
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    task.priority === 'high' ? 'bg-red-100 text-red-800' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {task.priority}
                  </span>
                </div>
                <div className="col-span-2">
                  <select
                    value={task.status}
                    onChange={(e) => onChangeStatus(task.id, task.status, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className={`text-sm rounded-md border-0 focus:ring-2 focus:ring-blue-500 ${
                      task.status === 'todo' ? 'bg-red-50 text-red-800' :
                      task.status === 'inProgress' ? 'bg-yellow-50 text-yellow-800' : 'bg-green-50 text-green-800'
                    }`}
                  >
                    <option value="todo">To Do</option>
                    <option value="inProgress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ListView;