import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJob, getCandidatesByJob } from '../utils/storage';
import Button from '../components/common/Button';
import '../styles/jobs.css';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = getJob(id);
  const candidates = getCandidatesByJob(id);

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className="job-details">
      <div className="details-header">
        <Button type="secondary" onClick={() => navigate(-1)}>
          &larr; Back to Jobs
        </Button>
        <h1>{job.title}</h1>
      </div>

      <div className="details-content">
        <div className="details-section">
          <h2>Job Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Status:</span>
              <span className="info-value" style={{ color: getStatusColor(job.status) }}>
                {job.status}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Open Positions:</span>
              <span className="info-value">{job.openings}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Job Type:</span>
              <span className="info-value">{job.type}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Location:</span>
              <span className="info-value">{job.location || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Created At:</span>
              <span className="info-value">{formatDate(job.createdAt)}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Applicants:</span>
              <span className="info-value">{job.applicants}</span>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h2>Job Description</h2>
          <p>{job.description}</p>
        </div>

        <div className="details-section">
          <h2>Requirements</h2>
          <p>{job.requirements || 'No specific requirements listed.'}</p>
        </div>

        <div className="details-section">
          <h2>Candidates ({candidates.length})</h2>
          {candidates.length > 0 ? (
            <div className="candidates-list">
              {candidates.map(candidate => (
                <div key={candidate.id} className="candidate-item">
                  <div className="candidate-info">
                    <h3>{candidate.name}</h3>
                    <p>{candidate.email}</p>
                    <span className={`stage-badge ${candidate.currentStage}`}>
                      {getStageInfo(candidate.currentStage).name}
                    </span>
                  </div>
                  <Button 
                    type="primary" 
                    onClick={() => navigate(`/hiring/candidates/${candidate.id}`)}
                  >
                    View Profile
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p>No candidates have applied for this job yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;