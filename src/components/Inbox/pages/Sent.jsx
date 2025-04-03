import React, { useState, useEffect } from 'react';
import EmailList from '../components/EmailList';

const Sent = ({ 
  emails, 
  setEmails,
  selectedEmails,
  setSelectedEmails,
  onToggleFavorite,
  onArchive,
  onDelete,
  onMarkAsSpam
}) => {
  const [sentEmails, setSentEmails] = useState([]);

  useEffect(() => {
    const sent = emails.filter(email => email.isSent && !email.isTrash && !email.isSpam && !email.isArchived);
    setSentEmails(sent);
  }, [emails]);

  return (
    <div className="flex-1 overflow-y-auto">
      <EmailList 
        emails={sentEmails} 
        setEmails={setEmails}
        selectedEmails={selectedEmails}
        setSelectedEmails={setSelectedEmails}
        onToggleFavorite={onToggleFavorite}
        onArchive={onArchive}
        onDelete={onDelete}
        onMarkAsSpam={onMarkAsSpam}
      />
    </div>
  );
};

export default Sent;