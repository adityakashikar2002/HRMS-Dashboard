import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  getInterview, 
  updateInterview,
  getCandidate,
  getJob
} from '../utils/storage';
import Button from '../components/common/Button';
import '../styles/interviews.css';

const InterviewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const interview = getInterview(id);
  const [feedback, setFeedback] = useState(interview?.feedback || '');
  const [status, setStatus] = useState(interview?.status || 'scheduled');
  
  if (!interview) {
    return <div>Interview not found</div>;
  }

  const candidate = getCandidate(interview.candidateId);
  const job = getJob(interview.jobId);

  const handleSaveFeedback = () => {
    updateInterview({
      ...interview,
      feedback,
      status
    });
    navigate('/interviews');
  };

  return (
    <div className="interview-details">
      <div className="details-header">
        <Button type="secondary" onClick={() => navigate(-1)}>
          &larr; Back to Interviews
        </Button>
        <h1>Interview Details</h1>
      </div>

      <div className="details-content">
        <div className="details-section">
          <h2>Interview Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Candidate:</span>
              <span className="info-value">
                {candidate?.name || 'N/A'}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Job Position:</span>
              <span className="info-value">
                {job?.title || 'N/A'}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Interviewer:</span>
              <span className="info-value">{interview.interviewer}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Type:</span>
              <span className="info-value">{interview.type}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Scheduled At:</span>
              <span className="info-value">
                {formatDateTime(interview.scheduledAt)}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Status:</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="info-value"
              >
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="canceled">Canceled</option>
              </select>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h2>Interview Feedback</h2>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter interview feedback..."
            rows={8}
          />
        </div>

        <div className="details-actions">
          <Button type="secondary" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="primary" onClick={handleSaveFeedback}>
            Save Feedback
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewDetails;