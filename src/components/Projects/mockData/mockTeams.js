import { mockMembers } from './mockMembers';

export const mockTeams = [
  {
    id: '1',
    name: 'Frontend Team',
    description: 'Responsible for all frontend development',
    members: [mockMembers[0], mockMembers[1]],
    createdAt: '2023-01-15'
  },
  {
    id: '2',
    name: 'Design Team',
    description: 'UI/UX design and prototyping',
    members: [mockMembers[2]],
    createdAt: '2023-02-20'
  },
  {
    id: '3',
    name: 'Backend Team',
    description: 'Server-side development and APIs',
    members: [mockMembers[1], mockMembers[4]],
    createdAt: '2023-03-10'
  },
  {
    id: '4',
    name: 'QA Team',
    description: 'Handles testing and quality assurance',
    members: [mockMembers[4], mockMembers[0]],
    createdAt: '2023-04-05'
  },
  {
    id: '5',
    name: 'Project Management',
    description: 'Oversees project timelines and deliveries',
    members: [mockMembers[3]],
    createdAt: '2023-05-01'
  },
  {
    id: '6',
    name: 'DevOps Team',
    description: 'Deployment, CI/CD pipelines and infra',
    members: [mockMembers[1], mockMembers[2]],
    createdAt: '2023-05-22'
  },
  {
    id: '7',
    name: 'Mobile Development Team',
    description: 'Focuses on Android and iOS app development',
    members: [mockMembers[0], mockMembers[3]],
    createdAt: '2023-06-10'
  },
  {
    id: '8',
    name: 'Content Team',
    description: 'Creates and manages website content',
    members: [mockMembers[2]],
    createdAt: '2023-06-25'
  },
  {
    id: '9',
    name: 'Security Team',
    description: 'Handles system security and audits',
    members: [mockMembers[4]],
    createdAt: '2023-07-15'
  },
  {
    id: '10',
    name: 'Support Team',
    description: 'Customer support and troubleshooting',
    members: [mockMembers[1], mockMembers[0]],
    createdAt: '2023-08-01'
  }
];
