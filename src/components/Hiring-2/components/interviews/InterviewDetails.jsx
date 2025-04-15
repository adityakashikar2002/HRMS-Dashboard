import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getInterviews } from '../../utils/storage';
import { formatDateTime } from '../../utils/helpers';
import './InterviewDetails.css';

const InterviewDetails = () => {
  const { id } = useParams();
  const interviews = getInterviews();
  const interview = interviews.find(i => i.id === id);

  if (!interview) {
    return (
      <div className="interview-details-container">
        <div className="interview-not-found">
          <h2>Interview not found</h2>
          <Link to="/interviews" className="back-button">
            Back to Interviews
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="interview-details-container">
      <div className="interview-header">
        <h2>Interview Details</h2>
        <Link to="/interviews" className="back-button">
          Back to Interviews
        </Link>
      </div>
      
      <div className="interview-info">
        <div className="info-row">
          <span className="label">Candidate:</span>
          <span className="value">{interview.candidateName}</span>
        </div>
        <div className="info-row">
          <span className="label">Job:</span>
          <span className="value">{interview.jobTitle}</span>
        </div>
        <div className="info-row">
          <span className="label">Interviewer:</span>
          <span className="value">{interview.interviewer}</span>
        </div>
        <div className="info-row">
          <span className="label">Type:</span>
          <span className="value">{interview.interviewType}</span>
        </div>
        <div className="info-row">
          <span className="label">Scheduled:</span>
          <span className="value">{formatDateTime(interview.scheduledDate)}</span>
        </div>
        <div className="info-row">
          <span className="label">Status:</span>
          <span className="value" style={{ 
            color: interview.status === 'completed' ? '#2ecc71' : 
                  interview.status === 'cancelled' ? '#e74c3c' : '#f39c12'
          }}>
            {interview.status}
          </span>
        </div>
      </div>
      
      {interview.feedback && (
        <div className="interview-feedback">
          <h3>Feedback</h3>
          <p>{interview.feedback}</p>
        </div>
      )}
    </div>
  );
};

export default InterviewDetails;