import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmailList from '../components/EmailList';
import EmailView from '../components/EmailView';

const Inbox = ({ 
  inboxEmails = [], 
  setInboxEmails = () => {}, 
  selectedEmails = [], 
  setSelectedEmails = () => {}, 
  onArchive = () => {},
  onDelete = () => {},
  onMarkAsSpam = () => {},
  onToggleFavorite = () => {},
  onMarkAsRead = () => {},
  searchTerm
}) => {
  const { emailId } = useParams();
  const navigate = useNavigate();
  const [filteredInbox, setFilteredInbox] = useState([]);

useEffect(() => {
  const filtered = inboxEmails.filter(email => 
    !email.isSpam && 
    !email.isTrash && 
    !email.isArchived &&
    !email.isSent && // Make sure to exclude sent emails
    !email.fromMe // Only show emails not from me
  );
  setFilteredInbox(filtered);
}, [inboxEmails]);

  const handleBack = () => {
    navigate('/inbox');
  };

  if (emailId) {
    const email = filteredInbox.find(e => e.id === parseInt(emailId));
    if (!email) return null;
    
    return (
      <EmailView 
        email={email} 
        onBack={handleBack}
        onToggleFavorite={(id, isFavorite) => onToggleFavorite([id], isFavorite)}
        onDelete={(id) => onDelete([id])}
        onMarkAsSpam={(id) => onMarkAsSpam([id])}
        onArchive={(id) => onArchive([id])}
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <EmailList 
        emails={filteredInbox}
        drafts={[]}
        setEmails={setInboxEmails}
        selectedEmails={selectedEmails}
        setSelectedEmails={setSelectedEmails}
        onArchive={onArchive}
        onDelete={onDelete}
        onMarkAsSpam={onMarkAsSpam}
        onToggleFavorite={onToggleFavorite}
        onMarkAsRead={onMarkAsRead}
        showAllActions={true}
        searchTerm={searchTerm}
      />
      {/* <EmailList 
        emails={inboxEmails}
        drafts={[]}
        setEmails={setInboxEmails}
        selectedEmails={selectedEmails}
        setSelectedEmails={setSelectedEmails}
        onArchive={onArchive}
        onDelete={onDelete}
        onMarkAsSpam={onMarkAsSpam}
        onToggleFavorite={onToggleFavorite}
        onMarkAsRead={onMarkAsRead}
        showAllActions={true}
        searchTerm={searchTerm}
      /> */}
    </div>
  );
};

export default Inbox;