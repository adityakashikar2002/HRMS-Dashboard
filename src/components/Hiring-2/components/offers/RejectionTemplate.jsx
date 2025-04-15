import React from 'react';
import { formatDate } from '../../utils/helpers';
import './RejectionTemplate.css';

const RejectionTemplate = ({ candidate, job }) => {
  return (
    <div className="rejection-template">
      <div className="letter-header">
        <h3>Application Update</h3>
        <p>{formatDate(new Date().toISOString())}</p>
      </div>
      
      {/* <div className="candidate-address">
        {candidate && <p>{candidate.name}</p>}
        {candidate && <p>{candidate.email}</p>}
        {candidate && candidate.phone && <p>{candidate.phone}</p>}
      </div> */}
      
      <div className="letter-content">
        <p className="salutation">Dear {candidate ? candidate.name : 'Candidate'},</p>
        
        <p>
          Thank you for taking the time to apply for the <strong>{job ? job.title : 'position'}</strong> 
          role at our company. We appreciate the opportunity to learn about your skills and accomplishments.
        </p>
        
        <p>
          After careful consideration, we regret to inform you that we have decided to move forward 
          with other candidates whose qualifications more closely match our current needs.
        </p>
        
        <p>
          We were impressed with your background and experience, and this decision was not an easy one. 
          We encourage you to apply for future openings that align with your skills and interests.
        </p>
        
        <p>
          We appreciate your interest in our company and wish you the best in your job search and 
          future endeavors.
        </p>
        
        <p className="closing">
          Sincerely,<br />
          [Your Name]<br />
          [Your Position]<br />
          [Company Name]
        </p>
      </div>
    </div>
  );
};

export default RejectionTemplate;