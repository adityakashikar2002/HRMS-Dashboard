// // ProjectForm.jsx
// import React, { useState, useEffect } from 'react';
// import { saveProject, getProjectById } from '../../utils/projectStorage';
// import { getTeams } from '../../utils/teamStorage';
// import { generateId, formatDate } from '../../utils/helpers';
// import MembersSelect from '../MembersSelect/MembersSelect';

// const ProjectForm = ({ projectId, onSave, onCancel }) => {
//   const [project, setProject] = useState({
//     id: '',
//     name: '',
//     description: '',
//     startDate: new Date().toISOString().split('T')[0],
//     endDate: '',
//     status: 'Not Started',
//     priority: 'Medium',
//     teams: [],
//     members: [],
//     attachments: [],
//     progress: 0,
//     budget: 0,
//     spent: 0
//   });
  
//   const [teams, setTeams] = useState([]);
//   const [selectedTeams, setSelectedTeams] = useState([]);
//   const [newAttachment, setNewAttachment] = useState('');

//   useEffect(() => {
//     const loadedTeams = getTeams();
//     setTeams(loadedTeams);
    
//     if (projectId) {
//       const existingProject = getProjectById(projectId);
//       if (existingProject) {
//         setProject(existingProject);
//         setSelectedTeams(existingProject.teams);
//       }
//     } else {
//       setProject(prev => ({ ...prev, id: generateId() }));
//     }
//   }, [projectId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProject(prev => ({ ...prev, [name]: value }));
//   };

//   const handleTeamSelect = (teamId) => {
//     const team = teams.find(t => t.id === teamId);
//     if (team && !selectedTeams.some(t => t.id === teamId)) {
//       setSelectedTeams([...selectedTeams, team]);
//     }
//   };

//   const handleTeamRemove = (teamId) => {
//     setSelectedTeams(selectedTeams.filter(t => t.id !== teamId));
//   };

//   const handleAddAttachment = () => {
//     if (newAttachment.trim()) {
//       setProject(prev => ({ 
//         ...prev, 
//         attachments: [...prev.attachments, newAttachment] 
//       }));
//       setNewAttachment('');
//     }
//   };

//   const handleRemoveAttachment = (index) => {
//     const newAttachments = project.attachments.filter((_, i) => i !== index);
//     setProject(prev => ({ ...prev, attachments: newAttachments }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const projectToSave = {
//       ...project,
//       teams: selectedTeams
//     };
//     saveProject(projectToSave);
//     onSave(projectToSave);
//   };

//   return (
//     <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
//       <h2 className="text-xl font-bold text-gray-800 mb-6">
//         {projectId ? 'Edit Project' : 'Create New Project'}
//       </h2>
      
//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//           <div>
//             <label className="block text-gray-700 mb-2">Project Name</label>
//             <input
//               type="text"
//               name="name"
//               value={project.name}
//               onChange={handleChange}
//               className="w-full bg-white border border-gray-300 rounded-lg p-2 text-gray-800"
//               required
//             />
//           </div>
          
//           <div>
//             <label className="block text-gray-700 mb-2">Status</label>
//             <select
//               name="status"
//               value={project.status}
//               onChange={handleChange}
//               className="w-full bg-white border border-gray-300 rounded-lg p-2 text-gray-800"
//             >
//               <option value="Not Started">Not Started</option>
//               <option value="Planning">Planning</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Completed">Completed</option>
//               <option value="On Hold">On Hold</option>
//             </select>
//           </div>
          
//           <div>
//             <label className="block text-gray-700 mb-2">Start Date</label>
//             <input
//               type="date"
//               name="startDate"
//               value={project.startDate}
//               onChange={handleChange}
//               className="w-full bg-white border border-gray-300 rounded-lg p-2 text-gray-800"
//               required
//             />
//           </div>
          
//           <div>
//             <label className="block text-gray-700 mb-2">End Date</label>
//             <input
//               type="date"
//               name="endDate"
//               value={project.endDate}
//               onChange={handleChange}
//               className="w-full bg-white border border-gray-300 rounded-lg p-2 text-gray-800"
//               required
//             />
//           </div>
          
//           <div>
//             <label className="block text-gray-700 mb-2">Priority</label>
//             <select
//               name="priority"
//               value={project.priority}
//               onChange={handleChange}
//               className="w-full bg-white border border-gray-300 rounded-lg p-2 text-gray-800"
//             >
//               <option value="Low">Low</option>
//               <option value="Medium">Medium</option>
//               <option value="High">High</option>
//             </select>
//           </div>
          
//           <div>
//             <label className="block text-gray-700 mb-2">Budget ($)</label>
//             <input
//               type="number"
//               name="budget"
//               value={project.budget}
//               onChange={handleChange}
//               className="w-full bg-white border border-gray-300 rounded-lg p-2 text-gray-800"
//               min="0"
//             />
//           </div>
//         </div>
        
//         <div className="mb-6">
//           <label className="block text-gray-700 mb-2">Description</label>
//           <textarea
//             name="description"
//             value={project.description}
//             onChange={handleChange}
//             className="w-full bg-white border border-gray-300 rounded-lg p-2 text-gray-800 h-24"
//           />
//         </div>
        
//         <div className="mb-6">
//           <label className="block text-gray-700 mb-2">Assigned Teams</label>
//           <select
//             onChange={(e) => handleTeamSelect(e.target.value)}
//             className="w-full bg-white border border-gray-300 rounded-lg p-2 text-gray-800 mb-2"
//           >
//             <option value="">Select a team to add</option>
//             {teams.map(team => (
//               <option key={team.id} value={team.id}>{team.name}</option>
//             ))}
//           </select>
          
//           <div className="flex flex-wrap gap-2 mt-2">
//             {selectedTeams.map(team => (
//               <div key={team.id} className="bg-gray-100 rounded-lg px-3 py-1 flex items-center border border-gray-300">
//                 <span className="text-gray-800">{team.name}</span>
//                 <button
//                   type="button"
//                   onClick={() => handleTeamRemove(team.id)}
//                   className="ml-2 text-red-500 hover:text-red-700"
//                 >
//                   ×
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
        
//         <div className="mb-6">
//           <label className="block text-gray-700 mb-2">Attachments</label>
//           <div className="flex mb-2">
//             <input
//               type="text"
//               value={newAttachment}
//               onChange={(e) => setNewAttachment(e.target.value)}
//               placeholder="Add attachment URL"
//               className="flex-1 bg-white border border-gray-300 rounded-lg p-2 text-gray-800"
//             />
//             <button
//               type="button"
//               onClick={handleAddAttachment}
//               className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//             >
//               Add
//             </button>
//           </div>
          
//           <div className="space-y-2">
//             {project.attachments.map((attachment, index) => (
//               <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-lg">
//                 <a 
//                   href={attachment} 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="text-blue-600 hover:underline truncate"
//                 >
//                   {attachment}
//                 </a>
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveAttachment(index)}
//                   className="ml-2 text-red-500 hover:text-red-700"
//                 >
//                   ×
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
        
//         <MembersSelect 
//           selectedMembers={project.members}
//           onMembersChange={(members) => setProject(prev => ({ ...prev, members }))}
//         />
        
//         <div className="flex justify-end gap-4 mt-6">
//           <button
//             type="button"
//             onClick={onCancel}
//             className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Save Project
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProjectForm;


// ProjectForm.jsx
import React, { useState, useEffect, useRef } from 'react';
import { saveProject, getProjectById } from '../../utils/projectStorage';
import { getTeams } from '../../utils/teamStorage';
import { generateId } from '../../utils/helpers';
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
    progress: 0,
    budget: 0,
    spent: 0
  });
  
  const [teams, setTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const fileInputRef = useRef(null);

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

  const handleProgressChange = (e) => {
    const progress = parseInt(e.target.value);
    setProject(prev => ({ ...prev, progress: isNaN(progress) ? 0 : Math.min(100, Math.max(0, progress)) }));
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

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newAttachments = files.map(file => ({
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
        preview: URL.createObjectURL(file)
      }));
      setProject(prev => ({ ...prev, attachments: [...prev.attachments, ...newAttachments] }));
    }
  };

  const handleRemoveAttachment = (index) => {
    const newAttachments = [...project.attachments];
    URL.revokeObjectURL(newAttachments[index].preview);
    newAttachments.splice(index, 1);
    setProject(prev => ({ ...prev, attachments: newAttachments }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectToSave = {
      ...project,
      teams: selectedTeams,
      updatedAt: new Date().toISOString()
    };
    saveProject(projectToSave);
    onSave(projectToSave);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        {projectId ? 'Edit Project' : 'Create New Project'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 mb-2">Project Name</label>
            <input
              type="text"
              name="name"
              value={project.name}
              onChange={handleChange}
              className="w-full bg-white border border-gray-300 rounded-lg p-2 text-gray-800"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Status</label>
            <select
              name="status"
              value={project.status}
              onChange={handleChange}
              className="w-full bg-white border border-gray-300 rounded-lg p-2 text-gray-800"
            >
              <option value="Not Started">Not Started</option>
              <option value="Planning">Planning</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={project.startDate}
              onChange={handleChange}
              className="w-full bg-white border border-gray-300 rounded-lg p-2 text-gray-800"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              name="endDate"
              value={project.endDate}
              onChange={handleChange}
              className="w-full bg-white border border-gray-300 rounded-lg p-2 text-gray-800"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Priority</label>
            <select
              name="priority"
              value={project.priority}
              onChange={handleChange}
              className="w-full bg-white border border-gray-300 rounded-lg p-2 text-gray-800"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Budget (Rs.)</label>
            <input
              type="number"
              name="budget"
              value={project.budget}
              onChange={handleChange}
              className="w-full bg-white border border-gray-300 rounded-lg p-2 text-gray-800"
              min="0"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
            className="w-full bg-white border border-gray-300 rounded-lg p-2 text-gray-800 h-24"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Assigned Teams</label>
          <select
            onChange={(e) => handleTeamSelect(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-lg p-2 text-gray-800 mb-2"
          >
            <option value="">Select a team to add</option>
            {teams.map(team => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedTeams.map(team => (
              <div key={team.id} className="bg-gray-100 rounded-lg px-3 py-1 flex items-center border border-gray-300">
                <span className="text-gray-800">{team.name}</span>
                <button
                  type="button"
                  onClick={() => handleTeamRemove(team.id)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
        </div>
        <div className='mb-6'>
            <label className="block text-gray-700 mb-2">Progress (%)</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="100"
                value={project.progress}
                onChange={handleProgressChange}
                className="w-full"
              />
              <input
                type="number"
                min="0"
                max="100"
                value={project.progress}
                onChange={handleProgressChange}
                className="w-20 bg-white border border-gray-300 rounded-lg p-2 text-gray-800"
              />
            </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Attachments</label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            multiple
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mb-4"
          >
            Upload Files
          </button>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {project.attachments.map((attachment, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded mr-2">
                    {attachment.type.includes('image') ? (
                      <img src={attachment.preview} alt="Preview" className="w-6 h-6 object-cover" />
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
                  <button
                    type="button"
                    onClick={() => handleRemoveAttachment(index)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    ×
                  </button>
                </div>
                <a
                  href={attachment.preview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  View
                </a>
              </div>
            ))}
          </div>
        </div>
        
        <MembersSelect 
          selectedMembers={project.members}
          onMembersChange={(members) => setProject(prev => ({ ...prev, members }))}
        />
        
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
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