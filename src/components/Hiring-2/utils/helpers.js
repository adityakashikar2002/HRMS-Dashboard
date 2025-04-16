

export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  export const formatDateTime = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
