import React from 'react';
import './HiringPipeline.css';

const HiringPipeline = ({ data = [] }) => {
  if (data.length === 0) {
    return <div className="no-data">No hiring pipeline data available</div>;
  }

  return (
    <div className="hiring-pipeline-table">
      <table>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Submissions</th>
            <th>Shortlisted</th>
            <th>Interview</th>
            <th>Offered</th>
            <th>Hired</th>
            <th>Time to Hire</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.jobTitle}</td>
              <td>{row.submissions}</td>
              <td>{row.shortlisted}</td>
              <td>{row.interview}</td>
              <td>{row.offered}</td>
              <td>{row.hired}</td>
              <td>{row.timeToHire}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HiringPipeline;