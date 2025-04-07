// ProjectStats.jsx
import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

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
  
  const statusData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: [
          'rgba(107, 114, 128, 0.7)', // gray
          'rgba(59, 130, 246, 0.7)',   // blue
          'rgba(234, 179, 8, 0.7)',    // yellow
          'rgba(34, 197, 94, 0.7)',    // green
          'rgba(239, 68, 68, 0.7)'     // red
        ],
        borderColor: [
          'rgba(107, 114, 128, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(234, 179, 8, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)'
        ],
        borderWidth: 1
      }
    ]
  };
  
  const priorityData = {
    labels: Object.keys(priorityCounts),
    datasets: [
      {
        label: 'Projects by Priority',
        data: Object.values(priorityCounts),
        backgroundColor: [
          'rgba(34, 197, 94, 0.7)',   // green
          'rgba(234, 179, 8, 0.7)',    // yellow
          'rgba(239, 68, 68, 0.7)'     // red
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(234, 179, 8, 1)',
          'rgba(239, 68, 68, 1)'
        ],
        borderWidth: 1
      }
    ]
  };
  
  const progressData = {
    labels: projects.map(p => p.name),
    datasets: [
      {
        label: 'Progress (%)',
        data: projects.map(p => p.progress),
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Project Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Status Distribution</h3>
          <div className="h-64">
            <Doughnut 
              data={statusData}
              options={{
                plugins: {
                  legend: {
                    labels: {
                      color: '#374151'
                    }
                  }
                }
              }}
            />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Priority Distribution</h3>
          <div className="h-64">
            <Bar 
              data={priorityData}
              options={{
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
                plugins: {
                  legend: {
                    labels: {
                      color: '#374151'
                    }
                  }
                }
              }}
            />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 md:col-span-2 lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Project Progress</h3>
          <div className="h-64">
            <Bar 
              data={progressData}
              options={{
                indexAxis: 'y',
                scales: {
                  x: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                      color: '#374151'
                    },
                    grid: {
                      color: 'rgba(209, 213, 219, 0.5)'
                    }
                  },
                  y: {
                    ticks: {
                      color: '#374151'
                    },
                    grid: {
                      color: 'rgba(209, 213, 219, 0.5)'
                    }
                  }
                },
                plugins: {
                  legend: {
                    labels: {
                      color: '#374151'
                    }
                  }
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