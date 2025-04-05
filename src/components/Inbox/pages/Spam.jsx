import React, { useState, useEffect } from 'react';
import EmailList from '../components/EmailList';

const Spam = ({ 
  emails, 
  setEmails,
  selectedEmails,
  setSelectedEmails,
  onNotSpam, 
  onDeletePermanently,
  onToggleFavorite,
  searchTerm
}) => {
  const [spamEmails, setSpamEmails] = useState([]);

  useEffect(() => {
    const spam = emails.filter(email => email.isSpam);
    setSpamEmails(spam);
  }, [emails]);

  return (
    <div className="flex-1 overflow-y-auto">
      <EmailList 
        emails={spamEmails} 
        setEmails={setEmails}
        selectedEmails={selectedEmails}
        setSelectedEmails={setSelectedEmails}
        onNotSpam={onNotSpam}
        onDeletePermanently={onDeletePermanently}
        onToggleFavorite={onToggleFavorite}
        showSpamActions={true}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default Spam;