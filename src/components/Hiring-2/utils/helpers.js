// export const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };
  
//   export const formatDateTime = (dateString) => {
//     const options = { 
//       year: 'numeric', 
//       month: 'short', 
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };
  
//   export const getRandomItem = (array) => {
//     return array[Math.floor(Math.random() * array.length)];
//   };
  
//   export const generateRandomDate = (start, end) => {
//     return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
//   };
  
//   export const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case 'active':
//       case 'hired':
//       case 'accepted':
//       case 'completed':
//         return '#2ecc71';
//       case 'closed':
//       case 'rejected':
//       case 'cancelled':
//         return '#e74c3c';
//       case 'pending':
//       case 'scheduled':
//         return '#f39c12';
//       default:
//         return '#7f8c8d';
//     }
//   };


// helpers.js
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTimeSlot = (startTime, endTime) => {
  // Convert 24-hour format to 12-hour format for display
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${period}`;
  };
  
  return `${formatTime(startTime)} - ${formatTime(endTime)}`;
};

export const formatDateTime = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const formatTime = (timeString) => {
  if (!timeString) return '';
  const [time, period] = timeString.split(' ');
  return `${time} ${period}`;
};

export const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const generateRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
};

export const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'hired':
    case 'accepted':
    case 'completed':
      return '#2ecc71';
    case 'closed':
    case 'rejected':
    case 'cancelled':
      return '#e74c3c';
    case 'pending':
    case 'scheduled':
      return '#f39c12';
    default:
      return '#7f8c8d';
  }
};

export const isToday = (date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};