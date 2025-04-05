import React from 'react';
import EmailList from '../components/EmailList';

const AllEmails = ({ 
  emails, 
  setEmails,
  selectedEmails,
  setSelectedEmails,
  onArchive,
  onDelete,
  onMarkAsSpam,
  onToggleFavorite,
  searchTerm
}) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <EmailList 
        emails={emails} 
        setEmails={setEmails}
        selectedEmails={selectedEmails}
        setSelectedEmails={setSelectedEmails}
        onArchive={onArchive}
        onDelete={onDelete}
        onMarkAsSpam={onMarkAsSpam}
        onToggleFavorite={onToggleFavorite}
        showAllActions={true}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default AllEmails;