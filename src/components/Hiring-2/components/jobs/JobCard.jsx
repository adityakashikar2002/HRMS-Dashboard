// import React from 'react';
// import { Link } from 'react-router-dom';
// import './JobCard.css';

// const JobCard = ({ job, onEdit, onDelete }) => {
//   const getStatusColor = () => {
//     switch (job.status) {
//       case 'Active':
//         return '#2ecc71';
//       case 'Closed':
//         return '#e74c3c';
//       default:
//         return '#7f8c8d';
//     }
//   };

//   return (
//     <div className="job-card">
//       <div className="job-header">
//         <h3>{job.title}</h3>
//         <span 
//           className="job-status" 
//           style={{ backgroundColor: getStatusColor() }}
//         >
//           {job.status}
//         </span>
//       </div>
//       <div className="job-details">
//         <div className="job-info">
//           <span className="job-location">{job.location}</span>
//           <span className="job-type">{job.type}</span>
//         </div>
//         <div className="job-meta">
//           <span>Openings: {job.openings}</span>
//           <span>Applicants: {job.applicants || 0}</span>
//         </div>
//       </div>
//       <div className="job-description">
//         {job.description.substring(0, 100)}...
//       </div>
//       <div className="job-actions">
//         <Link to={`/hiring/jobs/${job.id}`} className="view-button">
//           View Details
//         </Link>
//         <button className="edit-button" onClick={() => onEdit(job)}>
//           Edit
//         </button>
//         <button className="delete-button" onClick={() => onDelete(job.id)}>
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// };

// export default JobCard;



import React from 'react';
import { Link } from 'react-router-dom';
import './JobCard.css';

const JobCard = ({ job, onEdit, onDelete }) => {
  const getStatusColor = () => {
    switch (job.status) {
      case 'Active':
        return '#2ecc71';
      case 'Closed':
        return '#e74c3c';
      default:
        return '#7f8c8d';
    }
  };

  return (
    <div className="job-card">
      <div className="job-header">
        <h3>{job.title}</h3>
        <span 
          className="job-status" 
          style={{ backgroundColor: getStatusColor() }}
        >
          {job.status}
        </span>
      </div>
      <div className="job-details">
        <div className="job-info">
          <span className="job-location">{job.location}</span>
          <span className="job-type">{job.type}</span>
        </div>
        <div className="job-meta">
          <span>Openings: {job.openings}</span>
          <span>Applicants: {job.applicants || 0}</span>
        </div>
      </div>
      <div className="job-description">
        {job.description.substring(0, 100)}...
      </div>
      <div className="job-actions">
        <Link to={`/hiring/jobs/${job.id}`} className="view-button">
          View Details
        </Link>
        <button className="edit-button" onClick={() => onEdit(job)}>
          Edit
        </button>
        <button className="delete-button" onClick={() => onDelete(job.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;