import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProjectsList from './pages/ProjectsList/ProjectsList';
import TeamsList from './pages/TeamsList/TeamsList';
import ProjectDetail from './pages/ProjectDetail/ProjectDetail';

const Projects = () => {
  return (
    <Routes>
      <Route path="/" element={<ProjectsList />} />
      <Route path="/teams" element={<TeamsList />} />
      <Route path="/:projectId" element={<ProjectDetail />} />
    </Routes>
  );
};

export default Projects;