// import React from 'react';
// import { 
//   FaRedoAlt, 
//   FaTrash, 
//   FaExclamationCircle, 
//   FaEllipsisV, 
//   FaSearch, 
//   FaStar, 
//   FaArchive,
//   FaInbox
// } from 'react-icons/fa';

// const TopBar = ({ 
//   selectedEmails, 
//   setSelectedEmails, 
//   emails, 
//   setEmails,
//   onArchiveSelected,
//   onDeleteSelected,
//   onMarkAsSpamSelected,
//   onMarkAsReadSelected,
//   onMarkAsUnreadSelected,
//   onToggleFavoriteSelected
// }) => {
//   const handleMarkAsFavorite = () => {
//     if (selectedEmails.length === 0) return;
//     onToggleFavoriteSelected(true);
//   };

//   const handleMarkAsRead = () => {
//     if (selectedEmails.length === 0) return;
//     onMarkAsReadSelected();
//   };

//   const handleMarkAsUnread = () => {
//     if (selectedEmails.length === 0) return;
//     onMarkAsUnreadSelected();
//   };

//   return (
//     <div className="flex items-center justify-between p-4 bg-white border-b">
//       <div className="flex items-center space-x-4">
//         <button 
//           onClick={handleMarkAsRead}
//           className="text-gray-600 hover:text-gray-900"
//           title="Mark as read"
//         >
//           <FaInbox />
//         </button>
//         <button 
//           onClick={handleMarkAsUnread}
//           className="text-gray-600 hover:text-gray-900"
//           title="Mark as unread"
//         >
//           <FaRedoAlt />
//         </button>
//         <button 
//           onClick={handleMarkAsFavorite}
//           className="text-gray-600 hover:text-gray-900"
//           title="Mark as favorite"
//         >
//           <FaStar />
//         </button>
//         <button 
//           onClick={onArchiveSelected}
//           className="text-gray-600 hover:text-gray-900"
//           title="Archive"
//         >
//           <FaArchive />
//         </button>
//         <button 
//           onClick={onMarkAsSpamSelected}
//           className="text-gray-600 hover:text-gray-900"
//           title="Mark as spam"
//         >
//           <FaExclamationCircle />
//         </button>
//         <button 
//           onClick={onDeleteSelected}
//           className="text-gray-600 hover:text-gray-900"
//           title="Delete"
//         >
//           <FaTrash />
//         </button>
//       </div>
//       <div className="flex items-center space-x-4">
//         <button className="text-gray-600 hover:text-gray-900" title="Search">
//           <FaSearch />
//         </button>
//         <button className="text-gray-600 hover:text-gray-900" title="More options">
//           <FaEllipsisV />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TopBar;

import React, { useState } from 'react';
import { 
  FaRedoAlt, 
  FaTrash, 
  FaExclamationCircle, 
  FaEllipsisV, 
  FaSearch, 
  FaStar, 
  FaArchive,
  FaInbox,
  FaTimes
} from 'react-icons/fa';

const TopBar = ({ 
  selectedEmails, 
  setSelectedEmails, 
  emails, 
  setEmails,
  onArchiveSelected,
  onDeleteSelected,
  onMarkAsSpamSelected,
  onMarkAsReadSelected,
  onMarkAsUnreadSelected,
  onToggleFavoriteSelected,
  onSearch
}) => {
  const handleMarkAsFavorite = () => {
    if (selectedEmails.length === 0) return;
    onToggleFavoriteSelected(true);
  };

  const handleMarkAsRead = () => {
    if (selectedEmails.length === 0) return;
    onMarkAsReadSelected();
  };

  const handleMarkAsUnread = () => {
    if (selectedEmails.length === 0) return;
    onMarkAsUnreadSelected();
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center space-x-4">
        <button 
          onClick={handleMarkAsRead}
          className="text-gray-600 hover:text-gray-900"
          title="Mark as read"
        >
          <FaInbox />
        </button>
        <button 
          onClick={handleMarkAsUnread}
          className="text-gray-600 hover:text-gray-900"
          title="Mark as unread"
        >
          <FaRedoAlt />
        </button>
        <button 
          onClick={handleMarkAsFavorite}
          className="text-gray-600 hover:text-gray-900"
          title="Mark as favorite"
        >
          <FaStar />
        </button>
        <button 
          onClick={onArchiveSelected}
          className="text-gray-600 hover:text-gray-900"
          title="Archive"
        >
          <FaArchive />
        </button>
        <button 
          onClick={onMarkAsSpamSelected}
          className="text-gray-600 hover:text-gray-900"
          title="Mark as spam"
        >
          <FaExclamationCircle />
        </button>
        <button 
          onClick={onDeleteSelected}
          className="text-gray-600 hover:text-gray-900"
          title="Delete"
        >
          <FaTrash />
        </button>
      </div>
      <div className="flex items-center space-x-4">
        {/* <button className="text-gray-600 hover:text-gray-900" title="Search">
          <FaSearch />
        </button> */}
        {isSearching ? (
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search emails..."
              className="border rounded px-2 py-1 text-sm"
              autoFocus
            />
            <button 
              type="submit" 
              className="ml-2 text-gray-600 hover:text-gray-900"
            >
              <FaSearch />
            </button>
            <button 
              type="button" 
              onClick={() => {
                setIsSearching(false);
                setSearchQuery('');
                onSearch('');
              }}
              className="ml-2 text-gray-600 hover:text-gray-900"
            >
              <FaTimes />
            </button>
          </form>
        ) : (
          <button 
            onClick={() => setIsSearching(true)}
            className="text-gray-600 hover:text-gray-900" 
            title="Search"
          >
            <FaSearch />
          </button>
        )}
        <button className="text-gray-600 hover:text-gray-900" title="More options">
          <FaEllipsisV />
        </button>
      </div>
    </div>
  );
};

export default TopBar;