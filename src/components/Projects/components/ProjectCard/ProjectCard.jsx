import React from 'react';
import { formatDate } from '../../utils/helpers';
import { getStatusColor, getPriorityColor } from '../../utils/helpers';

const ProjectCard = ({ project, onClick }) => {
  return (
    <div 
      className="bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
      onClick={() => onClick(project.id)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-white truncate">{project.name}</h3>
        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
      </div>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
      
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-500">Start: {formatDate(project.startDate)}</span>
        <span className="text-xs text-gray-500">End: {formatDate(project.endDate)}</span>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
        <div 
          className="bg-blue-500 h-2 rounded-full" 
          style={{ width: `${project.progress}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400">{project.progress}% complete</span>
        <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(project.priority)}`}>
          {project.priority}
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;