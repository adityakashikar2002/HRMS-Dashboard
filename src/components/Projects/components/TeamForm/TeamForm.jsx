// import React, { useState, useEffect } from 'react';
// import { saveTeam, getTeamById } from '../../utils/teamStorage';
// import { generateId } from '../../utils/helpers';
// import MembersSelect from '../MembersSelect/MembersSelect';

// const TeamForm = ({ teamId, onSave, onCancel }) => {
//   const [team, setTeam] = useState({
//     id: '',
//     name: '',
//     description: '',
//     members: [],
//     createdAt: new Date().toISOString().split('T')[0]
//   });
  
//   const [selectedMembers, setSelectedMembers] = useState([]);

//   useEffect(() => {
//     if (teamId) {
//       const existingTeam = getTeamById(teamId);
//       if (existingTeam) {
//         setTeam(existingTeam);
//         setSelectedMembers(existingTeam.members);
//       }
//     } else {
//       setTeam(prev => ({ ...prev, id: generateId() }));
//     }
//   }, [teamId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTeam(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const teamToSave = {
//       ...team,
//       members: selectedMembers
//     };
//     saveTeam(teamToSave);
//     onSave(teamToSave);
//   };

//   return (
//     <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
//       <h2 className="text-xl font-bold text-white mb-6">
//         {teamId ? 'Edit Team' : 'Create New Team'}
//       </h2>
      
//       <form onSubmit={handleSubmit}>
//         <div className="mb-6">
//           <label className="block text-gray-400 mb-2">Team Name</label>
//           <input
//             type="text"
//             name="name"
//             value={team.name}
//             onChange={handleChange}
//             className="w-full bg-gray-700 rounded-lg p-2 text-white"
//             required
//           />
//         </div>
        
//         <div className="mb-6">
//           <label className="block text-gray-400 mb-2">Description</label>
//           <textarea
//             name="description"
//             value={team.description}
//             onChange={handleChange}
//             className="w-full bg-gray-700 rounded-lg p-2 text-white h-24"
//           />
//         </div>
        
//         <MembersSelect 
//           selectedMembers={selectedMembers}
//           onMembersChange={setSelectedMembers}
//         />
        
//         <div className="flex justify-end gap-4 mt-6">
//           <button
//             type="button"
//             onClick={onCancel}
//             className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Save Team
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default TeamForm;

// TeamForm.jsx
import React, { useState, useEffect } from 'react';
import { saveTeam, getTeamById } from '../../utils/teamStorage';
import { generateId } from '../../utils/helpers';
import MembersSelect from '../MembersSelect/MembersSelect';

const TeamForm = ({ teamId, onSave, onCancel }) => {
  const [team, setTeam] = useState({
    id: '',
    name: '',
    description: '',
    members: [],
    createdAt: new Date().toISOString().split('T')[0]
  });
  
  const [selectedMembers, setSelectedMembers] = useState([]);

  useEffect(() => {
    if (teamId) {
      const existingTeam = getTeamById(teamId);
      if (existingTeam) {
        setTeam(existingTeam);
        setSelectedMembers(existingTeam.members);
      }
    } else {
      setTeam(prev => ({ ...prev, id: generateId() }));
    }
  }, [teamId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeam(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const teamToSave = {
      ...team,
      members: selectedMembers,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    saveTeam(teamToSave);
    onSave(teamToSave);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        {teamId ? 'Edit Team' : 'Create New Team'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Team Name</label>
          <input
            type="text"
            name="name"
            value={team.name}
            onChange={handleChange}
            className="w-full bg-white border border-gray-300 rounded-lg p-2 text-gray-800"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={team.description}
            onChange={handleChange}
            className="w-full bg-white border border-gray-300 rounded-lg p-2 text-gray-800 h-24"
          />
        </div>
        
        <MembersSelect 
          selectedMembers={selectedMembers}
          onMembersChange={setSelectedMembers}
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
            Save Team
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeamForm;