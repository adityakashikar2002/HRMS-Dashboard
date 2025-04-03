import React from 'react';
import { 
  FaRedoAlt, 
  FaTrash, 
  FaExclamationCircle, 
  FaEllipsisV, 
  FaSearch, 
  FaStar, 
  FaArchive,
  FaInbox
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
  onToggleFavoriteSelected
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
        <button className="text-gray-600 hover:text-gray-900" title="Search">
          <FaSearch />
        </button>
        <button className="text-gray-600 hover:text-gray-900" title="More options">
          <FaEllipsisV />
        </button>
      </div>
    </div>
  );
};

export default TopBar;