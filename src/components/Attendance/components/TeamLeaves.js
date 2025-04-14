import React from 'react';
import { format, parseISO, isValid } from 'date-fns';

const TeamLeaves = ({ leaves = [], loading }) => {
  if (loading) return <div className="card-skeleton" />;

  // Safeguard against undefined/null leaves
  if (!leaves || leaves.length === 0) {
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Team Leaves</h3>
        </div>
        <div className="card-body">
          <p className="no-leaves">No team leaves found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Team Leaves</h3>
        <button className="card-action">View All</button>
      </div>
      <div className="card-body">
        {leaves.map(leave => {
          if (!leave) return null;

          // Safely handle name initials
          let initials = '--';
          try {
            initials = leave.name 
              ? leave.name.split(' ').map(n => n[0] || '').join('') 
              : '--';
          } catch (e) {
            console.error('Error generating initials:', e);
          }

          // Safely handle date formatting
          let formattedDate = '--';
          try {
            if (leave.date) {
              let dateObj;
              
              // Try parsing as ISO first
              try {
                dateObj = parseISO(leave.date);
              } catch (e) {
                // Fallback to new Date() if ISO parsing fails
                dateObj = new Date(leave.date);
              }
              
              if (isValid(dateObj)) {
                formattedDate = format(dateObj, 'dd MMM yyyy');
              }
            }
          } catch (e) {
            console.error('Error formatting date:', e);
          }

          return (
            <div key={leave.id || Math.random()} className="leave-item">
              <div className="leave-avatar">
                <span className="avatar-initials">{initials}</span>
              </div>
              <div className="leave-content">
                <div className="leave-meta">
                  <span className="leave-name">{leave.name || 'Unknown Employee'}</span>
                  <span className="leave-date">{formattedDate}</span>
                </div>
                <div className="leave-details">
                  <span className="leave-type">{leave.type || 'Leave'}</span>
                  {leave.daysLeft && (
                    <span className="leave-days-left">{leave.daysLeft} left</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamLeaves;