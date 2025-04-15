import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/helpers';
import './CandidateCard.css';

const CandidateCard = ({ candidate, onEdit, onDelete }) => {
  const getStatusColor = () => {
    switch (candidate.status) {
      case 'hired':
        return '#2ecc71';
      case 'rejected':
        return '#e74c3c';
      case 'interview':
        return '#f39c12';
      case 'offer':
        return '#3498db';
      default:
        return '#7f8c8d';
    }
  };

  return (
    <div className="candidate-card">
      <div className="candidate-header">
        <h3>{candidate.name}</h3>
        <span 
          className="candidate-status" 
          style={{ backgroundColor: getStatusColor() }}
        >
          {candidate.status}
        </span>
      </div>
      <div className="candidate-details">
        <div className="candidate-info">
          <div className="info-item">
            <span className="label">Applied for:</span>
            <span className="value">{candidate.jobTitle}</span>
          </div>
          <div className="info-item">
            <span className="label">Email:</span>
            <span className="value">{candidate.email}</span>
          </div>
          <div className="info-item">
            <span className="label">Phone:</span>
            <span className="value">{candidate.phone}</span>
          </div>
          <div className="info-item">
            <span className="label">Source:</span>
            <span className="value">{candidate.source}</span>
          </div>
          <div className="info-item">
            <span className="label">Applied on:</span>
            <span className="value">{formatDate(candidate.appliedAt)}</span>
          </div>
          <div className="info-item">
            <span className="label">Current Stage:</span>
            <span className="value">{candidate.currentStage}</span>
          </div>
        </div>
      </div>
      <div className="candidate-actions">
        <Link to={`/hiring/candidates/${candidate.id}`} className="view-button">
          View Details
        </Link>
        <button className="edit-button" onClick={() => onEdit(candidate)}>
          Edit
        </button>
        <button className="delete-button" onClick={() => onDelete(candidate.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default CandidateCard;