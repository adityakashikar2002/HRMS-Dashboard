// TeamsList.jsx
import React, { useState, useEffect } from 'react';
import { getTeams, deleteTeam } from '../../utils/teamStorage';
import { mockTeams } from '../../mockData/mockTeams';
import TeamCard from '../../components/TeamCard/TeamCard';
import TeamForm from '../../components/TeamForm/TeamForm';
import { generateId } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';

const TeamsList = () => {
  const [teams, setTeams] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate=useNavigate();

  useEffect(() => {
    const storedTeams = getTeams();
    if (storedTeams.length === 0) {
      localStorage.setItem('teams', JSON.stringify(mockTeams));
      setTeams(mockTeams);
    } else {
      setTeams(storedTeams);
    }
  }, []);

  const handleSaveTeam = (team) => {
    setTeams(getTeams());
    setShowForm(false);
    setEditingTeam(null);
  };

  const handleDeleteTeam = (teamId) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      deleteTeam(teamId);
      setTeams(getTeams());
    }
  };

  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    team.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-4">
      <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          ← Back to Projects
      </button>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Teams</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search teams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg p-2 text-gray-800 flex-1 shadow-sm"
          />
          
          <button
            onClick={() => {
              setEditingTeam(null);
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 whitespace-nowrap shadow-sm"
          >
            New Team
          </button>
        </div>
      </div>
      
      {showForm && (
        <TeamForm
          teamId={editingTeam}
          onSave={handleSaveTeam}
          onCancel={() => {
            setShowForm(false);
            setEditingTeam(null);
          }}
        />
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map(team => (
          <TeamCard
            key={team.id}
            team={team}
            onClick={(id) => {
              setEditingTeam(id);
              setShowForm(true);
            }}
            onDelete={handleDeleteTeam}
          />
        ))}
      </div>
      
      {filteredTeams.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No teams found matching your criteria
        </div>
      )}
    </div>
  );
};

export default TeamsList;