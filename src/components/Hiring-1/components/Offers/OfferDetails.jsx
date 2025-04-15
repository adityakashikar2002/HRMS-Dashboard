import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  getOffer, 
  updateOffer,
  getCandidate,
  getJob
} from '../utils/storage';
import Button from '../components/common/Button';
import PDFGenerator from '../components/common/PDFGenerator';
import '../styles/offers.css';

const OfferDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const offer = getOffer(id);
  const [contentRef] = React.useRef();
  
  if (!offer) {
    return <div>Offer not found</div>;
  }

  const candidate = getCandidate(offer.candidateId);
  const job = getJob(offer.jobId);

  const handleUpdateStatus = (newStatus) => {
    updateOffer({
      ...offer,
      status: newStatus
    });
    navigate('/offers');
  };

  const offerContent = generateOfferContent(
    offer.type, 
    candidate, 
    job,
    offer.onboardingDate ? formatDate(offer.onboardingDate) : '',
    formatDate(new Date(Date.now() + 86400000 * 7)) // 7 days from now
  );

  return (
    <div className="offer-details">
      <div className="details-header">
        <Button type="secondary" onClick={() => navigate(-1)}>
          &larr; Back to Offers
        </Button>
        <h1>
          {offer.type === 'selection' ? 'Job Offer' : 'Rejection Letter'} for {candidate?.name}
        </h1>
      </div>

      <div className="details-content">
        <div className="details-section">
          <h2>Offer Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Candidate:</span>
              <span className="info-value">
                {candidate?.name || 'N/A'}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Job Position:</span>
              <span className="info-value">
                {job?.title || 'N/A'}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Type:</span>
              <span className={`info-value ${offer.type}`}>
                {offer.type}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Status:</span>
              <span className={`info-value ${offer.status}`}>
                {offer.status}
              </span>
            </div>
            {offer.type === 'selection' && offer.onboardingDate && (
              <div className="info-item">
                <span className="info-label">Onboarding Date:</span>
                <span className="info-value">
                  {formatDate(offer.onboardingDate)}
                </span>
              </div>
            )}
            <div className="info-item">
              <span className="info-label">Created At:</span>
              <span className="info-value">
                {formatDate(offer.createdAt)}
              </span>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h2>Offer Content</h2>
          <div className="offer-preview" ref={contentRef}>
            {offerContent}
          </div>
        </div>

        <div className="details-actions">
          {offer.status === 'pending' && (
            <>
              <Button 
                type="success" 
                onClick={() => handleUpdateStatus('accepted')}
              >
                Mark as Accepted
              </Button>
              <Button 
                type="danger" 
                onClick={() => handleUpdateStatus('rejected')}
              >
                Mark as Rejected
              </Button>
            </>
          )}
          <PDFGenerator
            contentRef={contentRef}
            trigger={
              <Button type="primary">
                Download as PDF
              </Button>
            }
          />
          <Button type="secondary" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OfferDetails;