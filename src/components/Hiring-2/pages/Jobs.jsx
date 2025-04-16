import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import JobCard from '../components/jobs/JobCard';
import JobForm from '../components/jobs/JobForm';
import { getJobs, addJob, updateJob, deleteJob } from '../utils/storage';
import '../assets/styles/Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const loadedJobs = getJobs();
    setJobs(loadedJobs);
  }, []);

  const handleAddJob = () => {
    setCurrentJob(null);
    setShowForm(true);
  };

  const handleEditJob = (job) => {
    setCurrentJob(job);
    setShowForm(true);
  };

  const handleDeleteJob = (id) => {
    deleteJob(id);
    setJobs(getJobs());
  };

  const handleSubmit = (jobData) => {
    if (currentJob) {
      updateJob(currentJob.id, jobData);
    } else {
      addJob(jobData);
    }
    setJobs(getJobs());
    setShowForm(false);
  };

  const filteredJobs = jobs.filter(job => {
    if (filter === 'all') return true;
    return job.status === filter;
  });

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <h1>Jobs</h1>
        <div className="jobs-actions">
          <div className="filter-buttons">
            <button 
              className={filter === 'all' ? 'active' : ''} 
              onClick={() => setFilter('all')}
            >
              All Jobs
            </button>
            <button 
              className={filter === 'active' ? 'active' : ''} 
              onClick={() => setFilter('Active')}
            >
              Active
            </button>
            <button 
              className={filter === 'closed' ? 'active' : ''} 
              onClick={() => setFilter('Closed')}
            >
              Closed
            </button>
          </div>
          <button className="add-job-button" onClick={handleAddJob}>
            + Add New Job
          </button>
        </div>
      </div>

      {showForm && (
        <JobForm 
          job={currentJob} 
          onSubmit={handleSubmit} 
          onCancel={() => setShowForm(false)} 
        />
      )}

      <div className="jobs-grid">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <JobCard 
              key={job.id} 
              job={job} 
              onEdit={handleEditJob} 
              onDelete={handleDeleteJob} 
            />
          ))
        ) : (
          <div className="no-jobs">No jobs found</div>
        )}
      </div>
    </div>
  );
};

export default Jobs;