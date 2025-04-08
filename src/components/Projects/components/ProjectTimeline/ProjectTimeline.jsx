// // ProjectTimeline.jsx
// import React, { useState } from 'react';
// import { formatDate } from '../../utils/helpers';
// import { Tooltip } from 'react-tooltip';

// const ProjectTimeline = ({ projects }) => {
//   const [zoom, setZoom] = useState(1);
//   const [selectedProject, setSelectedProject] = useState(null);

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

//   // Progress colors based on status
//   const getProgressColor = (progress) => {
//     if (progress >= 90) return 'bg-green-500';
//     if (progress >= 50) return 'bg-blue-500';
//     if (progress > 0) return 'bg-yellow-500';
//     return 'bg-gray-300';
//   };

//   return (
//     <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-bold text-gray-800">Project Timeline</h2>
//         <div className="flex items-center gap-2">
//           <button 
//             onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
//             className="bg-gray-200 p-1 rounded"
//             disabled={zoom <= 0.5}
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
//             </svg>
//           </button>
//           <span className="text-sm text-gray-600">{Math.round(zoom * 100)}%</span>
//           <button 
//             onClick={() => setZoom(Math.min(2, zoom + 0.1))}
//             className="bg-gray-200 p-1 rounded"
//             disabled={zoom >= 2}
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
//             </svg>
//           </button>
//         </div>
//       </div>
      
//       <div className="relative h-64 mb-4 overflow-x-auto">
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
//           className="absolute top-0 bottom-0 w-px bg-red-500 z-10"
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
//           const progressColor = getProgressColor(project.progress);
//           const tooltipId = `project-tooltip-${project.id}`;
          
//           return (
//             <div key={project.id} className="absolute h-12" style={{
//               left: position.left,
//               width: position.width,
//               top: `${(index * 48) + 20}px`,
//               transform: `scaleX(${zoom})`,
//               transformOrigin: 'left center'
//             }}>
//               <div 
//                 className="absolute top-0 left-0 right-0 h-full bg-gray-200 rounded-md shadow-sm"
//                 data-tooltip-id={tooltipId}
//                 data-tooltip-place="top"
//                 onMouseEnter={() => setSelectedProject(project)}
//                 onMouseLeave={() => setSelectedProject(null)}
//               >
//                 <div 
//                   className={`h-full rounded-md ${progressColor}`}
//                   style={{ width: `${project.progress}%` }}
//                 ></div>
//                 <div className="absolute inset-0 flex items-center px-2">
//                   <span className="text-xs font-medium text-gray-800 truncate">
//                     {project.name}
//                   </span>
//                 </div>
//               </div>
              
//               <Tooltip id={tooltipId}>
//                 <div className="p-2 max-w-xs">
//                   <h3 className="font-bold text-gray-800">{project.name}</h3>
//                   <p className="text-sm text-gray-600">
//                     {formatDate(project.startDate)} - {formatDate(project.endDate)}
//                   </p>
//                   <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
//                     <div 
//                       className={`h-2 rounded-full ${progressColor}`}
//                       style={{ width: `${project.progress}%` }}
//                     ></div>
//                   </div>
//                   <p className="text-sm text-gray-700 mt-1">
//                     Progress: {project.progress}% • {project.status}
//                   </p>
//                 </div>
//               </Tooltip>
//             </div>
//           );
//         })}
//       </div>
      
//       <div className="flex justify-between text-xs text-gray-600 mb-6">
//         <span>{formatDate(minDate)}</span>
//         <span>{formatDate(maxDate)}</span>
//       </div>
      
//       {/* Project details panel */}
//       {selectedProject && (
//         <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//           <h3 className="font-bold text-gray-800 mb-2">{selectedProject.name}</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <p className="text-sm text-gray-600">Status</p>
//               <p className="font-medium">{selectedProject.status}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-600">Priority</p>
//               <p className="font-medium">{selectedProject.priority}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-600">Progress</p>
//               <div className="flex items-center gap-2">
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div 
//                     className={`h-2 rounded-full ${getProgressColor(selectedProject.progress)}`}
//                     style={{ width: `${selectedProject.progress}%` }}
//                   ></div>
//                 </div>
//                 <span className="text-sm font-medium">{selectedProject.progress}%</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* Project legend */}
//       <div className="mt-6">
//         <h3 className="text-sm font-semibold text-gray-700 mb-2">Projects:</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
//           {sortedProjects.map(project => {
//             const progressColor = getProgressColor(project.progress);
//             return (
//               <div 
//                 key={project.id} 
//                 className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
//                 onMouseEnter={() => setSelectedProject(project)}
//                 onMouseLeave={() => setSelectedProject(null)}
//               >
//                 <div className={`w-3 h-3 rounded-sm mr-2 ${progressColor}`}></div>
//                 <span className="text-sm text-gray-700">{project.name}</span>
//                 <span className="text-xs text-gray-500 ml-auto">
//                   {formatDate(project.startDate)}
//                 </span>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectTimeline;



// components/ProjectTimeline/ProjectTimeline.jsx
import React, { useState } from 'react';
import { formatDate } from '../../utils/helpers';
import { getStatusColor, getProgressColor } from '../../utils/helpers';

const ProjectTimeline = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [expandedProjects, setExpandedProjects] = useState({});

  if (projects.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Project Timeline</h2>
        <p className="text-gray-600">No projects to display</p>
      </div>
    );
  }

  const sortedProjects = [...projects].sort((a, b) => 
    new Date(a.startDate) - new Date(b.startDate)
  );

  const generateStations = (project) => {
    const start = new Date(project.startDate);
    const end = new Date(project.endDate);
    const mid = new Date((start.getTime() + end.getTime()) / 2);

    return [
      {
        name: 'Start',
        date: project.startDate,
        type: 'start',
        progress: 0
      },
      {
        name: 'Midpoint',
        date: mid.toISOString().split('T')[0],
        type: 'mid',
        progress: 50
      },
      {
        name: 'Deadline',
        date: project.endDate,
        type: 'deadline',
        progress: 100
      }
    ];
  };

  const calculateCurrentProgress = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now <= start) return 0;
    if (now >= end) return 100;

    const total = end - start;
    const elapsed = now - start;
    return Math.floor((elapsed / total) * 100);
  };

  const toggleProject = (projectId) => {
    setExpandedProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Project Timeline</h2>
      
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-300 z-0"></div>
        
        {sortedProjects.map((project) => {
          const stations = generateStations(project);
          const isExpanded = expandedProjects[project.id];
          const currentProgress = calculateCurrentProgress(project.startDate, project.endDate);

          return (
            <div 
              key={project.id} 
              className="relative z-10 mb-8"
              onMouseEnter={() => setSelectedProject(project)}
              onMouseLeave={() => setSelectedProject(null)}
            >
              <div 
                className="flex items-center cursor-pointer pl-8"
                onClick={() => toggleProject(project.id)}
              >
                <div className="absolute left-6 w-4 h-4 rounded-full bg-blue-600 border-4 border-white"></div>
                <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 ml-3">
                  {project.name}
                </h3>
                <span className={`ml-3 px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)} text-white`}>
                  {project.status}
                </span>
              </div>
              
              {isExpanded && (
                <div className="mt-4 ml-8 pl-8 border-l-2 border-gray-200">
                  {/* Timeline section */}
                  <div className="relative h-32 mb-6">
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 transform -translate-y-1/2"></div>

                    {/* 🚂 Train with tooltip on hover */}
                    <div
                      className="absolute top-1/2 transform -translate-y-1/2 max-w-[100px] max-h-[100px] mb-4 group"
                      style={{ left: `${currentProgress}%` }}
                    >
                      <img
                        src="https://em-content.zobj.net/source/skype/289/locomotive_1f682.png"
                        loading="lazy"
                        alt="Train"
                        className="w-auto h-full"
                      />
                      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-md text-xs whitespace-nowrap hidden group-hover:block">
                        <div>Today: {formatDate(new Date())}</div>
                        <div>Progress: {currentProgress}%</div>
                      </div>
                    </div>

                    {/* 🛑 Stations */}
                    {stations.map((station, idx) => (
                      <div 
                        key={idx}
                        className="absolute top-1/2 transform -translate-y-1/2"
                        style={{ left: `${station.progress}%` }}
                      >
                        <div className="relative">
                          <div className="w-4 h-4 rounded-full bg-white border-4 border-blue-600"></div>
                          <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-white p-1 rounded shadow-md text-xs whitespace-nowrap">
                            <div>{station.name}</div>
                            <div className="text-gray-500">{formatDate(station.date)}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 📋 Project details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-500">Start Date</div>
                      <div className="font-medium">{formatDate(project.startDate)}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-500">End Date</div>
                      <div className="font-medium">{formatDate(project.endDate)}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-500">Progress</div>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">{project.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 🟢 Current Date Display */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
          <span className="text-sm">Today: {formatDate(new Date())}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectTimeline;




// // components/ProjectTimeline/ProjectTimeline.jsx
// import React, { useState, useEffect } from 'react';
// import { formatDate } from '../../utils/helpers';
// import { getStatusColor, getProgressColor } from '../../utils/helpers';

// const ProjectTimeline = ({ projects }) => {
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [expandedProjects, setExpandedProjects] = useState({});
//   const [trainTooltip, setTrainTooltip] = useState(null);
//   const [currentDate, setCurrentDate] = useState(new Date());

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCurrentDate(new Date());
//     }, 60 * 60 * 1000); // Update every hour (adjust as needed)

//     return () => clearInterval(intervalId);
//   }, []);

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

//   // Function to calculate the train's position based on dates
//   const calculateTrainPosition = (startDate, endDate) => {
//     const start = new Date(startDate);
//     const end = new Date(endDate);

//     if (currentDate < start) {
//       return 0; // Before the project starts
//     }
//     if (currentDate > end) {
//       return 100; // Project is finished
//     }

//     const totalTime = end.getTime() - start.getTime();
//     const elapsedTime = currentDate.getTime() - start.getTime();
//     const progressPercentage = (elapsedTime / totalTime) * 100;

//     return isNaN(progressPercentage) ? 0 : progressPercentage;
//   };

//   const toggleProject = (projectId) => {
//     setExpandedProjects(prev => ({
//       ...prev,
//       [projectId]: !prev[projectId]
//     }));
//   };

//   const handleTrainHover = (event, project) => {
//     const rect = event.target.getBoundingClientRect();
//     setTrainTooltip({
//       x: rect.left + rect.width / 2,
//       y: rect.top - 35,
//       progress: calculateTrainPosition(project.startDate, project.endDate).toFixed(2),
//       date: formatDate(currentDate),
//     });
//   };

//   const handleTrainMouseLeave = () => {
//     setTrainTooltip(null);
//   };

//   return (
//     <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
//       <h2 className="text-xl font-bold text-gray-800 mb-6">Project Timeline</h2>

//       <div className="relative">
//         {/* Timeline track */}
//         <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-300 z-0"></div>

//         {sortedProjects.map((project, index) => {
//           const isExpanded = expandedProjects[project.id];
//           const trainPosition = isExpanded ? calculateTrainPosition(project.startDate, project.endDate) : 0;

//           return (
//             <div
//               key={project.id}
//               className="relative z-10 mb-12" // Increased margin to accommodate train info below
//               onMouseEnter={() => setSelectedProject(project)}
//               onMouseLeave={() => setSelectedProject(null)}
//             >
//               <div
//                 className="flex items-center cursor-pointer pl-8"
//                 onClick={() => toggleProject(project.id)}
//               >
//                 <div className="absolute left-6 w-4 h-4 rounded-full bg-blue-600 border-4 border-white"></div>
//                 <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 ml-3">
//                   {project.name}
//                 </h3>
//                 <span className={`ml-3 px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)} text-white`}>
//                   {project.status}
//                 </span>
//               </div>

//               {isExpanded && (
//                 <div className="mt-4 ml-8 pl-8 border-l-2 border-gray-200">
//                   {/* Train progress */}
//                   <div className="relative h-10 mb-8"> {/* Increased margin below train track */}
//                     {/* Train track */}
//                     <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 transform -translate-y-1/2"></div>

//                     {/* Train */}
//                     <div
//                       className="absolute top-1/2 transform -translate-y-1/2 max-w-[100px] max-h-[100px] cursor-pointer"
//                       style={{ left: `${trainPosition}%` }}
//                       onMouseEnter={(e) => handleTrainHover(e, project)}
//                       onMouseLeave={handleTrainMouseLeave}
//                     >
//                       <img
//                         src="https://em-content.zobj.net/source/skype/289/locomotive_1f682.png"
//                         loading="lazy"
//                         alt="Train"
//                         className="w-auto h-full"
//                       />
//                     </div>

//                     {/* Train Info Below */}
//                     <div
//                       className="absolute top-[calc(50% + 2rem)] left-1/2 transform -translate-x-1/2 text-center text-sm text-gray-600"
//                       style={{ left: `${trainPosition}%` }}
//                     >
//                       {formatDate(currentDate)}
//                     </div>

//                     {/* Stations (Adjusted for date-based positioning) */}
//                     <div className="absolute top-1 left-0 right-0 flex items-center justify-between transform -translate-y-1/2">
//                       <div className="text-xs text-gray-500 -translate-x-1/2" style={{ left: '0%' }}>
//                         {formatDate(project.startDate)} (Start)
//                       </div>
//                       <div className="text-xs text-gray-500 text-center" style={{ left: '50%' }}>
//                         Midpoint
//                       </div>
//                       <div className="text-xs text-gray-500 translate-x-1/2" style={{ left: '100%' }}>
//                         {formatDate(project.endDate)} (Deadline)
//                       </div>
//                       {/* You can add more dynamic milestones here if needed */}
//                     </div>
//                   </div>

//                   {/* Project details */}
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                     <div className="bg-gray-50 p-3 rounded-lg">
//                       <div className="text-sm text-gray-500">Start Date</div>
//                       <div className="font-medium">{formatDate(project.startDate)}</div>
//                     </div>
//                     <div className="bg-gray-50 p-3 rounded-lg">
//                       <div className="text-sm text-gray-500">End Date</div>
//                       <div className="font-medium">{formatDate(project.endDate)}</div>
//                     </div>
//                     <div className="bg-gray-50 p-3 rounded-lg">
//                       <div className="text-sm text-gray-500">Progress</div>
//                       <div className="flex items-center gap-2">
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div
//                             className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
//                             style={{ width: `${project.progress}%` }}
//                           ></div>
//                         </div>
//                         <span className="text-sm">{project.progress}%</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Train Tooltip */}
//       {trainTooltip && (
//         <div
//           className="absolute bg-black text-white text-xs rounded py-1 px-2 z-20"
//           style={{
//             left: `${trainTooltip.x}px`,
//             top: `${trainTooltip.y}px`,
//             transform: 'translateX(-50%)',
//           }}
//         >
//           Progress: {trainTooltip.progress}%<br />
//           Date: {trainTooltip.date}
//         </div>
//       )}

//       {/* Current date indicator */}
//       <div className="mt-6 pt-4 border-t border-gray-200">
//         <div className="flex items-center">
//           <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
//           <span className="text-sm">Today: {formatDate(currentDate)}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectTimeline;