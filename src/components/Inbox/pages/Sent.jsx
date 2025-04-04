import React, { useEffect, useState } from 'react';
import EmailList from '../components/EmailList';

const Sent = ({ 
  sentEmails = [], 
  setSentEmails = () => {},
  selectedEmails = [], 
  setSelectedEmails = () => {}, 
  onDelete = () => {},
  onArchive = () => {},
  onToggleFavorite = () => {},
  searchTerm
}) => {
  const [filteredSent, setFilteredSent] = useState([]);

  useEffect(() => {
    const filtered = sentEmails.filter(email => 
      !email.isTrash && 
      !email.isSpam && 
      !email.isArchived
    );
    setFilteredSent(filtered);
  }, [sentEmails]);

  return (
    <div className="flex-1 overflow-y-auto">
      <EmailList 
        emails={filteredSent}
        sentEmails={filteredSent}
        setEmails={setSentEmails}
        selectedEmails={selectedEmails}
        setSelectedEmails={setSelectedEmails}
        onDelete={onDelete}
        onArchive={onArchive}
        onToggleFavorite={onToggleFavorite}
        showSentActions={true}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default Sent;