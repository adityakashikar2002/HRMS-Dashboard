import React from 'react';
import EmailList from '../components/EmailList';

const Sent = () => {
  const [sentEmails, setSentEmails] = useState([]);

  // In a real app, you would fetch sent emails from your backend
  useEffect(() => {
    const mockSentEmails = [
      // Mock sent emails data
    ];
    setSentEmails(mockSentEmails);
  }, []);

  return (
    <div className="flex-1 overflow-y-auto">
      <EmailList emails={sentEmails} />
    </div>
  );
};

export default Sent;