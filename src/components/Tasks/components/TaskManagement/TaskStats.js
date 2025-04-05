// // src/components/TaskManagement/TaskStats.js
// import React from 'react';
// import { Bar, Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

// ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// const TaskStats = ({ tasks }) => {
//   const taskCounts = {
//     todo: tasks.todo.length,
//     inProgress: tasks.inProgress.length,
//     completed: tasks.completed.length,
//     total: tasks.todo.length + tasks.inProgress.length + tasks.completed.length
//   };

//   const priorityCounts = {
//     high: [...tasks.todo, ...tasks.inProgress, ...tasks.completed].filter(t => t.priority === 'high').length,
//     medium: [...tasks.todo, ...tasks.inProgress, ...tasks.completed].filter(t => t.priority === 'medium').length,
//     low: [...tasks.todo, ...tasks.inProgress, ...tasks.completed].filter(t => t.priority === 'low').length
//   };

//   const statusData = {
//     labels: ['To Do', 'In Progress', 'Completed'],
//     datasets: [
//       {
//         label: 'Tasks by Status',
//         data: [taskCounts.todo, taskCounts.inProgress, taskCounts.completed],
//         backgroundColor: [
//           'rgba(239, 68, 68, 0.7)',
//           'rgba(234, 179, 8, 0.7)',
//           'rgba(16, 185, 129, 0.7)'
//         ],
//         borderColor: [
//           'rgba(239, 68, 68, 1)',
//           'rgba(234, 179, 8, 1)',
//           'rgba(16, 185, 129, 1)'
//         ],
//         borderWidth: 1
//       }
//     ]
//   };

//   const priorityData = {
//     labels: ['High', 'Medium', 'Low'],
//     datasets: [
//       {
//         label: 'Tasks by Priority',
//         data: [priorityCounts.high, priorityCounts.medium, priorityCounts.low],
//         backgroundColor: [
//           'rgba(220, 38, 38, 0.7)',
//           'rgba(234, 179, 8, 0.7)',
//           'rgba(22, 163, 74, 0.7)'
//         ],
//         borderColor: [
//           'rgba(220, 38, 38, 1)',
//           'rgba(234, 179, 8, 1)',
//           'rgba(22, 163, 74, 1)'
//         ],
//         borderWidth: 1
//       }
//     ]
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
//       <h2 className="text-xl font-bold text-gray-800 mb-4">Task Statistics</h2>
      
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//         <div className="bg-blue-50 p-4 rounded-lg">
//           <h3 className="text-sm font-medium text-blue-800 mb-1">Total Tasks</h3>
//           <p className="text-3xl font-bold text-blue-600">{taskCounts.total}</p>
//         </div>
//         <div className="bg-yellow-50 p-4 rounded-lg">
//           <h3 className="text-sm font-medium text-yellow-800 mb-1">In Progress</h3>
//           <p className="text-3xl font-bold text-yellow-600">{taskCounts.inProgress}</p>
//         </div>
//         <div className="bg-green-50 p-4 rounded-lg">
//           <h3 className="text-sm font-medium text-green-800 mb-1">Completed</h3>
//           <p className="text-3xl font-bold text-green-600">{taskCounts.completed}</p>
//         </div>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white p-4 rounded-lg border border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-700 mb-3">Tasks by Status</h3>
//           <div className="h-64">
//             <Bar 
//               data={statusData} 
//               options={{ 
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                   legend: {
//                     position: 'bottom'
//                   }
//                 }
//               }} 
//             />
//           </div>
//         </div>
        
//         <div className="bg-white p-4 rounded-lg border border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-700 mb-3">Tasks by Priority</h3>
//           <div className="h-64">
//             <Pie 
//               data={priorityData} 
//               options={{ 
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                   legend: {
//                     position: 'bottom'
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

// export default TaskStats;





// src/components/TaskManagement/TaskStats.js
import React from 'react';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, ChartDataLabels);

const TaskStats = ({ tasks }) => {
  const taskCounts = {
    todo: tasks.todo.length,
    inProgress: tasks.inProgress.length,
    completed: tasks.completed.length,
    total: tasks.todo.length + tasks.inProgress.length + tasks.completed.length
  };

  const priorityCounts = {
    high: [...tasks.todo, ...tasks.inProgress, ...tasks.completed].filter(t => t.priority === 'high').length,
    medium: [...tasks.todo, ...tasks.inProgress, ...tasks.completed].filter(t => t.priority === 'medium').length,
    low: [...tasks.todo, ...tasks.inProgress, ...tasks.completed].filter(t => t.priority === 'low').length
  };

  const statusData = {
    labels: ['To Do', 'In Progress', 'Completed'],
    datasets: [{
      data: [taskCounts.todo, taskCounts.inProgress, taskCounts.completed],
      backgroundColor: [
        'rgba(239, 68, 68, 0.8)',
        'rgba(234, 179, 8, 0.8)',
        'rgba(16, 185, 129, 0.8)'
      ],
      borderColor: [
        'rgba(239, 68, 68, 1)',
        'rgba(234, 179, 8, 1)',
        'rgba(16, 185, 129, 1)'
      ],
      borderWidth: 2,
      borderRadius: 6,
      borderSkipped: false,
    }]
  };

  const priorityData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [{
      data: [priorityCounts.high, priorityCounts.medium, priorityCounts.low],
      backgroundColor: [
        'rgba(63, 81, 181, 0.8)',   // Indigo
        'rgba(0, 188, 212, 0.8)',   // Cyan
        'rgba(156, 39, 176, 0.8)'   // Purple
      ],
      borderColor: [
          'rgba(63, 81, 181, 1)',
          'rgba(0, 188, 212, 1)',
          'rgba(156, 39, 176, 1)'
      ],
      borderWidth: 2,
      cutout: '70%',
      radius: '90%',
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 20,
          font: {
            size: 13
          }
        }
      },
      datalabels: {
        color: '#fff',
        font: {
          weight: 'bold',
          size: 14
        },
        formatter: (value) => {
          return value > 0 ? value : '';
        }
      },
      title: {
        display: true,
        text: 'Tasks by Status',
        font: {
          size: 16,
          weight: '600'
        },
        padding: {
          bottom: 10
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false
        },
        ticks: {
          stepSize: 1
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 20,
          font: {
            size: 13
          }
        }
      },
      datalabels: {
        color: '#fff',
        font: {
          weight: 'bold',
          size: 14
        },
        formatter: (value) => {
          return value > 0 ? value : '';
        }
      },
      title: {
        display: true,
        text: 'Tasks by Priority',
        font: {
          size: 16,
          weight: '600'
        },
        padding: {
          bottom: 10
        }
      }
    },
    cutout: '65%'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Task Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 mb-1">Total Tasks</h3>
          <p className="text-3xl font-bold text-blue-600">{taskCounts.total}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-yellow-800 mb-1">In Progress</h3>
          <p className="text-3xl font-bold text-yellow-600">{taskCounts.inProgress}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-800 mb-1">Completed</h3>
          <p className="text-3xl font-bold text-green-600">{taskCounts.completed}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="h-80">
            <Bar 
              data={statusData} 
              options={chartOptions}
              plugins={[ChartDataLabels]}
            />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="h-80 relative">
            <Doughnut 
              data={priorityData} 
              options={doughnutOptions}
              plugins={[ChartDataLabels]}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-700">
                  {priorityCounts.high + priorityCounts.medium + priorityCounts.low}
                </div>
                <div className="text-sm text-gray-500">Total Tasks</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStats;