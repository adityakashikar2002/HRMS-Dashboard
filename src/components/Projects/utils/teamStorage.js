const TEAMS_KEY = 'teams';

export const getTeams = () => {
  const teams = localStorage.getItem(TEAMS_KEY);
  return teams ? JSON.parse(teams) : [];
};

export const saveTeam = (team) => {
  const teams = getTeams();
  const existingIndex = teams.findIndex(t => t.id === team.id);
  
  if (existingIndex >= 0) {
    teams[existingIndex] = team;
  } else {
    teams.push(team);
  }
  
  localStorage.setItem(TEAMS_KEY, JSON.stringify(teams));
};

export const deleteTeam = (teamId) => {
  const teams = getTeams().filter(t => t.id !== teamId);
  localStorage.setItem(TEAMS_KEY, JSON.stringify(teams));
};

export const getTeamById = (teamId) => {
  return getTeams().find(t => t.id === teamId);
};