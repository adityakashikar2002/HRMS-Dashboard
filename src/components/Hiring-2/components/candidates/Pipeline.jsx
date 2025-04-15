// import React from 'react';
// import { Link } from 'react-router-dom';
// import { formatDate } from '../../utils/helpers';
// import './Pipeline.css';

// const Pipeline = ({ candidates, jobs }) => {
//   const stages = [
//     'Application Review',
//     'Technical Screening',
//     'Technical Interview',
//     'Advanced Technical',
//     'HR Round',
//     'Offer Discussion'
//   ];

//   const getCandidatesByStage = (stage) => {
//     return candidates.filter(candidate => candidate.currentStage === stage);
//   };

//   return (
//     <div className="pipeline-container">
//       <div className="pipeline-header">
//         <h2>Candidate Pipeline</h2>
//       </div>
//       <div className="pipeline-stages">
//         {stages.map(stage => (
//           <div key={stage} className="pipeline-stage">
//             <h3>{stage}</h3>
//             <div className="stage-candidates">
//               {getCandidatesByStage(stage).length > 0 ? (
//                 getCandidatesByStage(stage).map(candidate => (
//                   <div key={candidate.id} className="pipeline-candidate">
//                     <div className="candidate-info">
//                       <h4>{candidate.name}</h4>
//                       <p>{candidate.jobTitle}</p>
//                       <p>Applied: {formatDate(candidate.appliedAt)}</p>
//                     </div>
//                     <div className="candidate-actions">
//                       <Link to={`/hiring/candidates/${candidate.id}`} className="view-link">
//                         View
//                       </Link>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="no-candidates">No candidates</div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Pipeline;



import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/helpers';
import './Pipeline.css';

const Pipeline = ({ candidates, jobs, isModal }) => {
  const stages = [
    'Application Review',
    'Technical Screening',
    'Technical Interview',
    'Advanced Technical',
    'HR Round',
    'Offer Discussion'
  ];

  const getCandidatesByStage = (stage) => {
    return candidates.filter(candidate => candidate.currentStage === stage);
  };

  return (
    <div className={`pipeline-container ${isModal ? 'modal-view' : ''}`}>
      <div className="pipeline-stages">
        {stages.map(stage => (
          <div key={stage} className="pipeline-stage">
            <h3>{stage}</h3>
            <div className="stage-candidates">
              {getCandidatesByStage(stage).length > 0 ? (
                getCandidatesByStage(stage).map(candidate => (
                  <div key={candidate.id} className="pipeline-candidate">
                    <div className="candidate-info">
                      <h4>{candidate.name}</h4>
                      <p>{candidate.jobTitle}</p>
                      <p>Applied: {formatDate(candidate.appliedAt)}</p>
                    </div>
                    <div className="candidate-actions">
                      <Link to={`/hiring/candidates/${candidate.id}`} className="view-link">
                        View
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-candidates">No candidates</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pipeline;