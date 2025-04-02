// import React, { useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import TopBar from './components/TopBar';
// import ComposeEmail from './components/ComposeEmail';
// import Inbox from './pages/Inbox';
// import Drafts from './pages/Drafts';
// import Sent from './pages/Sent';
// import Favorites from './pages/Favorites';
// import Spam from './pages/Spam';
// import Trash from './pages/Trash';

// function Inbox_Main() {
//   const [composeOpen, setComposeOpen] = useState(false);
//   const [emails, setEmails] = useState([]);
//   const [drafts, setDrafts] = useState([]);
//   const [selectedEmails, setSelectedEmails] = useState([]);

//   return (
//     <div className="flex h-screen bg-gray-100 font-sans antialiased">
//       <Sidebar 
//         composeOpen={composeOpen} 
//         setComposeOpen={setComposeOpen} 
//       />
//       <div className="flex-1 flex flex-col">
//         <TopBar 
//           selectedEmails={selectedEmails} 
//           setSelectedEmails={setSelectedEmails} 
//           emails={emails}
//           setEmails={setEmails}
//         />
//         <Routes>
//           <Route index element={
//             <Inbox 
//               emails={emails} 
//               setEmails={setEmails} 
//               selectedEmails={selectedEmails}
//               setSelectedEmails={setSelectedEmails}
//             />
//           } />
//           <Route path="drafts" element={
//             <Drafts 
//               drafts={drafts} 
//               setDrafts={setDrafts} 
//             />
//           } />
//           <Route path="sent" element={<Sent />} />
//           <Route path="favorites" element={<Favorites />} />
//           <Route path="spam" element={<Spam />} />
//           <Route path="trash" element={<Trash />} />
//         </Routes>
//       </div>
//       {composeOpen && (
//         <ComposeEmail 
//           setComposeOpen={setComposeOpen} 
//           setDrafts={setDrafts}
//         />
//       )}
//     </div>
//   );
// }

// export default Inbox_Main;

import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import ComposeEmail from './components/ComposeEmail';
import Inbox from './pages/Inbox';
import Drafts from './pages/Drafts';
import Sent from './pages/Sent';
import Favorites from './pages/Favorites';
import Spam from './pages/Spam';
import Trash from './pages/Trash';
import { mockEmails, mockDrafts } from './mockEmails';

function Inbox_Main() {
  const [composeOpen, setComposeOpen] = useState(false);
  const [emails, setEmails] = useState(mockEmails);
  const [drafts, setDrafts] = useState(mockDrafts);
  const [selectedEmails, setSelectedEmails] = useState([]);

  // Function to handle sending new emails
  const handleSendEmail = (newEmail) => {
    const sentEmail = {
      ...newEmail,
      id: Date.now(),
      sender: 'Me',
      senderInitials: 'ME',
      time: 'Just now',
      isFavorite: false,
      isSpam: false,
      isTrash: false
    };
    setEmails(prev => [sentEmail, ...prev]);
  };

  // Function to save drafts
  const handleSaveDraft = (draft) => {
    const newDraft = {
      ...draft,
      id: Date.now()
    };
    setDrafts(prev => [...prev, newDraft]);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans antialiased">
      <Sidebar 
        composeOpen={composeOpen} 
        setComposeOpen={setComposeOpen} 
      />
      <div className="flex-1 flex flex-col">
        <TopBar 
          selectedEmails={selectedEmails} 
          setSelectedEmails={setSelectedEmails} 
          emails={emails}
          setEmails={setEmails}
        />
        <Routes>
          <Route index element={
            <Inbox 
              emails={emails} 
              setEmails={setEmails} 
              selectedEmails={selectedEmails}
              setSelectedEmails={setSelectedEmails}
            />
          } />
          <Route path="drafts" element={
            <Drafts 
              drafts={drafts} 
              setDrafts={setDrafts} 
            />
          } />
          <Route path="sent" element={<Sent emails={emails.filter(e => e.sender === 'Me')} />} />
          <Route path="favorites" element={<Favorites emails={emails.filter(e => e.isFavorite)} />} />
          <Route path="spam" element={<Spam emails={emails.filter(e => e.isSpam)} />} />
          <Route path="trash" element={<Trash emails={emails.filter(e => e.isTrash)} />} />
        </Routes>
      </div>
      {composeOpen && (
        <ComposeEmail 
          setComposeOpen={setComposeOpen} 
          onSend={handleSendEmail}
          onSaveDraft={handleSaveDraft}
        />
      )}
    </div>
  );
}

export default Inbox_Main;