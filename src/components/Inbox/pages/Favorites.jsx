import React, { useState, useEffect } from 'react';
import EmailList from '../components/EmailList';

const Favorites = ({ emails }) => {
  const [favoriteEmails, setFavoriteEmails] = useState([]);

  useEffect(() => {
    const favorites = emails.filter(email => email.isFavorite);
    setFavoriteEmails(favorites);
  }, [emails]);

  return (
    <div className="flex-1 overflow-y-auto">
      <EmailList emails={favoriteEmails} />
    </div>
  );
};

export default Favorites;