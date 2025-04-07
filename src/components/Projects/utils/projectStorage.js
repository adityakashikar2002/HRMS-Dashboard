// const PROJECTS_KEY = 'projects';

// export const getProjects = () => {
//   const projects = localStorage.getItem(PROJECTS_KEY);
//   return projects ? JSON.parse(projects) : [];
// };

// export const saveProject = (project) => {
//   const projects = getProjects();
//   const existingIndex = projects.findIndex(p => p.id === project.id);
  
//   if (existingIndex >= 0) {
//     projects[existingIndex] = project;
//   } else {
//     projects.push(project);
//   }
  
//   localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
// };

// export const deleteProject = (projectId) => {
//   const projects = getProjects().filter(p => p.id !== projectId);
//   localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
// };

// export const getProjectById = (projectId) => {
//   return getProjects().find(p => p.id === projectId);
// };
// projectStorage.js
const PROJECTS_KEY = 'projects';

export const getProjects = () => {
  const projectsString = localStorage.getItem(PROJECTS_KEY);
  if (projectsString) {
    try {
      return JSON.parse(projectsString);
    } catch (error) {
      console.error("Error parsing projects from localStorage:", error);
      return []; // Return an empty array in case of parsing error
    }
  } else {
    return []; // Return an empty array if projectsString is null or undefined
  }
};

export const saveProject = (project) => {
  const projects = getProjects();
  const existingIndex = projects.findIndex(p => p.id === project.id);

  if (existingIndex >= 0) {
    projects[existingIndex] = project;
  } else {
    projects.push(project);
  }

  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
};

export const deleteProject = (projectId) => {
  const projects = getProjects().filter(p => p.id !== projectId);
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
};

export const getProjectById = (projectId) => {
  return getProjects().find(p => p.id === projectId);
};