import React, { useState, useEffect } from 'react';
import EmailList from '../components/EmailList';

const Trash = ({ emails, setEmails }) => {
  const [trashEmails, setTrashEmails] = useState([]);

  useEffect(() => {
    const trash = emails.filter(email => email.isTrash);
    setTrashEmails(trash);
  }, [emails]);

  const handleDeletePermanently = (emailIds) => {
    const updatedEmails = emails.filter(email => !emailIds.includes(email.id));
    setEmails(updatedEmails);
  };

  const handleRestore = (emailIds) => {
    const updatedEmails = emails.map(email => {
      if (emailIds.includes(email.id)) {
        return { ...email, isTrash: false };
      }
      return email;
    });
    setEmails(updatedEmails);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <EmailList 
        emails={trashEmails} 
        showTrashActions={true}
        onDeletePermanently={handleDeletePermanently}
        onRestore={handleRestore}
      />
    </div>
  );
};

export default Trash;