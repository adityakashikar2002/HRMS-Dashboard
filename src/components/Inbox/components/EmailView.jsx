// import React from 'react';
// import { FaReply, FaReplyAll, FaForward, FaTrash, FaEllipsisV, FaStar, FaPaperclip } from 'react-icons/fa';

// const EmailView = ({ email, onBack }) => {
//   const [isFavorite, setIsFavorite] = useState(email.isFavorite);

//   const toggleFavorite = () => {
//     setIsFavorite(!isFavorite);
//     // Update in the database/state
//   };

import React, { useState } from 'react';
import { FaReply, FaReplyAll, FaForward, FaTrash, FaEllipsisV, FaStar, FaPaperclip } from 'react-icons/fa';

const EmailView = ({ email, onBack, onToggleFavorite, onDelete, onMarkAsSpam }) => {
  const [isFavorite, setIsFavorite] = useState(email.isFavorite);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite(email.id);
  };

  const handleDelete = () => {
    onDelete(email.id);
    onBack();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-start mb-6">
        <button 
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900"
        >
          &larr; Back
        </button>
        <div className="flex space-x-2">
          {/* <button 
            onClick={toggleFavorite}
            className={`p-2 rounded-full ${isFavorite ? 'text-yellow-500' : 'text-gray-400'}`}
          >
            <FaStar />
          </button> */}
           <button 
            onClick={handleToggleFavorite}
            className={`p-2 rounded-full ${isFavorite ? 'text-yellow-500' : 'text-gray-400'}`}
          >
            <FaStar />
          </button>
          <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
            <FaReply />
          </button>
          <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
            <FaReplyAll />
          </button>
          <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
            <FaForward />
          </button>
          {/* <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
            <FaTrash />
          </button> */}
          <button 
            onClick={handleDelete}
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
          >
            <FaTrash />
          </button>

          <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
            <FaEllipsisV />
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{email.subject}</h1>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {email.avatar ? (
              <img 
                src={email.avatar} 
                alt={email.sender} 
                className="w-12 h-12 rounded-full mr-4"
              />
            ) : (
              <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center mr-4">
                {email.senderInitials}
              </div>
            )}
            <div>
              <h2 className="font-semibold text-gray-800">{email.sender}</h2>
              <p className="text-gray-500 text-sm">to me</p>
            </div>
          </div>
          <div className="text-gray-500 text-sm">
            {email.time}
          </div>
        </div>
      </div>

      <div className="prose max-w-none mb-6">
        <p>{email.body}</p>
      </div>

      {email.hasAttachment && (
        <div className="border-t pt-4">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Attachments</h3>
          <div className="flex items-center p-3 border rounded-lg w-64">
            <FaPaperclip className="text-gray-500 mr-2" />
            <span className="text-sm">document.pdf</span>
          </div>
        </div>
      )}

      <div className="mt-8 pt-4 border-t">
        <button className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded mr-2">
          Reply
        </button>
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded">
          Forward
        </button>
      </div>
    </div>
  );
};

export default EmailView;