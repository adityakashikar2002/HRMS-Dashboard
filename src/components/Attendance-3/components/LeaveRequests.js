import React, { useState } from 'react';
import { exportToCSV } from '../utils/exportUtils';

const LeaveRequests = ({ requests, timeRange }) => {
  const [expandedRequest, setExpandedRequest] = useState(null);

  const toggleRequest = (id) => {
    setExpandedRequest(expandedRequest === id ? null : id);
  };

  const handleExport = () => {
    const headers = ['Date', 'Reason', 'Status', 'Employee', 'Days'];
    const rows = requests.map(request => [
      request.date,
      request.reason,
      request.status,
      request.employee || 'N/A',
      request.days || 'N/A'
    ]);
    exportToCSV([headers, ...rows], `leave-requests-${timeRange}`);
  };

  return (
    <div className="leave-requests">
      <div className="section-header">
        <h3>Recent Leave Request</h3>
        <button className="export-btn" onClick={handleExport}>
          Export CSV
        </button>
      </div>
      <div className="requests-list">
        {requests.map((request) => (
          <React.Fragment key={request.id}>
            <div 
              className="request-item" 
              onClick={() => toggleRequest(request.id)}
            >
              <div className="request-date">{request.date}</div>
              <div className="request-reason">{request.reason}</div>
              <div className={`request-status ${request.status.toLowerCase()}`}>
                {request.status}
              </div>
            </div>
            {expandedRequest === request.id && (
              <div className="request-details">
                <div className="detail-row">
                  <span>Employee:</span>
                  <span>{request.employee || 'Not specified'}</span>
                </div>
                <div className="detail-row">
                  <span>Days:</span>
                  <span>{request.days || 'N/A'}</span>
                </div>
                <div className="detail-row">
                  <span>Notes:</span>
                  <span>{request.notes || 'No additional notes'}</span>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default LeaveRequests;