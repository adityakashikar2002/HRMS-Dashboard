// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import CandidateCard from '../components/candidates/CandidateCard';
// import CandidateForm from '../components/candidates/CandidateForm';
// import Pipeline from '../components/candidates/Pipeline';
// import { getCandidates, addCandidate, updateCandidate, deleteCandidate, getJobs } from '../utils/storage';
// import '../assets/styles/Candidates.css';

// const Candidates = () => {
//   const [candidates, setCandidates] = useState([]);
//   const [jobs, setJobs] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [currentCandidate, setCurrentCandidate] = useState(null);
//   const [view, setView] = useState('list'); // 'list' or 'pipeline'
//   const [filter, setFilter] = useState('all');

//   useEffect(() => {
//     const loadedCandidates = getCandidates();
//     setCandidates(loadedCandidates);
//     const loadedJobs = getJobs();
//     setJobs(loadedJobs);
//   }, []);

//   const handleAddCandidate = () => {
//     setCurrentCandidate(null);
//     setShowForm(true);
//   };

//   const handleEditCandidate = (candidate) => {
//     setCurrentCandidate(candidate);
//     setShowForm(true);
//   };

//   const handleDeleteCandidate = (id) => {
//     deleteCandidate(id);
//     setCandidates(getCandidates());
//   };

//   const handleSubmit = (candidateData) => {
//     if (currentCandidate) {
//       updateCandidate(currentCandidate.id, candidateData);
//     } else {
//       addCandidate(candidateData);
//     }
//     setCandidates(getCandidates());
//     setShowForm(false);
//   };

//   const filteredCandidates = candidates.filter(candidate => {
//     if (filter === 'all') return true;
//     return candidate.status === filter;
//   });

//   return (
//     <div className="candidates-page">
//       <div className="candidates-header">
//         <h1>Candidates</h1>
//         <div className="candidates-actions">
//           <div className="view-toggle">
//             <button 
//               className={view === 'list' ? 'active' : ''} 
//               onClick={() => setView('list')}
//             >
//               List View
//             </button>
//             <button 
//               className={view === 'pipeline' ? 'active' : ''} 
//               onClick={() => setView('pipeline')}
//             >
//               Pipeline View
//             </button>
//           </div>
//           <div className="filter-buttons">
//             <button 
//               className={filter === 'all' ? 'active' : ''} 
//               onClick={() => setFilter('all')}
//             >
//               All
//             </button>
//             <button 
//               className={filter === 'applied' ? 'active' : ''} 
//               onClick={() => setFilter('applied')}
//             >
//               Applied
//             </button>
//             <button 
//               className={filter === 'interview' ? 'active' : ''} 
//               onClick={() => setFilter('interview')}
//             >
//               Interview
//             </button>
//             <button 
//               className={filter === 'offer' ? 'active' : ''} 
//               onClick={() => setFilter('offer')}
//             >
//               Offer
//             </button>
//             <button 
//               className={filter === 'hired' ? 'active' : ''} 
//               onClick={() => setFilter('hired')}
//             >
//               Hired
//             </button>
//             <button 
//               className={filter === 'rejected' ? 'active' : ''} 
//               onClick={() => setFilter('rejected')}
//             >
//               Rejected
//             </button>
//           </div>
//           <button className="add-candidate-button" onClick={handleAddCandidate}>
//             + Add Candidate
//           </button>
//         </div>
//       </div>

//       {showForm && (
//         <CandidateForm 
//           candidate={currentCandidate} 
//           jobs={jobs}
//           onSubmit={handleSubmit} 
//           onCancel={() => setShowForm(false)} 
//         />
//       )}

//       {view === 'list' ? (
//         <div className="candidates-grid">
//           {filteredCandidates.length > 0 ? (
//             filteredCandidates.map(candidate => (
//               <CandidateCard 
//                 key={candidate.id} 
//                 candidate={candidate} 
//                 onEdit={handleEditCandidate} 
//                 onDelete={handleDeleteCandidate} 
//               />
//             ))
//           ) : (
//             <div className="no-candidates">No candidates found</div>
//           )}
//         </div>
//       ) : (
//         <Pipeline candidates={filteredCandidates} jobs={jobs} />
//       )}
//     </div>
//   );
// };

// export default Candidates;


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import CandidateCard from '../components/candidates/CandidateCard';
// import CandidateForm from '../components/candidates/CandidateForm';
// import Pipeline from '../components/candidates/Pipeline';
// import { getCandidates, addCandidate, updateCandidate, deleteCandidate, getJobs } from '../utils/storage';
// import '../assets/styles/Candidates.css';

// const Candidates = () => {
//   const [candidates, setCandidates] = useState([]);
//   const [jobs, setJobs] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [currentCandidate, setCurrentCandidate] = useState(null);
//   const [view, setView] = useState('list'); // 'list' or 'pipeline'
//   const [filter, setFilter] = useState('all');
//   const [showPipelineModal, setShowPipelineModal] = useState(false);

//   useEffect(() => {
//     const loadedCandidates = getCandidates();
//     setCandidates(loadedCandidates);
//     const loadedJobs = getJobs();
//     setJobs(loadedJobs);
//   }, []);

//   const handleAddCandidate = () => {
//     setCurrentCandidate(null);
//     setShowForm(true);
//   };

//   const handleEditCandidate = (candidate) => {
//     setCurrentCandidate(candidate);
//     setShowForm(true);
//   };

//   const handleDeleteCandidate = (id) => {
//     deleteCandidate(id);
//     setCandidates(getCandidates());
//   };

//   const handleSubmit = (candidateData) => {
//     if (currentCandidate) {
//       updateCandidate(currentCandidate.id, candidateData);
//     } else {
//       addCandidate(candidateData);
//     }
//     setCandidates(getCandidates());
//     setShowForm(false);
//   };

//   const filteredCandidates = candidates.filter(candidate => {
//     if (filter === 'all') return true;
//     return candidate.status === filter;
//   });

//   const handlePipelineViewClick = () => {
//     setView('pipeline');
//     setShowPipelineModal(true);
//   };

//   const handleClosePipelineModal = () => {
//     setShowPipelineModal(false);
//     setView('list');
//   };

//   return (
//     <div className="candidates-page">
//       <div className="candidates-header">
//         <h1>Candidates</h1>
//         <div className="candidates-actions">
//           <div className="view-toggle">
//             <button 
//               className={view === 'list' ? 'active' : ''} 
//               onClick={() => setView('list')}
//             >
//               List View
//             </button>
//             <button 
//               className={view === 'pipeline' ? 'active' : ''} 
//               onClick={handlePipelineViewClick}
//             >
//               Pipeline View
//             </button>
//           </div>
//           <div className="filter-buttons">
//             <button 
//               className={filter === 'all' ? 'active' : ''} 
//               onClick={() => setFilter('all')}
//             >
//               All
//             </button>
//             <button 
//               className={filter === 'applied' ? 'active' : ''} 
//               onClick={() => setFilter('applied')}
//             >
//               Applied
//             </button>
//             <button 
//               className={filter === 'interview' ? 'active' : ''} 
//               onClick={() => setFilter('interview')}
//             >
//               Interview
//             </button>
//             <button 
//               className={filter === 'offer' ? 'active' : ''} 
//               onClick={() => setFilter('offer')}
//             >
//               Offer
//             </button>
//             <button 
//               className={filter === 'hired' ? 'active' : ''} 
//               onClick={() => setFilter('hired')}
//             >
//               Hired
//             </button>
//             <button 
//               className={filter === 'rejected' ? 'active' : ''} 
//               onClick={() => setFilter('rejected')}
//             >
//               Rejected
//             </button>
//           </div>
//           <button className="add-candidate-button" onClick={handleAddCandidate}>
//             + Add Candidate
//           </button>
//         </div>
//       </div>

//       {showForm && (
//         <CandidateForm 
//           candidate={currentCandidate} 
//           jobs={jobs}
//           onSubmit={handleSubmit} 
//           onCancel={() => setShowForm(false)} 
//         />
//       )}

//       {view === 'list' && (
//         <div className="candidates-grid">
//           {filteredCandidates.length > 0 ? (
//             filteredCandidates.map(candidate => (
//               <CandidateCard 
//                 key={candidate.id} 
//                 candidate={candidate} 
//                 onEdit={handleEditCandidate} 
//                 onDelete={handleDeleteCandidate} 
//               />
//             ))
//           ) : (
//             <div className="no-candidates">No candidates found</div>
//           )}
//         </div>
//       )}

//       {showPipelineModal && (
//         <div className="pipeline-modal-overlay">
//           <div className="pipeline-modal">
//             <div className="pipeline-modal-header">
//               <h2>Candidate Pipeline</h2>
//               <button 
//                 className="pipeline-modal-close"
//                 onClick={handleClosePipelineModal}
//               >
//                 &times;
//               </button>
//             </div>
//             <div className="pipeline-modal-controls">
//               <div className="filter-buttons">
//                 <button 
//                   className={filter === 'all' ? 'active' : ''} 
//                   onClick={() => setFilter('all')}
//                 >
//                   All
//                 </button>
//                 <button 
//                   className={filter === 'applied' ? 'active' : ''} 
//                   onClick={() => setFilter('applied')}
//                 >
//                   Applied
//                 </button>
//                 <button 
//                   className={filter === 'interview' ? 'active' : ''} 
//                   onClick={() => setFilter('interview')}
//                 >
//                   Interview
//                 </button>
//                 <button 
//                   className={filter === 'offer' ? 'active' : ''} 
//                   onClick={() => setFilter('offer')}
//                 >
//                   Offer
//                 </button>
//                 <button 
//                   className={filter === 'hired' ? 'active' : ''} 
//                   onClick={() => setFilter('hired')}
//                 >
//                   Hired
//                 </button>
//                 <button 
//                   className={filter === 'rejected' ? 'active' : ''} 
//                   onClick={() => setFilter('rejected')}
//                 >
//                   Rejected
//                 </button>
//               </div>
//             </div>
//             <Pipeline 
//               candidates={filteredCandidates} 
//               jobs={jobs} 
//               isModal={true}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Candidates;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CandidateCard from '../components/candidates/CandidateCard';
import CandidateForm from '../components/candidates/CandidateForm';
import Pipeline from '../components/candidates/Pipeline';
import { getCandidates, addCandidate, updateCandidate, deleteCandidate, getJobs } from '../utils/storage';
import '../assets/styles/Candidates.css';

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentCandidate, setCurrentCandidate] = useState(null);
  const [view, setView] = useState('list'); // 'list' or 'pipeline'
  const [filter, setFilter] = useState('all');
  const [showPipelineModal, setShowPipelineModal] = useState(false);

  useEffect(() => {
    const loadedCandidates = getCandidates();
    setCandidates(loadedCandidates);
    const loadedJobs = getJobs();
    setJobs(loadedJobs);
  }, []);

  const handleAddCandidate = () => {
    setCurrentCandidate(null);
    setShowForm(true);
  };

  const handleEditCandidate = (candidate) => {
    setCurrentCandidate(candidate);
    setShowForm(true);
  };

  const handleDeleteCandidate = (id) => {
    deleteCandidate(id);
    setCandidates(getCandidates());
  };

  const handleSubmit = (candidateData) => {
    if (currentCandidate) {
      updateCandidate(currentCandidate.id, candidateData);
    } else {
      addCandidate(candidateData);
    }
    setCandidates(getCandidates());
    setShowForm(false);
  };

  const filteredCandidates = candidates.filter(candidate => {
    if (filter === 'all') return true;
    return candidate.status.toLowerCase() === filter.toLowerCase();
  });

  const handlePipelineViewClick = () => {
    setView('pipeline');
    setShowPipelineModal(true);
  };

  const handleClosePipelineModal = () => {
    setShowPipelineModal(false);
    setView('list');
  };

  return (
    <div className="candidates-page">
      <div className="candidates-header">
        <h1>Candidates</h1>
        <div className="candidates-actions">
          <div className="view-toggle">
            <button 
              className={view === 'list' ? 'active' : ''} 
              onClick={() => setView('list')}
            >
              List View
            </button>
            <button 
              className={view === 'pipeline' ? 'active' : ''} 
              onClick={handlePipelineViewClick}
            >
              Pipeline View
            </button>
          </div>
          <div className="filter-buttons">
            <button 
              className={filter === 'all' ? 'active' : ''} 
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={filter === 'applied' ? 'active' : ''} 
              onClick={() => setFilter('applied')}
            >
              Applied
            </button>
            <button 
              className={filter === 'interview' ? 'active' : ''} 
              onClick={() => setFilter('interview')}
            >
              Interview
            </button>
            <button 
              className={filter === 'offer' ? 'active' : ''} 
              onClick={() => setFilter('offer')}
            >
              Offer
            </button>
            <button 
              className={filter === 'hired' ? 'active' : ''} 
              onClick={() => setFilter('hired')}
            >
              Hired
            </button>
            <button 
              className={filter === 'rejected' ? 'active' : ''} 
              onClick={() => setFilter('rejected')}
            >
              Rejected
            </button>
          </div>
          <button className="add-candidate-button" onClick={handleAddCandidate}>
            + Add Candidate
          </button>
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

      {view === 'list' && (
        <div className="candidates-grid">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map(candidate => (
              <CandidateCard 
                key={candidate.id} 
                candidate={candidate} 
                onEdit={handleEditCandidate} 
                onDelete={handleDeleteCandidate} 
              />
            ))
          ) : (
            <div className="no-candidates">No candidates found</div>
          )}
        </div>
      )}

      {showPipelineModal && (
        <div className="pipeline-modal-overlay">
          <div className="pipeline-modal">
            <div className="pipeline-modal-header">
              <h2>Candidate Pipeline</h2>
              <button 
                className="pipeline-modal-close"
                onClick={handleClosePipelineModal}
              >
                &times;
              </button>
            </div>
            <div className="pipeline-modal-controls">
              <div className="filter-buttons">
                <button 
                  className={filter === 'all' ? 'active' : ''} 
                  onClick={() => setFilter('all')}
                >
                  All
                </button>
                <button 
                  className={filter === 'applied' ? 'active' : ''} 
                  onClick={() => setFilter('applied')}
                >
                  Applied
                </button>
                <button 
                  className={filter === 'interview' ? 'active' : ''} 
                  onClick={() => setFilter('interview')}
                >
                  Interview
                </button>
                <button 
                  className={filter === 'offer' ? 'active' : ''} 
                  onClick={() => setFilter('offer')}
                >
                  Offer
                </button>
                <button 
                  className={filter === 'hired' ? 'active' : ''} 
                  onClick={() => setFilter('hired')}
                >
                  Hired
                </button>
                <button 
                  className={filter === 'rejected' ? 'active' : ''} 
                  onClick={() => setFilter('rejected')}
                >
                  Rejected
                </button>
              </div>
            </div>
            <Pipeline 
              candidates={filteredCandidates} 
              jobs={jobs} 
              isModal={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidates;