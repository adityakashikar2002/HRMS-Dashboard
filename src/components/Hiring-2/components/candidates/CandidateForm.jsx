// import React, { useState, useEffect } from 'react';
// import './CandidateForm.css';

// const CandidateForm = ({ candidate, jobs, onSubmit, onCancel }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     resume: '',
//     jobId: '',
//     source: 'LinkedIn',
//     status: 'Applied',
//     currentStage: 'Application Review'
//   });

//   useEffect(() => {
//     if (candidate) {
//       setFormData({
//         name: candidate.name,
//         email: candidate.email,
//         phone: candidate.phone,
//         resume: candidate.resume,
//         jobId: candidate.jobId,
//         source: candidate.source,
//         status: candidate.status,
//         currentStage: candidate.currentStage
//       });
//     }
//   }, [candidate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const selectedJob = jobs.find(job => job.id === formData.jobId);
//     onSubmit({
//       ...formData,
//       jobTitle: selectedJob ? selectedJob.title : ''
//     });
//   };

//   return (
//     <div className="candidate-form-overlay">
//       <div className="candidate-form">
//         <h2>{candidate ? 'Edit Candidate' : 'Add New Candidate'}</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Full Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>
          
//           <div className="form-row">
//             <div className="form-group">
//               <label>Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
            
//             <div className="form-group">
//               <label>Phone</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>
          
//           {/* <div className="form-group">
//             <label>Resume (File Name)</label>
//             <input
//               type="text"
//               name="resume"
//               value={formData.resume}
//               onChange={handleChange}
//             />
//           </div> */}
          
//           <div className="form-row">
//             <div className="form-group">
//               <label>Job Applied For</label>
//               <select
//                 name="jobId"
//                 value={formData.jobId}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select a job</option>
//                 {jobs.map(job => (
//                   <option key={job.id} value={job.id}>{job.title}</option>
//                 ))}
//               </select>
//             </div>
            
//             <div className="form-group">
//               <label>Source</label>
//               <select
//                 name="source"
//                 value={formData.source}
//                 onChange={handleChange}
//               >
//                 <option value="LinkedIn">LinkedIn</option>
//                 <option value="Naukri">Naukri</option>
//                 <option value="Referral">Referral</option>
//                 <option value="Career Site">Career Site</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//           </div>
          
//           <div className="form-row">
//             <div className="form-group">
//               <label>Status</label>
//               <select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleChange}
//               >
//                 <option value="Applied">Applied</option>
//                 <option value="Interview">Interview</option>
//                 <option value="Offer">Offer</option>
//                 <option value="Hired">Hired</option>
//                 <option value="Rejected">Rejected</option>
//               </select>
//             </div>
            
//             <div className="form-group">
//               <label>Current Stage</label>
//               <select
//                 name="currentStage"
//                 value={formData.currentStage}
//                 onChange={handleChange}
//               >
//                 <option value="Application Review">Application Review</option>
//                 <option value="Technical Screening">Technical Screening</option>
//                 <option value="Technical Interview">Technical Interview</option>
//                 <option value="Advanced Technical">Advanced Technical</option>
//                 <option value="HR Round">HR Round</option>
//                 <option value="Offer Discussion">Offer Discussion</option>
//               </select>
//             </div>
//           </div>
          
//           <div className="form-actions">
//             <button type="button" className="cancel-button" onClick={onCancel}>
//               Cancel
//             </button>
//             <button type="submit" className="submit-button">
//               {candidate ? 'Update Candidate' : 'Add Candidate'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CandidateForm;


import React, { useState, useEffect } from 'react';
import './CandidateForm.css';

const CandidateForm = ({ candidate, jobs, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: '',
    jobId: '',
    source: 'LinkedIn',
    status: 'Applied',
    currentStage: 'Application Review'
  });

  const statusToStages = {
    Applied: ['Application Review', 'Technical Screening'],
    Interview: ['Technical Interview', 'Advanced Technical', 'HR Round'],
    Offer: ['Offer Discussion'],
    Hired: ['Offer Discussion'],
    Rejected: ['Application Review', 'Technical Screening', 'Technical Interview', 'Advanced Technical', 'HR Round', 'Offer Discussion']
  };

  useEffect(() => {
    if (candidate) {
      setFormData({
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        resume: candidate.resume,
        jobId: candidate.jobId,
        source: candidate.source,
        status: candidate.status,
        currentStage: candidate.currentStage
      });
    }
  }, [candidate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    const updatedData = {
      ...formData,
      [name]: value
    };

    // If status changed, reset current stage to first option of new status
    if (name === 'status') {
      updatedData.currentStage = statusToStages[value][0];
    }

    setFormData(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedJob = jobs.find(job => job.id === formData.jobId);
    onSubmit({
      ...formData,
      jobTitle: selectedJob ? selectedJob.title : ''
    });
  };

  return (
    <div className="candidate-form-overlay">
      <div className="candidate-form">
        <h2>{candidate ? 'Edit Candidate' : 'Add New Candidate'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Job Applied For</label>
              <select
                name="jobId"
                value={formData.jobId}
                onChange={handleChange}
                required
              >
                <option value="">Select a job</option>
                {jobs.map(job => (
                  <option key={job.id} value={job.id}>{job.title}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Source</label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
              >
                <option value="LinkedIn">LinkedIn</option>
                <option value="Naukri">Naukri</option>
                <option value="Referral">Referral</option>
                <option value="Career Site">Career Site</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Hired">Hired</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Current Stage</label>
              <select
                name="currentStage"
                value={formData.currentStage}
                onChange={handleChange}
              >
                {statusToStages[formData.status].map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              {candidate ? 'Update Candidate' : 'Add Candidate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidateForm;