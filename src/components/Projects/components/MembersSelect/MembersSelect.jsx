// MembersSelect.jsx
import React, { useState } from 'react';
import { mockMembers } from '../../mockData/mockMembers';

const MembersSelect = ({ selectedMembers, onMembersChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: '',
    avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
  });
  const [showAddForm, setShowAddForm] = useState(false);
  
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

  const handleAddMember = () => {
    if (newMember.name.trim() && newMember.email.trim()) {
      const memberToAdd = {
        ...newMember,
        id: `custom-${Date.now()}`
      };
      onMembersChange([...selectedMembers, memberToAdd]);
      setNewMember({
        name: '',
        email: '',
        role: '',
        avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
      });
      setShowAddForm(false);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-gray-700 mb-2">Team Members</label>
      
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-white border border-gray-300 rounded-lg p-2 text-gray-800"
        />
        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          {showAddForm ? 'Cancel' : 'Add Member'}
        </button>
      </div>
      
      {showAddForm && (
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Add New Member</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={newMember.name}
                onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                className="w-full bg-white border border-gray-300 rounded-lg p-2 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={newMember.email}
                onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                className="w-full bg-white border border-gray-300 rounded-lg p-2 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Role</label>
              <input
                type="text"
                value={newMember.role}
                onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                className="w-full bg-white border border-gray-300 rounded-lg p-2 text-gray-800"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddMember}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Member
          </button>
        </div>
      )}
      
      <div className="max-h-40 overflow-y-auto mb-2 border border-gray-300 rounded-lg">
        {filteredMembers.map(member => (
          <div 
            key={member.id}
            className={`flex items-center p-2 cursor-pointer ${selectedMembers.some(m => m.id === member.id) ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            onClick={() => toggleMember(member)}
          >
            <img 
              src={member.avatar} 
              alt={member.name}
              className="w-8 h-8 rounded-full mr-3"
            />
            <div className="flex-1">
              <p className="text-gray-800">{member.name}</p>
              <p className="text-xs text-gray-600">{member.role}</p>
            </div>
            {selectedMembers.some(m => m.id === member.id) && (
              <span className="text-green-500">✓</span>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-2 mt-3">
        {selectedMembers.map(member => (
          <div key={member.id} className="bg-gray-100 rounded-lg px-3 py-1 flex items-center border border-gray-300">
            <img 
              src={member.avatar} 
              alt={member.name}
              className="w-6 h-6 rounded-full mr-2"
            />
            <span className="text-gray-800 text-sm">{member.name}</span>
            <button
              type="button"
              onClick={() => toggleMember(member)}
              className="ml-2 text-red-500 hover:text-red-700 text-sm"
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