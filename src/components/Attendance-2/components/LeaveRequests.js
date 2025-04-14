import React from 'react';

const LeaveRequests = ({ requests }) => {
  return (
    <div className="leave-requests">
      <h3>Recent Leave Request</h3>
      {requests.map((request) => (
        <div key={request.id} className="request-item">
          <div className="request-date">{request.date}</div>
          <div className="request-reason">{request.reason}</div>
          <div className={`request-status ${request.status.toLowerCase()}`}>{request.status}</div>
        </div>
      ))}
    </div>
  );
};

export default LeaveRequests;