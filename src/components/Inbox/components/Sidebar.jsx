import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaInbox, FaFileAlt, FaStar, FaPaperPlane, FaArchive, FaExclamationCircle, FaTrash, FaEnvelope } from 'react-icons/fa';

const Sidebar = ({ composeOpen, setComposeOpen }) => {
  return (
    <div className="w-64 bg-white border-r">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">NioMail</h1>
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
              exact
              activeClassName="bg-gray-200"
              className="flex items-center justify-between p-2 text-gray-700 hover:bg-gray-200 rounded-lg"
            >
              <div className="flex items-center">
                <FaInbox className="mr-3" />
                <span>Inbox</span>
              </div>
              <span className="bg-purple-200 text-purple-700 rounded-full px-2 py-1 text-xs">9</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/inbox/drafts" 
              activeClassName="bg-gray-200"
              className="flex items-center justify-between p-2 text-gray-700 hover:bg-gray-200 rounded-lg"
            >
              <div className="flex items-center">
                <FaFileAlt className="mr-3" />
                <span>Draft</span>
              </div>
              <span className="bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs">4</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/inbox/favorites" 
              activeClassName="bg-gray-200"
              className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-lg"
            >
              <FaStar className="mr-3" />
              <span>Favourite</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/inbox/sent" 
              activeClassName="bg-gray-200"
              className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-lg"
            >
              <FaPaperPlane className="mr-3" />
              <span>Sent</span>
            </NavLink>
          </li>
          <li>
            <Link 
              to="/inbox/#" 
              className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-lg"
            >
              <FaArchive className="mr-3" />
              <span>Archive</span>
            </Link>
          </li>
          <li>
            <NavLink 
              to="/inbox/spam" 
              activeClassName="bg-gray-200"
              className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-lg"
            >
              <FaExclamationCircle className="mr-3" />
              <span>Spam</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/inbox/trash" 
              activeClassName="bg-gray-200"
              className="flex items-center justify-between p-2 text-gray-700 hover:bg-gray-200 rounded-lg"
            >
              <div className="flex items-center">
                <FaTrash className="mr-3" />
                <span>Trash</span>
              </div>
              <span className="bg-red-200 text-red-700 rounded-full px-2 py-1 text-xs">2</span>
            </NavLink>
          </li>
          <li>
            <Link 
              to="/inbox/#" 
              className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-lg"
            >
              <FaEnvelope className="mr-3" />
              <span>All Mails</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-6 p-4">
        <h2 className="text-gray-600 text-sm font-semibold">Label</h2>
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