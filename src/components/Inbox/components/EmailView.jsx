// import React, { useState } from 'react';
// import { 
//   FaReply, 
//   FaReplyAll, 
//   FaForward, 
//   FaTrash, 
//   FaEllipsisV, 
//   FaStar, 
//   FaPaperclip,
//   FaArchive,
//   FaExclamationCircle
// } from 'react-icons/fa';

// const EmailView = ({ 
//   email, 
//   onBack,
//   onToggleFavorite,
//   onDelete,
//   onMarkAsSpam,
//   onArchive
// }) => {
//   const [isFavorite, setIsFavorite] = useState(email.isFavorite);

//   const handleToggleFavorite = () => {
//     const newFavoriteStatus = !isFavorite;
//     setIsFavorite(newFavoriteStatus);
//     onToggleFavorite([email.id], newFavoriteStatus);
//   };

//   const handleDelete = () => {
//     onDelete([email.id]);
//     onBack();
//   };

//   const handleMarkAsSpam = () => {
//     onMarkAsSpam([email.id]);
//     onBack();
//   };

//   const handleArchive = () => {
//     onArchive([email.id]);
//     onBack();
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow">
//       <div className="flex justify-between items-start mb-6">
//         <button 
//           onClick={onBack}
//           className="text-gray-600 hover:text-gray-900"
//         >
//           &larr; Back
//         </button>
//         <div className="flex space-x-2">
//           <button 
//             onClick={handleToggleFavorite}
//             className={`p-2 rounded-full ${isFavorite ? 'text-yellow-500' : 'text-gray-400'}`}
//             title={isFavorite ? "Remove from favorites" : "Add to favorites"}
//           >
//             <FaStar />
//           </button>
//           <button 
//             onClick={handleArchive}
//             className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
//             title="Archive"
//           >
//             <FaArchive />
//           </button>
//           <button 
//             onClick={handleMarkAsSpam}
//             className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
//             title="Mark as spam"
//           >
//             <FaExclamationCircle />
//           </button>
//           <button 
//             onClick={handleDelete}
//             className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
//             title="Delete"
//           >
//             <FaTrash />
//           </button>
//           <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100" title="More options">
//             <FaEllipsisV />
//           </button>
//         </div>
//       </div>

//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">{email.subject}</h1>
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center">
//             {email.avatar ? (
//               <img 
//                 src={email.avatar} 
//                 alt={email.sender} 
//                 className="w-12 h-12 rounded-full mr-4"
//               />
//             ) : (
//               <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center mr-4">
//                 {email.senderInitials}
//               </div>
//             )}
//             <div>
//               <h2 className="font-semibold text-gray-800">{email.sender}</h2>
//               <p className="text-gray-500 text-sm">to me</p>
//             </div>
//           </div>
//           <div className="text-gray-500 text-sm">
//             {email.time}
//           </div>
//         </div>
//       </div>

//       <div className="prose max-w-none mb-6">
//         <p className="whitespace-pre-line">{email.body}</p>
//       </div>

//       {email.hasAttachment && (
//         <div className="border-t pt-4">
//           <h3 className="text-sm font-semibold text-gray-600 mb-2">Attachments</h3>
//           <div className="flex items-center p-3 border rounded-lg w-64">
//             <FaPaperclip className="text-gray-500 mr-2" />
//             <span className="text-sm">document.pdf</span>
//           </div>
//         </div>
//       )}

//       <div className="mt-8 pt-4 border-t">
//         <button className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded mr-2">
//           <FaReply className="inline mr-1" /> Reply
//         </button>
//         <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded mr-2">
//           <FaReplyAll className="inline mr-1" /> Reply All
//         </button>
//         <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded">
//           <FaForward className="inline mr-1" /> Forward
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EmailView;

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faReply, faPrint, faStar } from '@fortawesome/free-solid-svg-icons';

const EmailView = ({ emails, onBack, onToggleFavorite, onDelete, onMarkAsSpam, onArchive }) => {
  const { emailId } = useParams();
  const navigate = useNavigate();
  const email = emails.find(e => e.id === parseInt(emailId));

  if (!email) {
    return <div>Email not found</div>;
  }

  return (
    <div className="bg-white text-gray-800">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{email.subject}</h1>
          <div className="flex space-x-2">
            {email.label && (
              <span className={`${getLabelClass(email.label)} px-2 py-1 rounded-full text-sm`}>
                {email.label}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          {email.avatar ? (
            <img 
              alt={`Profile of ${email.sender}`} 
              className="w-12 h-12 rounded-full" 
              src={email.avatar}
            />
          ) : (
            <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center">
              {email.senderInitials}
            </div>
          )}
          
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold">{email.sender}</h2>
                <p className="text-gray-500">
                  to me
                  <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
                </p>
              </div>
              <div className="text-gray-500 text-sm">
                <FontAwesomeIcon icon={faReply} className="mr-1" />
                <span>{new Date(email.date).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="whitespace-pre-line">{email.body}</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end items-center mt-4 space-x-4">
          <button onClick={() => window.print()}>
            <FontAwesomeIcon icon={faPrint} className="text-gray-500" />
          </button>
          <button onClick={() => onToggleFavorite([email.id], !email.isFavorite)}>
            <FontAwesomeIcon 
              icon={faStar} 
              className={email.isFavorite ? "text-yellow-500" : "text-gray-500"} 
            />
          </button>
        </div>
      </div>
    </div>
  );
};

const getLabelClass = (label) => {
  switch(label) {
    case 'Business': return 'bg-purple-100 text-purple-600';
    case 'Management': return 'bg-red-100 text-red-600';
    case 'Team': return 'bg-teal-100 text-teal-600';
    case 'Mail': return 'bg-yellow-100 text-yellow-600';
    default: return 'bg-gray-100 text-gray-600';
  }
};

export default EmailView;