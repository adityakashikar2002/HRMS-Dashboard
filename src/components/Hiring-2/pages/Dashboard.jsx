// // Dashboard.jsx 17-4-25
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

//     // Calculate total openings ONLY from active jobs
//     const totalOpenings = jobs.reduce((sum, job) => {
//       return job.status === 'Active' ? sum + (parseInt(job.openings) || 0) : sum;
//     }, 0);

//     // Calculate total applicants (this should count candidates, not sum job applicants)
//     const totalApplicants = candidates.length;

//     // Calculate hired candidates
//     const hiredCandidates = candidates.filter(c => c.status === 'Hired').length;

//     // Calculate positions to fill (ensure it doesn't go negative)
//     const positionsToFill = Math.max(totalOpenings - hiredCandidates, 0);

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
//           c.status === 'Offer'
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
//       {
//         title: 'Active Jobs',
//         value: activeJobs,
//         subValue: `${totalOpenings} ${totalOpenings === 1 ? 'Job Opening' : 'Job Openings'}`
//       },
//       { title: 'Submissions', value: totalApplicants },
//       { title: 'Hired', value: hiredCandidates },
//       {
//         title: 'Positions to fill',
//         value: positionsToFill,
//         subValue: `${hiredCandidates} of ${totalOpenings} filled`
//       }
//     ]);

//     setOfferData({
//       accepted: acceptanceRate,
//       rejected: rejectionRate
//     });

//     setHiresBySource(sourceCounts);
//     setPipelineData(pipeline);
//     setInterviews(upcomingInterviews);

//     // Mock todo items
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

//       <div className="charts-row">
//         <div className="chart-container">
//           <h3>Offer Acceptance</h3>
//           <div className="pie-chart-wrapper">
//             <PieChart data={offerData} colors={['#4CAF50', '#F44336']} />
//             <div className="pie-chart-labels">
//               <div><span className="accepted-dot"></span> Accepted: {offerData.accepted || 0}%</div>
//               <div><span className="rejected-dot"></span> Rejected: {offerData.rejected || 0}%</div>
//             </div>
//           </div>
//         </div>

//         <div className="chart-container">
//           <h3>Hires by Sources</h3>
//           <div className="pie-chart-wrapper">
//             <PieChart
//               data={hiresBySource}
//               colors={['#2196F3', '#FF9800', '#9C27B0', '#4CAF50', '#607D8B']}
//             />
//             <div className="pie-chart-labels">
//               {Object.entries(hiresBySource).map(([source, count]) => (
//                 <div key={source}>
//                   <span style={{ backgroundColor: '#2196F3' }}></span>
//                   {source}: {count}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="right-column">
//         <Calendar interviews={interviews} />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import StatsCard from '../components/common/StatsCard'; // Imports the StatsCard component
import PieChart from '../components/common/PieChart'; // Imports the PieChart component
import Calendar from '../components/common/Calendar'; // Imports the Calendar component
import TodoList from '../components/common/TodoList'; // Imports the TodoList component
import HiringPipeline from '../components/common/HiringPipeline'; // Imports the HiringPipeline component
import {
    getJobs, // Imports the getJobs function from the utils/storage module
    getCandidates, // Imports the getCandidates function from the utils/storage module
    getInterviews, // Imports the getInterviews function from the utils/storage module
    getOffers // Imports the getOffers function from the utils/storage module
} from '../utils/storage';
import '../assets/styles/Dashboard.css'; // Imports the CSS styles for the Dashboard component

const Dashboard = () => {
    const [statsData, setStatsData] = useState([]); // Initializes a state variable 'statsData' as an empty array
    const [offerData, setOfferData] = useState({}); // Initializes a state variable 'offerData' as an empty object
    const [hiresBySource, setHiresBySource] = useState({}); // Initializes a state variable 'hiresBySource' as an empty object
    const [todoItems, setTodoItems] = useState([]); // Initializes a state variable 'todoItems' as an empty array
    const [pipelineData, setPipelineData] = useState([]); // Initializes a state variable 'pipelineData' as an empty array
    const [interviews, setInterviews] = useState([]); // Initializes a state variable 'interviews' as an empty array

    // Defines the colors array to be used for the 'Hires by Sources' pie chart and its labels
    const hiresBySourceColors = ['#2196F3', '#FF9800', '#9C27B0', '#4CAF50', '#607D8B'];

    useEffect(() => {
        updateDashboardData(); // Calls the updateDashboardData function when the component mounts
    }, []); // The empty dependency array ensures this effect runs only once after the initial render

    const updateDashboardData = () => {
        // Get all data from localStorage
        const jobs = getJobs(); // Retrieves job data from local storage
        const candidates = getCandidates(); // Retrieves candidate data from local storage
        const offers = getOffers(); // Retrieves offer data from local storage
        const allInterviews = getInterviews(); // Retrieves interview data from local storage

        // Calculate stats
        const activeJobs = jobs.filter(job => job.status === 'Active').length; // Filters jobs with 'Active' status and gets the count

        // Calculate total openings ONLY from active jobs
        const totalOpenings = jobs.reduce((sum, job) => {
            return job.status === 'Active' ? sum + (parseInt(job.openings) || 0) : sum; // Sums the 'openings' of active jobs, handling potential NaN values
        }, 0);

        // Calculate total applicants (this should count candidates, not sum job applicants)
        const totalApplicants = candidates.length; // Gets the total number of candidates

        // Calculate hired candidates
        const hiredCandidates = candidates.filter(c => c.status === 'Hired').length; // Filters candidates with 'Hired' status and gets the count

        // Calculate positions to fill (ensure it doesn't go negative)
        const positionsToFill = Math.max(totalOpenings - hiredCandidates, 0); // Calculates the difference between total openings and hired candidates, ensuring a non-negative value

        // Calculate offer acceptance
        const acceptedOffers = offers.filter(o => o.status === 'Accepted').length; // Filters offers with 'Accepted' status and gets the count
        const rejectedOffers = offers.filter(o => o.status === 'Rejected').length; // Filters offers with 'Rejected' status and gets the count
        const totalOffers = offers.length; // Gets the total number of offers
        const acceptanceRate = totalOffers > 0 ? Math.round((acceptedOffers / totalOffers) * 100) : 0; // Calculates the offer acceptance rate as a percentage
        const rejectionRate = totalOffers > 0 ? Math.round((rejectedOffers / totalOffers) * 100) : 0; // Calculates the offer rejection rate as a percentage

        // Calculate hires by source
        const sourceCounts = candidates.reduce((acc, candidate) => {
            if (candidate.status === 'Hired') {
                acc[candidate.source] = (acc[candidate.source] || 0) + 1; // Counts the number of hired candidates for each source
            }
            return acc;
        }, {});

        // Calculate hiring pipeline
        const pipeline = jobs.map(job => {
            const jobCandidates = candidates.filter(c => c.jobId === job.id); // Filters candidates associated with the current job
            return {
                jobTitle: `${job.title} (${job.openings})`, // Combines job title and number of openings
                submissions: jobCandidates.length, // Number of candidates who applied for this job
                shortlisted: jobCandidates.filter(c => c.currentStage !== 'Application Review').length, // Number of candidates past the application review stage
                interview: jobCandidates.filter(c =>
                    c.currentStage.includes('Interview') ||
                    c.currentStage === 'Technical Screening'
                ).length, // Number of candidates in the interview or technical screening stage
                offered: jobCandidates.filter(c =>
                    c.currentStage === 'Offer Discussion' ||
                    c.status === 'Offer'
                ).length, // Number of candidates in offer discussion or who have received an offer
                hired: jobCandidates.filter(c => c.status === 'Hired').length, // Number of hired candidates for this job
                timeToHire: '15 Days' // Mock value for time to hire (would require tracking application dates)
            };
        });

        // Get upcoming interviews for calendar
        const upcomingInterviews = allInterviews
            .filter(i => i.status === 'Scheduled') // Filters interviews with 'Scheduled' status
            .sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate)); // Sorts scheduled interviews by date

        // Update state
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
        ]); // Updates the statsData state with calculated values

        setOfferData({
            accepted: acceptanceRate,
            rejected: rejectionRate
        }); // Updates the offerData state with acceptance and rejection rates

        setHiresBySource(sourceCounts); // Updates the hiresBySource state with the counts of hires per source
        setPipelineData(pipeline); // Updates the pipelineData state with the hiring pipeline information
        setInterviews(upcomingInterviews); // Updates the interviews state with the upcoming scheduled interviews

        // Mock todo items
        setTodoItems([
            { title: 'Laptop Configuration', description: 'New softwares and basic plugins to install' },
            { title: 'Onboarding Documents', description: 'Prepare documents for new hires' },
            { title: 'Interview Feedback', description: 'Collect feedback from interviewers' }
        ]); // Sets the todoItems state with mock todo list items
    };

    return (
        <div className="dashboard"> {/* Main container for the dashboard */}
            <h1>Overview</h1> {/* Dashboard heading */}

            <div className="stats-grid"> {/* Grid layout for displaying statistics cards */}
                {statsData.map((stat, index) => (
                    <StatsCard key={index} title={stat.title} value={stat.value} subValue={stat.subValue} />
                ))} {/* Maps through the statsData array and renders a StatsCard for each item */}
            </div>

            <div className="charts-row"> {/* Row for arranging charts side by side */}
                <div className="chart-container"> {/* Container for the Offer Acceptance chart */}
                    <h3>Offer Acceptance</h3> {/* Chart title */}
                    <div className="pie-chart-wrapper"> {/* Wrapper for the pie chart and its labels */}
                        <PieChart data={offerData} colors={['#4CAF50', '#F44336']} /> {/* Renders the PieChart component for offer data */}
                        <div className="pie-chart-labels"> {/* Container for the offer acceptance labels */}
                            <div><span className="accepted-dot"></span> Accepted: {offerData.accepted || 0}%</div>
                            <div><span className="rejected-dot"></span> Rejected: {offerData.rejected || 0}%</div>
                        </div>
                    </div>
                </div>

                <div className="chart-container"> {/* Container for the Hires by Sources chart */}
                    <h3>Hires by Sources</h3> {/* Chart title */}
                    <div className="pie-chart-wrapper"> {/* Wrapper for the pie chart and its labels */}
                        <PieChart
                            data={hiresBySource}
                            colors={hiresBySourceColors} // Passes the defined colors array to the PieChart
                        />
                        <div className="pie-chart-labels"> {/* Container for the hires by sources labels */}
                            {Object.entries(hiresBySource).map(([source, count], index) => (
                                <div key={source}>
                                    <span style={{ backgroundColor: hiresBySourceColors[index % hiresBySourceColors.length] }}></span> {/* Sets the background color of the label dot using the defined colors array */}
                                    {source}: {count}
                                </div>
                            ))} {/* Maps through the hiresBySource data and renders a label for each source */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="right-column"> {/* Column for displaying the calendar */}
                <Calendar interviews={interviews} /> {/* Renders the Calendar component, passing the upcoming interviews */}
            </div>
        </div>
    );
};

export default Dashboard; // Exports the Dashboard component