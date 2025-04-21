import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Removed BrowserRouter as Router
import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import Candidates from './pages/Candidates';
import Interviews from './pages/Interviews';
import Offers from './pages/Offers';
import './assets/styles/Hiring.css';

import JobDetails from './components/jobs/JobDetails'
import OfferDetails from './components/offers/OfferDetails'
import InterviewDetails from './components/interviews/InterviewDetails'
import CandidateDetails from './components/candidates/CandidateDetails'

function Hiring() {
  return (
    <div className="hr-2">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/offers" element={<Offers />} />

            <Route path="/jobs/:id" element={<JobDetails/>} />
            <Route path="/offers/:id" element={<OfferDetails/>} />
            <Route path="/interviews/:id" element={<InterviewDetails/>} />
            <Route path="/candidates/:id" element={<CandidateDetails/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Hiring;