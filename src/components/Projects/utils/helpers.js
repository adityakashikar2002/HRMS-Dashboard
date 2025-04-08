// // helpers.js
// export const getProgressByStatus = (status, currentProgress = 0) => {
//   switch (status) {
//     case 'Not Started': return 0;
//     case 'Planning': return 10;
//     case 'In Progress': return currentProgress; // Keep current progress when changing to In Progress
//     case 'Completed': return 100;
//     case 'On Hold': return currentProgress || 5; // Use current progress if available, otherwise 5 for new projects
//     default: return 0;
//   }
// };

// export const generateId = () => {
//   return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
// };

// export const formatDate = (dateString) => {
//   const options = { year: 'numeric', month: 'short', day: 'numeric' };
//   return new Date(dateString).toLocaleDateString(undefined, options);
// };

// export const formatDateTime = (dateString) => {
//   const options = { 
//     year: 'numeric', 
//     month: 'short', 
//     day: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit',
//     hour12: true
//   };
//   return new Date(dateString).toLocaleDateString(undefined, options);
// };

// export const calculateProgress = (tasks) => {
//   if (!tasks || tasks.length === 0) return 0;
//   const completed = tasks.filter(t => t.status === 'Completed').length;
//   return Math.round((completed / tasks.length) * 100);
// };

// export const getStatusColor = (status) => {
//   switch (status) {
//     case 'Not Started': return 'bg-gray-500';
//     case 'Planning': return 'bg-blue-500';
//     case 'In Progress': return 'bg-yellow-500';
//     case 'Completed': return 'bg-green-500';
//     case 'On Hold': return 'bg-red-500';
//     default: return 'bg-gray-500';
//   }
// };

// export const getPriorityColor = (priority) => {
//   switch (priority) {
//     case 'Low': return 'bg-green-500';
//     case 'Medium': return 'bg-yellow-500';
//     case 'High': return 'bg-red-500';
//     default: return 'bg-gray-500';
//   }
// };

// export const getProgressColor = (progress) => {
//   if (progress >= 90) return 'bg-green-500';
//   if (progress >= 50) return 'bg-blue-500';
//   if (progress > 0) return 'bg-yellow-500';
//   return 'bg-gray-300';
// };




// helpers.js
export const getProgressByStatus = (status, currentProgress = 0) => {
  switch (status) {
    case 'Not Started': return 0;
    case 'Planning': return 10;
    case 'In Progress': return currentProgress; // Keep current progress when changing to In Progress
    case 'Completed': return 100;
    case 'On Hold': return currentProgress || 5; // Use current progress if available, otherwise 5 for new projects
    default: return 0;
  }
};

export const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  return date.toLocaleTimeString('en-US', options).replace(',', '');
};

export const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
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

export const getProgressColor = (progress) => {
  if (progress >= 90) return 'bg-green-500';
  if (progress >= 50) return 'bg-blue-500';
  if (progress > 0) return 'bg-yellow-500';
  return 'bg-gray-300';
};