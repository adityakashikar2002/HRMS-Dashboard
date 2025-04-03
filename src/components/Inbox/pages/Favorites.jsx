import React from 'react';
import EmailList from '../components/EmailList';

const Favorites = ({ 
  emails, 
  drafts,
  setEmails,
  setDrafts,
  selectedEmails,
  setSelectedEmails,
  onToggleFavorite,
  onDelete,
  onDeleteDraft
}) => {
  const allFavorites = [...emails, ...drafts];

  const handleDelete = (ids) => {
    // Check if the items are emails or drafts
    const emailIds = emails.filter(e => ids.includes(e.id)).map(e => e.id);
    const draftIds = drafts.filter(d => ids.includes(d.id)).map(d => d.id);
    
    if (emailIds.length > 0) {
      onDelete(emailIds);
    }
    if (draftIds.length > 0) {
      draftIds.forEach(id => onDeleteDraft(id));
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <EmailList 
        emails={allFavorites} 
        setEmails={setEmails}
        selectedEmails={selectedEmails}
        setSelectedEmails={setSelectedEmails}
        onToggleFavorite={onToggleFavorite}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Favorites;