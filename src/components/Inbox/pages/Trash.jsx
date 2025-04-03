import React, { useState, useEffect } from 'react';
import EmailList from '../components/EmailList';

const Trash = ({ 
  emails, 
  setEmails,
  selectedEmails,
  setSelectedEmails,
  onRestore, 
  onDeletePermanently,
  onToggleFavorite
}) => {
  const [trashEmails, setTrashEmails] = useState([]);

  useEffect(() => {
    const trash = emails.filter(email => email.isTrash);
    setTrashEmails(trash);
  }, [emails]);

  return (
    <div className="flex-1 overflow-y-auto">
      <EmailList 
        emails={trashEmails} 
        setEmails={setEmails}
        selectedEmails={selectedEmails}
        setSelectedEmails={setSelectedEmails}
        onRestore={onRestore}
        onDeletePermanently={onDeletePermanently}
        onToggleFavorite={onToggleFavorite}
        showTrashActions={true}
      />
    </div>
  );
};

export default Trash;