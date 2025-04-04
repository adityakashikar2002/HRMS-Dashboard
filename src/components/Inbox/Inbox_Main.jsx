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
  // useEffect(() => {
  //   if (inboxEmails.length === 0 && sentEmails.length === 0 && drafts.length === 0) {
  //     console.log("Loading mock data...");
  //     setInboxEmails(mockInboxEmails);
  //     setSentEmails(mockSentEmails);
  //     setDrafts(mockDrafts);
  //   }
  // }, []);

  const ensureArray = (ids) => Array.isArray(ids) ? ids : [ids];

  // const handleSendEmail = (newEmail) => {
  //   console.log('Creating sent email:', newEmail);
  //   const sentEmail = {
  //     ...newEmail,
  //     id: Date.now(),
  //     fromMe: true, // Mark as from me
  //     sender: 'Me',
  //     senderInitials: 'ME',
  //     time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  //     date: new Date().toISOString(),
  //     isFavorite: false,
  //     isSpam: false,
  //     isTrash: false,
  //     isArchived: false,
  //     isSent: true, // Mark as sent
  //     isDraft: false,
  //     isRead: true,
  //     preview: newEmail.body.substring(0, 50) + '...',
  //     attachments: newEmail.attachments.map(att => ({
  //       name: att.name,
  //       size: att.size,
  //       type: att.type,
  //       // In a real app, you might have a URL here after uploading
  //       // url: uploadedFileUrl
  //     }))
  //   };

  //   console.log('Sent email created:', sentEmail);
    
  //   // Add to sent emails

  //   setSentEmails(prev => {
  //     console.log('Previous sent emails:', prev);
  //     return [sentEmail, ...prev];
  //   });

  //   // Check if the email is being sent to viperdogde07@gmail.com
  //   const recipients = newEmail.to.split(',').map(email => email.trim());
  //   if (recipients.includes('viperdogde07@gmail.com')) {
  //     const receivedEmail = {
  //       ...newEmail,
  //       id: Date.now() + 1, // Different ID
  //       fromMe: false, // Not from me (even though it is, we want it to appear as received)
  //       sender: newEmail.from || 'Me',
  //       senderInitials: (newEmail.from || 'Me').charAt(0).toUpperCase(),
  //       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  //       date: new Date().toISOString(),
  //       isFavorite: false,
  //       isSpam: false,
  //       isTrash: false,
  //       isArchived: false,
  //       isSent: false, // Not a sent email
  //       isDraft: false,
  //       isRead: false, // Unread in inbox
  //       preview: newEmail.body.substring(0, 50) + '...',
  //     };
  //     console.log('Received email created:', receivedEmail);
  //     // setInboxEmails(prev => [receivedEmail, ...prev]);
  //     setInboxEmails(prev => {
  //       console.log('Previous inbox emails:', prev);
  //       return [receivedEmail, ...prev];
  //     });
  //   }
  // };
  
  // const handleSaveDraft = (draft) => {
  //   const newDraft = {
  //     ...draft,
  //     id: Date.now(),
  //     fromMe: true,
  //     time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  //     date: new Date().toISOString(),
  //     isDraft: true,
  //     isSent: false,
  //     isRead: true,
  //     sender: 'Me',
  //     senderInitials: 'ME',
  //     preview: draft.body.substring(0, 50) + '...',
  //     isFavorite: false,
  //     isSpam: false,
  //     isTrash: false,
  //     isArchived: false,
  //     attachments: draft.attachments.map(att => ({
  //       name: att.name,
  //       size: att.size,
  //       type: att.type,
  //       // In a real app, you might have a URL here after uploading
  //       // url: uploadedFileUrl
  //     }))
  //   };
  //   setDrafts(prev => [...prev, newDraft]);
  // };

  // const handleDeleteDraft = (id) => {
  //   setDrafts(prev => prev.filter(draft => draft.id !== id));
  // };

  const handleSendEmail = (newEmail) => {
    try {
      // Validate email fields
      if (!newEmail.to || !newEmail.body) {
        console.error('Cannot send email - missing required fields');
        return;
      }
  
      // Process attachments
      const processedAttachments = newEmail.attachments?.map(att => ({
        name: att.name,
        size: att.size,
        type: att.type,
        file: att.file, // Keep file reference for immediate viewing
        // In production: url: await uploadFile(att.file) 
      })) || [];
  
      // Create sent email object
      const sentEmail = {
        ...newEmail,
        id: Date.now(),
        from: 'Me',
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
        preview: newEmail.body.substring(0, 50) + '...',
        attachments: processedAttachments,
        label: newEmail.label || '',
      };
  
      // Update sent emails
      setSentEmails(prev => [sentEmail, ...prev]);
  
      // Check if email is being sent to specific address (simulating received email)
      const recipients = newEmail.to.split(',').map(email => email.trim());
      if (recipients.includes('adityakashikar02@gmail.com')) {
        const receivedEmail = {
          ...sentEmail,
          id: Date.now() + 1,
          fromMe: false,
          isSent: false,
          isRead: false,
          sender: sentEmail.from || 'Me',
          senderInitials: (sentEmail.from || 'Me').substring(0, 2).toUpperCase(),
        };
        
        setInboxEmails(prev => [receivedEmail, ...prev]);
      }
  
      // Show success notification
      console.log('Email sent successfully:', sentEmail);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  };
  
  const handleSaveDraft = (draft) => {
    try {
      // Validate draft
      if (!draft) {
        console.error('Cannot save empty draft');
        return false;
      }
  
      // Process attachments
      const processedAttachments = draft.attachments?.map(att => ({
        name: att.name,
        size: att.size,
        type: att.type,
        file: att.file, // Keep file reference
      })) || [];
  
      // Create draft object
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
        preview: draft.body?.substring(0, 50) + '...' || 'Empty draft...',
        isFavorite: false,
        isSpam: false,
        isTrash: false,
        isArchived: false,
        attachments: processedAttachments,
        label: draft.label || '',
      };
  
      // Update drafts
      setDrafts(prev => [newDraft, ...prev]);
  
      console.log('Draft saved successfully:', newDraft);
      return true;
    } catch (error) {
      console.error('Error saving draft:', error);
      return false;
    }
  };
  
  const handleDeleteDraft = (id) => {
    try {
      if (!id) {
        console.error('Cannot delete draft - no ID provided');
        return false;
      }
  
      setDrafts(prev => {
        const updatedDrafts = prev.filter(draft => draft.id !== id);
        console.log(`Draft ${id} deleted. Remaining drafts:`, updatedDrafts.length);
        return updatedDrafts;
      });
  
      return true;
    } catch (error) {
      console.error('Error deleting draft:', error);
      return false;
    }
  };
  
  // Optional: File upload helper (for production)
  const uploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
  
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
  
      if (!response.ok) throw new Error('Upload failed');
  
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('File upload error:', error);
      throw error;
    }
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
           <Route path="sent/:emailId" element={
            <EmailView 
              emails={sentEmails}
              drafts={drafts}
              onBack={() => navigate('/inbox/sent')}
              onToggleFavorite={handleToggleFavorite}
              onDelete={handleDelete}
              onMarkAsSpam={handleMarkAsSpam}
              onArchive={handleArchiveEmail}
            />
          } />
          <Route path="drafts/:emailId" element={
            <EmailView 
              emails={drafts}
              drafts={drafts}
              onBack={() => navigate('/inbox/drafts')}
              onToggleFavorite={handleToggleFavorite}
              onDelete={handleDeleteDraft}
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





