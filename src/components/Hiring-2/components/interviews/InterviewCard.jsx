// InterviewCard.jsx 17-4-25
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/helpers';
import './InterviewCard.css';

const InterviewCard = ({ interview, onEdit, onDelete }) => {
  const getStatusColor = () => {
    switch (interview.status) {
      case 'Scheduled':
        return '#f39c12';
      case 'Completed':
        return '#2ecc71';
      case 'Cancelled':
        return '#e74c3c';
      default:
        return '#7f8c8d';
    }
  };

  return (
    <div className="interview-card">
      <div className="interview-header">
        <h3>{interview.candidateName}</h3>
        <span 
          className="interview-status" 
          style={{ backgroundColor: getStatusColor() }}
        >
          {interview.status}
        </span>
      </div>
      <div className="interview-details">
        <div className="detail-item">
          <span className="label">Job:</span>
          <span className="value">{interview.jobTitle}</span>
        </div>
        <div className="detail-item">
          <span className="label">Interviewer:</span>
          <span className="value">{interview.interviewer}</span>
        </div>
        <div className="detail-item">
          <span className="label">Type:</span>
          <span className="value">{interview.interviewType}</span>
        </div>
        <div className="detail-item">
          <span className="label">Time:</span>
          <span className="value">{interview.timeSlot}</span>
        </div>
        <div className="detail-item">
          <span className="label">Date:</span>
          <span className="value">{formatDate(interview.scheduledDate)}</span>
        </div>
        {interview.feedback && (
          <div className="detail-item">
            <span className="label">Feedback:</span>
            <span className="value">{interview.feedback}</span>
          </div>
        )}
      </div>
      <div className="interview-actions">
        <Link to={`/hiring/interviews/${interview.id}`} className="view-button">
          View Details
        </Link>
        <button className="edit-button" onClick={() => onEdit(interview)}>
          Edit
        </button>
        <button className="delete-button" onClick={() => onDelete(interview.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default InterviewCard;