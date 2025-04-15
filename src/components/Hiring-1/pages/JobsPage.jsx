import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JobCard from '../components/Jobs/JobCard';
import JobForm from '../components/Jobs/JobForm';
import Button from '../components/common/Button';
import SearchBar from '../components/common/SearchBar';
import { getJobs, addJob, updateJob, deleteJob } from '../utils/storage';
import '../styles/jobs.css';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const jobsData = getJobs();
    setJobs(jobsData);
    setFilteredJobs(jobsData);
  }, []);

  useEffect(() => {
    const filtered = jobs.filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [searchTerm, jobs]);

  const handleAddJob = () => {
    setCurrentJob(null);
    setShowForm(true);
  };

  const handleEditJob = (job) => {
    setCurrentJob(job);
    setShowForm(true);
  };

  const handleSubmit = (jobData) => {
    if (currentJob) {
      const updatedJob = updateJob({ ...currentJob, ...jobData });
      setJobs(jobs.map(j => j.id === updatedJob.id ? updatedJob : j));
    } else {
      const newJob = addJob(jobData);
      setJobs([...jobs, newJob]);
    }
    setShowForm(false);
  };

  const handleDelete = (id) => {
    deleteJob(id);
    setJobs(jobs.filter(job => job.id !== id));
  };

  const viewJobDetails = (id) => {
    navigate(`/hiring/jobs/${id}`);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="jobs-page">
      <div className="page-header">
        <h1>Jobs</h1>
        <div className="page-actions">
          <SearchBar onSearch={handleSearch} placeholder="Search jobs..." />
          <Button type="primary" onClick={handleAddJob}>
            Add New Job
          </Button>
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
              onEdit={() => handleEditJob(job)}
              onDelete={() => handleDelete(job.id)}
              onView={() => viewJobDetails(job.id)}
            />
          ))
        ) : (
          <div className="no-results">
            No jobs found matching your search criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;