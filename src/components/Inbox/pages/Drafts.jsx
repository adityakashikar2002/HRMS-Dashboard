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
}) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <EmailList
        emails={[]} // Pass empty array for regular emails
        drafts={drafts} // Pass drafts separately
        setEmails={() => {}} // Empty function since we don't modify regular emails here
        setDrafts={setDrafts}
        selectedEmails={selectedEmails}
        setSelectedEmails={setSelectedEmails}
        onSendDraft={onSendDraft}
        onDeleteDraft={onDeleteDraft}
        onToggleFavorite={onToggleFavorite}
        showDraftActions={true}
      />
    </div>
  );
};

export default Drafts;