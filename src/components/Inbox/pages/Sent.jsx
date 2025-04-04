// import React, { useEffect, useState } from 'react';
// import EmailList from '../components/EmailList';

// const Sent = ({ 
//   sentEmails = [], 
//   setSentEmails = () => {},
//   selectedEmails = [], 
//   setSelectedEmails = () => {}, 
//   onDelete = () => {},
//   onArchive = () => {},
//   onToggleFavorite = () => {}
// }) => {
//   const [filteredSent, setFilteredSent] = useState([]);

//   useEffect(() => {
//     const filtered = sentEmails.filter(email => 
//       !email.isTrash && 
//       !email.isSpam && 
//       !email.isArchived
//     );
//     setFilteredSent(filtered);
//   }, [sentEmails]);

//   return (
//     <div className="flex-1 overflow-y-auto">
//       <EmailList 
//         emails={filteredSent}
//         drafts={[]}
//         setEmails={setSentEmails}
//         selectedEmails={selectedEmails}
//         setSelectedEmails={setSelectedEmails}
//         onDelete={onDelete}
//         onArchive={onArchive}
//         onToggleFavorite={onToggleFavorite}
//       />
//     </div>
//   );
// };

// export default Sent;

import React, { useEffect, useState } from 'react';
import EmailList from '../components/EmailList';

const Sent = ({ 
  sentEmails = [], 
  setSentEmails = () => {},
  selectedEmails = [], 
  setSelectedEmails = () => {}, 
  onDelete = () => {},
  onArchive = () => {},
  onToggleFavorite = () => {}
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
      />
    </div>
  );
};

export default Sent;