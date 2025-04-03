import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaInbox, 
  FaFileAlt, 
  FaStar, 
  FaPaperPlane, 
  FaArchive, 
  FaExclamationCircle, 
  FaTrash, 
  FaEnvelope 
} from 'react-icons/fa';

const Sidebar = ({ 
  composeOpen, 
  setComposeOpen,
  unreadCount,
  draftCount,
  spamCount,
  trashCount
}) => {
  return (
    <div className="w-64 bg-white border-r">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">MailBox</h1>
        <button 
          onClick={() => setComposeOpen(true)}
          className="mt-4 w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg transition duration-200"
        >
          + Compose
        </button>
      </div>
      <nav className="mt-6">
        <ul>
          <li>
            <NavLink 
              to="/inbox" 
              end
              className={({ isActive }) => 
                `flex items-center justify-between p-2 hover:bg-gray-200 rounded-lg ${isActive ? 'bg-gray-200' : 'text-gray-700'}`
              }
            >
              <div className="flex items-center">
                <FaInbox className="mr-3" />
                <span>Inbox</span>
              </div>
              {unreadCount > 0 && (
                <span className="bg-purple-200 text-purple-700 rounded-full px-2 py-1 text-xs">
                  {unreadCount}
                </span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/inbox/drafts"
              className={({ isActive }) => 
                `flex items-center justify-between p-2 hover:bg-gray-200 rounded-lg ${isActive ? 'bg-gray-200' : 'text-gray-700'}`
              }
            >
              <div className="flex items-center">
                <FaFileAlt className="mr-3" />
                <span>Drafts</span>
              </div>
              {draftCount > 0 && (
                <span className="bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs">
                  {draftCount}
                </span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/inbox/sent"
              className={({ isActive }) => 
                `flex items-center p-2 hover:bg-gray-200 rounded-lg ${isActive ? 'bg-gray-200' : 'text-gray-700'}`
              }
            >
              <FaPaperPlane className="mr-3" />
              <span>Sent</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/inbox/favorites"
              className={({ isActive }) => 
                `flex items-center p-2 hover:bg-gray-200 rounded-lg ${isActive ? 'bg-gray-200' : 'text-gray-700'}`
              }
            >
              <FaStar className="mr-3" />
              <span>Favorites</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/inbox/archive"
              className={({ isActive }) => 
                `flex items-center p-2 hover:bg-gray-200 rounded-lg ${isActive ? 'bg-gray-200' : 'text-gray-700'}`
              }
            >
              <FaArchive className="mr-3" />
              <span>Archive</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/inbox/spam"
              className={({ isActive }) => 
                `flex items-center justify-between p-2 hover:bg-gray-200 rounded-lg ${isActive ? 'bg-gray-200' : 'text-gray-700'}`
              }
            >
              <div className="flex items-center">
                <FaExclamationCircle className="mr-3" />
                <span>Spam</span>
              </div>
              {spamCount > 0 && (
                <span className="bg-red-200 text-red-700 rounded-full px-2 py-1 text-xs">
                  {spamCount}
                </span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/inbox/trash"
              className={({ isActive }) => 
                `flex items-center justify-between p-2 hover:bg-gray-200 rounded-lg ${isActive ? 'bg-gray-200' : 'text-gray-700'}`
              }
            >
              <div className="flex items-center">
                <FaTrash className="mr-3" />
                <span>Trash</span>
              </div>
              {trashCount > 0 && (
                <span className="bg-red-200 text-red-700 rounded-full px-2 py-1 text-xs">
                  {trashCount}
                </span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/inbox/all"
              className={({ isActive }) => 
                `flex items-center p-2 hover:bg-gray-200 rounded-lg ${isActive ? 'bg-gray-200' : 'text-gray-700'}`
              }
            >
              <FaEnvelope className="mr-3" />
              <span>All Mail</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="mt-6 p-4">
        <h2 className="text-gray-600 text-sm font-semibold">Labels</h2>
        <ul className="mt-2">
          <li className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-lg">
            <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
            <span>Business</span>
          </li>
          <li className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-lg">
            <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
            <span>Management</span>
          </li>
          <li className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-lg">
            <span className="w-3 h-3 bg-teal-500 rounded-full mr-3"></span>
            <span>Team</span>
          </li>
          <li className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-lg">
            <span className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
            <span>Mail</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;