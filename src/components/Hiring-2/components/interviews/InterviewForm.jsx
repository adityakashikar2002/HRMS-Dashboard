import React, { useState, useEffect } from 'react';
import './InterviewForm.css';

const InterviewForm = ({ interview, candidates, jobs, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    candidateId: '',
    jobId: '',
    interviewer: '',
    interviewType: 'Technical',
    scheduledDate: '',
    status: 'Scheduled',
    feedback: ''
  });

  useEffect(() => {
    if (interview) {
      setFormData({
        candidateId: interview.candidateId,
        jobId: interview.jobId,
        interviewer: interview.interviewer,
        interviewType: interview.interviewType,
        scheduledDate: interview.scheduledDate,
        status: interview.status,
        feedback: interview.feedback || ''
      });
    }
  }, [interview]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCandidate = candidates.find(c => c.id === formData.candidateId);
    const selectedJob = jobs.find(j => j.id === formData.jobId);
    
    onSubmit({
      ...formData,
      candidateName: selectedCandidate ? selectedCandidate.name : '',
      jobTitle: selectedJob ? selectedJob.title : ''
    });
  };

  return (
    <div className="interview-form-overlay">
      <div className="interview-form">
        <h2>{interview ? 'Edit Interview' : 'Schedule Interview'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Candidate</label>
              <select
                name="candidateId"
                value={formData.candidateId}
                onChange={handleChange}
                required
              >
                <option value="">Select a candidate</option>
                {candidates.map(candidate => (
                  <option key={candidate.id} value={candidate.id}>
                    {candidate.name} ({candidate.jobTitle})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Job</label>
              <select
                name="jobId"
                value={formData.jobId}
                onChange={handleChange}
                required
              >
                <option value="">Select a job</option>
                {jobs.map(job => (
                  <option key={job.id} value={job.id}>{job.title}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Interviewer</label>
              <input
                type="text"
                name="interviewer"
                value={formData.interviewer}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Interview Type</label>
              <select
                name="interviewType"
                value={formData.interviewType}
                onChange={handleChange}
                required
              >
                <option value="Technical">Technical</option>
                <option value="Technical Advanced">Technical Advanced</option>
                <option value="HR">HR</option>
                <option value="Managerial">Managerial</option>
                <option value="Cultural Fit">Cultural Fit</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Scheduled Date & Time</label>
              <input
                type="datetime-local"
                name="scheduledDate"
                value={formData.scheduledDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>Feedback</label>
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              rows="3"
            />
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              {interview ? 'Update Interview' : 'Schedule Interview'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InterviewForm;