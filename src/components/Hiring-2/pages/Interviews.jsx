// Interviews.jsx 17-4-25
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InterviewCard from '../components/interviews/InterviewCard';
import InterviewForm from '../components/interviews/InterviewForm';
import InterviewStats from '../components/interviews/InterviewStats';
import { getInterviews, addInterview, updateInterview, deleteInterview, getCandidates, getJobs } from '../utils/storage';
import '../assets/styles/Interviews.css';

const Interviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentInterview, setCurrentInterview] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const loadedInterviews = getInterviews();
    setInterviews(loadedInterviews);
    const loadedCandidates = getCandidates();
    setCandidates(loadedCandidates);
    const loadedJobs = getJobs();
    setJobs(loadedJobs);
  }, []);

  const handleAddInterview = () => {
    setCurrentInterview(null);
    setShowForm(true);
  };

  const handleEditInterview = (interview) => {
    setCurrentInterview(interview);
    setShowForm(true);
  };

  const handleDeleteInterview = (id) => {
    deleteInterview(id);
    setInterviews(getInterviews());
  };

  const handleSubmit = (interviewData) => {
    if (currentInterview) {
      updateInterview(currentInterview.id, interviewData);
    } else {
      addInterview(interviewData);
    }
    setInterviews(getInterviews());
    setShowForm(false);
  };

  const filteredInterviews = interviews.filter(interview => {
    if (filter === 'all') return true;
    return interview.status === filter;
  });

  return (
    <div className="interviews-page">
      <div className="interviews-header">
        <h1>Interviews</h1>
        <div className="interviews-actions">
          <div className="filter-buttons">
            <button 
              className={filter === 'all' ? 'active' : ''} 
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={filter === 'scheduled' ? 'active' : ''} 
              onClick={() => setFilter('Scheduled')}
            >
              Scheduled
            </button>
            <button 
              className={filter === 'completed' ? 'active' : ''} 
              onClick={() => setFilter('Completed')}
            >
              Completed
            </button>
            <button 
              className={filter === 'cancelled' ? 'active' : ''} 
              onClick={() => setFilter('Cancelled')}
            >
              Cancelled
            </button>
          </div>
          <button className="add-interview-button" onClick={handleAddInterview}>
            + Schedule Interview
          </button>
        </div>
      </div>

      {showForm && (
        <InterviewForm 
          interview={currentInterview} 
          candidates={candidates}
          jobs={jobs}
          onSubmit={handleSubmit} 
          onCancel={() => setShowForm(false)} 
        />
      )}

      <InterviewStats interviews={interviews} />

      <div className="interviews-grid">
        {filteredInterviews.length > 0 ? (
          filteredInterviews.map(interview => (
            <InterviewCard 
              key={interview.id} 
              interview={interview} 
              onEdit={handleEditInterview} 
              onDelete={handleDeleteInterview} 
            />
          ))
        ) : (
          <div className="no-interviews">No interviews found</div>
        )}
      </div>
    </div>
  );
};

export default Interviews;