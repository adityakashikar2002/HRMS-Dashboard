// Projects.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProjectsList from './pages/ProjectsList/ProjectsList';
import TeamsList from './pages/TeamsList/TeamsList';
import ProjectDetail from './pages/ProjectDetail/ProjectDetail';

const Projects = () => {
  return (
    <div className="p-4">
      <Routes>
        <Route path="/" element={<ProjectsList />} />
        <Route path="/teams" element={<TeamsList />} />
        <Route path="/:projectId" element={<ProjectDetail />} />
      </Routes>
    </div>
  );
};

export default Projects;