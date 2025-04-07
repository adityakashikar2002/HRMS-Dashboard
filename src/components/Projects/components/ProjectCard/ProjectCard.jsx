// ProjectCard.jsx
import React from 'react';
import { formatDate } from '../../utils/helpers';
import { getStatusColor, getPriorityColor } from '../../utils/helpers';

const ProjectCard = ({ project, onClick, onDelete }) => {
  return (
    <div 
      className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow border border-gray-200"
      onClick={() => onClick(project.id)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{project.name}</h3>
        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)} text-white`}>
          {project.status}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(project.id);
          }}
          className="right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 w-6 h-6 flex items-center justify-center"
          title="Delete project"
        >
          X
        </button>

      </div>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
      
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-500">Start: {formatDate(project.startDate)}</span>
        <span className="text-xs text-gray-500">End: {formatDate(project.endDate)}</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div 
          className="bg-blue-500 h-2 rounded-full" 
          style={{ width: `${project.progress}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-600">{project.progress}% complete</span>
        <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(project.priority)} text-white`}>
          {project.priority}
        </span>
      </div>
      
      {/* <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(project.id);
        }}
        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 w-6 h-6 flex items-center justify-center"
        title="Delete project"
      >
        ×
      </button> */}
    </div>
  );
};

export default ProjectCard;