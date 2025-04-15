import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InterviewCard from '../components/Interviews/InterviewCard';
import InterviewForm from '../components/Interviews/InterviewForm';
import InterviewStats from '../components/Interviews/InterviewStats';
import Button from '../components/common/Button';
import SearchBar from '../components/common/SearchBar';
import { 
  getInterviews, 
  addInterview, 
  updateInterview, 
  deleteInterview,
  getCandidates,
  getJobs
} from '../utils/storage';
import '../styles/interviews.css';

const InterviewsPage = () => {
  const [interviews, setInterviews] = useState([]);
  const [filteredInterviews, setFilteredInterviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentInterview, setCurrentInterview] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const interviewsData = getInterviews();
    setInterviews(interviewsData);
    setFilteredInterviews(interviewsData);
    setCandidates(getCandidates());
    setJobs(getJobs());
  }, []);

  useEffect(() => {
    const filtered = interviews.filter(interview => {
      const candidate = candidates.find(c => c.id === interview.candidateId);
      const job = jobs.find(j => j.id === interview.jobId);
      
      return (
        candidate?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        interview.interviewer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredInterviews(filtered);
  }, [searchTerm, interviews, candidates, jobs]);

  const handleAddInterview = () => {
    setCurrentInterview(null);
    setShowForm(true);
  };

  const handleEditInterview = (interview) => {
    setCurrentInterview(interview);
    setShowForm(true);
  };

  const handleSubmit = (interviewData) => {
    if (currentInterview) {
      const updatedInterview = updateInterview({ ...currentInterview, ...interviewData });
      setInterviews(interviews.map(i => i.id === updatedInterview.id ? updatedInterview : i));
    } else {
      const newInterview = addInterview(interviewData);
      setInterviews([...interviews, newInterview]);
    }
    setShowForm(false);
  };

  const handleDelete = (id) => {
    deleteInterview(id);
    setInterviews(interviews.filter(interview => interview.id !== id));
  };

  const viewInterviewDetails = (id) => {
    navigate(`/hiring/interviews/${id}`);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="interviews-page">
      <div className="page-header">
        <h1>Interviews</h1>
        <div className="page-actions">
          <SearchBar onSearch={handleSearch} placeholder="Search interviews..." />
          <Button type="primary" onClick={handleAddInterview}>
            Schedule Interview
          </Button>
        </div>
      </div>

      <InterviewStats interviews={interviews} />

      {showForm && (
        <InterviewForm 
          interview={currentInterview} 
          candidates={candidates}
          jobs={jobs}
          onSubmit={handleSubmit} 
          onCancel={() => setShowForm(false)} 
        />
      )}

      <div className="interviews-list">
        {filteredInterviews.length > 0 ? (
          filteredInterviews.map(interview => {
            const candidate = candidates.find(c => c.id === interview.candidateId);
            const job = jobs.find(j => j.id === interview.jobId);
            
            return (
              <InterviewCard 
                key={interview.id}
                interview={interview}
                candidate={candidate}
                job={job}
                onEdit={() => handleEditInterview(interview)}
                onDelete={() => handleDelete(interview.id)}
                onView={() => viewInterviewDetails(interview.id)}
              />
            );
          })
        ) : (
          <div className="no-results">
            No interviews found matching your search criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewsPage;