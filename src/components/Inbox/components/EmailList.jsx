import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaEllipsisV } from 'react-icons/fa';

const EmailList = ({ emails, setEmails, selectedEmails, setSelectedEmails }) => {
  const [hoveredEmail, setHoveredEmail] = useState(null);

  const toggleSelect = (id) => {
    if (selectedEmails.includes(id)) {
      setSelectedEmails(selectedEmails.filter(emailId => emailId !== id));
    } else {
      setSelectedEmails([...selectedEmails, id]);
    }
  };

  const toggleFavorite = (id) => {
    const updatedEmails = emails.map(email => {
      if (email.id === id) {
        return { ...email, isFavorite: !email.isFavorite };
      }
      return email;
    });
    setEmails(updatedEmails);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <table className="min-w-full bg-white">
        <tbody>
          {emails.map((email) => (
            <tr 
              key={email.id}
              className={`border-b hover:bg-gray-100 ${selectedEmails.includes(email.id) ? 'bg-gray-100' : ''}`}
              onMouseEnter={() => setHoveredEmail(email.id)}
              onMouseLeave={() => setHoveredEmail(null)}
            >
              <td className="px-4 py-2">
                <input 
                  type="checkbox" 
                  checked={selectedEmails.includes(email.id)}
                  onChange={() => toggleSelect(email.id)}
                  className="form-checkbox h-4 w-4 text-purple-600 transition duration-150 ease-in-out"
                />
              </td>
              <td className="px-4 py-2">
                <button onClick={() => toggleFavorite(email.id)}>
                  <FaStar 
                    className={email.isFavorite ? "text-yellow-500" : "text-gray-400"} 
                  />
                </button>
              </td>
              <td className="px-4 py-2">
                {email.avatar ? (
                  <img 
                    alt={`Profile picture of ${email.sender}`} 
                    className="w-10 h-10 rounded-full" 
                    src={email.avatar} 
                  />
                ) : (
                  <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center">
                    {email.senderInitials}
                  </div>
                )}
              </td>
              <td className="px-4 py-2">
                <span className="font-semibold">{email.sender}</span>
              </td>
              {email.label && (
                <td className="px-4 py-2">
                  <span className={`${getLabelClass(email.label)} rounded-full px-2 py-1 text-xs`}>
                    {email.label}
                  </span>
                </td>
              )}
              <td className="px-4 py-2">
                <Link to={`/email/${email.id}`} className="block">
                  <span className="text-gray-700">{email.subject}</span>
                  <span className="text-gray-500 block truncate">{email.preview}</span>
                </Link>
              </td>
              <td className="px-4 py-2 text-gray-500 text-sm">
                {email.time}
              </td>
              <td className="px-4 py-2">
                {hoveredEmail === email.id && (
                  <button className="text-gray-400 hover:text-gray-600">
                    <FaEllipsisV />
                  </button>
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