import React from 'react';
import EmailList from '../components/EmailList';

const Drafts = ({ drafts, setDrafts }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <EmailList 
        emails={drafts} 
        setEmails={setDrafts} 
      />
    </div>
  );
};

export default Drafts;