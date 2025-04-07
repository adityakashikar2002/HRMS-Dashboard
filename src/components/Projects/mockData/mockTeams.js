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
  }
];