export const getJobs = () => {
    const jobs = localStorage.getItem('jobs');
    return jobs ? JSON.parse(jobs) : [];
  };
  
  export const addJob = (job) => {
    const jobs = getJobs();
    const newJob = {
      ...job,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      applicants: 0
    };
    localStorage.setItem('jobs', JSON.stringify([...jobs, newJob]));
  };
  
  export const updateJob = (id, updatedJob) => {
    const jobs = getJobs();
    const updatedJobs = jobs.map(job => 
      job.id === id ? { ...job, ...updatedJob } : job
    );
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
  };
  
  export const deleteJob = (id) => {
    const jobs = getJobs();
    const filteredJobs = jobs.filter(job => job.id !== id);
    localStorage.setItem('jobs', JSON.stringify(filteredJobs));
  };
  
  export const getCandidates = () => {
    const candidates = localStorage.getItem('candidates');
    return candidates ? JSON.parse(candidates) : [];
  };
  
  export const addCandidate = (candidate) => {
    const candidates = getCandidates();
    const newCandidate = {
      ...candidate,
      id: Date.now().toString(),
      appliedAt: new Date().toISOString(),
      status: 'Applied',
      currentStage: 'Application Review'
    };
    localStorage.setItem('candidates', JSON.stringify([...candidates, newCandidate]));
  };
  
  export const updateCandidate = (id, updatedCandidate) => {
    const candidates = getCandidates();
    const updatedCandidates = candidates.map(candidate => 
      candidate.id === id ? { ...candidate, ...updatedCandidate } : candidate
    );
    localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
  };
  
  export const deleteCandidate = (id) => {
    const candidates = getCandidates();
    const filteredCandidates = candidates.filter(candidate => candidate.id !== id);
    localStorage.setItem('candidates', JSON.stringify(filteredCandidates));
  };
  
  export const getInterviews = () => {
    const interviews = localStorage.getItem('interviews');
    return interviews ? JSON.parse(interviews) : [];
  };
  
  export const addInterview = (interview) => {
    const interviews = getInterviews();
    const newInterview = {
      ...interview,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'scheduled'
    };
    localStorage.setItem('interviews', JSON.stringify([...interviews, newInterview]));
  };
  
  export const updateInterview = (id, updatedInterview) => {
    const interviews = getInterviews();
    const updatedInterviews = interviews.map(interview => 
      interview.id === id ? { ...interview, ...updatedInterview } : interview
    );
    localStorage.setItem('interviews', JSON.stringify(updatedInterviews));
  };
  
  export const deleteInterview = (id) => {
    const interviews = getInterviews();
    const filteredInterviews = interviews.filter(interview => interview.id !== id);
    localStorage.setItem('interviews', JSON.stringify(filteredInterviews));
  };
  
  export const getOffers = () => {
    const offers = localStorage.getItem('offers');
    return offers ? JSON.parse(offers) : [];
  };
  
  export const addOffer = (offer) => {
    const offers = getOffers();
    const newOffer = {
      ...offer,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    localStorage.setItem('offers', JSON.stringify([...offers, newOffer]));
  };
  
  export const updateOffer = (id, updatedOffer) => {
    const offers = getOffers();
    const updatedOffers = offers.map(offer => 
      offer.id === id ? { ...offer, ...updatedOffer } : offer
    );
    localStorage.setItem('offers', JSON.stringify(updatedOffers));
  };
  
  export const deleteOffer = (id) => {
    const offers = getOffers();
    const filteredOffers = offers.filter(offer => offer.id !== id);
    localStorage.setItem('offers', JSON.stringify(filteredOffers));
  };
  
  // Initialize mock data if empty
  export const initializeMockData = () => {
    if (!localStorage.getItem('jobs') || JSON.parse(localStorage.getItem('jobs')).length === 0) {
      // const mockJobs = [
      //   {
      //     id: '1',
      //     title: 'Frontend Developer',
      //     description: 'We are looking for a skilled Frontend Developer to join our team.',
      //     location: 'New York',
      //     type: 'full-time',
      //     status: 'active',
      //     openings: 3,
      //     skills: 'React, JavaScript, CSS',
      //     experience: '3+ years',
      //     salary: 'Rs.80,000 - Rs.100,000',
      //     createdAt: '2023-01-15T10:00:00Z',
      //     applicants: 12
      //   },
      //   {
      //     id: '2',
      //     title: 'Backend Developer',
      //     description: 'Join our backend team to build scalable APIs and services.',
      //     location: 'Remote',
      //     type: 'full-time',
      //     status: 'active',
      //     openings: 2,
      //     skills: 'Node.js, Python, SQL',
      //     experience: '5+ years',
      //     salary: 'Rs.90,000 - Rs.120,000',
      //     createdAt: '2023-02-20T10:00:00Z',
      //     applicants: 8
      //   }
      // ];
      // localStorage.setItem('jobs', JSON.stringify(mockJobs));
      const mockJobs = [
        {
          id: '1',
          title: 'Frontend Developer',
          description: 'We are looking for a skilled Frontend Developer to join our team.',
          location: 'Bangalore',
          type: 'Full-time',
          status: 'Active',
          openings: 3,
          skills: 'React, JavaScript, CSS',
          experience: '3+ years',
          salary: 'Rs.80,000 - Rs.100,000',
          createdAt: '2025-01-10T10:00:00Z',
          applicants: 12
        },
        {
          id: '2',
          title: 'Backend Developer',
          description: 'Join our backend team to build scalable APIs and services.',
          location: 'Remote',
          type: 'Full-time',
          status: 'Active',
          openings: 2,
          skills: 'Node.js, Python, SQL',
          experience: '5+ years',
          salary: 'Rs.90,000 - Rs.120,000',
          createdAt: '2025-01-25T11:00:00Z',
          applicants: 8
        },
        {
          id: '3',
          title: 'UI/UX Designer',
          description: 'Design intuitive and visually appealing user interfaces.',
          location: 'Mumbai',
          type: 'Part-time',
          status: 'Active',
          openings: 1,
          skills: 'Figma, Adobe XD, Prototyping',
          experience: '2+ years',
          salary: 'Rs.50,000 - Rs.70,000',
          createdAt: '2025-02-05T09:30:00Z',
          applicants: 5
        },
        {
          id: '4',
          title: 'Data Analyst',
          description: 'Analyze data trends to support business decisions.',
          location: 'Hyderabad',
          type: 'Full-time',
          status: 'Active',
          openings: 2,
          skills: 'SQL, Python, Power BI',
          experience: '4+ years',
          salary: 'Rs.75,000 - Rs.95,000',
          createdAt: '2025-03-02T08:00:00Z',
          applicants: 10
        }
      ];
      localStorage.setItem('jobs', JSON.stringify(mockJobs));
    }
  
    if (!localStorage.getItem('candidates') || JSON.parse(localStorage.getItem('candidates')).length === 0) {
      // const mockCandidates = [
      //   {
      //     id: '1',
      //     name: 'John Doe',
      //     email: 'john.doe@example.com',
      //     phone: '123-456-7890',
      //     resume: 'john_doe_resume.pdf',
      //     jobId: '1',
      //     jobTitle: 'Frontend Developer',
      //     source: 'LinkedIn',
      //     status: 'interview',
      //     currentStage: 'Technical Interview',
      //     appliedAt: '2023-03-01T10:00:00Z'
      //   },
      //   {
      //     id: '2',
      //     name: 'Jane Smith',
      //     email: 'jane.smith@example.com',
      //     phone: '987-654-3210',
      //     resume: 'jane_smith_resume.pdf',
      //     jobId: '2',
      //     jobTitle: 'Backend Developer',
      //     source: 'Naukri',
      //     status: 'applied',
      //     currentStage: 'Application Review',
      //     appliedAt: '2023-03-05T14:30:00Z'
      //   }
      // ];
      // localStorage.setItem('candidates', JSON.stringify(mockCandidates));
      const mockCandidates = [
        {
          id: '1',
          name: 'Rohit Sharma',
          email: 'rohit.sharma@example.com',
          phone: '9876543210',
          resume: 'rohit_sharma_resume.pdf',
          jobId: '1',
          jobTitle: 'Frontend Developer',
          source: 'LinkedIn',
          status: 'Interview',
          currentStage: 'Technical Interview',
          appliedAt: '2025-01-15T10:00:00Z'
        },
        {
          id: '2',
          name: 'Ananya Iyer',
          email: 'ananya.iyer@example.com',
          phone: '8765432109',
          resume: 'ananya_iyer_resume.pdf',
          jobId: '2',
          jobTitle: 'Backend Developer',
          source: 'Naukri',
          status: 'Applied',
          currentStage: 'Application Review',
          appliedAt: '2025-01-28T12:30:00Z'
        },
        {
          id: '3',
          name: 'Vikram Mehta',
          email: 'vikram.mehta@example.com',
          phone: '9123456780',
          resume: 'vikram_mehta_resume.pdf',
          jobId: '3',
          jobTitle: 'UI/UX Designer',
          source: 'Indeed',
          status: 'Interview',
          currentStage: 'Portfolio Review',
          appliedAt: '2025-02-10T09:00:00Z'
        },
        {
          id: '4',
          name: 'Priya Nair',
          email: 'priya.nair@example.com',
          phone: '9988776655',
          resume: 'priya_nair_resume.pdf',
          jobId: '4',
          jobTitle: 'Data Analyst',
          source: 'Referral',
          status: 'Applied',
          currentStage: 'Application Review',
          appliedAt: '2025-03-04T11:45:00Z'
        }
      ];
      localStorage.setItem('candidates', JSON.stringify(mockCandidates));
    }
  
    if (!localStorage.getItem('interviews') || JSON.parse(localStorage.getItem('interviews')).length === 0) {
      // const mockInterviews = [
      //   {
      //     id: '1',
      //     candidateId: '1',
      //     candidateName: 'John Doe',
      //     jobId: '1',
      //     jobTitle: 'Frontend Developer',
      //     interviewer: 'Sarah Johnson',
      //     interviewType: 'Technical',
      //     scheduledDate: '2023-03-15T14:00:00Z',
      //     status: 'scheduled',
      //     feedback: '',
      //     createdAt: '2023-03-10T09:00:00Z'
      //   }
      // ];
      // localStorage.setItem('interviews', JSON.stringify(mockInterviews));
      const mockInterviews = [
        {
          id: '1',
          candidateId: '1',
          candidateName: 'Rohit Sharma',
          jobId: '1',
          jobTitle: 'Frontend Developer',
          interviewer: 'Meera Desai',
          interviewType: 'Technical',
          scheduledDate: '2025-01-20T14:00:00Z',
          status: 'Scheduled',
          feedback: '',
          createdAt: '2025-01-17T09:00:00Z'
        },
        {
          id: '2',
          candidateId: '3',
          candidateName: 'Vikram Mehta',
          jobId: '3',
          jobTitle: 'UI/UX Designer',
          interviewer: 'Karan Sinha',
          interviewType: 'Portfolio Review',
          scheduledDate: '2025-02-12T16:00:00Z',
          status: 'Scheduled',
          feedback: '',
          createdAt: '2025-02-10T10:00:00Z'
        }
      ];
      localStorage.setItem('interviews', JSON.stringify(mockInterviews));
    }
  
    if (!localStorage.getItem('offers') || JSON.parse(localStorage.getItem('offers')).length === 0) {
      const mockOffers = [];
      localStorage.setItem('offers', JSON.stringify(mockOffers));
    }
  };
