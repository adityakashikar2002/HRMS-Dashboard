// import React, { useState, useEffect } from 'react';
// import EmailList from '../components/EmailList';
// import EmailView from '../components/EmailView';
// import { useParams, useNavigate } from 'react-router-dom';

// const Inbox = ({ emails, setEmails, selectedEmails, setSelectedEmails }) => {
//   const { emailId } = useParams();
//   const navigate = useNavigate();
//   const [inboxEmails, setInboxEmails] = useState([]);

//   useEffect(() => {
//     // Filter emails for inbox (not spam, not trash)
//     const filtered = emails.filter(email => !email.isSpam && !email.isTrash);
//     setInboxEmails(filtered);
//   }, [emails]);

//   const handleBack = () => {
//     navigate('/inbox');
//   };

//   if (emailId) {
//     const email = emails.find(e => e.id === parseInt(emailId));
//     return <EmailView email={email} onBack={handleBack} />;
//   }

//   return (
//     <div className="flex-1 overflow-y-auto">
//       <EmailList 
//         emails={inboxEmails} 
//         setEmails={setEmails} 
//         selectedEmails={selectedEmails}
//         setSelectedEmails={setSelectedEmails}
//       />
//     </div>
//   );
// };

// export default Inbox;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmailList from '../components/EmailList';
import EmailView from '../components/EmailView';

const Inbox = ({ emails, setEmails, selectedEmails, setSelectedEmails }) => {
  const { emailId } = useParams();
  const navigate = useNavigate();
  const [inboxEmails, setInboxEmails] = useState([]);

  useEffect(() => {
    const filtered = emails.filter(email => !email.isSpam && !email.isTrash);
    setInboxEmails(filtered);
  }, [emails]);

  const handleBack = () => {
    navigate('/inbox');
  };

  const handleToggleFavorite = (id) => {
    setEmails(prev => prev.map(email => 
      email.id === id ? { ...email, isFavorite: !email.isFavorite } : email
    ));
  };

  const handleDelete = (id) => {
    setEmails(prev => prev.map(email => 
      email.id === id ? { ...email, isTrash: true } : email
    ));
  };

  if (emailId) {
    const email = emails.find(e => e.id === parseInt(emailId));
    return (
      <EmailView 
        email={email} 
        onBack={handleBack}
        onToggleFavorite={handleToggleFavorite}
        onDelete={handleDelete}
      />
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <EmailList 
        emails={inboxEmails} 
        setEmails={setEmails} 
        selectedEmails={selectedEmails}
        setSelectedEmails={setSelectedEmails}
      />
    </div>
  );
};

export default Inbox;