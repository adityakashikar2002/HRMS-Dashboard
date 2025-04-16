import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/helpers';
import './OfferCard.css';

const OfferCard = ({ offer, onEdit, onDelete }) => {
  const getStatusColor = () => {
    switch (offer.status) {
      case 'Accepted':
        return '#2ecc71';
      case 'Rejected':
        return '#e74c3c';
      case 'Pending':
        return '#f39c12';
      default:
        return '#3498db';
    }
  };

  return (
    <div className="offer-card">
      <div className="offer-header">
        <h3>{offer.candidateName}</h3>
        <span 
          className="offer-status" 
          style={{ backgroundColor: getStatusColor() }}
        >
          {offer.status}
        </span>
      </div>
      <div className="offer-details">
        <div className="detail-item">
          <span className="label">Job:</span>
          <span className="value">{offer.jobTitle}</span>
        </div>
        <div className="detail-item">
          <span className="label">Offer Type:</span>
          <span className="value">{offer.offerType}</span>
        </div>
        <div className="detail-item">
          <span className="label">Salary:</span>
          <span className="value">Rs. {offer.salary}</span>
        </div>
        <div className="detail-item">
          <span className="label">Created:</span>
          <span className="value">{formatDate(offer.createdAt)}</span>
        </div>
        {offer.onboardingDate && (
          <div className="detail-item">
            <span className="label">Onboarding:</span>
            <span className="value">{formatDate(offer.onboardingDate)}</span>
          </div>
        )}
      </div>
      <div className="offer-actions">
        <Link to={`/hiring/offers/${offer.id}`} className="view-button">
          View Details
        </Link>
        <button className="edit-button" onClick={() => onEdit(offer)}>
          Edit
        </button>
        <button className="delete-button" onClick={() => onDelete(offer.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default OfferCard;