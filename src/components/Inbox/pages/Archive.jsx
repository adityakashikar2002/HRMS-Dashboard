import React, { useState, useEffect } from 'react';
import EmailList from '../components/EmailList';

const Archive = ({ 
  emails, 
  setEmails,
  selectedEmails,
  setSelectedEmails,
  onUnarchive,
  onDelete,
  onToggleFavorite,
  searchTerm
}) => {
  const [archivedEmails, setArchivedEmails] = useState([]);

  useEffect(() => {
    const archived = emails.filter(email => email.isArchived);
    setArchivedEmails(archived);
  }, [emails]);

  return (
    <div className="flex-1 overflow-y-auto">
      <EmailList 
        emails={archivedEmails} 
        setEmails={setEmails}
        selectedEmails={selectedEmails}
        setSelectedEmails={setSelectedEmails}
        onUnarchive={onUnarchive}
        onDelete={onDelete}
        onToggleFavorite={onToggleFavorite}
        showArchiveActions={true}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default Archive;