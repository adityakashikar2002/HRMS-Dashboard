import React from 'react';

const UserProfile = ({ name, email, avatar }) => {
  return (
    <div className="flex items-center mb-4">
      <img alt="User Avatar" className="w-10 h-10 rounded-full" src={avatar} />
      <div className="ml-2">
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
    </div>
  );
};

export default UserProfile;