import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOffers } from '../../utils/storage';
import { formatDate } from '../../utils/helpers';
import SelectionTemplate from './SelectionTemplate';
import RejectionTemplate from './RejectionTemplate';
import './OfferDetails.css';

const OfferDetails = () => {
  const { id } = useParams();
  const offers = getOffers();
  const offer = offers.find(o => o.id === id);

  if (!offer) {
    return (
      <div className="offer-details-container">
        <div className="offer-not-found">
          <h2>Offer not found</h2>
          <Link to="/offers" className="back-button">
            Back to Offers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="offer-details-container">
      <div className="offer-header">
        <h2>Offer Details</h2>
        <Link to="/offers" className="back-button">
          Back to Offers
        </Link>
      </div>
      
      <div className="offer-info">
        <div className="info-row">
          <span className="label">Candidate:</span>
          <span className="value">{offer.candidateName}</span>
        </div>
        <div className="info-row">
          <span className="label">Job:</span>
          <span className="value">{offer.jobTitle}</span>
        </div>
        <div className="info-row">
          <span className="label">Offer Type:</span>
          <span className="value">{offer.offerType}</span>
        </div>
        <div className="info-row">
          <span className="label">Status:</span>
          <span className="value" style={{ color: offer.status === 'accepted' ? '#2ecc71' : offer.status === 'rejected' ? '#e74c3c' : '#f39c12' }}>
            {offer.status}
          </span>
        </div>
        {offer.salary && (
          <div className="info-row">
            <span className="label">Salary:</span>
            <span className="value">Rs. {offer.salary}</span>
          </div>
        )}
        {offer.onboardingDate && (
          <div className="info-row">
            <span className="label">Onboarding Date:</span>
            <span className="value">{formatDate(offer.onboardingDate)}</span>
          </div>
        )}
        <div className="info-row">
          <span className="label">Created:</span>
          <span className="value">{formatDate(offer.createdAt)}</span>
        </div>
      </div>
      
      <div className="offer-preview">
        <h3>Preview</h3>
        {offer.offerType === 'selection' ? (
          <SelectionTemplate 
            candidate={{ name: offer.candidateName }}
            job={{ title: offer.jobTitle }}
            salary={offer.salary}
            onboardingDate={offer.onboardingDate}
          />
        ) : (
          <RejectionTemplate 
            candidate={{ name: offer.candidateName }}
            job={{ title: offer.jobTitle }}
          />
        )}
      </div>
    </div>
  );
};

export default OfferDetails;