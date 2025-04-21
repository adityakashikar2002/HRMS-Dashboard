// SelectionTemplate.js
import React from 'react';
import { formatDate } from '../../utils/helpers';
import './SelectionTemplate.css';
import companyHeader from '../../assets/images/company-header.png'; // Add this image to your assets

const SelectionTemplate = ({ candidate, job, salary, onboardingDate }) => {
  return (
    <div className="selection-template" id="selection-template">
      <img src={companyHeader} alt="Company Header" className="company-header" />
      <div className="letter-content">
        <div className="letter-header">
          <h3>Offer Letter</h3>
          <p>{formatDate(new Date().toISOString())}</p>
        </div>
        
        <p className="salutation">
          <strong>Dear {candidate ? candidate.name : 'Candidate'},</strong>
        </p>
        
        <p>
          We are pleased to offer you the position of <strong>{job ? job.title : 'Position'}</strong> 
          {job && job.type && ` (${job.type})`} at our company. After careful consideration of your 
          qualifications and experience, we believe you will be a valuable addition to our team.
        </p>
        
        <p>
          The details of your offer are as follows:
        </p>
        
        <ul>
          <li><strong>Position:</strong> {job ? job.title : 'Position'}</li>
          <li><strong>Salary:</strong> Rs. {salary || 'To be discussed'}</li>
          {onboardingDate && (
            <li><strong>Start Date:</strong> {formatDate(onboardingDate)}</li>
          )}
          {job && job.location && (
            <li><strong>Location:</strong> {job.location}</li>
          )}
        </ul>
        
        <p>
          We are excited about the prospect of you joining our team and look forward to your 
          positive response. Please sign and return a copy of this letter to indicate your 
          acceptance of this offer.
        </p>
        
        <p className="closing">
          <strong>
            Sincerely,<br />
            Raksha Rai<br />
            HR Manager (Recruitment)<br />
            Qloron
          </strong>
        </p>
      </div>
    </div>
  );
};

export default SelectionTemplate;