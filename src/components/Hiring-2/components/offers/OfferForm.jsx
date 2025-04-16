import React, { useState, useEffect } from 'react';
import SelectionTemplate from './SelectionTemplate';
import RejectionTemplate from './RejectionTemplate';
import './OfferForm.css';

const OfferForm = ({ offer, candidates, jobs, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    candidateId: '',
    jobId: '',
    offerType: 'selection',
    salary: '',
    onboardingDate: '',
    status: 'Pending'
  });

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    if (offer) {
      setFormData({
        candidateId: offer.candidateId,
        jobId: offer.jobId,
        offerType: offer.offerType,
        salary: offer.salary,
        onboardingDate: offer.onboardingDate || '',
        status: offer.status
      });
      
      const candidate = candidates.find(c => c.id === offer.candidateId);
      const job = jobs.find(j => j.id === offer.jobId);
      
      if (candidate) setSelectedCandidate(candidate);
      if (job) setSelectedJob(job);
    }
  }, [offer, candidates, jobs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCandidateChange = (e) => {
    const candidateId = e.target.value;
    const candidate = candidates.find(c => c.id === candidateId);
    setSelectedCandidate(candidate || null);
    handleChange(e);
  };

  const handleJobChange = (e) => {
    const jobId = e.target.value;
    const job = jobs.find(j => j.id === jobId);
    setSelectedJob(job || null);
    handleChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const offerData = {
      ...formData,
      candidateName: selectedCandidate ? selectedCandidate.name : '',
      jobTitle: selectedJob ? selectedJob.title : ''
    };
    
    onSubmit(offerData);
  };

  return (
    <div className="offer-form-overlay">
      <div className="offer-form">
        <h2>{offer ? 'Edit Offer' : 'Create Offer'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Candidate</label>
              <select
                name="candidateId"
                value={formData.candidateId}
                onChange={handleCandidateChange}
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
                onChange={handleJobChange}
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
              <label>Offer Type</label>
              <select
                name="offerType"
                value={formData.offerType}
                onChange={handleChange}
                required
              >
                <option value="selection">Selection</option>
                <option value="rejection">Rejection</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Salary Rs.</label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
              />
            </div>
            
            {formData.offerType === 'selection' && (
              <div className="form-group">
                <label>Onboarding Date</label>
                <input
                  type="date"
                  name="onboardingDate"
                  value={formData.onboardingDate}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
          
          <div className="offer-preview">
            <h3>Offer Preview</h3>
            {formData.offerType === 'selection' ? (
              <SelectionTemplate 
                candidate={selectedCandidate} 
                job={selectedJob} 
                salary={formData.salary}
                onboardingDate={formData.onboardingDate}
              />
            ) : (
              <RejectionTemplate 
                candidate={selectedCandidate} 
                job={selectedJob}
              />
            )}
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              {offer ? 'Update Offer' : 'Create Offer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OfferForm;