// // ProjectDetail.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getProjectById, saveProject } from '../../utils/projectStorage';
// import { formatDate } from '../../utils/helpers';
// import ProjectForm from '../../components/ProjectForm/ProjectForm';
// import { getStatusColor, getPriorityColor, getProgressColor } from '../../utils/helpers';

// const ProjectDetail = () => {
//   const { projectId } = useParams();
//   const navigate = useNavigate();
//   const [project, setProject] = useState(null);
//   const [editing, setEditing] = useState(false);

//   useEffect(() => {
//     const loadedProject = getProjectById(projectId);
//     setProject(loadedProject);
//   }, [projectId]);

//   const handleProgressChange = (progress) => {
//     const updatedProject = { ...project, progress };
//     setProject(updatedProject);
//     saveProject(updatedProject);
//   };

//   if (!project) {
//     return <div className="text-center py-10 text-gray-600">Loading project...</div>;
//   }

//   const handleSave = (updatedProject) => {
//     setProject(updatedProject);
//     setEditing(false);
//   };

//   const handleProgressBarClick = (e) => {
//     if (project.status !== 'In Progress') return;
    
//     const progressBar = e.currentTarget;
//     const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
//     const progressBarWidth = progressBar.clientWidth;
//     const newProgress = Math.round((clickPosition / progressBarWidth) * 100);
    
//     handleProgressChange(Math.min(100, Math.max(30, newProgress)));
//   };

//   return (
//     <div className="space-y-6 p-4">
//       <div className="flex justify-between items-center">
//         <button
//           onClick={() => navigate(-1)}
//           className="text-blue-600 hover:text-blue-800 flex items-center"
//         >
//           ← Back to Projects
//         </button>
//         <button
//           onClick={() => setEditing(!editing)}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//         >
//           {editing ? 'Cancel' : 'Edit Project'}
//         </button>
//       </div>
      
//       {editing ? (
//         <ProjectForm
//           projectId={project.id}
//           onSave={handleSave}
//           onCancel={() => setEditing(false)}
//         />
//       ) : (
//         <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
//           <div className="flex justify-between items-start mb-6">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-800">{project.name}</h1>
//               <div className="flex items-center gap-2 mt-2">
//                 <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)} text-white`}>
//                   {project.status}
//                 </span>
//                 <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(project.priority)} text-white`}>
//                   {project.priority}
//                 </span>
//               </div>
//             </div>
//             <div className="text-right">
//               <p className="text-gray-600">Created: {formatDate(project.createdAt || project.startDate)}</p>
//               <p className="text-gray-600">Last Updated: {formatDate(project.updatedAt || project.startDate)}</p>
//             </div>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//             <div>
//               <h2 className="text-lg font-semibold text-gray-700 mb-2">Project Details</h2>
//               <div className="space-y-3">
//                 <p><span className="text-gray-600 font-medium">Description:</span> {project.description}</p>
//                 <p><span className="text-gray-600 font-medium">Start Date:</span> {formatDate(project.startDate)}</p>
//                 <p><span className="text-gray-600 font-medium">End Date:</span> {formatDate(project.endDate)}</p>
//                 <p><span className="text-gray-600 font-medium">Budget:</span> Rs.{project.budget.toLocaleString()}</p>
//                 <p><span className="text-gray-600 font-medium">Spent:</span> Rs.{project.spent.toLocaleString()}</p>
//               </div>
//             </div>
            
//             <div className="mb-4">
//               <div className="flex items-center justify-between mb-1">
//                 <span className="text-sm text-gray-600">Completion</span>
//                 <span className="text-sm font-medium text-gray-700">{project.progress}%</span>
//               </div>
//               <div 
//                 className={`w-full h-3 rounded-full bg-gray-200 mb-2 cursor-${project.status === 'In Progress' ? 'pointer' : 'default'}`}
//                 onClick={handleProgressBarClick}
//               >
//                 <div 
//                   className={`h-full rounded-full ${getProgressColor(project.progress)}`}
//                   style={{ width: `${project.progress}%` }}
//                 ></div>
//               </div>
//             </div>
//           </div>
          
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold text-gray-700 mb-2">Attachments</h2>
//             {project.attachments.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {project.attachments.map((attachment, index) => (
//                   <div key={index} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
//                     <div className="flex items-center mb-2">
//                       <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded mr-2">
//                         {attachment.type.includes('image') ? (
//                           <img 
//                             src={attachment.preview} 
//                             alt="Preview" 
//                             className="w-6 h-6 object-cover" 
//                           />
//                         ) : (
//                           <span className="text-gray-500">📄</span>
//                         )}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm font-medium text-gray-800 truncate">{attachment.name}</p>
//                         <p className="text-xs text-gray-500">
//                           {(attachment.size / 1024).toFixed(1)} KB
//                         </p>
//                       </div>
//                     </div>
//                     <a
//                       href={attachment.preview}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 hover:underline text-sm"
//                     >
//                       View File
//                     </a>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500">No attachments</p>
//             )}
//           </div>
          
//           <div>
//             <h2 className="text-lg font-semibold text-gray-700 mb-2">Team Members</h2>
//             {project.members.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                 {project.members.map(member => (
//                   <div key={member.id} className="flex items-center bg-gray-100 p-3 rounded-lg border border-gray-300">
//                     <img 
//                       src={member.avatar} 
//                       alt={member.name}
//                       className="w-10 h-10 rounded-full mr-3"
//                     />
//                     <div>
//                       <p className="text-gray-800 font-medium">{member.name}</p>
//                       <p className="text-xs text-gray-600">{member.role}</p>
//                       <p className="text-xs text-blue-600">{member.email}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500">No team members assigned</p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProjectDetail;


// ProjectDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectById, saveProject } from '../../utils/projectStorage';
import { formatDate, formatDateTime, formatTime } from '../../utils/helpers';
import ProjectForm from '../../components/ProjectForm/ProjectForm';
import { getStatusColor, getPriorityColor, getProgressColor } from '../../utils/helpers';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const loadedProject = getProjectById(projectId);
    setProject(loadedProject);
  }, [projectId]);

  const handleProgressChange = (progress) => {
    const updatedProject = { ...project, progress };
    setProject(updatedProject);
    saveProject(updatedProject);
  };

  if (!project) {
    return <div className="text-center py-10 text-gray-600">Loading project...</div>;
  }

  const handleSave = (updatedProject) => {
    setProject(updatedProject);
    setEditing(false);
  };

  const handleProgressBarClick = (e) => {
    if (project.status !== 'In Progress') return;
    
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.clientWidth;
    const newProgress = Math.round((clickPosition / progressBarWidth) * 100);
    
    handleProgressChange(Math.min(100, Math.max(30, newProgress)));
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          ← Back to Projects
        </button>
        <button
          onClick={() => setEditing(!editing)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {editing ? 'Cancel' : 'Edit Project'}
        </button>
      </div>
      
      {editing ? (
        <ProjectForm
          projectId={project.id}
          onSave={handleSave}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{project.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)} text-white`}>
                  {project.status}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(project.priority)} text-white`}>
                  {project.priority}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-600">Created: {formatDateTime(project.createdAt || project.startDate)}</p>
              <p className="text-gray-600">Last Updated: {formatDateTime(project.updatedAt || project.startDate)}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Project Details</h2>
              <div className="space-y-3">
                <p><span className="text-gray-600 font-medium">Description:</span> {project.description}</p>
                <div>
                  <span className="text-gray-600 font-medium">Start Date:</span> 
                  <div>{formatDate(project.startDate)} at {formatTime(project.startDate)}</div>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">End Date:</span> 
                  <div>{formatDate(project.endDate)} at {formatTime(project.endDate)}</div>
                </div>
                <p><span className="text-gray-600 font-medium">Budget:</span> Rs.{project.budget.toLocaleString()}</p>
                <p><span className="text-gray-600 font-medium">Spent:</span> Rs.{project.spent.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Completion</span>
                <span className="text-sm font-medium text-gray-700">{project.progress}%</span>
              </div>
              <div 
                className={`w-full h-3 rounded-full bg-gray-200 mb-2 cursor-${project.status === 'In Progress' ? 'pointer' : 'default'}`}
                onClick={handleProgressBarClick}
              >
                <div 
                  className={`h-full rounded-full ${getProgressColor(project.progress)}`}
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Attachments</h2>
            {project.attachments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.attachments.map((attachment, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded mr-2">
                        {attachment.type.includes('image') ? (
                          <img 
                            src={attachment.preview} 
                            alt="Preview" 
                            className="w-6 h-6 object-cover" 
                          />
                        ) : (
                          <span className="text-gray-500">📄</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{attachment.name}</p>
                        <p className="text-xs text-gray-500">
                          {(attachment.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <a
                      href={attachment.preview}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View File
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No attachments</p>
            )}
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Team Members</h2>
            {project.members.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {project.members.map(member => (
                  <div key={member.id} className="flex items-center bg-gray-100 p-3 rounded-lg border border-gray-300">
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="text-gray-800 font-medium">{member.name}</p>
                      <p className="text-xs text-gray-600">{member.role}</p>
                      <p className="text-xs text-blue-600">{member.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No team members assigned</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;