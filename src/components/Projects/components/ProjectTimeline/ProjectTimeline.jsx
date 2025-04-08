// // ProjectTimeline.jsx
// import React, { useState } from 'react';
// import { formatDate } from '../../utils/helpers';
// import { getStatusColor, getProgressColor } from '../../utils/helpers';

// const ProjectTimeline = ({ projects }) => {
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [expandedProjects, setExpandedProjects] = useState({});

//   if (projects.length === 0) {
//     return (
//       <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
//         <h2 className="text-xl font-bold text-gray-800 mb-6">Project Timeline</h2>
//         <p className="text-gray-600">No projects to display</p>
//       </div>
//     );
//   }

//   const sortedProjects = [...projects].sort((a, b) => 
//     new Date(a.startDate) - new Date(b.startDate)
//   );

//   const generateStations = (project) => {
//     const start = new Date(project.startDate);
//     const end = new Date(project.endDate);
//     const mid = new Date((start.getTime() + end.getTime()) / 2);

//     return [
//       {
//         name: 'Start',
//         date: project.startDate,
//         type: 'start',
//         progress: 0
//       },
//       {
//         name: 'Midpoint',
//         date: mid.toISOString().split('T')[0],
//         type: 'mid',
//         progress: 50
//       },
//       {
//         name: 'Deadline',
//         date: project.endDate,
//         type: 'deadline',
//         progress: 100
//       }
//     ];
//   };

//   const calculateCurrentProgress = (startDate, endDate) => {
//     const now = new Date();
//     const start = new Date(startDate);
//     const end = new Date(endDate);

//     if (now <= start) return 0;
//     if (now >= end) return 100;

//     const total = end - start;
//     const elapsed = now - start;
//     return Math.floor((elapsed / total) * 100);
//   };

//   const toggleProject = (projectId) => {
//     setExpandedProjects(prev => ({
//       ...prev,
//       [projectId]: !prev[projectId]
//     }));
//   };

//   const getDaysLeftMessage = (endDate) => {
//     const today = new Date();
//     const deadline = new Date(endDate);
//     const timeDiff = deadline - today;
//     const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    
//     if (daysLeft > 0) {
//       return `Hurry Up!! ${daysLeft} day${daysLeft !== 1 ? 's' : ''} left to reach deadline`;
//     } else if (daysLeft === 0) {
//       return "Deadline is today!";
//     } else {
//       return `Deadline passed ${Math.abs(daysLeft)} day${daysLeft !== -1 ? 's' : ''} ago`;
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
//       <h2 className="text-xl font-bold text-gray-800 mb-6">Project Timeline</h2>
      
//       <div className="relative">
//         <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-300 z-0"></div>
        
//         {sortedProjects.map((project) => {
//           const stations = generateStations(project);
//           const isExpanded = expandedProjects[project.id];
//           const currentProgress = calculateCurrentProgress(project.startDate, project.endDate);

//           return (
//             <div 
//               key={project.id} 
//               className="relative z-10 mb-8"
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
//                   {/* Timeline section */}
//                   <div className="relative h-32 mb-6">
//                     <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 transform -translate-y-1/2"></div>

//                     {/* 🚂 Train with tooltip on hover */}
//                     <div
//                       className="absolute top-1/2 transform -translate-y-1/2 max-w-[100px] max-h-[100px] mb-4 group"
//                       style={{ left: `${currentProgress}%` }}
//                     >
//                       <img
//                         src="https://em-content.zobj.net/source/skype/289/locomotive_1f682.png"
//                         loading="lazy"
//                         alt="Train"
//                         className="w-auto h-full"
//                       />
//                       <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-md text-xs whitespace-nowrap hidden group-hover:block">
//                         <div>{getDaysLeftMessage(project.endDate)}</div>
//                         <div>Today: {formatDate(new Date())}</div>
//                       </div>
//                     </div>

//                     {/* 🛑 Stations */}
//                     {stations.map((station, idx) => (
//                       <div 
//                         key={idx}
//                         className="absolute top-1/2 transform -translate-y-1/2"
//                         style={{ left: `${station.progress}%` }}
//                       >
//                         <div className="relative">
//                           <div className="w-4 h-4 rounded-full bg-white border-4 border-blue-600"></div>
//                           <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-white p-1 rounded shadow-md text-xs whitespace-nowrap">
//                             <div>{station.name}</div>
//                             <div className="text-gray-500">{formatDate(station.date)}</div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* 📋 Project details */}
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

//       {/* 🟢 Current Date Display */}
//       <div className="mt-6 pt-4 border-t border-gray-200">
//         <div className="flex items-center">
//           <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
//           <span className="text-sm">Today: {formatDate(new Date())}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectTimeline;

// ProjectTimeline.jsx
import React, { useState, useEffect } from 'react';
import { formatDate } from '../../utils/helpers';
import { getStatusColor, getProgressColor } from '../../utils/helpers';

const ProjectTimeline = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [expandedProjects, setExpandedProjects] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 3600000); // Update every hour (3600000 milliseconds)

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

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
    let mid;

    if (start.getTime() === end.getTime()) {
      mid = new Date(start); // If start and end are the same, midpoint is the same
    } else {
      mid = new Date((start.getTime() + end.getTime()) / 2);
    }

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
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start.getTime() === end.getTime()) {
      return 50; // Show train at midpoint if start and end are the same
    }

    if (currentTime <= start) return 0;
    if (currentTime >= end) return 100;

    const total = end.getTime() - start.getTime();
    const elapsed = currentTime.getTime() - start.getTime();
    return Math.floor((elapsed / total) * 100);
  };

  const toggleProject = (projectId) => {
    setExpandedProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const getDaysLeftMessage = (endDate) => {
    const deadline = new Date(endDate);
    const timeDiff = deadline.getTime() - currentTime.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysLeft > 0) {
      return `Hurry Up!! ${daysLeft} day${daysLeft !== 1 ? 's' : ''} left to reach deadline`;
    } else if (daysLeft === 0) {
      return "Deadline is today!";
    } else {
      return `Deadline passed ${Math.abs(daysLeft)} day${daysLeft !== -1 ? 's' : ''} ago`;
    }
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
                      style={{ left: `${Math.max(0, Math.min(100, currentProgress))}%` }}
                    >
                      <img
                        src="https://em-content.zobj.net/source/skype/289/locomotive_1f682.png"
                        loading="lazy"
                        alt="Train"
                        className="w-auto h-full"
                      />
                      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-md text-xs whitespace-nowrap hidden group-hover:block">
                        <div>{getDaysLeftMessage(project.endDate)}</div>
                        <div>Today: {formatDate(currentTime)}</div>
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
          <span className="text-sm">Today: {formatDate(currentTime)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectTimeline;
