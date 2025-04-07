import { mockTeams } from './mockTeams';

export const mockProjects = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'Build a new e-commerce platform with modern features',
    startDate: '2023-04-01',
    endDate: '2023-08-31',
    status: 'In Progress',
    priority: 'High',
    teams: [mockTeams[0]], 
    members: [],
    attachments: [],
    requirements: [
      'Responsive design',
      'Payment gateway integration',
      'User dashboard'
    ],
    progress: 45,
    budget: 50000,
    spent: 22500
  },
  {
    id: '2',
    name: 'Mobile App Redesign',
    description: 'Redesign the existing mobile application',
    startDate: '2023-05-15',
    endDate: '2023-07-30',
    status: 'Planning',
    priority: 'Medium',
    teams: [mockTeams[1], mockTeams[2]],
    members: [],
    attachments: [],
    requirements: [
      'New UI components',
      'Improved navigation',
      'Dark mode support'
    ],
    progress: 15,
    budget: 25000,
    spent: 3750
  },
  {
    id: '3',
    name: 'Internal Dashboard',
    description: 'Create analytics dashboard for internal use',
    startDate: '2023-06-01',
    endDate: '2023-09-15',
    status: 'Not Started',
    priority: 'Low',
    teams: [mockTeams[0], mockTeams[2]],
    members: [],
    attachments: [],
    requirements: [
      'Data visualization',
      'Export functionality',
      'Role-based access'
    ],
    progress: 0,
    budget: 15000,
    spent: 0
  }
];