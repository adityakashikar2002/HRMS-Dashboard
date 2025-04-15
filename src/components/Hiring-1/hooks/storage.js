import { v4 as uuidv4 } from 'uuid';
import { mockData } from './mockData';

// Initialize local storage if empty
const initializeStorage = () => {
  if (!localStorage.getItem('hiringDashboard')) {
    localStorage.setItem('hiringDashboard', JSON.stringify(mockData));
  }
};

// Get all data
export const getData = () => {
  initializeStorage();
  return JSON.parse(localStorage.getItem('hiringDashboard'));
};

// Save all data
export const saveData = (data) => {
  localStorage.setItem('hiringDashboard', JSON.stringify(data));
};

// Dashboard specific stats
export const getDashboardStats = () => {
  const data = getData();
  
  const activeJobs = data.jobs.filter(job => job.status === 'active').length;
  const jobOpenings = data.jobs.reduce((sum, job) => sum + job.openings, 0);
  const submissions = data.candidates.length;
  const hired = data.offers.filter(offer => offer.type === 'selection' && offer.status === 'accepted').length;
  const positionsToFill = jobOpenings - hired;
  
  const totalOffers = data.offers.length;
  const acceptedOffers = data.offers.filter(offer => offer.status === 'accepted').length;
  const rejectedOffers = data.offers.filter(offer => offer.status === 'rejected').length;
  const offerAccepted = totalOffers > 0 ? Math.round((acceptedOffers / totalOffers) * 100) : 0;
  const offerRejected = totalOffers > 0 ? Math.round((rejectedOffers / totalOffers) * 100) : 0;
  
  const hiresBySource = {
    LinkedIn: 35,
    Naukari: 28,
    Others: 23
  };
  
  const hiringPipeline = data.jobs.map(job => {
    const jobCandidates = data.candidates.filter(c => c.jobId === job.id);
    const offered = data.offers.filter(o => o.jobId === job.id && o.type === 'selection').length;
    const hired = data.offers.filter(o => o.jobId === job.id && o.type === 'selection' && o.status === 'accepted').length;
    
    return {
      jobTitle: `${job.title} (${job.openings})`,
      submissions: jobCandidates.length,
      shortlisted: jobCandidates.filter(c => c.currentStage !== 'applied').length,
      interview: data.interviews.filter(i => i.jobId === job.id).length,
      offered,
      hired,
      timeToHire: "15 Days" // This would be calculated in a real app
    };
  });
  
  return {
    activeJobs,
    jobOpenings,
    submissions,
    hired,
    positionsToFill,
    offerAccepted,
    offerRejected,
    hiresBySource,
    hiringPipeline,
    todos: data.todos
  };
};

// Job CRUD operations
export const getJobs = () => getData().jobs;

export const getJob = (id) => getData().jobs.find(job => job.id === id);

export const addJob = (job) => {
  const data = getData();
  const newJob = { 
    ...job, 
    id: uuidv4(), 
    createdAt: new Date().toISOString(),
    applicants: 0
  };
  data.jobs.push(newJob);
  saveData(data);
  return newJob;
};

export const updateJob = (job) => {
  const data = getData();
  const updatedJobs = data.jobs.map(j => j.id === job.id ? job : j);
  data.jobs = updatedJobs;
  saveData(data);
  return job;
};

export const deleteJob = (id) => {
  const data = getData();
  data.jobs = data.jobs.filter(job => job.id !== id);
  // Also delete related candidates, interviews, offers
  data.candidates = data.candidates.filter(c => c.jobId !== id);
  data.interviews = data.interviews.filter(i => i.jobId !== id);
  data.offers = data.offers.filter(o => o.jobId !== id);
  saveData(data);
};

// Candidate CRUD operations
export const getCandidates = () => getData().candidates;

export const getCandidate = (id) => getData().candidates.find(candidate => candidate.id === id);

export const addCandidate = (candidate) => {
  const data = getData();
  const newCandidate = { 
    ...candidate, 
    id: uuidv4(),
    status: 'applied',
    currentStage: candidate.referral ? 'hr' : 'technical',
    interviewHistory: [],
    createdAt: new Date().toISOString()
  };
  data.candidates.push(newCandidate);
  
  // Update job applicants count
  data.jobs = data.jobs.map(job => 
    job.id === candidate.jobId 
      ? { ...job, applicants: (job.applicants || 0) + 1 } 
      : job
  );
  
  saveData(data);
  return newCandidate;
};

export const updateCandidate = (candidate) => {
  const data = getData();
  const updatedCandidates = data.candidates.map(c => c.id === candidate.id ? candidate : c);
  data.candidates = updatedCandidates;
  saveData(data);
  return candidate;
};

export const deleteCandidate = (id) => {
  const data = getData();
  const candidate = data.candidates.find(c => c.id === id);
  data.candidates = data.candidates.filter(c => c.id !== id);
  
  // Update job applicants count
  if (candidate) {
    data.jobs = data.jobs.map(job => 
      job.id === candidate.jobId 
        ? { ...job, applicants: Math.max(0, (job.applicants || 0) - 1) } 
        : job
    );
  }
  
  // Delete related interviews and offers
  data.interviews = data.interviews.filter(i => i.candidateId !== id);
  data.offers = data.offers.filter(o => o.candidateId !== id);
  saveData(data);
};

// Interview CRUD operations
export const getInterviews = () => getData().interviews;

export const getInterview = (id) => getData().interviews.find(interview => interview.id === id);

export const addInterview = (interview) => {
  const data = getData();
  const newInterview = { 
    ...interview, 
    id: uuidv4(),
    status: 'scheduled',
    feedback: '',
    createdAt: new Date().toISOString()
  };
  data.interviews.push(newInterview);
  
  // Update candidate stage
  data.candidates = data.candidates.map(c => 
    c.id === interview.candidateId 
      ? { ...c, currentStage: interview.type } 
      : c
  );
  
  saveData(data);
  return newInterview;
};

export const updateInterview = (interview) => {
  const data = getData();
  const updatedInterviews = data.interviews.map(i => i.id === interview.id ? interview : i);
  data.interviews = updatedInterviews;
  
  // Update candidate stage if needed
  if (interview.status === 'completed' && interview.feedback === 'positive') {
    const candidate = data.candidates.find(c => c.id === interview.candidateId);
    if (candidate) {
      let nextStage;
      if (interview.type === 'technical') nextStage = 'technical-advanced';
      else if (interview.type === 'technical-advanced') nextStage = 'hr';
      else if (interview.type === 'hr') nextStage = 'offer';
      
      if (nextStage) {
        data.candidates = data.candidates.map(c => 
          c.id === interview.candidateId 
            ? { ...c, currentStage: nextStage } 
            : c
        );
      }
    }
  }
  
  saveData(data);
  return interview;
};

export const deleteInterview = (id) => {
  const data = getData();
  data.interviews = data.interviews.filter(interview => interview.id !== id);
  saveData(data);
};

// Offer CRUD operations
export const getOffers = () => getData().offers;

export const getOffer = (id) => getData().offers.find(offer => offer.id === id);

export const addOffer = (offer) => {
  const data = getData();
  const newOffer = { 
    ...offer, 
    id: uuidv4(),
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  data.offers.push(newOffer);
  
  // Update candidate status if selection offer
  if (offer.type === 'selection') {
    data.candidates = data.candidates.map(c => 
      c.id === offer.candidateId 
        ? { ...c, status: 'offer-pending' } 
        : c
    );
  }
  
  saveData(data);
  return newOffer;
};

export const updateOffer = (offer) => {
  const data = getData();
  const updatedOffers = data.offers.map(o => o.id === offer.id ? offer : o);
  data.offers = updatedOffers;
  
  // Update candidate status if offer is accepted/rejected
  if (offer.type === 'selection' && offer.status !== 'pending') {
    data.candidates = data.candidates.map(c => 
      c.id === offer.candidateId 
        ? { 
            ...c, 
            status: offer.status === 'accepted' ? 'hired' : 'rejected',
            currentStage: offer.status === 'accepted' ? 'hired' : c.currentStage
          } 
        : c
    );
  }
  
  saveData(data);
  return offer;
};

export const deleteOffer = (id) => {
  const data = getData();
  data.offers = data.offers.filter(offer => offer.id !== id);
  saveData(data);
};

// ToDo CRUD operations
export const addTodo = (todo) => {
  const data = getData();
  const newTodo = { 
    ...todo, 
    id: uuidv4()
  };
  data.todos.push(newTodo);
  saveData(data);
  return newTodo;
};

export const completeTodo = (id) => {
  const data = getData();
  data.todos = data.todos.map(todo => 
    todo.id === id ? { ...todo, completed: true } : todo
  );
  saveData(data);
};

export const deleteTodo = (id) => {
  const data = getData();
  data.todos = data.todos.filter(todo => todo.id !== id);
  saveData(data);
};