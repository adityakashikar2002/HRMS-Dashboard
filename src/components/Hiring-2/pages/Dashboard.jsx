// import React from 'react';
// import StatsCard from '../components/common/StatsCard';
// import PieChart from '../components/common/PieChart';
// import Calendar from '../components/common/Calendar';
// import TodoList from '../components/common/TodoList';
// import HiringPipeline from '../components/common/HiringPipeline';
// // import '../assets/styles/Dashboard.css';

// const Dashboard = () => {
//   const statsData = [
//     { title: 'Active Jobs', value: 16, subValue: '28 Job Openings' },
//     { title: 'Submissions', value: 84 },
//     { title: 'Hired', value: 12 },
//     { title: 'Positions to fill', value: 8 }
//   ];

//   const offerData = {
//     accepted: 82,
//     rejected: 18
//   };

//   const hiresBySource = {
//     LinkedIn: 35,
//     Naukari: 28,
//     Others: 23
//   };

//   const todoItems = [
//     { title: 'Laptop Configuration', description: 'New softwares and basic plugins to install' },
//     { title: 'Onboarding Documents', description: 'Prepare documents for new hires' },
//     { title: 'Interview Feedback', description: 'Collect feedback from interviewers' }
//   ];

//   const pipelineData = [
//     { jobTitle: 'Manual Test Engineer (8)', submissions: 12, shortlisted: 8, interview: 4, offered: 2, hired: 1, timeToHire: '15 Days' },
//     { jobTitle: 'Node JS Developer (1)', submissions: 26, shortlisted: 12, interview: 18, offered: 6, hired: 4, timeToHire: '10 Days' },
//     { jobTitle: 'UI UX Designer (2)', submissions: 8, shortlisted: 2, interview: 4, offered: 3, hired: 0, timeToHire: '12 Days' },
//     { jobTitle: 'Python Developer (1)', submissions: 13, shortlisted: 1, interview: 5, offered: 2, hired: 1, timeToHire: '10 Days' },
//     { jobTitle: 'Digital Marketing (2)', submissions: 10, shortlisted: 0, interview: 3, offered: 3, hired: 2, timeToHire: '15 Days' }
//   ];

//   return (
//     <div className="dashboard">
//       <h1>Overview</h1>
      
//       <div className="stats-grid">
//         {statsData.map((stat, index) => (
//           <StatsCard key={index} title={stat.title} value={stat.value} subValue={stat.subValue} />
//         ))}
//       </div>
      
//       <div className="dashboard-hiring-content">
//         <div className="left-column">
//           <div className="offer-acceptance">
//             <h3>Offer Acceptance</h3>
//             <div className="pie-chart-container">
//               <PieChart data={offerData} colors={['#4CAF50', '#F44336']} />
//               <div className="pie-chart-labels">
//                 <div><span className="accepted-dot"></span> Accepted: 82%</div>
//                 <div><span className="rejected-dot"></span> Rejected: 18%</div>
//               </div>
//             </div>
//           </div>
          
//           <div className="hires-by-source">
//             <h3>Hires by Sources</h3>
//             <PieChart data={hiresBySource} colors={['#2196F3', '#FF9800', '#9C27B0']} />
//           </div>
//         </div>
        
//         <div className="right-column">
//           <Calendar />
//           <TodoList items={todoItems} />
//         </div>
//       </div>
      
//       <div className="hiring-pipeline">
//         <h3>Hiring Pipeline</h3>
//         <HiringPipeline data={pipelineData} />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




import React, { useEffect, useState } from 'react';
import StatsCard from '../components/common/StatsCard';
import PieChart from '../components/common/PieChart';
import Calendar from '../components/common/Calendar';
import TodoList from '../components/common/TodoList';
import HiringPipeline from '../components/common/HiringPipeline';
import { 
  getJobs, 
  getCandidates, 
  getInterviews, 
  getOffers 
} from '../utils/storage';
import '../assets/styles/Dashboard.css';

const Dashboard = () => {
  const [statsData, setStatsData] = useState([]);
  const [offerData, setOfferData] = useState({});
  const [hiresBySource, setHiresBySource] = useState({});
  const [todoItems, setTodoItems] = useState([]);
  const [pipelineData, setPipelineData] = useState([]);
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    updateDashboardData();
  }, []);

  const updateDashboardData = () => {
    // Get all data from localStorage
    const jobs = getJobs();
    const candidates = getCandidates();
    const offers = getOffers();
    const allInterviews = getInterviews();
    
    // Calculate stats
    const activeJobs = jobs.filter(job => job.status === 'active').length;
    const jobOpenings = jobs.reduce((sum, job) => sum + (job.status === 'active' ? job.openings : 0), 0);
    const submissions = candidates.length;
    const hiredCandidates = candidates.filter(c => c.status === 'hired').length;
    const positionsToFill = jobOpenings - hiredCandidates;

    // Calculate offer acceptance
    const acceptedOffers = offers.filter(o => o.status === 'accepted').length;
    const rejectedOffers = offers.filter(o => o.status === 'rejected').length;
    const totalOffers = offers.length;
    const acceptanceRate = totalOffers > 0 ? Math.round((acceptedOffers / totalOffers) * 100) : 0;
    const rejectionRate = totalOffers > 0 ? Math.round((rejectedOffers / totalOffers) * 100) : 0;

    // Calculate hires by source
    const sourceCounts = candidates.reduce((acc, candidate) => {
      if (candidate.status === 'hired') {
        acc[candidate.source] = (acc[candidate.source] || 0) + 1;
      }
      return acc;
    }, {});

    // Calculate hiring pipeline
    const pipeline = jobs.map(job => {
      const jobCandidates = candidates.filter(c => c.jobId === job.id);
      return {
        jobTitle: `${job.title} (${job.openings})`,
        submissions: jobCandidates.length,
        shortlisted: jobCandidates.filter(c => c.currentStage !== 'Application Review').length,
        interview: jobCandidates.filter(c => 
          c.currentStage.includes('Interview') || 
          c.currentStage === 'Technical Screening'
        ).length,
        offered: jobCandidates.filter(c => 
          c.currentStage === 'Offer Discussion' || 
          c.status === 'offer'
        ).length,
        hired: jobCandidates.filter(c => c.status === 'hired').length,
        timeToHire: '15 Days' // This would require tracking application dates
      };
    });

    // Get upcoming interviews for calendar
    const upcomingInterviews = allInterviews
      .filter(i => i.status === 'scheduled')
      .sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate));

    // Update state
    setStatsData([
      { title: 'Active Jobs', value: activeJobs, subValue: `${jobOpenings} Job Openings` },
      { title: 'Submissions', value: submissions },
      { title: 'Hired', value: hiredCandidates },
      { title: 'Positions to fill', value: positionsToFill > 0 ? positionsToFill : 0 }
    ]);

    setOfferData({
      accepted: acceptanceRate,
      rejected: rejectionRate
    });

    setHiresBySource(sourceCounts);
    setPipelineData(pipeline);
    setInterviews(upcomingInterviews);

    // Mock todo items (could be fetched from storage in a real app)
    setTodoItems([
      { title: 'Laptop Configuration', description: 'New softwares and basic plugins to install' },
      { title: 'Onboarding Documents', description: 'Prepare documents for new hires' },
      { title: 'Interview Feedback', description: 'Collect feedback from interviewers' }
    ]);
  };

  return (
    <div className="dashboard">
      <h1>Overview</h1>
      
      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <StatsCard key={index} title={stat.title} value={stat.value} subValue={stat.subValue} />
        ))}
      </div>
      
      <div className="dashboard-content">
        <div className="left-column">
          <div className="offer-acceptance">
            <h3>Offer Acceptance</h3>
            <div className="pie-chart-container">
              <PieChart data={offerData} colors={['#4CAF50', '#F44336']} />
              <div className="pie-chart-labels">
                <div><span className="accepted-dot"></span> Accepted: {offerData.accepted || 0}%</div>
                <div><span className="rejected-dot"></span> Rejected: {offerData.rejected || 0}%</div>
              </div>
            </div>
          </div>
          
          <div className="hires-by-source">
            <h3>Hires by Sources</h3>
            <PieChart 
              data={hiresBySource} 
              colors={['#2196F3', '#FF9800', '#9C27B0', '#4CAF50', '#607D8B']} 
            />
          </div>
        </div>
        
        <div className="right-column">
          <Calendar interviews={interviews} />
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