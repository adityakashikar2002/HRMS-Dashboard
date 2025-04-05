// src/utils/mockTasks.js
import { v4 as uuidv4 } from 'uuid';

const PRIORITIES = ['low', 'medium', 'high'];
const STATUSES = ['todo', 'inProgress', 'completed'];
const ASSIGNEES = [
  { name: 'John Doe', email: 'john@example.com' },
  { name: 'Jane Smith', email: 'jane@example.com' },
  { name: 'Mike Johnson', email: 'mike@example.com' },
  { name: 'Sarah Williams', email: 'sarah@example.com' }
];

const TASK_TITLES = [
  'Complete project documentation',
  'Fix authentication bug',
  'Design new dashboard UI',
  'Implement API endpoints',
  'Write unit tests',
  'Optimize database queries',
  'Review pull requests',
  'Update dependencies',
  'Create user onboarding flow',
  'Analyze performance metrics'
];

const generateRandomDate = (start, end) => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
};

const generateRandomTime = () => {
  const hours = Math.floor(Math.random() * 24).toString().padStart(2, '0');
  const minutes = Math.floor(Math.random() * 60).toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const generateMockTasks = (count = 10) => {
  const tasks = [];
  const now = new Date();
  const futureDate = new Date();
  futureDate.setMonth(now.getMonth() + 1);

  for (let i = 0; i < count; i++) {
    const assignee = ASSIGNEES[Math.floor(Math.random() * ASSIGNEES.length)];
    const assigner = ASSIGNEES[Math.floor(Math.random() * ASSIGNEES.length)];
    const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
    const dateAssigned = generateRandomDate(new Date(2023, 0, 1), now);
    const deadlineDate = generateRandomDate(now, futureDate);

    tasks.push({
      id: uuidv4(),
      title: TASK_TITLES[Math.floor(Math.random() * TASK_TITLES.length)],
      description: `This is a detailed description for ${TASK_TITLES[i % TASK_TITLES.length].toLowerCase()}.`,
      status,
      priority: PRIORITIES[Math.floor(Math.random() * PRIORITIES.length)],
      dateAssigned,
      deadlineDate,
      deadlineTime: generateRandomTime(),
      assigneeName: assignee.name,
      assigneeEmail: assignee.email,
      assignerName: assigner.name,
      assignerEmail: assigner.email,
      createdAt: new Date(dateAssigned).toISOString(),
      attachments: Math.random() > 0.7 ? [
        {
          name: 'document.pdf',
          size: Math.floor(Math.random() * 5000) + 1000,
          type: 'application/pdf',
          url: '#'
        }
      ] : []
    });
  }

  return tasks;
};

export const initialMockTasks = {
  todo: generateMockTasks(4).map(task => ({ ...task, status: 'todo' })),
  inProgress: generateMockTasks(3).map(task => ({ ...task, status: 'inProgress' })),
  completed: generateMockTasks(3).map(task => ({ ...task, status: 'completed' }))
};