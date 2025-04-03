import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaEllipsisV } from 'react-icons/fa';

const EmailList = ({ 
  emails = [], 
  drafts = [],
  setEmails = () => {},
  setDrafts = () => {},
  selectedEmails = [], 
  setSelectedEmails = () => {},
  showSpamActions = false,
  showTrashActions = false,
  showArchiveActions = false,
  showAllActions = false,
  showDraftActions = false,
  onDeletePermanently = () => {},
  onNotSpam = () => {},
  onRestore = () => {},
  onUnarchive = () => {},
  onSendDraft = () => {},
  onDeleteDraft = () => {},
  onMarkAsRead = () => {},
  onMarkAsUnread = () => {},
  onToggleFavorite = () => {},
  onArchive = () => {},
  onMarkAsSpam = () => {},
  onDelete = () => {}
}) => {
  const [hoveredEmail, setHoveredEmail] = useState(null);

  const allItems = [...emails, ...drafts];

  const toggleSelect = (id) => {
    if (selectedEmails.includes(id)) {
      setSelectedEmails(selectedEmails.filter(emailId => emailId !== id));
    } else {
      setSelectedEmails([...selectedEmails, id]);
    }
  };

  const handleToggleFavorite = (id) => {
    const isDraft = drafts.some(d => d.id === id);
    const isFavorite = allItems.find(item => item.id === id)?.isFavorite;
    onToggleFavorite([id], !isFavorite);
  };

  const handleDelete = (id) => {
    const isDraft = drafts.some(d => d.id === id);
    if (isDraft) {
      onDeleteDraft(id);
    } else {
      onDelete([id]);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <table className="min-w-full bg-white">
        <tbody>
          {allItems.map((item) => (
            <tr 
              key={item.id}
              className={`border-b hover:bg-gray-100 ${selectedEmails.includes(item.id) ? 'bg-gray-100' : ''} ${!item.isRead ? 'font-semibold' : ''}`}
              onMouseEnter={() => setHoveredEmail(item.id)}
              onMouseLeave={() => setHoveredEmail(null)}
            >
              <td className="px-4 py-2">
                <input 
                  type="checkbox" 
                  checked={selectedEmails.includes(item.id)}
                  onChange={() => toggleSelect(item.id)}
                  className="form-checkbox h-4 w-4 text-purple-600 transition duration-150 ease-in-out"
                />
              </td>
              <td className="px-4 py-2">
                <button onClick={() => handleToggleFavorite(item.id)}>
                  <FaStar 
                    className={item.isFavorite ? "text-yellow-500" : "text-gray-400"} 
                  />
                </button>
              </td>
              <td className="px-4 py-2">
                {item.avatar ? (
                  <img 
                    alt={`Profile ${item.sender}`} 
                    className="w-10 h-10 rounded-full" 
                    src={item.avatar} 
                  />
                ) : (
                  <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center">
                    {item.senderInitials}
                  </div>
                )}
              </td>
              <td className="px-4 py-2">
                <span className={!item.isRead ? 'font-semibold' : ''}>{item.sender}</span>
              </td>
              {item.label && (
                <td className="px-4 py-2">
                  <span className={`${getLabelClass(item.label)} rounded-full px-2 py-1 text-xs`}>
                    {item.label}
                  </span>
                </td>
              )}
              <td className="px-4 py-2">
                {/* <Link 
                  to={item.isDraft ? `/inbox/drafts/${item.id}` : `/inbox/emails/${item.id}`}
                  className="block"
                  onClick={() => !item.isDraft && onMarkAsRead([item.id])}
                > */}
                <Link 
                  to={item.isDraft ? `/inbox/drafts/${item.id}` : `/inbox/emails/${item.id}`}
                  className="block"
                  onClick={() => !item.isDraft && onMarkAsRead([item.id])}
                >
                  <span className={!item.isRead ? 'font-semibold' : ''}>{item.subject}</span>
                  <span className="text-gray-500 block truncate">{item.preview}</span>
                </Link>
              </td>
              <td className="px-4 py-2 text-gray-500 text-sm">
                {item.time}
              </td>
              <td className="px-4 py-2">
                {hoveredEmail === item.id && (
                  <div className="flex space-x-2">
                    {showSpamActions && (
                      <>
                        <button 
                          onClick={() => onNotSpam([item.id])}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          Not Spam
                        </button>
                        <button 
                          onClick={() => onDeletePermanently([item.id])}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          Delete
                        </button>
                      </>
                    )}
                    {showTrashActions && (
                      <>
                        <button 
                          onClick={() => onRestore([item.id])}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          Restore
                        </button>
                        <button 
                          onClick={() => onDeletePermanently([item.id])}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          Delete
                        </button>
                      </>
                    )}
                    {showArchiveActions && (
                      <button 
                        onClick={() => onUnarchive([item.id])}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        Unarchive
                      </button>
                    )}
                    {showDraftActions && (
                      <>
                        <button 
                          onClick={() => onSendDraft(item)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          Send
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          Delete
                        </button>
                      </>
                    )}
                    {showAllActions && (
                      <>
                        <button 
                          onClick={() => onArchive([item.id])}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          Archive
                        </button>
                        <button 
                          onClick={() => onMarkAsSpam([item.id])}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          Spam
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          Delete
                        </button>
                      </>
                    )}
                    <button className="text-gray-400 hover:text-gray-600">
                      <FaEllipsisV />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const getLabelClass = (label) => {
  switch(label) {
    case 'Business':
      return 'bg-purple-200 text-purple-700';
    case 'Management':
      return 'bg-red-200 text-red-700';
    case 'Team':
      return 'bg-teal-200 text-teal-700';
    case 'Mail':
      return 'bg-yellow-200 text-yellow-700';
    default:
      return 'bg-gray-200 text-gray-700';
  }
};

export default EmailList;