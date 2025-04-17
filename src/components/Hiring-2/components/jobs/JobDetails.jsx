import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getJobs, getCandidates } from '../../utils/storage';
import { formatDate } from '../../utils/helpers';
import './JobDetails.css';

const JobDetails = () => {
  const { id } = useParams();
  const jobs = getJobs();
  const candidates = getCandidates();
  const job = jobs.find(j => j.id === id);

  if (!job) {
    return (
      <div className="job-details-container">
        <div className="job-not-found">
          <h2>Job not found</h2>
          <Link to="/hiring/jobs" className="back-button">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  // Calculate actual applicants for this job
  const jobApplicants = candidates.filter(c => c.jobId === job.id).length;
  
  return (
    <div className="job-details-page">
      <div className="job-header">
        <h2>Job Details</h2>
        <Link to="/hiring/jobs" className="back-button">
          Back to Jobs
        </Link>
      </div>
      
      <div className="job-info">
        <div className="info-row">
          <span className="label">Title:</span>
          <span className="value">{job.title}</span>
        </div>
        <div className="info-row">
          <span className="label">Status:</span>
          <span className="value" style={{ color: job.status === 'Active' ? '#2ecc71' : '#e74c3c' }}>
            {job.status}
          </span>
        </div>
        <div className="info-row">
          <span className="label">Location:</span>
          <span className="value">{job.location}</span>
        </div>
        <div className="info-row">
          <span className="label">Type:</span>
          <span className="value">{job.type}</span>
        </div>
        <div className="info-row">
          <span className="label">Openings:</span>
          <span className="value">{job.openings}</span>
        </div>
        <div className="info-row">
          <span className="label">Applicants:</span>
          <span className="value">{job.applicants || 0}</span>
        </div>
        {job.skills && (
          <div className="info-row">
            <span className="label">Skills:</span>
            <span className="value">{job.skills}</span>
          </div>
        )}
        {job.experience && (
          <div className="info-row">
            <span className="label">Experience:</span>
            <span className="value">{job.experience}</span>
          </div>
        )}
        {job.salary && (
          <div className="info-row">
            <span className="label">Salary:</span>
            <span className="value">{job.salary}</span>
          </div>
        )}
        <div className="info-row">
          <span className="label">Created:</span>
          <span className="value">{formatDate(job.createdAt)}</span>
        </div>
      </div>
      
      <div className="job-description">
        <h3>Job Description</h3>
        <p>{job.description}</p>
      </div>
    </div>
  );
};

export default JobDetails;