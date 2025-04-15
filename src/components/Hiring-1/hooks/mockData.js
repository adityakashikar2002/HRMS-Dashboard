export const mockData = {
    jobs: [
      {
        id: '1',
        title: "Manual Test Engineer",
        description: "Looking for experienced manual tester with 3+ years of experience",
        status: "active",
        openings: 8,
        applicants: 12,
        requirements: "3+ years of manual testing experience, ISTQB certification preferred",
        location: "Bangalore",
        type: "full-time",
        createdAt: "2023-11-15T10:00:00Z"
      },
      {
        id: '2',
        title: "Node JS Developer",
        description: "Senior Node.js developer for backend services",
        status: "active",
        openings: 1,
        applicants: 26,
        requirements: "5+ years of Node.js, Express, MongoDB experience",
        location: "Remote",
        type: "full-time",
        createdAt: "2023-11-10T09:30:00Z"
      },
      // More mock jobs...
    ],
    candidates: [
      {
        id: '101',
        name: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
        resume: "john_doe_resume.pdf",
        status: "applied",
        currentStage: "technical",
        interviewHistory: [],
        jobId: "1",
        referral: false,
        createdAt: "2023-11-20T14:25:00Z"
      },
      // More mock candidates...
    ],
    interviews: [
      {
        id: '1001',
        candidateId: "101",
        jobId: "1",
        interviewer: "Jane Smith",
        type: "technical",
        scheduledAt: "2023-12-19T10:00:00Z",
        status: "scheduled",
        feedback: "",
        createdAt: "2023-11-25T11:20:00Z"
      },
      // More mock interviews...
    ],
    offers: [
      {
        id: '10001',
        candidateId: "101",
        jobId: "1",
        type: "selection",
        status: "pending",
        onboardingDate: "2024-01-15T00:00:00Z",
        createdAt: "2023-12-10T16:45:00Z"
      },
      // More mock offers...
    ],
    todos: [
      {
        id: '100001',
        title: "Laptop Configuration",
        description: "New softwares and basic plugins to install",
        completed: false
      },
      // More mock todos...
    ]
  };