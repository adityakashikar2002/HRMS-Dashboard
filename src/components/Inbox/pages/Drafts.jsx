import React from 'react';
import EmailList from '../components/EmailList';

const Drafts = ({
  drafts,
  setDrafts,
  selectedEmails,
  setSelectedEmails,
  onSendDraft,
  onDeleteDraft,
  onToggleFavorite,
  searchTerm
}) => {
  // Filter drafts that aren't trashed
  const filteredDrafts = drafts.filter(d => !d.isTrash && d.isDraft);
  
  return (
    <div className="flex-1 overflow-y-auto">
      <EmailList
        emails={[]}
        drafts={filteredDrafts}
        setEmails={() => {}}
        setDrafts={setDrafts}
        selectedEmails={selectedEmails}
        setSelectedEmails={setSelectedEmails}
        onSendDraft={onSendDraft}
        onDeleteDraft={onDeleteDraft}
        onToggleFavorite={onToggleFavorite}
        showDraftActions={true}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default Drafts;