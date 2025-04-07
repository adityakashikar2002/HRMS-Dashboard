import React, { useState, useEffect } from 'react';
import { getProjects } from '../../utils/projectStorage';
import { mockProjects } from '../../mockData/mockProjects';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import ProjectForm from '../../components/ProjectForm/ProjectForm';
import ProjectStats from '../../components/ProjectStats/ProjectStats';
import ProjectTimeline from '../../components/ProjectTimeline/ProjectTimeline';
import { generateId } from '../../utils/helpers';

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Load projects from localStorage or use mock data if empty
  useEffect(() => {
    const storedProjects = getProjects();
    if (storedProjects.length === 0) {
      localStorage.setItem('projects', JSON.stringify(mockProjects));
      setProjects(mockProjects);
    } else {
      setProjects(storedProjects);
    }
  }, []);

  const handleSaveProject = (project) => {
    setProjects(getProjects());
    setShowForm(false);
    setEditingProject(null);
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = projects.filter(p => p.id !== projectId);
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      setProjects(updatedProjects);
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'All' || project.status === filter;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Projects</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-700 rounded-lg p-2 text-white flex-1"
          />
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-700 rounded-lg p-2 text-white"
          >
            <option value="All">All Status</option>
            <option value="Not Started">Not Started</option>
            <option value="Planning">Planning</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>
          
          <button
            onClick={() => {
              setEditingProject(null);
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 whitespace-nowrap"
          >
            New Project
          </button>
        </div>
      </div>
      
      {showForm && (
        <ProjectForm
          projectId={editingProject}
          onSave={handleSaveProject}
          onCancel={() => {
            setShowForm(false);
            setEditingProject(null);
          }}
        />
      )}
      
      <ProjectStats projects={projects} />
      <ProjectTimeline projects={projects} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <div key={project.id} className="relative">
            <ProjectCard
              project={project}
              onClick={(id) => {
                setEditingProject(id);
                setShowForm(true);
              }}
            />
            <button
              onClick={() => handleDeleteProject(project.id)}
              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
              title="Delete project"
            >
              <i className="fas fa-trash text-xs"></i>
            </button>
          </div>
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="text-center py-10 text-gray-400">
          No projects found matching your criteria
        </div>
      )}
    </div>
  );
};

export default ProjectsList;