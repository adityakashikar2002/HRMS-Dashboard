// export const generateId = () => {
//     return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
//   };
  
//   export const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };
  
//   export const calculateProgress = (tasks) => {
//     if (!tasks || tasks.length === 0) return 0;
//     const completed = tasks.filter(t => t.status === 'Completed').length;
//     return Math.round((completed / tasks.length) * 100);
//   };
  
//   export const getStatusColor = (status) => {
//     switch (status) {
//       case 'Not Started': return 'bg-gray-500';
//       case 'Planning': return 'bg-blue-500';
//       case 'In Progress': return 'bg-yellow-500';
//       case 'Completed': return 'bg-green-500';
//       case 'On Hold': return 'bg-red-500';
//       default: return 'bg-gray-500';
//     }
//   };
  
//   export const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'Low': return 'bg-green-500';
//       case 'Medium': return 'bg-yellow-500';
//       case 'High': return 'bg-red-500';
//       default: return 'bg-gray-500';
//     }
//   };





// helpers.js
export const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const calculateProgress = (tasks) => {
  if (!tasks || tasks.length === 0) return 0;
  const completed = tasks.filter(t => t.status === 'Completed').length;
  return Math.round((completed / tasks.length) * 100);
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'Not Started': return 'bg-gray-500';
    case 'Planning': return 'bg-blue-500';
    case 'In Progress': return 'bg-yellow-500';
    case 'Completed': return 'bg-green-500';
    case 'On Hold': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'Low': return 'bg-green-500';
    case 'Medium': return 'bg-yellow-500';
    case 'High': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};