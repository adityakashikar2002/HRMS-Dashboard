// // ProjectStats.jsx
// import React from 'react';
// import { Doughnut, Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

// ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// const ProjectStats = ({ projects }) => {
//   if (projects.length === 0) {
//     return (
//       <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
//         <h2 className="text-xl font-bold text-gray-800 mb-6">Project Statistics</h2>
//         <p className="text-gray-600">No projects to display</p>
//       </div>
//     );
//   }

//   const statusCounts = projects.reduce((acc, project) => {
//     acc[project.status] = (acc[project.status] || 0) + 1;
//     return acc;
//   }, {});
  
//   const priorityCounts = projects.reduce((acc, project) => {
//     acc[project.priority] = (acc[project.priority] || 0) + 1;
//     return acc;
//   }, {});
  
//   const statusData = {
//     labels: Object.keys(statusCounts),
//     datasets: [
//       {
//         data: Object.values(statusCounts),
//         backgroundColor: [
//           'rgba(107, 114, 128, 0.7)', // gray
//           'rgba(59, 130, 246, 0.7)',   // blue
//           'rgba(234, 179, 8, 0.7)',    // yellow
//           'rgba(34, 197, 94, 0.7)',    // green
//           'rgba(239, 68, 68, 0.7)'     // red
//         ],
//         borderColor: [
//           'rgba(107, 114, 128, 1)',
//           'rgba(59, 130, 246, 1)',
//           'rgba(234, 179, 8, 1)',
//           'rgba(34, 197, 94, 1)',
//           'rgba(239, 68, 68, 1)'
//         ],
//         borderWidth: 1
//       }
//     ]
//   };
  
//   const priorityData = {
//     labels: Object.keys(priorityCounts),
//     datasets: [
//       {
//         label: 'Projects by Priority',
//         data: Object.values(priorityCounts),
//         backgroundColor: [
//           'rgba(34, 197, 94, 0.7)',   // green
//           'rgba(234, 179, 8, 0.7)',    // yellow
//           'rgba(239, 68, 68, 0.7)'     // red
//         ],
//         borderColor: [
//           'rgba(34, 197, 94, 1)',
//           'rgba(234, 179, 8, 1)',
//           'rgba(239, 68, 68, 1)'
//         ],
//         borderWidth: 1
//       }
//     ]
//   };
  
//   const progressData = {
//     labels: projects.map(p => p.name),
//     datasets: [
//       {
//         label: 'Progress (%)',
//         data: projects.map(p => p.progress),
//         backgroundColor: 'rgba(59, 130, 246, 0.7)',
//         borderColor: 'rgba(59, 130, 246, 1)',
//         borderWidth: 1
//       }
//     ]
//   };

//   return (
//     <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
//       <h2 className="text-xl font-bold text-gray-800 mb-6">Project Statistics</h2>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         <div className="bg-white p-4 rounded-lg border border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4">Status Distribution</h3>
//           <div className="h-64">
//             <Doughnut 
//               data={statusData}
//               options={{
//                 plugins: {
//                   legend: {
//                     labels: {
//                       color: '#374151'
//                     }
//                   }
//                 }
//               }}
//             />
//           </div>
//         </div>
        
//         <div className="bg-white p-4 rounded-lg border border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4">Priority Distribution</h3>
//           <div className="h-64">
//             <Bar 
//               data={priorityData}
//               options={{
//                 scales: {
//                   y: {
//                     beginAtZero: true,
//                     ticks: {
//                       stepSize: 1,
//                       color: '#374151'
//                     },
//                     grid: {
//                       color: 'rgba(209, 213, 219, 0.5)'
//                     }
//                   },
//                   x: {
//                     ticks: {
//                       color: '#374151'
//                     },
//                     grid: {
//                       color: 'rgba(209, 213, 219, 0.5)'
//                     }
//                   }
//                 },
//                 plugins: {
//                   legend: {
//                     labels: {
//                       color: '#374151'
//                     }
//                   }
//                 }
//               }}
//             />
//           </div>
//         </div>
        
//         <div className="bg-white p-4 rounded-lg border border-gray-200 md:col-span-2 lg:col-span-1">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4">Project Progress</h3>
//           <div className="h-64">
//             <Bar 
//               data={progressData}
//               options={{
//                 indexAxis: 'y',
//                 scales: {
//                   x: {
//                     beginAtZero: true,
//                     max: 100,
//                     ticks: {
//                       color: '#374151'
//                     },
//                     grid: {
//                       color: 'rgba(209, 213, 219, 0.5)'
//                     }
//                   },
//                   y: {
//                     ticks: {
//                       color: '#374151'
//                     },
//                     grid: {
//                       color: 'rgba(209, 213, 219, 0.5)'
//                     }
//                   }
//                 },
//                 plugins: {
//                   legend: {
//                     labels: {
//                       color: '#374151'
//                     }
//                   }
//                 }
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectStats;




// ProjectStats.jsx
import React from 'react';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title } from 'chart.js';

ChartJS.register(
  ArcElement, Tooltip, Legend, CategoryScale, 
  LinearScale, BarElement, PointElement, 
  LineElement, Title
);

const ProjectStats = ({ projects }) => {
  if (projects.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Project Statistics</h2>
        <p className="text-gray-600">No projects to display</p>
      </div>
    );
  }

  const statusCounts = projects.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1;
    return acc;
  }, {});
  
  const priorityCounts = projects.reduce((acc, project) => {
    acc[project.priority] = (acc[project.priority] || 0) + 1;
    return acc;
  }, {});
  
  // Enhanced status data with animations
  const statusData = {
    labels: Object.keys(statusCounts),
    datasets: [{
      data: Object.values(statusCounts),
      backgroundColor: [
        'rgba(99, 102, 241, 0.7)', // indigo
        'rgba(59, 130, 246, 0.7)', // blue
        'rgba(234, 179, 8, 0.7)',  // yellow
        'rgba(16, 185, 129, 0.7)', // green
        'rgba(239, 68, 68, 0.7)'   // red
      ],
      borderColor: [
        'rgba(99, 102, 241, 1)',
        'rgba(59, 130, 246, 1)',
        'rgba(234, 179, 8, 1)',
        'rgba(16, 185, 129, 1)',
        'rgba(239, 68, 68, 1)'
      ],
      borderWidth: 1,
      hoverOffset: 20
    }]
  };
  
  // Interactive priority data with gradient
  const priorityData = {
    labels: Object.keys(priorityCounts),
    datasets: [{
      label: 'Projects by Priority',
      data: Object.values(priorityCounts),
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0.7)'); // green
        gradient.addColorStop(0.5, 'rgba(234, 179, 8, 0.7)'); // yellow
        gradient.addColorStop(1, 'rgba(239, 68, 68, 0.7)'); // red
        return gradient;
      },
      borderColor: 'rgba(255, 255, 255, 0.8)',
      borderWidth: 2,
      borderRadius: 6,
      hoverBackgroundColor: 'rgba(99, 102, 241, 0.7)',
    }]
  };
  
  // Progress over time line chart
  const progressData = {
    labels: projects.map(p => p.name),
    datasets: [{
      label: 'Progress (%)',
      data: projects.map(p => p.progress),
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      borderColor: 'rgba(99, 102, 241, 1)',
      borderWidth: 2,
      tension: 0.4,
      fill: true,
      pointBackgroundColor: 'rgba(255, 255, 255, 1)',
      pointBorderColor: 'rgba(99, 102, 241, 1)',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7
    }]
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Project Statistics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Status Distribution</h3>
          <div className="h-80 relative">
            <Doughnut 
              data={statusData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                    labels: {
                      color: '#374151',
                      font: {
                        size: 12
                      },
                      padding: 20
                    }
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const value = context.raw;
                        const percentage = Math.round((value / total) * 100);
                        return `${context.label}: ${value} (${percentage}%)`;
                      }
                    }
                  }
                },
                animation: {
                  animateScale: true,
                  animateRotate: true
                }
              }}
            />
          </div>
        </div>
        
        {/* Priority Distribution */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Priority Distribution</h3>
          <div className="h-80 relative">
            <Bar 
              data={priorityData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.parsed.y} project(s)`
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                      color: '#374151'
                    },
                    grid: {
                      color: 'rgba(209, 213, 219, 0.5)'
                    }
                  },
                  x: {
                    ticks: {
                      color: '#374151'
                    },
                    grid: {
                      color: 'rgba(209, 213, 219, 0.5)'
                    }
                  }
                },
                interaction: {
                  intersect: false,
                  mode: 'index'
                },
                animation: {
                  duration: 2000,
                  easing: 'easeOutQuart'
                }
              }}
            />
          </div>
        </div>
        
        {/* Progress Over Time */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Progress Over Time</h3>
          <div className="h-96 relative">
            <Line 
              data={progressData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.parsed.y}% complete`
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                      color: '#374151',
                      callback: (value) => `${value}%`
                    },
                    grid: {
                      color: 'rgba(209, 213, 219, 0.5)'
                    }
                  },
                  x: {
                    ticks: {
                      color: '#374151'
                    },
                    grid: {
                      color: 'rgba(209, 213, 219, 0.5)'
                    }
                  }
                },
                interaction: {
                  intersect: false,
                  mode: 'index'
                },
                animation: {
                  duration: 2000
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStats;