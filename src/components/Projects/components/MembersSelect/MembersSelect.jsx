import React, { useState } from 'react';
import { mockMembers } from '../../mockData/mockMembers';

const MembersSelect = ({ selectedMembers, onMembersChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredMembers = mockMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const toggleMember = (member) => {
    const isSelected = selectedMembers.some(m => m.id === member.id);
    if (isSelected) {
      onMembersChange(selectedMembers.filter(m => m.id !== member.id));
    } else {
      onMembersChange([...selectedMembers, member]);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-gray-400 mb-2">Team Members</label>
      
      <input
        type="text"
        placeholder="Search members..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-gray-700 rounded-lg p-2 text-white mb-2"
      />
      
      <div className="max-h-40 overflow-y-auto mb-2">
        {filteredMembers.map(member => (
          <div 
            key={member.id}
            className={`flex items-center p-2 rounded-lg cursor-pointer ${selectedMembers.some(m => m.id === member.id) ? 'bg-blue-900' : 'hover:bg-gray-700'}`}
            onClick={() => toggleMember(member)}
          >
            <img 
              src={member.avatar} 
              alt={member.name}
              className="w-8 h-8 rounded-full mr-3"
            />
            <div>
              <p className="text-white">{member.name}</p>
              <p className="text-xs text-gray-400">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {selectedMembers.map(member => (
          <div key={member.id} className="bg-gray-700 rounded-lg px-3 py-1 flex items-center">
            <img 
              src={member.avatar} 
              alt={member.name}
              className="w-6 h-6 rounded-full mr-2"
            />
            <span className="text-white text-sm">{member.name}</span>
            <button
              type="button"
              onClick={() => toggleMember(member)}
              className="ml-2 text-red-400 hover:text-red-300 text-sm"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersSelect;