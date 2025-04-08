// utils/projectStorage.js
const PROJECTS_KEY = 'projects';

export const getProjects = () => {
  const projects = localStorage.getItem(PROJECTS_KEY);
  return projects ? JSON.parse(projects) : [];
};

export const saveProject = (project) => {
  const projects = getProjects();
  const existingIndex = projects.findIndex(p => p.id === project.id);
  
  if (existingIndex >= 0) {
    // Clean up old file preview URLs
    const oldProject = projects[existingIndex];
    if (oldProject.attachments) {
      oldProject.attachments.forEach(attachment => {
        if (attachment.preview && attachment.preview.startsWith('blob:')) {
          URL.revokeObjectURL(attachment.preview);
        }
      });
    }
    
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