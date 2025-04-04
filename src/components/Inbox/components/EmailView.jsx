import React from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faReply, faPrint, faStar } from '@fortawesome/free-solid-svg-icons';

const EmailView = ({ emails, onBack, onToggleFavorite, onDelete, onMarkAsSpam, onArchive }) => {
  const { emailId } = useParams();
  // const navigate = useNavigate();
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