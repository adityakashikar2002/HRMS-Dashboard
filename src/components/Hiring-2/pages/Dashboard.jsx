// import React, { useEffect, useState } from 'react';
// import StatsCard from '../components/common/StatsCard';
// import PieChart from '../components/common/PieChart';
// import Calendar from '../components/common/Calendar';
// import TodoList from '../components/common/TodoList';
// import HiringPipeline from '../components/common/HiringPipeline';
// import { 
//   getJobs, 
//   getCandidates, 
//   getInterviews, 
//   getOffers 
// } from '../utils/storage';
// import '../assets/styles/Dashboard.css';

// const Dashboard = () => {
//   const [statsData, setStatsData] = useState([]);
//   const [offerData, setOfferData] = useState({});
//   const [hiresBySource, setHiresBySource] = useState({});
//   const [todoItems, setTodoItems] = useState([]);
//   const [pipelineData, setPipelineData] = useState([]);
//   const [interviews, setInterviews] = useState([]);

//   useEffect(() => {
//     updateDashboardData();
//   }, []);

//   const updateDashboardData = () => {
//     // Get all data from localStorage
//     const jobs = getJobs();
//     const candidates = getCandidates();
//     const offers = getOffers();
//     const allInterviews = getInterviews();
    
//     // Calculate stats
//     const activeJobs = jobs.filter(job => job.status === 'Active').length;
//     const jobOpenings = jobs.reduce((sum, job) => sum + (job.status === 'Active' ? job.openings : 0), 0);
//     const submissions = candidates.length;
//     const hiredCandidates = candidates.filter(c => c.status === 'Hired').length;
//     const positionsToFill = jobOpenings - hiredCandidates;

//     // Calculate offer acceptance
//     const acceptedOffers = offers.filter(o => o.status === 'Accepted').length;
//     const rejectedOffers = offers.filter(o => o.status === 'Rejected').length;
//     const totalOffers = offers.length;
//     const acceptanceRate = totalOffers > 0 ? Math.round((acceptedOffers / totalOffers) * 100) : 0;
//     const rejectionRate = totalOffers > 0 ? Math.round((rejectedOffers / totalOffers) * 100) : 0;

//     // Calculate hires by source
//     const sourceCounts = candidates.reduce((acc, candidate) => {
//       if (candidate.status === 'Hired') {
//         acc[candidate.source] = (acc[candidate.source] || 0) + 1;
//       }
//       return acc;
//     }, {});

//     // Calculate hiring pipeline
//     const pipeline = jobs.map(job => {
//       const jobCandidates = candidates.filter(c => c.jobId === job.id);
//       return {
//         jobTitle: `${job.title} (${job.openings})`,
//         submissions: jobCandidates.length,
//         shortlisted: jobCandidates.filter(c => c.currentStage !== 'Application Review').length,
//         interview: jobCandidates.filter(c => 
//           c.currentStage.includes('Interview') || 
//           c.currentStage === 'Technical Screening'
//         ).length,
//         offered: jobCandidates.filter(c => 
//           c.currentStage === 'Offer Discussion' || 
//           c.status === 'offer'
//         ).length,
//         hired: jobCandidates.filter(c => c.status === 'Hired').length,
//         timeToHire: '15 Days' // This would require tracking application dates
//       };
//     });

//     // Get upcoming interviews for calendar
//     const upcomingInterviews = allInterviews
//       .filter(i => i.status === 'Scheduled')
//       .sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate));

//     // Update state
//     setStatsData([
//       { title: 'Active Jobs', value: activeJobs, subValue: `${jobOpenings} Job Openings` },
//       { title: 'Submissions', value: submissions },
//       { title: 'Hired', value: hiredCandidates },
//       { title: 'Positions to fill', value: positionsToFill > 0 ? positionsToFill : 0 }
//     ]);

//     setOfferData({
//       accepted: acceptanceRate,
//       rejected: rejectionRate
//     });

//     setHiresBySource(sourceCounts);
//     setPipelineData(pipeline);
//     setInterviews(upcomingInterviews);

//     // Mock todo items (could be fetched from storage in a real app)
//     setTodoItems([
//       { title: 'Laptop Configuration', description: 'New softwares and basic plugins to install' },
//       { title: 'Onboarding Documents', description: 'Prepare documents for new hires' },
//       { title: 'Interview Feedback', description: 'Collect feedback from interviewers' }
//     ]);
//   };

//   return (
//     <div className="dashboard">
//       <h1>Overview</h1>
      
//       <div className="stats-grid">
//         {statsData.map((stat, index) => (
//           <StatsCard key={index} title={stat.title} value={stat.value} subValue={stat.subValue} />
//         ))}
//       </div>
      
//       <div className="dashboard-content">
//         <div className="left-column">
//           <div className="offer-acceptance">
//             <h3>Offer Acceptance</h3>
//             <div className="pie-chart-container">
//               <PieChart data={offerData} colors={['#4CAF50', '#F44336']} />
//               <div className="pie-chart-labels">
//                 <div><span className="accepted-dot"></span> Accepted: {offerData.accepted || 0}%</div>
//                 <div><span className="rejected-dot"></span> Rejected: {offerData.rejected || 0}%</div>
//               </div>
//             </div>
//           </div>
          
//           <div className="hires-by-source">
//             <h3>Hires by Sources</h3>
//             <PieChart 
//               data={hiresBySource} 
//               colors={['#2196F3', '#FF9800', '#9C27B0', '#4CAF50', '#607D8B']} 
//             />
//           </div>
//         </div>
        
//         <div className="right-column">
//           <Calendar interviews={interviews} />
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

  // const updateDashboardData = () => {
  //   // Get all data from localStorage
  //   const jobs = getJobs();
  //   const candidates = getCandidates();
  //   const offers = getOffers();
  //   const allInterviews = getInterviews();
    
  //   // Calculate stats
  //   const activeJobs = jobs.filter(job => job.status === 'Active').length;
  //   const totalOpenings = jobs.reduce((sum, job) => sum + (job.status === 'Active' ? job.openings : 0), 0);
  //   const totalApplicants = jobs.reduce((sum, job) => sum + (job.applicants || 0), 0);
  //   const hiredCandidates = candidates.filter(c => c.status === 'Hired').length;
  //   const positionsToFill = totalOpenings - hiredCandidates > 0 ? totalOpenings - hiredCandidates : 0;
  const updateDashboardData = () => {
    // Get all data from localStorage
    const jobs = getJobs();
    const candidates = getCandidates();
    const offers = getOffers();
    const allInterviews = getInterviews();
    
    // Calculate stats
    const activeJobs = jobs.filter(job => job.status === 'Active').length;
    
    // Calculate total openings ONLY from active jobs
    const totalOpenings = jobs.reduce((sum, job) => {
      return job.status === 'Active' ? sum + (job.openings || 0) : sum;
    }, 0);
    
    // Calculate total applicants (this should count candidates, not sum job applicants)
    const totalApplicants = candidates.length;
    
    // Calculate hired candidates
    const hiredCandidates = candidates.filter(c => c.status === 'Hired').length;
    
    // Calculate positions to fill (ensure it doesn't go negative)
    const positionsToFill = Math.max(totalOpenings - hiredCandidates, 0);

    // Calculate offer acceptance
    const acceptedOffers = offers.filter(o => o.status === 'Accepted').length;
    const rejectedOffers = offers.filter(o => o.status === 'Rejected').length;
    const totalOffers = offers.length;
    const acceptanceRate = totalOffers > 0 ? Math.round((acceptedOffers / totalOffers) * 100) : 0;
    const rejectionRate = totalOffers > 0 ? Math.round((rejectedOffers / totalOffers) * 100) : 0;

    // Calculate hires by source
    const sourceCounts = candidates.reduce((acc, candidate) => {
      if (candidate.status === 'Hired') {
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
          c.status === 'Offer'
        ).length,
        hired: jobCandidates.filter(c => c.status === 'Hired').length,
        timeToHire: '15 Days' // This would require tracking application dates
      };
    });

    // Get upcoming interviews for calendar
    const upcomingInterviews = allInterviews
      .filter(i => i.status === 'Scheduled')
      .sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate));

    // Update state
    // setStatsData([
    //   { title: 'Active Jobs', value: activeJobs, subValue: `${totalOpenings} Job Openings` },
    //   { title: 'Submissions', value: totalApplicants },
    //   { title: 'Hired', value: hiredCandidates },
    //   { title: 'Positions to fill', value: positionsToFill }
    // ]);
    setStatsData([
      { 
        title: 'Active Jobs', 
        value: activeJobs, 
        subValue: `${totalOpenings} ${totalOpenings === 1 ? 'Job Opening' : 'Job Openings'}` 
      },
      { title: 'Submissions', value: totalApplicants },
      { title: 'Hired', value: hiredCandidates },
      { 
        title: 'Positions to fill', 
        value: positionsToFill,
        subValue: `${hiredCandidates} of ${totalOpenings} filled` 
      }
    ]);

    setOfferData({
      accepted: acceptanceRate,
      rejected: rejectionRate
    });

    setHiresBySource(sourceCounts);
    setPipelineData(pipeline);
    setInterviews(upcomingInterviews);

    // Mock todo items
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