// src/components/Inbox/mockEmails.js
export const mockEmails = [
    {
      id: 1,
      sender: 'John Doe',
      senderInitials: 'JD',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      subject: 'Weekly Team Meeting',
      preview: 'Reminder about our weekly sync tomorrow at 10 AM',
      time: '10:30 AM',
      label: 'Business',
      isFavorite: false,
      isSpam: false,
      isTrash: false,
      body: 'Hi team,\n\nJust a reminder that we have our weekly sync meeting tomorrow at 10 AM in the main conference room. Please bring your updates and blockers.\n\nBest regards,\nJohn',
      hasAttachment: true
    },
    {
      id: 2,
      sender: 'Marketing Team',
      senderInitials: 'MT',
      subject: 'New Campaign Draft',
      preview: 'Please review the attached campaign materials',
      time: 'Yesterday',
      label: 'Team',
      isFavorite: true,
      isSpam: false,
      isTrash: false,
      body: 'Hello,\n\nWe\'ve prepared the draft for our new summer campaign. Please review the attached materials and provide feedback by Friday.\n\nThanks,\nMarketing Team',
      hasAttachment: true
    },
    {
      id: 3,
      sender: 'Amazon',
      senderInitials: 'AM',
      subject: 'Your Order #12345',
      preview: 'Your order has been shipped',
      time: 'Jul 20',
      isFavorite: false,
      isSpam: false,
      isTrash: false,
      body: 'Thank you for your order!\n\nYour package is on its way and should arrive by Friday. Track your shipment using the link below.\n\nOrder details:\n- Item 1: Wireless Headphones\n- Item 2: USB-C Cable',
      hasAttachment: false
    },
    {
      id: 4,
      sender: 'LinkedIn',
      senderInitials: 'LI',
      subject: 'New connection request',
      preview: 'You have 1 new connection request',
      time: 'Jul 19',
      isFavorite: false,
      isSpam: true,
      isTrash: false,
      body: 'You have a new connection request from Sarah Williams.\n\nAccept or ignore this request.',
      hasAttachment: false
    },
    {
      id: 5,
      sender: 'GitHub',
      senderInitials: 'GH',
      subject: 'Pull Request: Feature/login',
      preview: 'New pull request in your repository',
      time: 'Jul 18',
      label: 'Management',
      isFavorite: false,
      isSpam: false,
      isTrash: false,
      body: 'A new pull request has been opened in your repository:\n\nTitle: Add login functionality\nCreated by: dev-user\n\nPlease review the changes and provide feedback.',
      hasAttachment: false
    }
  ];
  
  export const mockDrafts = [
    {
      id: 101,
      to: 'team@company.com',
      subject: 'Project Timeline Update',
      body: 'Hi team,\n\nI wanted to share an update on our project timeline...',
      label: 'Business'
    },
    {
      id: 102,
      to: 'client@example.com',
      subject: 'Proposal Draft',
      body: 'Dear Client,\n\nAttached is the draft proposal for your review...',
      label: 'Management'
    }
  ];