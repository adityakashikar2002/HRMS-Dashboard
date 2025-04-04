// import React, { useState, useEffect } from 'react';
// import { Routes, Route, useNavigate } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import TopBar from './components/TopBar';
// import ComposeEmail from './components/ComposeEmail';
// import EmailView from './components/EmailView';
// import Inbox from './pages/Inbox';
// import Drafts from './pages/Drafts';
// import Sent from './pages/Sent';
// import Favorites from './pages/Favorites';
// import Spam from './pages/Spam';
// import Trash from './pages/Trash';
// import Archive from './pages/Archive';
// import AllEmails from './pages/AllEmails';
// import { mockInboxEmails, mockSentEmails, mockDrafts } from './mockEmails';

// function Inbox_Main() {
//   const loadData = (key, defaultValue) => {
//     const saved = localStorage.getItem(key);
//     return saved ? JSON.parse(saved) : defaultValue;
//   };

//   const [composeOpen, setComposeOpen] = useState(false);
//   const [inboxEmails, setInboxEmails] = useState(() => loadData('inboxEmails', mockInboxEmails));
//   const [sentEmails, setSentEmails] = useState(() => loadData('sentEmails', mockSentEmails));
//   const [drafts, setDrafts] = useState(() => loadData('drafts', mockDrafts));
//   const [selectedEmails, setSelectedEmails] = useState([]);
//   const navigate = useNavigate();

//   // Combine all emails for some operations
//   const getAllEmails = () => [...inboxEmails, ...sentEmails];

//   // Save data to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('inboxEmails', JSON.stringify(inboxEmails));
//     localStorage.setItem('sentEmails', JSON.stringify(sentEmails));
//     localStorage.setItem('drafts', JSON.stringify(drafts));
//   }, [inboxEmails, sentEmails, drafts]);

//   const ensureArray = (ids) => Array.isArray(ids) ? ids : [ids];

//   // const handleSendEmail = (newEmail) => {
//   //   const sentEmail = {
//   //     ...newEmail,
//   //     id: Date.now(),
//   //     fromMe: true,
//   //     sender: 'Me',
//   //     senderInitials: 'ME',
//   //     time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//   //     date: new Date().toISOString(),
//   //     isFavorite: false,
//   //     isSpam: false,
//   //     isTrash: false,
//   //     isArchived: false,
//   //     isSent: true,
//   //     isDraft: false,
//   //     isRead: true,
//   //     preview: newEmail.body.substring(0, 50) + '...'
//   //   };
    
//   //   // Add to sent emails
//   //   setSentEmails(prev => [sentEmail, ...prev]);
    
//   //   // If not from me, add to inbox (simulating received email)
//   //   if (!newEmail.fromMe) {
//   //     setInboxEmails(prev => [sentEmail, ...prev]);
//   //   }
//   // };
//   const handleSendEmail = (newEmail) => {
//     const sentEmail = {
//       ...newEmail,
//       id: Date.now(),
//       fromMe: true,
//       sender: 'Me',
//       senderInitials: 'ME',
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       date: new Date().toISOString(),
//       isFavorite: false,
//       isSpam: false,
//       isTrash: false,
//       isArchived: false,
//       isSent: true,
//       isDraft: false,
//       isRead: true,
//       preview: newEmail.body.substring(0, 50) + '...'
//     };
    
//     // Only add to sent emails
//     setSentEmails(prev => [sentEmail, ...prev]);
  
//   };

//   const handleSaveDraft = (draft) => {
//     const newDraft = {
//       ...draft,
//       id: Date.now(),
//       fromMe: true,
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       date: new Date().toISOString(),
//       isDraft: true,
//       isSent: false,
//       isRead: true,
//       sender: 'Me',
//       senderInitials: 'ME',
//       preview: draft.body.substring(0, 50) + '...',
//       isFavorite: false,
//       isSpam: false,
//       isTrash: false,
//       isArchived: false
//     };
//     setDrafts(prev => [...prev, newDraft]);
//   };

//   const handleDeleteDraft = (id) => {
//     setDrafts(prev => prev.filter(draft => draft.id !== id));
//   };

//   const handleArchiveEmail = (ids) => {
//     ids = ensureArray(ids);
//     setInboxEmails(prev => prev.map(email => 
//       ids.includes(email.id) ? { ...email, isArchived: true, isTrash: false, isSpam: false } : email
//     ));
//     setSentEmails(prev => prev.map(email => 
//       ids.includes(email.id) ? { ...email, isArchived: true, isTrash: false, isSpam: false } : email
//     ));
//     setSelectedEmails([]);
//   };

//   const handleUnarchiveEmail = (ids) => {
//     ids = ensureArray(ids);
//     setInboxEmails(prev => prev.map(email => 
//       ids.includes(email.id) ? { ...email, isArchived: false } : email
//     ));
//     setSentEmails(prev => prev.map(email => 
//       ids.includes(email.id) ? { ...email, isArchived: false } : email
//     ));
//     setSelectedEmails([]);
//   };

//   const handleRestoreFromSpam = (ids) => {
//     ids = ensureArray(ids);
//     setInboxEmails(prev => prev.map(email => 
//       ids.includes(email.id) ? { ...email, isSpam: false } : email
//     ));
//     setSentEmails(prev => prev.map(email => 
//       ids.includes(email.id) ? { ...email, isSpam: false } : email
//     ));
//     setSelectedEmails([]);
//   };

//   const handleRestoreFromTrash = (ids) => {
//     ids = ensureArray(ids);
//     setInboxEmails(prev => prev.map(email => 
//       ids.includes(email.id) ? { ...email, isTrash: false } : email
//     ));
//     setSentEmails(prev => prev.map(email => 
//       ids.includes(email.id) ? { ...email, isTrash: false } : email
//     ));
//     setSelectedEmails([]);
//   };

//   const handleDeletePermanently = (ids) => {
//     ids = ensureArray(ids);
//     setInboxEmails(prev => prev.filter(email => !ids.includes(email.id)));
//     setSentEmails(prev => prev.filter(email => !ids.includes(email.id)));
//     setSelectedEmails([]);
//   };

//   const handleMarkAsSpam = (ids) => {
//     ids = ensureArray(ids);
//     setInboxEmails(prev => prev.map(email => 
//       ids.includes(email.id) ? { ...email, isSpam: true, isTrash: false } : email
//     ));
//     setSentEmails(prev => prev.map(email => 
//       ids.includes(email.id) ? { ...email, isSpam: true, isTrash: false } : email
//     ));
//     setSelectedEmails([]);
//   };

//   const handleDelete = (ids) => {
//     ids = ensureArray(ids);
//     setInboxEmails(prev => prev.map(email => 
//       ids.includes(email.id) ? { ...email, isTrash: true, isSpam: false } : email
//     ));
//     setSentEmails(prev => prev.map(email => 
//       ids.includes(email.id) ? { ...email, isTrash: true, isSpam: false } : email
//     ));
//     setSelectedEmails([]);
//   };

//   const handleToggleFavorite = (ids, isFavorite) => {
//     ids = ensureArray(ids);
    
//     setInboxEmails(prev => prev.map(email => 
//       ids.includes(email.id) ? { ...email, isFavorite } : email
//     ));
    
//     setSentEmails(prev => prev.map(email => 
//       ids.includes(email.id) ? { ...email, isFavorite } : email
//     ));
    
//     setDrafts(prev => prev.map(draft => 
//       ids.includes(draft.id) ? { ...draft, isFavorite } : draft
//     ));
//   };

//   const handleMarkAsRead = (ids) => {
//     ids = ensureArray(ids);
//     setInboxEmails(prev => prev.map(email => 
//       ids.includes(email.id) ? { ...email, isRead: true } : email
//     ));
//     setSentEmails(prev => prev.map(email => 
//       ids.includes(email.id) ? { ...email, isRead: true } : email
//     ));
//   };

//   const handleMarkAsUnread = (ids) => {
//     ids = ensureArray(ids);
//     setInboxEmails(prev => prev.map(email => 
//       ids.includes(email.id) ? { ...email, isRead: false } : email
//     ));
//     setSentEmails(prev => prev.map(email => 
//       ids.includes(email.id) ? { ...email, isRead: false } : email
//     ));
//   };

//   const getInboxUnreadCount = () => inboxEmails.filter(e => 
//     !e.isRead && 
//     !e.isSpam && 
//     !e.isTrash && 
//     !e.isArchived &&
//     !e.isSent // Add this to exclude sent emails from inbox count
//   ).length;

//   const getDraftCount = () => drafts.filter(d => !d.isTrash).length;
//   const getSpamCount = () => getAllEmails().filter(e => e.isSpam).length;
//   const getTrashCount = () => getAllEmails().filter(e => e.isTrash).length;

//   return (
//     <div className="flex h-screen bg-gray-100 font-sans antialiased">
//       <Sidebar 
//         composeOpen={composeOpen} 
//         setComposeOpen={setComposeOpen}
//         unreadCount={getInboxUnreadCount()}
//         draftCount={getDraftCount()}
//         spamCount={getSpamCount()}
//         trashCount={getTrashCount()}
//       />
//       <div className="flex-1 flex flex-col">
//         <TopBar 
//           selectedEmails={selectedEmails} 
//           setSelectedEmails={setSelectedEmails} 
//           emails={getAllEmails()}
//           onArchiveSelected={() => handleArchiveEmail(selectedEmails)}
//           onDeleteSelected={() => handleDelete(selectedEmails)}
//           onMarkAsSpamSelected={() => handleMarkAsSpam(selectedEmails)}
//           onMarkAsReadSelected={() => handleMarkAsRead(selectedEmails)}
//           onMarkAsUnreadSelected={() => handleMarkAsUnread(selectedEmails)}
//           onToggleFavoriteSelected={(isFavorite) => handleToggleFavorite(selectedEmails, isFavorite)}
//         />
//         <Routes>
//           <Route index element={
//             <Inbox 
//               inboxEmails={inboxEmails} 
//               setInboxEmails={setInboxEmails}
//               selectedEmails={selectedEmails}
//               setSelectedEmails={setSelectedEmails}
//               onArchive={handleArchiveEmail}
//               onDelete={handleDelete}
//               onMarkAsSpam={handleMarkAsSpam}
//               onToggleFavorite={handleToggleFavorite}
//             />
//           } />
//           <Route path="drafts" element={
//             <Drafts 
//               drafts={drafts} 
//               setDrafts={setDrafts}
//               selectedEmails={selectedEmails}
//               setSelectedEmails={setSelectedEmails}
//               onDeleteDraft={handleDeleteDraft}
//               onSendDraft={(draft) => {
//                 handleDeleteDraft(draft.id);
//                 handleSendEmail(draft);
//               }}
//               onToggleFavorite={handleToggleFavorite}
//             />
//           } />
//           <Route path="sent" element={
//             <Sent 
//               sentEmails={sentEmails}
//               setSentEmails={setSentEmails}
//               selectedEmails={selectedEmails}
//               setSelectedEmails={setSelectedEmails}
//               onDelete={handleDelete}
//               onArchive={handleArchiveEmail}
//               onToggleFavorite={handleToggleFavorite}
//             />
//           } />
//           <Route path="favorites" element={
//             <Favorites 
//               emails={getAllEmails().filter(e => e.isFavorite)} 
//               drafts={drafts.filter(d => d.isFavorite)}
//               setInboxEmails={setInboxEmails}
//               setSentEmails={setSentEmails}
//               setDrafts={setDrafts}
//               selectedEmails={selectedEmails}
//               setSelectedEmails={setSelectedEmails}
//               onToggleFavorite={handleToggleFavorite}
//               onDelete={handleDelete}
//               onDeleteDraft={handleDeleteDraft}
//             />
//           } />
//           <Route path="spam" element={
//             <Spam 
//               emails={getAllEmails().filter(e => e.isSpam)} 
//               setInboxEmails={setInboxEmails}
//               setSentEmails={setSentEmails}
//               onNotSpam={handleRestoreFromSpam}
//               onDeletePermanently={handleDeletePermanently}
//               selectedEmails={selectedEmails}
//               setSelectedEmails={setSelectedEmails}
//               onToggleFavorite={handleToggleFavorite}
//             />
//           } />
//           <Route path="trash" element={
//             <Trash 
//               emails={getAllEmails().filter(e => e.isTrash)} 
//               setInboxEmails={setInboxEmails}
//               setSentEmails={setSentEmails}
//               onRestore={handleRestoreFromTrash}
//               onDeletePermanently={handleDeletePermanently}
//               selectedEmails={selectedEmails}
//               setSelectedEmails={setSelectedEmails}
//               onToggleFavorite={handleToggleFavorite}
//             />
//           } />
//           <Route path="archive" element={
//             <Archive 
//               emails={getAllEmails().filter(e => e.isArchived)} 
//               setInboxEmails={setInboxEmails}
//               setSentEmails={setSentEmails}
//               onUnarchive={handleUnarchiveEmail}
//               onDelete={handleDelete}
//               selectedEmails={selectedEmails}
//               setSelectedEmails={setSelectedEmails}
//               onToggleFavorite={handleToggleFavorite}
//             />
//           } />
//           <Route path="all" element={
//             <AllEmails
//               emails={getAllEmails()} 
//               drafts={drafts}
//               setInboxEmails={setInboxEmails}
//               setSentEmails={setSentEmails}
//               setDrafts={setDrafts}
//               selectedEmails={selectedEmails}
//               setSelectedEmails={setSelectedEmails}
//               onArchive={handleArchiveEmail}
//               onDelete={handleDelete}
//               onMarkAsSpam={handleMarkAsSpam}
//               onToggleFavorite={handleToggleFavorite}
//               onDeleteDraft={handleDeleteDraft}
//             />
//           } />
//           <Route path="emails/:emailId" element={
//             <EmailView 
//               emails={getAllEmails()}
//               drafts={drafts}
//               onBack={() => navigate('/inbox')}
//               onToggleFavorite={handleToggleFavorite}
//               onDelete={handleDelete}
//               onMarkAsSpam={handleMarkAsSpam}
//               onArchive={handleArchiveEmail}
//             />
//           } />
//         </Routes>
//       </div>
//       {composeOpen && (
//         <ComposeEmail 
//           setComposeOpen={setComposeOpen} 
//           onSend={handleSendEmail}
//           onSaveDraft={handleSaveDraft}
//         />
//       )}
//     </div>
//   );
// }

// export default Inbox_Main;

import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import ComposeEmail from './components/ComposeEmail';
import EmailView from './components/EmailView';
import Inbox from './pages/Inbox';
import Drafts from './pages/Drafts';
import Sent from './pages/Sent';
import Favorites from './pages/Favorites';
import Spam from './pages/Spam';
import Trash from './pages/Trash';
import Archive from './pages/Archive';
import AllEmails from './pages/AllEmails';
import { mockInboxEmails, mockSentEmails, mockDrafts } from './mockEmails';

function Inbox_Main() {
  const loadData = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  };

  const [composeOpen, setComposeOpen] = useState(false);
  const [inboxEmails, setInboxEmails] = useState(() => loadData('inboxEmails', mockInboxEmails));
  const [sentEmails, setSentEmails] = useState(() => loadData('sentEmails', mockSentEmails));
  const [drafts, setDrafts] = useState(() => loadData('drafts', mockDrafts));
  const [selectedEmails, setSelectedEmails] = useState([]);
  const navigate = useNavigate();

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('inboxEmails', JSON.stringify(inboxEmails));
    localStorage.setItem('sentEmails', JSON.stringify(sentEmails));
    localStorage.setItem('drafts', JSON.stringify(drafts));
  }, [inboxEmails, sentEmails, drafts]);

  const ensureArray = (ids) => Array.isArray(ids) ? ids : [ids];

  const handleSendEmail = (newEmail) => {
    const sentEmail = {
      ...newEmail,
      id: Date.now(),
      fromMe: true,
      sender: 'Me',
      senderInitials: 'ME',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toISOString(),
      isFavorite: false,
      isSpam: false,
      isTrash: false,
      isArchived: false,
      isSent: true,
      isDraft: false,
      isRead: true,
      preview: newEmail.body.substring(0, 50) + '...'
    };
    
    // Add to sent emails
    setSentEmails(prev => [sentEmail, ...prev]);
    
    // If sending to yourself, add to inbox as well
    if (newEmail.to.includes('viperdogde07@gmail.com')) {
      const receivedEmail = {
        ...newEmail,
        id: Date.now() + 1, // Different ID to avoid duplicates
        fromMe: false,
        sender: newEmail.to,
        senderInitials: newEmail.to.charAt(0).toUpperCase(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toISOString(),
        isFavorite: false,
        isSpam: false,
        isTrash: false,
        isArchived: false,
        isSent: false,
        isDraft: false,
        isRead: false,
        preview: newEmail.body.substring(0, 50) + '...'
      };
      setInboxEmails(prev => [receivedEmail, ...prev]);
    }
  };

  const handleSaveDraft = (draft) => {
    const newDraft = {
      ...draft,
      id: Date.now(),
      fromMe: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toISOString(),
      isDraft: true,
      isSent: false,
      isRead: true,
      sender: 'Me',
      senderInitials: 'ME',
      preview: draft.body.substring(0, 50) + '...',
      isFavorite: false,
      isSpam: false,
      isTrash: false,
      isArchived: false
    };
    setDrafts(prev => [...prev, newDraft]);
  };

  const handleDeleteDraft = (id) => {
    setDrafts(prev => prev.filter(draft => draft.id !== id));
  };

  const handleArchiveEmail = (ids) => {
    ids = ensureArray(ids);
    setInboxEmails(prev => prev.map(email => 
      ids.includes(email.id) ? { ...email, isArchived: true, isTrash: false, isSpam: false } : email
    ));
    setSentEmails(prev => prev.map(email => 
      ids.includes(email.id) ? { ...email, isArchived: true, isTrash: false, isSpam: false } : email
    ));
    setSelectedEmails([]);
  };

  const handleUnarchiveEmail = (ids) => {
    ids = ensureArray(ids);
    setInboxEmails(prev => prev.map(email => 
      ids.includes(email.id) ? { ...email, isArchived: false } : email
    ));
    setSentEmails(prev => prev.map(email => 
      ids.includes(email.id) ? { ...email, isArchived: false } : email
    ));
    setSelectedEmails([]);
  };

  const handleRestoreFromSpam = (ids) => {
    ids = ensureArray(ids);
    setInboxEmails(prev => prev.map(email => 
      ids.includes(email.id) ? { ...email, isSpam: false } : email
    ));
    setSentEmails(prev => prev.map(email => 
      ids.includes(email.id) ? { ...email, isSpam: false } : email
    ));
    setSelectedEmails([]);
  };

  const handleRestoreFromTrash = (ids) => {
    ids = ensureArray(ids);
    setInboxEmails(prev => prev.map(email => 
      ids.includes(email.id) ? { ...email, isTrash: false } : email
    ));
    setSentEmails(prev => prev.map(email => 
      ids.includes(email.id) ? { ...email, isTrash: false } : email
    ));
    setSelectedEmails([]);
  };

  const handleDeletePermanently = (ids) => {
    ids = ensureArray(ids);
    setInboxEmails(prev => prev.filter(email => !ids.includes(email.id)));
    setSentEmails(prev => prev.filter(email => !ids.includes(email.id)));
    setSelectedEmails([]);
  };

  const handleMarkAsSpam = (ids) => {
    ids = ensureArray(ids);
    setInboxEmails(prev => prev.map(email => 
      ids.includes(email.id) ? { ...email, isSpam: true, isTrash: false } : email
    ));
    setSentEmails(prev => prev.map(email => 
      ids.includes(email.id) ? { ...email, isSpam: true, isTrash: false } : email
    ));
    setSelectedEmails([]);
  };

  const handleDelete = (ids) => {
    ids = ensureArray(ids);
    setInboxEmails(prev => prev.map(email => 
      ids.includes(email.id) ? { ...email, isTrash: true, isSpam: false } : email
    ));
    setSentEmails(prev => prev.map(email => 
      ids.includes(email.id) ? { ...email, isTrash: true, isSpam: false } : email
    ));
    setSelectedEmails([]);
  };

  const handleToggleFavorite = (ids, isFavorite) => {
    ids = ensureArray(ids);
    
    setInboxEmails(prev => prev.map(email => 
      ids.includes(email.id) ? { ...email, isFavorite } : email
    ));
    
    setSentEmails(prev => prev.map(email => 
      ids.includes(email.id) ? { ...email, isFavorite } : email
    ));
    
    setDrafts(prev => prev.map(draft => 
      ids.includes(draft.id) ? { ...draft, isFavorite } : draft
    ));
  };

  const handleMarkAsRead = (ids) => {
    ids = ensureArray(ids);
    setInboxEmails(prev => prev.map(email => 
      ids.includes(email.id) ? { ...email, isRead: true } : email
    ));
    setSentEmails(prev => prev.map(email => 
      ids.includes(email.id) ? { ...email, isRead: true } : email
    ));
  };

  const handleMarkAsUnread = (ids) => {
    ids = ensureArray(ids);
    setInboxEmails(prev => prev.map(email => 
      ids.includes(email.id) ? { ...email, isRead: false } : email
    ));
    setSentEmails(prev => prev.map(email => 
      ids.includes(email.id) ? { ...email, isRead: false } : email
    ));
  };

  const getAllEmails = () => [...inboxEmails, ...sentEmails];

   const getInboxUnreadCount = () => inboxEmails.filter(e => 
    !e.isRead && 
    !e.isSpam && 
    !e.isTrash && 
    !e.isArchived &&
    !e.isSent // Exclude sent emails from inbox count
  ).length;

  const getDraftCount = () => drafts.filter(d => !d.isTrash).length;
  const getSpamCount = () => getAllEmails().filter(e => e.isSpam).length;
  const getTrashCount = () => getAllEmails().filter(e => e.isTrash).length;

  return (
    <div className="flex h-screen bg-gray-100 font-sans antialiased">
      <Sidebar 
        composeOpen={composeOpen} 
        setComposeOpen={setComposeOpen}
        unreadCount={getInboxUnreadCount()}
        draftCount={getDraftCount()}
        spamCount={getSpamCount()}
        trashCount={getTrashCount()}
      />
      <div className="flex-1 flex flex-col">
        <TopBar 
          selectedEmails={selectedEmails} 
          setSelectedEmails={setSelectedEmails} 
          emails={getAllEmails()}
          onArchiveSelected={() => handleArchiveEmail(selectedEmails)}
          onDeleteSelected={() => handleDelete(selectedEmails)}
          onMarkAsSpamSelected={() => handleMarkAsSpam(selectedEmails)}
          onMarkAsReadSelected={() => handleMarkAsRead(selectedEmails)}
          onMarkAsUnreadSelected={() => handleMarkAsUnread(selectedEmails)}
          onToggleFavoriteSelected={(isFavorite) => handleToggleFavorite(selectedEmails, isFavorite)}
        />
        <Routes>
          <Route index element={
            <Inbox 
              inboxEmails={inboxEmails} 
              setInboxEmails={setInboxEmails}
              selectedEmails={selectedEmails}
              setSelectedEmails={setSelectedEmails}
              onArchive={handleArchiveEmail}
              onDelete={handleDelete}
              onMarkAsSpam={handleMarkAsSpam}
              onToggleFavorite={handleToggleFavorite}
            />
          } />
          <Route path="drafts" element={
            <Drafts 
              drafts={drafts} 
              setDrafts={setDrafts}
              selectedEmails={selectedEmails}
              setSelectedEmails={setSelectedEmails}
              onDeleteDraft={handleDeleteDraft}
              onSendDraft={(draft) => {
                handleDeleteDraft(draft.id);
                handleSendEmail(draft);
              }}
              onToggleFavorite={handleToggleFavorite}
            />
          } />
           <Route path="sent" element={
            <Sent 
              sentEmails={sentEmails}
              setSentEmails={setSentEmails}
              selectedEmails={selectedEmails}
              setSelectedEmails={setSelectedEmails}
              onDelete={handleDelete}
              onArchive={handleArchiveEmail}
              onToggleFavorite={handleToggleFavorite}
            />
          } />
          <Route path="favorites" element={
            <Favorites 
              emails={getAllEmails().filter(e => e.isFavorite)} 
              drafts={drafts.filter(d => d.isFavorite)}
              setInboxEmails={setInboxEmails}
              setSentEmails={setSentEmails}
              setDrafts={setDrafts}
              selectedEmails={selectedEmails}
              setSelectedEmails={setSelectedEmails}
              onToggleFavorite={handleToggleFavorite}
              onDelete={handleDelete}
              onDeleteDraft={handleDeleteDraft}
            />
          } />
          <Route path="spam" element={
            <Spam 
              emails={getAllEmails().filter(e => e.isSpam)} 
              setInboxEmails={setInboxEmails}
              setSentEmails={setSentEmails}
              onNotSpam={handleRestoreFromSpam}
              onDeletePermanently={handleDeletePermanently}
              selectedEmails={selectedEmails}
              setSelectedEmails={setSelectedEmails}
              onToggleFavorite={handleToggleFavorite}
            />
          } />
          <Route path="trash" element={
            <Trash 
              emails={getAllEmails().filter(e => e.isTrash)} 
              setInboxEmails={setInboxEmails}
              setSentEmails={setSentEmails}
              onRestore={handleRestoreFromTrash}
              onDeletePermanently={handleDeletePermanently}
              selectedEmails={selectedEmails}
              setSelectedEmails={setSelectedEmails}
              onToggleFavorite={handleToggleFavorite}
            />
          } />
          <Route path="archive" element={
            <Archive 
              emails={getAllEmails().filter(e => e.isArchived)} 
              setInboxEmails={setInboxEmails}
              setSentEmails={setSentEmails}
              onUnarchive={handleUnarchiveEmail}
              onDelete={handleDelete}
              selectedEmails={selectedEmails}
              setSelectedEmails={setSelectedEmails}
              onToggleFavorite={handleToggleFavorite}
            />
          } />
          <Route path="all" element={
            <AllEmails
              emails={getAllEmails()} 
              drafts={drafts}
              setInboxEmails={setInboxEmails}
              setSentEmails={setSentEmails}
              setDrafts={setDrafts}
              selectedEmails={selectedEmails}
              setSelectedEmails={setSelectedEmails}
              onArchive={handleArchiveEmail}
              onDelete={handleDelete}
              onMarkAsSpam={handleMarkAsSpam}
              onToggleFavorite={handleToggleFavorite}
              onDeleteDraft={handleDeleteDraft}
            />
          } />
          <Route path="emails/:emailId" element={
            <EmailView 
              emails={getAllEmails()}
              drafts={drafts}
              onBack={() => navigate('/inbox')}
              onToggleFavorite={handleToggleFavorite}
              onDelete={handleDelete}
              onMarkAsSpam={handleMarkAsSpam}
              onArchive={handleArchiveEmail}
            />
          } />
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





