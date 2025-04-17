// InterviewForm.jsx
import React, { useState, useEffect } from 'react';
import './InterviewForm.css';

const InterviewForm = ({ interview, candidates, jobs, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    candidateId: '',
    jobId: '',
    interviewer: '',
    interviewType: 'Technical',
    scheduledDate: '',
    startTime: '',
    endTime: '',
    status: 'Scheduled',
    feedback: ''
  });

  useEffect(() => {
    if (interview) {
      const interviewDate = interview.scheduledDate.split('T')[0];
      const [startTime, endTime] = interview.timeSlot ? interview.timeSlot.split(' - ') : ['', ''];
      
      setFormData({
        candidateId: interview.candidateId,
        jobId: interview.jobId,
        interviewer: interview.interviewer,
        interviewType: interview.interviewType,
        scheduledDate: interviewDate,
        startTime: startTime,
        endTime: endTime,
        status: interview.status,
        feedback: interview.feedback || ''
      });
    }
  }, [interview]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.scheduledDate || !formData.startTime || !formData.endTime) {
      alert('Please fill in all required fields');
      return;
    }
  
    const selectedCandidate = candidates.find(c => c.id === formData.candidateId);
    const selectedJob = jobs.find(j => j.id === formData.jobId);
    
    // Convert 12-hour format to 24-hour format for storage
    const convertTo24Hour = (timeStr) => {
      const [time, period] = timeStr.split(' ');
      let [hours, minutes] = time.split(':');
      hours = parseInt(hours, 10);
      if (period === 'PM' && hours !== 12) {
        hours += 12;
      }
      if (period === 'AM' && hours === 12) {
        hours = 0;
      }
      return `${hours.toString().padStart(2, '0')}:${minutes}`;
    };
    
  
    const start24 = convertTo24Hour(formData.startTime);
    const end24 = convertTo24Hour(formData.endTime);
    
    onSubmit({
      ...formData,
      candidateName: selectedCandidate ? selectedCandidate.name : '',
      jobTitle: selectedJob ? selectedJob.title : '',
      scheduledDate: formData.scheduledDate, // Date only
      startTime: start24, // 24-hour format
      endTime: end24,     // 24-hour format
      timeSlot: `${formData.startTime} - ${formData.endTime}` // Display format
    });
  };

  // Generate time options for select dropdown
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour;
        const timeString = `${displayHour}:${minute === 0 ? '00' : minute} ${period}`;
        times.push(timeString);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  return (
    <div className="interview-form-overlay">
      <div className="interview-form">
        <h2>{interview ? 'Edit Interview' : 'Schedule Interview'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Candidate</label>
              <select
                name="candidateId"
                value={formData.candidateId}
                onChange={handleChange}
                required
              >
                <option value="">Select a candidate</option>
                {candidates.map(candidate => (
                  <option key={candidate.id} value={candidate.id}>
                    {candidate.name} ({candidate.jobTitle})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Job</label>
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
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Interviewer</label>
              <input
                type="text"
                name="interviewer"
                value={formData.interviewer}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Interview Type</label>
              <select
                name="interviewType"
                value={formData.interviewType}
                onChange={handleChange}
                required
              >
                <option value="Technical">Technical</option>
                <option value="Technical Advanced">Technical Advanced</option>
                <option value="HR">HR</option>
                <option value="Managerial">Managerial</option>
                <option value="Cultural Fit">Cultural Fit</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Scheduled Date</label>
              <input
                type="date"
                name="scheduledDate"
                value={formData.scheduledDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Time</label>
              <select
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
              >
                <option value="">Select start time</option>
                {timeOptions.map((time, index) => (
                  <option key={`start-${index}`} value={time}>{time}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>End Time</label>
              <select
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
              >
                <option value="">Select end time</option>
                {timeOptions.map((time, index) => (
                  <option key={`end-${index}`} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>Feedback</label>
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              rows="3"
            />
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              {interview ? 'Update Interview' : 'Schedule Interview'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InterviewForm;