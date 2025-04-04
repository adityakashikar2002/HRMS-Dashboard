export const generateRecurringEvents = () => {
  const recurringEvents = [];
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 1); // 1 month back
  const endDate = new Date();
  endDate.setFullYear(endDate.getFullYear() + 1); // 1 year forward

  // Generate Morning Scrums (Mon-Fri)
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    if (d.getDay() >= 1 && d.getDay() <= 5) {
      const morningDate = new Date(d);
      recurringEvents.push({
        id: `morning-${morningDate.toISOString().split('T')[0]}`,
        title: 'Intern Morning Scrum',
        description: 'Daily standup meeting',
        start: new Date(morningDate.setHours(9, 30, 0, 0)),
        end: new Date(morningDate.setHours(10, 0, 0, 0)),
        color: '#3b82f6',
        isRecurring: true,
        originalId: 'morning-scrum'
      });
    }
  }

  // Generate Evening Scrums (Mon-Fri)
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    if (d.getDay() >= 1 && d.getDay() <= 5) {
      const eveningDate = new Date(d);
      recurringEvents.push({
        id: `evening-${eveningDate.toISOString().split('T')[0]}`,
        title: 'Intern Evening Scrum',
        description: 'End-of-day sync',
        start: new Date(eveningDate.setHours(18, 30, 0, 0)),
        end: new Date(eveningDate.setHours(19, 0, 0, 0)),
        color: '#3b82f6',
        isRecurring: true,
        originalId: 'evening-scrum'
      });
    }
  }

  return recurringEvents;
};

export const mockEvents = [
  // ...generateRecurringEvents(),
    // {
    //   id: 1,
    //   title: 'Team Meeting',
    //   description: 'Weekly team sync',
    //   start: new Date(2025, 3, 1, 10, 0),
    //   end: new Date(2025, 3, 1, 11, 0),
    //   color: '#3b82f6'
    // },
    {
      id: 1,
      title: 'Lunch with Client',
      description: 'Discuss project requirements',
      start: new Date(2025, 3, 2, 12, 0),
      end: new Date(2025, 3, 2, 13, 30),
      color: '#10b981'
    },
    {
      id: 2,
      title: 'Code Review',
      description: 'Review pull requests',
      start: new Date(2025, 3, 3, 14, 0),
      end: new Date(2025, 3, 3, 15, 0),
      color: '#8b5cf6'
    },
    // {
    //   id: 4,
    //   title: 'Intern Morning Scrum',
    //   description: 'Daily standup with interns',
    //   start: new Date(2025, 3, 4, 9, 30),
    //   end: new Date(2025, 3, 4, 10, 0),
    //   color: '#3b82f6'
    // },
    {
      id: 3,
      title: 'Project Deadline',
      description: 'Submit final deliverables',
      start: new Date(2025, 3, 5, 17, 0),
      end: new Date(2025, 3, 5, 18, 0),
      color: '#ef4444'
    },
    {
      id: 4,
      title: 'Interview',
      description: 'Candidate for frontend position',
      start: new Date(2025, 3, 8, 15, 0),
      end: new Date(2025, 3, 8, 16, 0),
      color: '#f59e0b'
    }
  ];