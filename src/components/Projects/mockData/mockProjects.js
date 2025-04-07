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
  },
  {
    id: '4',
    name: 'Website Performance Optimization',
    description: 'Improve overall loading speed and core web vitals',
    startDate: '2023-07-01',
    endDate: '2023-08-15',
    status: 'Completed',
    priority: 'Medium',
    teams: [mockTeams[1]],
    members: [],
    attachments: [],
    requirements: [
      'Lazy loading',
      'Image compression',
      'Reduce JS bundle size'
    ],
    progress: 100,
    budget: 10000,
    spent: 9500
  },
  {
    id: '5',
    name: 'Chatbot Integration',
    description: 'Add AI-powered chatbot for customer support',
    startDate: '2023-09-01',
    endDate: '2023-10-31',
    status: 'In Progress',
    priority: 'High',
    teams: [mockTeams[3]],
    members: [],
    attachments: [],
    requirements: [
      'Natural language processing',
      '24/7 availability',
      'Live agent fallback'
    ],
    progress: 35,
    budget: 30000,
    spent: 12000
  },
  {
    id: '6',
    name: 'CRM Migration',
    description: 'Migrate CRM system to a cloud-based platform',
    startDate: '2023-06-15',
    endDate: '2023-10-01',
    status: 'In Progress',
    priority: 'High',
    teams: [mockTeams[2], mockTeams[4]],
    members: [],
    attachments: [],
    requirements: [
      'Data import/export',
      'User training',
      'Role permissions'
    ],
    progress: 60,
    budget: 40000,
    spent: 27500
  },
  {
    id: '7',
    name: 'Security Audit',
    description: 'Conduct comprehensive security audit and apply fixes',
    startDate: '2023-08-01',
    endDate: '2023-09-30',
    status: 'Completed',
    priority: 'High',
    teams: [mockTeams[4]],
    members: [],
    attachments: [],
    requirements: [
      'Vulnerability scan',
      'Penetration testing',
      'Security patching'
    ],
    progress: 100,
    budget: 20000,
    spent: 19500
  },
  {
    id: '8',
    name: 'Blog System Revamp',
    description: 'Update the blog CMS with better SEO and editor',
    startDate: '2023-03-01',
    endDate: '2023-06-30',
    status: 'Completed',
    priority: 'Low',
    teams: [mockTeams[0], mockTeams[1]],
    members: [],
    attachments: [],
    requirements: [
      'Markdown support',
      'Image uploader',
      'SEO meta editing'
    ],
    progress: 100,
    budget: 12000,
    spent: 11000
  },
  {
    id: '9',
    name: 'Employee Onboarding Portal',
    description: 'Build a portal for new employee orientation and resources',
    startDate: '2023-07-15',
    endDate: '2023-11-01',
    status: 'In Progress',
    priority: 'Medium',
    teams: [mockTeams[3], mockTeams[2]],
    members: [],
    attachments: [],
    requirements: [
      'HR policy upload',
      'Document signing',
      'Training modules'
    ],
    progress: 50,
    budget: 18000,
    spent: 9200
  },
  {
    id: '10',
    name: 'AI Content Generator',
    description: 'Create a tool to auto-generate marketing content',
    startDate: '2023-08-20',
    endDate: '2023-12-15',
    status: 'Planning',
    priority: 'High',
    teams: [mockTeams[5]],
    members: [],
    attachments: [],
    requirements: [
      'OpenAI integration',
      'Keyword-based prompt system',
      'Multi-language support'
    ],
    progress: 10,
    budget: 35000,
    spent: 3000
  }
];
