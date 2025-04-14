import React from 'react';
import { format, parseISO } from 'date-fns';

const LeaveRequests = ({ requests = [], loading }) => {
  if (loading) return <div className="card-skeleton" />;

  // Safeguard against undefined/null requests
  if (!requests || requests.length === 0) {
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Recent Leave Requests</h3>
        </div>
        <div className="card-body">
          <p className="no-requests">No leave requests found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Recent Leave Requests</h3>
        <button className="card-action">View All</button>
      </div>
      <div className="card-body">
        {requests.map(request => {
          // Safely handle request object
          if (!request) return null;
          
          // Safely handle date formatting
          let formattedDate = '--';
          try {
            formattedDate = request.date ? format(parseISO(request.date), 'dd MM yyyy') : '--';
          } catch (e) {
            console.error('Error formatting date:', e);
          }

          // Safely handle name initials
          let initials = '--';
          try {
            initials = request.name 
              ? request.name.split(' ').map(n => n[0]).join('') 
              : '--';
          } catch (e) {
            console.error('Error generating initials:', e);
          }

          return (
            <div key={request.id || Math.random()} className="request-item">
              <div className="request-avatar">
                <span className="avatar-initials">{initials}</span>
              </div>
              <div className="request-content">
                <div className="request-meta">
                  <span className="request-name">{request.name || 'Unknown Employee'}</span>
                  <span className="request-date">{formattedDate}</span>
                </div>
                <p className="request-reason">{request.reason || 'No reason provided'}</p>
                <div className={`request-status ${request.status ? request.status.toLowerCase() : 'pending'}`}>
                  {request.status || 'Pending'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeaveRequests;