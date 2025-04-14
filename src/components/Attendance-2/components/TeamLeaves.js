import React from 'react';

const TeamLeaves = ({ leaves }) => {
  return (
    <div className="team-leaves">
      <h3>Team Leaves</h3>
      {leaves.map((leave) => (
        <div key={leave.id} className="leave-item">
          <div className="leave-date">{leave.date}</div>
          <div className="leave-info">
            <div className="leave-name">{leave.name} - {leave.role}</div>
            <div className="leave-type">{leave.type}</div>
            {leave.daysLeft && <div className="leave-days">{leave.daysLeft}</div>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamLeaves;