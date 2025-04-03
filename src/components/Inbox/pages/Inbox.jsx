// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import EmailList from '../components/EmailList';
// import EmailView from '../components/EmailView';

// const Inbox = ({ 
//   emails = [], 
//   setEmails = () => {}, 
//   selectedEmails = [], 
//   setSelectedEmails = () => {}, 
//   onArchive = () => {},
//   onDelete = () => {},
//   onMarkAsSpam = () => {},
//   onToggleFavorite = () => {}
// }) => {
//   const { emailId } = useParams();
//   const navigate = useNavigate();
//   const [inboxEmails, setInboxEmails] = useState([]);

//   useEffect(() => {
//     const filtered = emails.filter(email => 
//       !email.isSpam && 
//       !email.isTrash && 
//       !email.isArchived &&
//       !email.isDraft &&
//       !email.isSent &&
//       !email.fromMe
//     );
//     setInboxEmails(filtered);
//   }, [emails]);

//   const handleBack = () => {
//     navigate('/inbox');
//   };

//   if (emailId) {
//     const email = emails.find(e => e.id === parseInt(emailId));
//     if (!email) return null;
    
//     return (
//       <EmailView 
//         email={email} 
//         onBack={handleBack}
//         onToggleFavorite={(id, isFavorite) => onToggleFavorite([id], isFavorite)}
//         onDelete={(id) => onDelete([id])}
//         onMarkAsSpam={(id) => onMarkAsSpam([id])}
//         onArchive={(id) => onArchive([id])}
//       />
//     );
//   }

//   return (
//     <div className="flex-1 flex flex-col">
//       <EmailList 
//         emails={inboxEmails} 
//         drafts={[]}
//         setEmails={setEmails}
//         setDrafts={() => {}}
//         selectedEmails={selectedEmails}
//         setSelectedEmails={setSelectedEmails}
//         onArchive={onArchive}
//         onDelete={onDelete}
//         onMarkAsSpam={onMarkAsSpam}
//         onToggleFavorite={onToggleFavorite}
//         showAllActions={true}
//       />
//     </div>
//   );
// };

// export default Inbox;



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
  onToggleFavorite = () => {}
}) => {
  const { emailId } = useParams();
  const navigate = useNavigate();
  const [filteredInbox, setFilteredInbox] = useState([]);

  useEffect(() => {
    const filtered = inboxEmails.filter(email => 
      !email.isSpam && 
      !email.isTrash && 
      !email.isArchived
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
        showAllActions={true}
      />
    </div>
  );
};

export default Inbox;