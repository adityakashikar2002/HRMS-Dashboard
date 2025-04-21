import React, { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOffers } from '../../utils/storage';
import { formatDate, capitalize } from '../../utils/helpers';
import SelectionTemplate from './SelectionTemplate';
import RejectionTemplate from './RejectionTemplate';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './OfferDetails.css';

const OfferDetails = () => {
  const { id } = useParams();
  const offers = getOffers();
  const offer = offers.find(o => o.id === id);
  const templateRef = useRef();

  const handleDownloadPDF = () => {
    const input = templateRef.current;
    
    html2canvas(input, {
      scale: 2,
      logging: true,
      useCORS: true
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${offer.candidateName}_${offer.offerType === 'selection' ? 'Offer' : 'Rejection'}_Letter.pdf`);
    });
  };

  if (!offer) {
    return (
      <div className="offer-details-container">
        <div className="offer-not-found">
          <h2>Offer not found</h2>
          <Link to="/hiring/offers" className="back-button">
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
        <div>
          <button onClick={handleDownloadPDF} className="download-button">
            Download PDF
          </button>
          <Link to="/hiring/offers" className="back-button">
            Back to Offers
          </Link>
        </div>
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
          {/* <span className="value">{offer.offerType}</span> */}
          <span className="value">{capitalize(offer.offerType)}</span>
        </div>
        <div className="info-row">
          <span className="label">Status:</span>
          <span className="value" style={{ color: offer.status === 'Accepted' ? '#2ecc71' : offer.status === 'Rejected' ? '#e74c3c' : '#f39c12' }}>
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
      
      <div className="offer-preview" ref={templateRef}>
        {offer.offerType === 'selection' ? (
          <SelectionTemplate 
            candidate={{ name: offer.candidateName }}
            job={{ title: offer.jobTitle, type: offer.jobType, location: offer.jobLocation }}
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