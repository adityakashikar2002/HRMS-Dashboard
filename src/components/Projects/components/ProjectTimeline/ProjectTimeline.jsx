import React from 'react';
import { formatDate } from '../../utils/helpers';

const ProjectTimeline = ({ projects }) => {
  // Sort projects by start date
  const sortedProjects = [...projects].sort((a, b) => 
    new Date(a.startDate) - new Date(b.startDate)
  );

  // Calculate timeline range
  const minDate = new Date(Math.min(...projects.map(p => new Date(p.startDate))));
  const maxDate = new Date(Math.max(...projects.map(p => new Date(p.endDate))));
  const totalDays = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24)) + 1;
  
  // Calculate position and width for each project
  const getProjectPosition = (project) => {
    const startDay = Math.ceil((new Date(project.startDate) - minDate) / (1000 * 60 * 60 * 24));
    const endDay = Math.ceil((new Date(project.endDate) - minDate) / (1000 * 60 * 60 * 24));
    const durationDays = endDay - startDay + 1;
    
    return {
      left: `${(startDay / totalDays) * 100}%`,
      width: `${(durationDays / totalDays) * 100}%`
    };
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-6">Project Timeline</h2>
      
      <div className="relative h-48">
        {/* Timeline axis */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-600 transform -translate-y-1/2"></div>
        
        {/* Current date indicator */}
        <div 
          className="absolute top-0 bottom-0 w-px bg-red-500"
          style={{
            left: `${((new Date() - minDate) / (maxDate - minDate)) * 100}%`
          }}
        >
          <div className="absolute -top-4 -left-2 text-xs text-red-500 whitespace-nowrap">
            Today
          </div>
        </div>
        
        {/* Project bars */}
        {sortedProjects.map((project, index) => {
          const position = getProjectPosition(project);
          return (
            <div 
              key={project.id}
              className="absolute h-8 bg-blue-500 rounded-md flex items-center px-2"
              style={{
                left: position.left,
                width: position.width,
                top: `${(index * 40) + 20}px`
              }}
            >
              <span className="text-xs text-white truncate">
                {project.name} ({formatDate(project.startDate)} - {formatDate(project.endDate)})
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-between mt-8 text-xs text-gray-400">
        <span>{formatDate(minDate)}</span>
        <span>{formatDate(maxDate)}</span>
      </div>
    </div>
  );
};

export default ProjectTimeline;