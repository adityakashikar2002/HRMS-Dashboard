import React, { useState, useEffect } from 'react';
import EmailList from '../components/EmailList';

const Spam = ({ emails, setEmails }) => {
  const [spamEmails, setSpamEmails] = useState([]);

  useEffect(() => {
    const spam = emails.filter(email => email.isSpam);
    setSpamEmails(spam);
  }, [emails]);

  const handleDeletePermanently = (emailIds) => {
    const updatedEmails = emails.filter(email => !emailIds.includes(email.id));
    setEmails(updatedEmails);
  };

  const handleNotSpam = (emailIds) => {
    const updatedEmails = emails.map(email => {
      if (emailIds.includes(email.id)) {
        return { ...email, isSpam: false };
      }
      return email;
    });
    setEmails(updatedEmails);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <EmailList 
        emails={spamEmails} 
        showSpamActions={true}
        onDeletePermanently={handleDeletePermanently}
        onNotSpam={handleNotSpam}
      />
    </div>
  );
};

export default Spam;