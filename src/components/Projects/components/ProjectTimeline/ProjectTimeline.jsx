// // ProjectTimeline.jsx
// import React from 'react';
// import { formatDate } from '../../utils/helpers';

// const ProjectTimeline = ({ projects }) => {
//   if (projects.length === 0) {
//     return (
//       <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
//         <h2 className="text-xl font-bold text-gray-800 mb-6">Project Timeline</h2>
//         <p className="text-gray-600">No projects to display</p>
//       </div>
//     );
//   }

//   // Sort projects by start date
//   const sortedProjects = [...projects].sort((a, b) => 
//     new Date(a.startDate) - new Date(b.startDate)
//   );

//   // Calculate timeline range
//   const minDate = new Date(Math.min(...projects.map(p => new Date(p.startDate))));
//   const maxDate = new Date(Math.max(...projects.map(p => new Date(p.endDate))));
//   const totalDays = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24)) + 1;
  
//   // Calculate position and width for each project
//   const getProjectPosition = (project) => {
//     const startDay = Math.ceil((new Date(project.startDate) - minDate) / (1000 * 60 * 60 * 24));
//     const endDay = Math.ceil((new Date(project.endDate) - minDate) / (1000 * 60 * 60 * 24));
//     const durationDays = endDay - startDay + 1;
    
//     return {
//       left: `${(startDay / totalDays) * 100}%`,
//       width: `${(durationDays / totalDays) * 100}%`
//     };
//   };

//   // Generate date markers
//   const dateMarkers = [];
//   const markerInterval = Math.max(7, Math.floor(totalDays / 5)); // At least weekly markers
//   for (let i = 0; i <= totalDays; i += markerInterval) {
//     const date = new Date(minDate);
//     date.setDate(date.getDate() + i);
//     dateMarkers.push({
//       date,
//       position: `${(i / totalDays) * 100}%`
//     });
//   }

//   return (
//     <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
//       <h2 className="text-xl font-bold text-gray-800 mb-6">Project Timeline</h2>
      
//       <div className="relative h-64">
//         {/* Timeline axis */}
//         <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 transform -translate-y-1/2"></div>
        
//         {/* Date markers */}
//         {dateMarkers.map((marker, index) => (
//           <div 
//             key={index}
//             className="absolute top-1/2 h-4 w-px bg-gray-400 transform -translate-y-1/2"
//             style={{ left: marker.position }}
//           >
//             <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap">
//               {formatDate(marker.date)}
//             </div>
//           </div>
//         ))}
        
//         {/* Current date indicator */}
//         <div 
//           className="absolute top-0 bottom-0 w-px bg-red-500"
//           style={{
//             left: `${((new Date() - minDate) / (maxDate - minDate)) * 100}%`
//           }}
//         >
//           <div className="absolute -top-4 -left-2 text-xs text-red-500 whitespace-nowrap">
//             Today
//           </div>
//         </div>
        
//         {/* Project bars */}
//         {sortedProjects.map((project, index) => {
//           const position = getProjectPosition(project);
//           return (
//             <div 
//               key={project.id}
//               className="absolute h-8 bg-blue-500 rounded-md flex items-center px-2 shadow-sm"
//               style={{
//                 left: position.left,
//                 width: position.width,
//                 top: `${(index * 40) + 20}px`
//               }}
//             >
//               <span className="text-xs text-white truncate">
//                 {project.name}
//               </span>
//             </div>
//           );
//         })}
//       </div>
      
//       <div className="flex justify-between mt-8 text-xs text-gray-600">
//         <span>{formatDate(minDate)}</span>
//         <span>{formatDate(maxDate)}</span>
//       </div>
      
//       <div className="mt-4">
//         <h3 className="text-sm font-semibold text-gray-700 mb-2">Projects:</h3>
//         <div className="space-y-2">
//           {sortedProjects.map(project => (
//             <div key={project.id} className="flex items-center">
//               <div className="w-3 h-3 bg-blue-500 rounded-sm mr-2"></div>
//               <span className="text-sm text-gray-700">{project.name}</span>
//               <span className="text-xs text-gray-500 ml-2">
//                 ({formatDate(project.startDate)} - {formatDate(project.endDate)})
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectTimeline;



// ProjectTimeline.jsx
import React, { useState } from 'react';
import { formatDate } from '../../utils/helpers';
import { Tooltip } from 'react-tooltip';

const ProjectTimeline = ({ projects }) => {
  const [zoom, setZoom] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);

  if (projects.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Project Timeline</h2>
        <p className="text-gray-600">No projects to display</p>
      </div>
    );
  }

  // Sort projects by start date
  const sortedProjects = [...projects].sort((a, b) => 
    new Date(a.startDate) - new Date(b.startDate)
  );

  // Calculate timeline range
  const minDate = new Date(Math.min(...projects.map(p => new Date(p.startDate))));
  const maxDate = new Date(Math.max(...projects.map(p => new Date(p.endDate))));
  const totalDays = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24)) + 1;
  
  // Calculate position and width for each project
  const getProjectPosition = (project) => {
    const startDay = Math.ceil((new Date(project.startDate) - minDate) / (1000 * 60 * 60 * 24));
    const endDay = Math.ceil((new Date(project.endDate) - minDate) / (1000 * 60 * 60 * 24));
    const durationDays = endDay - startDay + 1;
    
    return {
      left: `${(startDay / totalDays) * 100}%`,
      width: `${(durationDays / totalDays) * 100}%`
    };
  };

  // Generate date markers
  const dateMarkers = [];
  const markerInterval = Math.max(7, Math.floor(totalDays / 5)); // At least weekly markers
  for (let i = 0; i <= totalDays; i += markerInterval) {
    const date = new Date(minDate);
    date.setDate(date.getDate() + i);
    dateMarkers.push({
      date,
      position: `${(i / totalDays) * 100}%`
    });
  }

  // Progress colors based on status
  const getProgressColor = (progress) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress > 0) return 'bg-yellow-500';
    return 'bg-gray-300';
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Project Timeline</h2>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
            className="bg-gray-200 p-1 rounded"
            disabled={zoom <= 0.5}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
          <span className="text-sm text-gray-600">{Math.round(zoom * 100)}%</span>
          <button 
            onClick={() => setZoom(Math.min(2, zoom + 0.1))}
            className="bg-gray-200 p-1 rounded"
            disabled={zoom >= 2}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="relative h-64 mb-4 overflow-x-auto">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 transform -translate-y-1/2"></div>
        
        {/* Date markers */}
        {dateMarkers.map((marker, index) => (
          <div 
            key={index}
            className="absolute top-1/2 h-4 w-px bg-gray-400 transform -translate-y-1/2"
            style={{ left: marker.position }}
          >
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap">
              {formatDate(marker.date)}
            </div>
          </div>
        ))}
        
        {/* Current date indicator */}
        <div 
          className="absolute top-0 bottom-0 w-px bg-red-500 z-10"
          style={{
            left: `${((new Date() - minDate) / (maxDate - minDate)) * 100}%`
          }}
        >
          <div className="absolute -top-4 -left-2 text-xs text-red-500 whitespace-nowrap">
            Today
          </div>
        </div>
        
        {/* Project bars */}
        {sortedProjects.map((project, index) => {
          const position = getProjectPosition(project);
          const progressColor = getProgressColor(project.progress);
          const tooltipId = `project-tooltip-${project.id}`;
          
          return (
            <div key={project.id} className="absolute h-12" style={{
              left: position.left,
              width: position.width,
              top: `${(index * 48) + 20}px`,
              transform: `scaleX(${zoom})`,
              transformOrigin: 'left center'
            }}>
              <div 
                className="absolute top-0 left-0 right-0 h-full bg-gray-200 rounded-md shadow-sm"
                data-tooltip-id={tooltipId}
                data-tooltip-place="top"
                onMouseEnter={() => setSelectedProject(project)}
                onMouseLeave={() => setSelectedProject(null)}
              >
                <div 
                  className={`h-full rounded-md ${progressColor}`}
                  style={{ width: `${project.progress}%` }}
                ></div>
                <div className="absolute inset-0 flex items-center px-2">
                  <span className="text-xs font-medium text-gray-800 truncate">
                    {project.name}
                  </span>
                </div>
              </div>
              
              <Tooltip id={tooltipId}>
                <div className="p-2 max-w-xs">
                  <h3 className="font-bold text-gray-800">{project.name}</h3>
                  <p className="text-sm text-gray-600">
                    {formatDate(project.startDate)} - {formatDate(project.endDate)}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className={`h-2 rounded-full ${progressColor}`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">
                    Progress: {project.progress}% • {project.status}
                  </p>
                </div>
              </Tooltip>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-between text-xs text-gray-600 mb-6">
        <span>{formatDate(minDate)}</span>
        <span>{formatDate(maxDate)}</span>
      </div>
      
      {/* Project details panel */}
      {selectedProject && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-2">{selectedProject.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="font-medium">{selectedProject.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Priority</p>
              <p className="font-medium">{selectedProject.priority}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Progress</p>
              <div className="flex items-center gap-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getProgressColor(selectedProject.progress)}`}
                    style={{ width: `${selectedProject.progress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{selectedProject.progress}%</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Project legend */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Projects:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {sortedProjects.map(project => {
            const progressColor = getProgressColor(project.progress);
            return (
              <div 
                key={project.id} 
                className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                onMouseEnter={() => setSelectedProject(project)}
                onMouseLeave={() => setSelectedProject(null)}
              >
                <div className={`w-3 h-3 rounded-sm mr-2 ${progressColor}`}></div>
                <span className="text-sm text-gray-700">{project.name}</span>
                <span className="text-xs text-gray-500 ml-auto">
                  {formatDate(project.startDate)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectTimeline;