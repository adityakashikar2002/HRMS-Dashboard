import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OfferCard from '../components/offers/OfferCard';
import OfferForm from '../components/offers/OfferForm';
import { getOffers, addOffer, updateOffer, deleteOffer, getCandidates, getJobs } from '../utils/storage';
import '../assets/styles/Offers.css';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentOffer, setCurrentOffer] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const loadedOffers = getOffers();
    setOffers(loadedOffers);
    const loadedCandidates = getCandidates();
    setCandidates(loadedCandidates);
    const loadedJobs = getJobs();
    setJobs(loadedJobs);
  }, []);

  const handleAddOffer = () => {
    setCurrentOffer(null);
    setShowForm(true);
  };

  const handleEditOffer = (offer) => {
    setCurrentOffer(offer);
    setShowForm(true);
  };

  const handleDeleteOffer = (id) => {
    deleteOffer(id);
    setOffers(getOffers());
  };

  const handleSubmit = (offerData) => {
    if (currentOffer) {
      updateOffer(currentOffer.id, offerData);
    } else {
      addOffer(offerData);
    }
    setOffers(getOffers());
    setShowForm(false);
  };

  const filteredOffers = offers.filter(offer => {
    if (filter === 'all') return true;
    return offer.status === filter;
  });

  return (
    <div className="offers-page">
      <div className="offers-header">
        <h1>Offers</h1>
        <div className="offers-actions">
          <div className="filter-buttons">
            <button 
              className={filter === 'all' ? 'active' : ''} 
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={filter === 'pending' ? 'active' : ''} 
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>
            <button 
              className={filter === 'accepted' ? 'active' : ''} 
              onClick={() => setFilter('accepted')}
            >
              Accepted
            </button>
            <button 
              className={filter === 'rejected' ? 'active' : ''} 
              onClick={() => setFilter('rejected')}
            >
              Rejected
            </button>
          </div>
          <button className="add-offer-button" onClick={handleAddOffer}>
            + Create Offer
          </button>
        </div>
      </div>

      {showForm && (
        <OfferForm 
          offer={currentOffer} 
          candidates={candidates}
          jobs={jobs}
          onSubmit={handleSubmit} 
          onCancel={() => setShowForm(false)} 
        />
      )}

      <div className="offers-grid">
        {filteredOffers.length > 0 ? (
          filteredOffers.map(offer => (
            <OfferCard 
              key={offer.id} 
              offer={offer} 
              onEdit={handleEditOffer} 
              onDelete={handleDeleteOffer} 
            />
          ))
        ) : (
          <div className="no-offers">No offers found</div>
        )}
      </div>
    </div>
  );
};

export default Offers;