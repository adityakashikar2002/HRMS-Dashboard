// import React from 'react';
// import { FaRedoAlt, FaTrash, FaExclamationCircle, FaEllipsisV, FaArrowLeft, FaArrowRight, FaSearch } from 'react-icons/fa';

// const TopBar = ({ selectedEmails, setSelectedEmails, emails, setEmails }) => {
//   const handleDelete = () => {
//     if (selectedEmails.length === 0) return;
    
//     const updatedEmails = emails.filter(email => !selectedEmails.includes(email.id));
//     setEmails(updatedEmails);
//     setSelectedEmails([]);
//   };

//   const handleMarkAsSpam = () => {
//     if (selectedEmails.length === 0) return;
    
//     const updatedEmails = emails.map(email => {
//       if (selectedEmails.includes(email.id)) {
//         return { ...email, isSpam: true };
//       }
//       return email;
//     });
    
//     setEmails(updatedEmails);
//     setSelectedEmails([]);
//   };

//   return (
//     <div className="flex items-center justify-between p-4 bg-white border-b">
//       <div className="flex items-center space-x-4">
//         <button className="text-gray-600 hover:text-gray-900">
//           <FaRedoAlt />
//         </button>
//         <button 
//           onClick={handleDelete}
//           className="text-gray-600 hover:text-gray-900"
//         >
//           <FaTrash />
//         </button>
//         <button 
//           onClick={handleMarkAsSpam}
//           className="text-gray-600 hover:text-gray-900"
//         >
//           <FaExclamationCircle />
//         </button>
//         <button className="text-gray-600 hover:text-gray-900">
//           <FaEllipsisV />
//         </button>
//       </div>
//       <div className="flex items-center space-x-4">
//         <button className="text-gray-600 hover:text-gray-900">
//           <FaArrowLeft />
//         </button>
//         <button className="text-gray-600 hover:text-gray-900">
//           <FaArrowRight />
//         </button>
//         <button className="text-gray-600 hover:text-gray-900">
//           <FaSearch />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TopBar;

import React from 'react';
import { FaRedoAlt, FaTrash, FaExclamationCircle, FaEllipsisV, FaArrowLeft, FaArrowRight, FaSearch, FaStar } from 'react-icons/fa';

const TopBar = ({ selectedEmails, setSelectedEmails, emails, setEmails }) => {
  const handleDelete = () => {
    if (selectedEmails.length === 0) return;
    
    const updatedEmails = emails.map(email => 
      selectedEmails.includes(email.id) ? { ...email, isTrash: true } : email
    );
    setEmails(updatedEmails);
    setSelectedEmails([]);
  };

  const handleMarkAsSpam = () => {
    if (selectedEmails.length === 0) return;
    
    const updatedEmails = emails.map(email => 
      selectedEmails.includes(email.id) ? { ...email, isSpam: true } : email
    );
    setEmails(updatedEmails);
    setSelectedEmails([]);
  };

  const handleMarkAsFavorite = () => {
    if (selectedEmails.length === 0) return;
    
    const updatedEmails = emails.map(email => 
      selectedEmails.includes(email.id) ? { ...email, isFavorite: true } : email
    );
    setEmails(updatedEmails);
    setSelectedEmails([]);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-900">
          <FaRedoAlt />
        </button>
        <button 
          onClick={handleDelete}
          className="text-gray-600 hover:text-gray-900"
        >
          <FaTrash />
        </button>
        <button 
          onClick={handleMarkAsSpam}
          className="text-gray-600 hover:text-gray-900"
        >
          <FaExclamationCircle />
        </button>
        <button 
          onClick={handleMarkAsFavorite}
          className="text-gray-600 hover:text-gray-900"
        >
          <FaStar />
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-900">
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default TopBar;