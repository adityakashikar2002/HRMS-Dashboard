import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CandidateCard from '../components/Candidates/CandidateCard';
import CandidateForm from '../components/Candidates/CandidateForm';
import Pipeline from '../components/Candidates/Pipeline';
import Button from '../components/common/Button';
import SearchBar from '../components/common/SearchBar';
import { 
  getCandidates, 
  addCandidate, 
  updateCandidate, 
  deleteCandidate,
  getJobs
} from '../utils/storage';
import '../styles/candidates.css';

const CandidatesPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentCandidate, setCurrentCandidate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [view, setView] = useState('list'); // 'list' or 'pipeline'
  const navigate = useNavigate();

  useEffect(() => {
    const candidatesData = getCandidates();
    setCandidates(candidatesData);
    setFilteredCandidates(candidatesData);
    setJobs(getJobs());
  }, []);

  useEffect(() => {
    const filtered = candidates.filter(candidate =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.phone.includes(searchTerm)
    );
    setFilteredCandidates(filtered);
  }, [searchTerm, candidates]);

  const handleAddCandidate = () => {
    setCurrentCandidate(null);
    setShowForm(true);
  };

  const handleEditCandidate = (candidate) => {
    setCurrentCandidate(candidate);
    setShowForm(true);
  };

  const handleSubmit = (candidateData) => {
    if (currentCandidate) {
      const updatedCandidate = updateCandidate({ ...currentCandidate, ...candidateData });
      setCandidates(candidates.map(c => c.id === updatedCandidate.id ? updatedCandidate : c));
    } else {
      const newCandidate = addCandidate(candidateData);
      setCandidates([...candidates, newCandidate]);
    }
    setShowForm(false);
  };

  const handleDelete = (id) => {
    deleteCandidate(id);
    setCandidates(candidates.filter(candidate => candidate.id !== id));
  };

  const viewCandidateDetails = (id) => {
    navigate(`/hiring/candidates/${id}`);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const updateCandidateStage = (candidateId, newStage) => {
    const updatedCandidate = updateCandidate({
      ...candidates.find(c => c.id === candidateId),
      currentStage: newStage
    });
    setCandidates(candidates.map(c => c.id === updatedCandidate.id ? updatedCandidate : c));
  };

  return (
    <div className="candidates-page">
      <div className="page-header">
        <h1>Candidates</h1>
        <div className="page-actions">
          <SearchBar onSearch={handleSearch} placeholder="Search candidates..." />
          <div className="view-toggle">
            <Button 
              type={view === 'list' ? 'primary' : 'secondary'} 
              onClick={() => setView('list')}
            >
              List View
            </Button>
            <Button 
              type={view === 'pipeline' ? 'primary' : 'secondary'} 
              onClick={() => setView('pipeline')}
            >
              Pipeline View
            </Button>
          </div>
          <Button type="primary" onClick={handleAddCandidate}>
            Add Candidate
          </Button>
        </div>
      </div>

      {showForm && (
        <CandidateForm 
          candidate={currentCandidate} 
          jobs={jobs}
          onSubmit={handleSubmit} 
          onCancel={() => setShowForm(false)} 
        />
      )}

      {view === 'list' ? (
        <div className="candidates-list">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map(candidate => {
              const job = jobs.find(j => j.id === candidate.jobId);
              
              return (
                <CandidateCard 
                  key={candidate.id}
                  candidate={candidate}
                  job={job}
                  onEdit={() => handleEditCandidate(candidate)}
                  onDelete={() => handleDelete(candidate.id)}
                  onView={() => viewCandidateDetails(candidate.id)}
                />
              );
            })
          ) : (
            <div className="no-results">
              No candidates found matching your search criteria.
            </div>
          )}
        </div>
      ) : (
        <Pipeline 
          candidates={filteredCandidates} 
          jobs={jobs}
          onUpdateStage={updateCandidateStage}
          onView={viewCandidateDetails}
        />
      )}
    </div>
  );
};

export default CandidatesPage;