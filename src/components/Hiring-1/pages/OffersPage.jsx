import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OfferCard from '../components/Offers/OfferCard';
import OfferForm from '../components/Offers/OfferForm';
import TemplateSelector from '../components/Offers/TemplateSelector';
import Button from '../components/common/Button';
import SearchBar from '../components/common/SearchBar';
import { 
  getOffers, 
  addOffer, 
  updateOffer, 
  deleteOffer,
  getCandidates,
  getJobs
} from '../utils/storage';
import '../styles/offers.css';

const OffersPage = () => {
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [currentOffer, setCurrentOffer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const offersData = getOffers();
    setOffers(offersData);
    setFilteredOffers(offersData);
    setCandidates(getCandidates());
    setJobs(getJobs());
  }, []);

  useEffect(() => {
    const filtered = offers.filter(offer => {
      const candidate = candidates.find(c => c.id === offer.candidateId);
      const job = jobs.find(j => j.id === offer.jobId);
      
      return (
        candidate?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredOffers(filtered);
  }, [searchTerm, offers, candidates, jobs]);

  const handleAddOffer = () => {
    setShowTemplateSelector(true);
  };

  const handleTemplateSelect = (type) => {
    setCurrentOffer({ type });
    setShowTemplateSelector(false);
    setShowForm(true);
  };

  const handleEditOffer = (offer) => {
    setCurrentOffer(offer);
    setShowForm(true);
  };

  const handleSubmit = (offerData) => {
    if (currentOffer && currentOffer.id) {
      const updatedOffer = updateOffer({ ...currentOffer, ...offerData });
      setOffers(offers.map(o => o.id === updatedOffer.id ? updatedOffer : o));
    } else {
      const newOffer = addOffer({
        ...offerData,
        status: 'pending',
        createdAt: new Date().toISOString()
      });
      setOffers([...offers, newOffer]);
    }
    setShowForm(false);
  };

  const handleDelete = (id) => {
    deleteOffer(id);
    setOffers(offers.filter(offer => offer.id !== id));
  };

  const viewOfferDetails = (id) => {
    navigate(`/offers/${id}`);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="offers-page">
      <div className="page-header">
        <h1>Offers</h1>
        <div className="page-actions">
          <SearchBar onSearch={handleSearch} placeholder="Search offers..." />
          <Button type="primary" onClick={handleAddOffer}>
            Create Offer
          </Button>
        </div>
      </div>

      {showTemplateSelector && (
        <TemplateSelector 
          onSelect={handleTemplateSelect} 
          onCancel={() => setShowTemplateSelector(false)} 
        />
      )}

      {showForm && (
        <OfferForm 
          offer={currentOffer} 
          candidates={candidates}
          jobs={jobs}
          onSubmit={handleSubmit} 
          onCancel={() => setShowForm(false)} 
        />
      )}

      <div className="offers-list">
        {filteredOffers.length > 0 ? (
          filteredOffers.map(offer => {
            const candidate = candidates.find(c => c.id === offer.candidateId);
            const job = jobs.find(j => j.id === offer.jobId);
            
            return (
              <OfferCard 
                key={offer.id}
                offer={offer}
                candidate={candidate}
                job={job}
                onEdit={() => handleEditOffer(offer)}
                onDelete={() => handleDelete(offer.id)}
                onView={() => viewOfferDetails(offer.id)}
              />
            );
          })
        ) : (
          <div className="no-results">
            No offers found matching your search criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default OffersPage;