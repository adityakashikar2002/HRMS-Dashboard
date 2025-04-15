import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCandidates, getJobs } from '../../utils/storage';
import { formatDate } from '../../utils/helpers';
import './CandidateDetails.css';

const CandidateDetails = () => {
  const { id } = useParams();
  const candidates = getCandidates();
  const jobs = getJobs();
  const candidate = candidates.find(c => c.id === id);

  if (!candidate) {
    return (
      <div className="candidate-details-container">
        <div className="candidate-not-found">
          <h2>Candidate not found</h2>
          <Link to="/hiring/candidates" className="back-button">
            Back to Candidates
          </Link>
        </div>
      </div>
    );
  }

  const job = jobs.find(j => j.id === candidate.jobId);

  return (
    <div className="candidate-details-container">
      <div className="candidate-header">
        <h2>Candidate Details</h2>
        <Link to="/hiring/candidates" className="back-button">
          Back to Candidates
        </Link>
      </div>
      
      <div className="candidate-info">
        <div className="info-row">
          <span className="label">Name:</span>
          <span className="value">{candidate.name}</span>
        </div>
        <div className="info-row">
          <span className="label">Email:</span>
          <span className="value">{candidate.email}</span>
        </div>
        <div className="info-row">
          <span className="label">Phone:</span>
          <span className="value">{candidate.phone}</span>
        </div>
        <div className="info-row">
          <span className="label">Applied for:</span>
          <span className="value">{job ? job.title : candidate.jobTitle}</span>
        </div>
        <div className="info-row">
          <span className="label">Source:</span>
          <span className="value">{candidate.source}</span>
        </div>
        <div className="info-row">
          <span className="label">Status:</span>
          <span className="value" style={{ 
            color: candidate.status === 'hired' ? '#2ecc71' : 
                  candidate.status === 'rejected' ? '#e74c3c' : 
                  candidate.status === 'interview' ? '#f39c12' : '#3498db'
          }}>
            {candidate.status}
          </span>
        </div>
        <div className="info-row">
          <span className="label">Current Stage:</span>
          <span className="value">{candidate.currentStage}</span>
        </div>
        <div className="info-row">
          <span className="label">Applied on:</span>
          <span className="value">{formatDate(candidate.appliedAt)}</span>
        </div>
        <div className="info-row">
          <span className="label">Resume:</span>
          <span className="value">
            {candidate.resume ? (
              <a href="#" className="resume-link">{candidate.resume}</a>
            ) : 'Not provided'}
          </span>
        </div>
      </div>
      
      <div className="candidate-notes">
        <h3>Notes</h3>
        <textarea 
          className="notes-textarea" 
          placeholder="Add notes about this candidate..."
          defaultValue={candidate.notes || ''}
        />
        <button className="save-notes-button">Save Notes</button>
      </div>
    </div>
  );
};

export default CandidateDetails;