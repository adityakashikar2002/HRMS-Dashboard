import React from 'react';
import StatsCard from '../components/common/StatsCard';
import PieChart from '../components/common/PieChart';
import Calendar from '../components/common/Calendar';
import TodoList from '../components/common/TodoList';
import HiringPipeline from '../components/common/HiringPipeline';
// import '../assets/styles/Dashboard.css';

const Dashboard = () => {
  const statsData = [
    { title: 'Active Jobs', value: 16, subValue: '28 Job Openings' },
    { title: 'Submissions', value: 84 },
    { title: 'Hired', value: 12 },
    { title: 'Positions to fill', value: 8 }
  ];

  const offerData = {
    accepted: 82,
    rejected: 18
  };

  const hiresBySource = {
    LinkedIn: 35,
    Naukari: 28,
    Others: 23
  };

  const todoItems = [
    { title: 'Laptop Configuration', description: 'New softwares and basic plugins to install' },
    { title: 'Onboarding Documents', description: 'Prepare documents for new hires' },
    { title: 'Interview Feedback', description: 'Collect feedback from interviewers' }
  ];

  const pipelineData = [
    { jobTitle: 'Manual Test Engineer (8)', submissions: 12, shortlisted: 8, interview: 4, offered: 2, hired: 1, timeToHire: '15 Days' },
    { jobTitle: 'Node JS Developer (1)', submissions: 26, shortlisted: 12, interview: 18, offered: 6, hired: 4, timeToHire: '10 Days' },
    { jobTitle: 'UI UX Designer (2)', submissions: 8, shortlisted: 2, interview: 4, offered: 3, hired: 0, timeToHire: '12 Days' },
    { jobTitle: 'Python Developer (1)', submissions: 13, shortlisted: 1, interview: 5, offered: 2, hired: 1, timeToHire: '10 Days' },
    { jobTitle: 'Digital Marketing (2)', submissions: 10, shortlisted: 0, interview: 3, offered: 3, hired: 2, timeToHire: '15 Days' }
  ];

  return (
    <div className="dashboard">
      <h1>Overview</h1>
      
      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <StatsCard key={index} title={stat.title} value={stat.value} subValue={stat.subValue} />
        ))}
      </div>
      
      <div className="dashboard-hiring-content">
        <div className="left-column">
          <div className="offer-acceptance">
            <h3>Offer Acceptance</h3>
            <div className="pie-chart-container">
              <PieChart data={offerData} colors={['#4CAF50', '#F44336']} />
              <div className="pie-chart-labels">
                <div><span className="accepted-dot"></span> Accepted: 82%</div>
                <div><span className="rejected-dot"></span> Rejected: 18%</div>
              </div>
            </div>
          </div>
          
          <div className="hires-by-source">
            <h3>Hires by Sources</h3>
            <PieChart data={hiresBySource} colors={['#2196F3', '#FF9800', '#9C27B0']} />
          </div>
        </div>
        
        <div className="right-column">
          <Calendar />
          <TodoList items={todoItems} />
        </div>
      </div>
      
      <div className="hiring-pipeline">
        <h3>Hiring Pipeline</h3>
        <HiringPipeline data={pipelineData} />
      </div>
    </div>
  );
};

export default Dashboard;