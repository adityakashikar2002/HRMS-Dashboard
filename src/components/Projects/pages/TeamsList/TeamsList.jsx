import React, { useState, useEffect } from 'react';
import { getTeams, deleteTeam } from '../../utils/teamStorage';
import { mockTeams } from '../../mockData/mockTeams';
import TeamCard from '../../components/TeamCard/TeamCard';
import TeamForm from '../../components/TeamForm/TeamForm';
import { generateId } from '../../utils/helpers';

const TeamsList = () => {
  const [teams, setTeams] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Load teams from localStorage or use mock data if empty
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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Teams</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search teams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-700 rounded-lg p-2 text-white flex-1"
          />
          
          <button
            onClick={() => {
              setEditingTeam(null);
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 whitespace-nowrap"
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
        <div className="text-center py-10 text-gray-400">
          No teams found matching your criteria
        </div>
      )}
    </div>
  );
};

export default TeamsList;