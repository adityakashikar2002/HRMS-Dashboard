export const mockInboxEmails = [
  {
    id: 1,
    sender: 'John Doe',
    senderInitials: 'JD',
    subject: 'Weekly Team Meeting',
    preview: 'Reminder about our weekly sync tomorrow at 10 AM',
    time: '10:30 AM',
    date: new Date().toISOString(),
    label: 'Business',
    isFavorite: false,
    isRead: false,
    isSpam: false,
    isTrash: false,
    isArchived: false,
    isSent: false,
    isDraft: false,
    fromMe: false,
    body: 'Hi team,\n\nJust a reminder about our meeting...',
    hasAttachment: true
  },
  // Add more inbox emails...
];

export const mockSentEmails = [
  {
    id: 101,
    sender: 'Me',
    senderInitials: 'ME',
    subject: 'Project Update',
    preview: 'Here are the updates on our current project',
    time: 'Yesterday',
    date: new Date(Date.now() - 86400000).toISOString(),
    label: 'Team',
    isFavorite: false,
    isRead: true,
    isSpam: false,
    isTrash: false,
    isArchived: false,
    isSent: true,
    isDraft: false,
    fromMe: true,
    body: 'Hello team,\n\nHere are the updates...',
    hasAttachment: false
  },
  // Add more sent emails...
];

export const mockDrafts = [
  {
    id: 201,
    sender: 'Me',
    senderInitials: 'ME',
    to: 'team@company.com',
    subject: 'Draft: Project Timeline',
    body: 'Hi team,\n\nI wanted to share an update...',
    label: 'Business',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    date: new Date().toISOString(),
    isDraft: true,
    isFavorite: false,
    isRead: true,
    isSpam: false,
    isTrash: false,
    isArchived: false,
    isSent: false,
    fromMe: true,
    hasAttachment: false,
    preview: 'Hi team, I wanted to share an update...'
  },
  // Add more drafts...
];