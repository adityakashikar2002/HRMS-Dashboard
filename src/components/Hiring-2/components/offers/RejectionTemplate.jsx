// import React from 'react';
// import { formatDate } from '../../utils/helpers';
// import './RejectionTemplate.css';

// const RejectionTemplate = ({ candidate, job }) => {
//   return (
//     <div className="rejection-template">
//       <div className="letter-header">
//         <h3>Application Update</h3>
//         <p>{formatDate(new Date().toISOString())}</p>
//       </div>
      
//       {/* <div className="candidate-address">
//         {candidate && <p>{candidate.name}</p>}
//         {candidate && <p>{candidate.email}</p>}
//         {candidate && candidate.phone && <p>{candidate.phone}</p>}
//       </div> */}
      
//       <div className="letter-content">
//         <p className="salutation">Dear {candidate ? candidate.name : 'Candidate'},</p>
        
//         <p>
//           Thank you for taking the time to apply for the <strong>{job ? `${job.title} `: 'position '}</strong>
//           role at our company. We appreciate the opportunity to learn about your skills and accomplishments.
//         </p>
        
//         <p>
//           After careful consideration, we regret to inform you that we have decided to move forward 
//           with other candidates whose qualifications more closely match our current needs.
//         </p>
        
//         <p>
//           We were impressed with your background and experience, and this decision was not an easy one. 
//           We encourage you to apply for future openings that align with your skills and interests.
//         </p>
        
//         <p>
//           We appreciate your interest in our company and wish you the best in your job search and 
//           future endeavors.
//         </p>
        
//         <p className="closing">
//           Sincerely,<br />
//           Deepali Raut<br />
//           HR Manager (Recruitment)<br />
//           Qloron
//         </p>
//       </div>
//     </div>
//   );
// };

// export default RejectionTemplate;






// RejectionTemplate.js
import React from 'react';
import { formatDate } from '../../utils/helpers';
import './RejectionTemplate.css';
import companyHeader from '../../assets/images/company-header.png'; // Add this image to your assets

const RejectionTemplate = ({ candidate, job }) => {
  return (
    <div className="rejection-template" id="rejection-template">
      <img src={companyHeader} alt="Company Header" className="company-header" />
      <div className="letter-content">
        <div className="letter-header">
          <h3>Application Update</h3>
          <p>{formatDate(new Date().toISOString())}</p>
        </div>
        
        <p className="salutation">
          <strong>Dear {candidate ? candidate.name : 'Candidate'},</strong>
        </p>
        
        <p>
          Thank you for taking the time to apply for the <strong>{job ? `${job.title} `: 'position '}</strong>
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

export default RejectionTemplate;