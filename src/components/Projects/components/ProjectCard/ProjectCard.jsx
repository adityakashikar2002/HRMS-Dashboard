// // ProjectCard.jsx
// import React from 'react';
// import { formatDate } from '../../utils/helpers';
// import { getStatusColor, getPriorityColor } from '../../utils/helpers';

// const ProjectCard = ({ project, onClick, onDelete }) => {
//   return (
//     <div 
//       className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow border border-gray-200"
//       onClick={() => onClick(project.id)}
//     >
//       <div className="flex justify-between items-start mb-2">
//         <h3 className="text-lg font-semibold text-gray-800 truncate">{project.name}</h3>
//         <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)} text-white`}>
//           {project.status}
//         </span>

//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             onDelete(project.id);
//           }}
//           className="right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 w-6 h-6 flex items-center justify-center"
//           title="Delete project"
//         >
//           X
//         </button>

//       </div>
//       <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
      
//       <div className="flex justify-between items-center mb-2">
//         <span className="text-xs text-gray-500">Start: {formatDate(project.startDate)}</span>
//         <span className="text-xs text-gray-500">End: {formatDate(project.endDate)}</span>
//       </div>
      
//       <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
//         <div 
//           className="bg-blue-500 h-2 rounded-full" 
//           style={{ width: `${project.progress}%` }}
//         ></div>
//       </div>
      
//       <div className="flex justify-between items-center">
//         <span className="text-xs text-gray-600">{project.progress}% complete</span>
//         <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(project.priority)} text-white`}>
//           {project.priority}
//         </span>
//       </div>
      
//       {/* <button
//         onClick={(e) => {
//           e.stopPropagation();
//           onDelete(project.id);
//         }}
//         className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 w-6 h-6 flex items-center justify-center"
//         title="Delete project"
//       >
//         ×
//       </button> */}
//     </div>
//   );
// };

// export default ProjectCard;




// ProjectCard.jsx
import React from 'react';
import { formatDate } from '../../utils/helpers';
import { getStatusColor, getPriorityColor } from '../../utils/helpers';

const ProjectCard = ({ project, onClick, onDelete, onProgressChange }) => {
  const handleProgressChange = (e) => {
    const progress = parseInt(e.target.value);
    if (!isNaN(progress) && onProgressChange) {
      onProgressChange(project.id, Math.min(100, Math.max(0, progress)));
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow border border-gray-200 relative">
      <div className="flex justify-between items-start mb-2">
        <h3 
          className="text-lg font-semibold text-gray-800 truncate cursor-pointer hover:text-blue-600"
          onClick={() => onClick(project.id)}
        >
          {project.name}
        </h3>
        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)} text-white`}>
          {project.status}
        </span>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
      
      <div className="flex justify-between items-center mb-2 text-xs text-gray-500">
        <span>Start: {formatDate(project.startDate)}</span>
        <span>End: {formatDate(project.endDate)}</span>
      </div>
      
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-600">Progress</span>
          <span className="text-xs font-medium text-gray-700">{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${getPriorityColor(project.priority)}`} 
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={project.progress}
          onChange={handleProgressChange}
          className="w-full mt-2 cursor-pointer"
        />
      </div>
      
      <div className="flex justify-between items-center">
        <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(project.priority)} text-white`}>
          {project.priority}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(project.id);
          }}
          className="text-red-500 hover:text-red-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;