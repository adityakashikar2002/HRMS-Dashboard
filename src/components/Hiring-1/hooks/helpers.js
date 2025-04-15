import { INTERVIEW_STAGES } from './constants';

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

export const getStageInfo = (stage) => {
  return INTERVIEW_STAGES[stage] || { name: stage, color: '#9E9E9E' };
};

export const getStatusColor = (status) => {
  const statusColors = {
    active: '#4CAF50',
    closed: '#F44336',
    'on-hold': '#FFC107',
    scheduled: '#2196F3',
    completed: '#4CAF50',
    canceled: '#F44336',
    pending: '#FFC107',
    accepted: '#4CAF50',
    rejected: '#F44336',
    hired: '#8BC34A',
    'offer-pending': '#FF9800'
  };
  return statusColors[status] || '#9E9E9E';
};

export const generateOfferContent = (type, candidate, job) => {
  const templates = {
    selection: `Dear ${candidate.name},

Congratulations! We are pleased to offer you the position of ${job.title} at our company.

Position: ${job.title}
Type: ${job.type}
Location: ${job.location}
Start Date: {onboardingDate}

We believe your skills and experience will be a great addition to our team. Please let us know your decision by {responseDate}.

Best regards,
Hiring Team`,
    rejection: `Dear ${candidate.name},

Thank you for your interest in the ${job.title} position at our company.

After careful consideration, we've decided to move forward with other candidates whose qualifications more closely match our needs at this time.

We appreciate the time you invested in the application process and wish you the best in your job search.

Best regards,
Hiring Team`
  };
  
  return templates[type] || '';
};