import React, { useState, useEffect } from 'react';
import { saveProject, getProjectById } from '../../utils/projectStorage';
import { getTeams } from '../../utils/teamStorage';
import { generateId, formatDate } from '../../utils/helpers';
import MembersSelect from '../MembersSelect/MembersSelect';

const ProjectForm = ({ projectId, onSave, onCancel }) => {
  const [project, setProject] = useState({
    id: '',
    name: '',
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    status: 'Not Started',
    priority: 'Medium',
    teams: [],
    members: [],
    attachments: [],
    requirements: [''],
    progress: 0,
    budget: 0,
    spent: 0
  });
  
  const [teams, setTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);

  useEffect(() => {
    const loadedTeams = getTeams();
    setTeams(loadedTeams);
    
    if (projectId) {
      const existingProject = getProjectById(projectId);
      if (existingProject) {
        setProject(existingProject);
        setSelectedTeams(existingProject.teams);
      }
    } else {
      setProject(prev => ({ ...prev, id: generateId() }));
    }
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject(prev => ({ ...prev, [name]: value }));
  };

  const handleTeamSelect = (teamId) => {
    const team = teams.find(t => t.id === teamId);
    if (team && !selectedTeams.some(t => t.id === teamId)) {
      setSelectedTeams([...selectedTeams, team]);
    }
  };

  const handleTeamRemove = (teamId) => {
    setSelectedTeams(selectedTeams.filter(t => t.id !== teamId));
  };

  const handleRequirementChange = (index, value) => {
    const newRequirements = [...project.requirements];
    newRequirements[index] = value;
    setProject(prev => ({ ...prev, requirements: newRequirements }));
  };

  const addRequirement = () => {
    setProject(prev => ({ ...prev, requirements: [...prev.requirements, ''] }));
  };

  const removeRequirement = (index) => {
    const newRequirements = project.requirements.filter((_, i) => i !== index);
    setProject(prev => ({ ...prev, requirements: newRequirements }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectToSave = {
      ...project,
      teams: selectedTeams
    };
    saveProject(projectToSave);
    onSave(projectToSave);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
      <h2 className="text-xl font-bold text-white mb-6">
        {projectId ? 'Edit Project' : 'Create New Project'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-400 mb-2">Project Name</label>
            <input
              type="text"
              name="name"
              value={project.name}
              onChange={handleChange}
              className="w-full bg-gray-700 rounded-lg p-2 text-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-400 mb-2">Status</label>
            <select
              name="status"
              value={project.status}
              onChange={handleChange}
              className="w-full bg-gray-700 rounded-lg p-2 text-white"
            >
              <option value="Not Started">Not Started</option>
              <option value="Planning">Planning</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-400 mb-2">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={project.startDate}
              onChange={handleChange}
              className="w-full bg-gray-700 rounded-lg p-2 text-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-400 mb-2">End Date</label>
            <input
              type="date"
              name="endDate"
              value={project.endDate}
              onChange={handleChange}
              className="w-full bg-gray-700 rounded-lg p-2 text-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-400 mb-2">Priority</label>
            <select
              name="priority"
              value={project.priority}
              onChange={handleChange}
              className="w-full bg-gray-700 rounded-lg p-2 text-white"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-400 mb-2">Budget ($)</label>
            <input
              type="number"
              name="budget"
              value={project.budget}
              onChange={handleChange}
              className="w-full bg-gray-700 rounded-lg p-2 text-white"
              min="0"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-400 mb-2">Description</label>
          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
            className="w-full bg-gray-700 rounded-lg p-2 text-white h-24"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-400 mb-2">Assigned Teams</label>
          <select
            onChange={(e) => handleTeamSelect(e.target.value)}
            className="w-full bg-gray-700 rounded-lg p-2 text-white mb-2"
          >
            <option value="">Select a team to add</option>
            {teams.map(team => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedTeams.map(team => (
              <div key={team.id} className="bg-gray-700 rounded-lg px-3 py-1 flex items-center">
                <span className="text-white">{team.name}</span>
                <button
                  type="button"
                  onClick={() => handleTeamRemove(team.id)}
                  className="ml-2 text-red-400 hover:text-red-300"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-400 mb-2">Project Requirements</label>
          {project.requirements.map((req, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={req}
                onChange={(e) => handleRequirementChange(index, e.target.value)}
                className="flex-1 bg-gray-700 rounded-lg p-2 text-white"
              />
              <button
                type="button"
                onClick={() => removeRequirement(index)}
                className="ml-2 bg-red-600 text-white px-3 rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addRequirement}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Add Requirement
          </button>
        </div>
        
        <MembersSelect 
          selectedMembers={project.members}
          onMembersChange={(members) => setProject(prev => ({ ...prev, members }))}
        />
        
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;