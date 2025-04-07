// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { getProjectById } from '../../utils/projectStorage';
// import { formatDate } from '../../utils/helpers';
// import ProjectForm from '../../components/ProjectForm/ProjectForm';

// const ProjectDetail = () => {
//   const { projectId } = useParams();
//   const [project, setProject] = useState(null);
//   const [editing, setEditing] = useState(false);

//   useEffect(() => {
//     const loadedProject = getProjectById(projectId);
//     setProject(loadedProject);
//   }, [projectId]);

//   if (!project) {
//     return <div className="text-center py-10 text-gray-400">Loading project...</div>;
//   }

//   const handleSave = (updatedProject) => {
//     setProject(updatedProject);
//     setEditing(false);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-white">{project.name}</h1>
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
//         <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//             <div>
//               <h2 className="text-lg font-semibold text-white mb-2">Project Details</h2>
//               <div className="space-y-2">
//                 <p><span className="text-gray-400">Description:</span> {project.description}</p>
//                 <p><span className="text-gray-400">Status:</span> {project.status}</p>
//                 <p><span className="text-gray-400">Priority:</span> {project.priority}</p>
//                 <p><span className="text-gray-400">Start Date:</span> {formatDate(project.startDate)}</p>
//                 <p><span className="text-gray-400">End Date:</span> {formatDate(project.endDate)}</p>
//                 <p><span className="text-gray-400">Budget:</span> ${project.budget.toLocaleString()}</p>
//                 <p><span className="text-gray-400">Spent:</span> ${project.spent.toLocaleString()}</p>
//               </div>
//             </div>
            
//             <div>
//               <h2 className="text-lg font-semibold text-white mb-2">Progress</h2>
//               <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
//                 <div 
//                   className="bg-blue-500 h-4 rounded-full" 
//                   style={{ width: `${project.progress}%` }}
//                 ></div>
//               </div>
//               <p className="text-right text-gray-400">{project.progress}% complete</p>
              
//               <h2 className="text-lg font-semibold text-white mt-6 mb-2">Assigned Teams</h2>
//               <div className="flex flex-wrap gap-2">
//                 {project.teams.map(team => (
//                   <span key={team.id} className="bg-gray-700 px-3 py-1 rounded-lg">
//                     {team.name}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
          
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold text-white mb-2">Requirements</h2>
//             <ul className="list-disc list-inside space-y-1">
//               {project.requirements.map((req, index) => (
//                 <li key={index} className="text-gray-300">{req}</li>
//               ))}
//             </ul>
//           </div>
          
//           <div>
//             <h2 className="text-lg font-semibold text-white mb-2">Team Members</h2>
//             <div className="flex flex-wrap gap-4">
//               {project.members.map(member => (
//                 <div key={member.id} className="flex items-center bg-gray-700 p-3 rounded-lg">
//                   <img 
//                     src={member.avatar} 
//                     alt={member.name}
//                     className="w-10 h-10 rounded-full mr-3"
//                   />
//                   <div>
//                     <p className="text-white">{member.name}</p>
//                     <p className="text-xs text-gray-400">{member.role}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
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
import { getProjectById } from '../../utils/projectStorage';
import { formatDate, getStatusColor, getPriorityColor } from '../../utils/helpers';
import ProjectForm from '../../components/ProjectForm/ProjectForm';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const loadedProject = getProjectById(projectId);
    setProject(loadedProject);
  }, [projectId]);

  if (!project) {
    return <div className="text-center py-10 text-gray-600">Loading project...</div>;
  }

  const handleSave = (updatedProject) => {
    setProject(updatedProject);
    setEditing(false);
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
              <p className="text-gray-600">Created: {formatDate(project.createdAt || project.startDate)}</p>
              <p className="text-gray-600">Last Updated: {formatDate(project.updatedAt || project.startDate)}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Project Details</h2>
              <div className="space-y-3">
                <p><span className="text-gray-600 font-medium">Description:</span> {project.description}</p>
                <p><span className="text-gray-600 font-medium">Start Date:</span> {formatDate(project.startDate)}</p>
                <p><span className="text-gray-600 font-medium">End Date:</span> {formatDate(project.endDate)}</p>
                <p><span className="text-gray-600 font-medium">Budget:</span> ${project.budget.toLocaleString()}</p>
                <p><span className="text-gray-600 font-medium">Spent:</span> ${project.spent.toLocaleString()}</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Progress</h2>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div 
                  className="bg-blue-500 h-4 rounded-full" 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <p className="text-right text-gray-600">{project.progress}% complete</p>
              
              <h2 className="text-lg font-semibold text-gray-700 mt-6 mb-2">Assigned Teams</h2>
              <div className="flex flex-wrap gap-2">
                {project.teams.map(team => (
                  <span key={team.id} className="bg-gray-100 px-3 py-1 rounded-lg border border-gray-300">
                    {team.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Attachments</h2>
            {project.attachments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {project.attachments.map((attachment, index) => (
                  <a 
                    key={index} 
                    href={attachment} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-100 p-3 rounded-lg border border-gray-300 hover:bg-gray-200"
                  >
                    <p className="text-blue-600 hover:underline truncate">{attachment}</p>
                  </a>
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