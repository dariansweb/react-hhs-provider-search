// components/providers/ProvidersList.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProviderFilters from './ProviderFilters';
import ProviderCard from './ProviderCard';
import AddProviderModal from '../modals/AddProviderModal';
import HelpModal from '../modals/HelpModal';
import ArkansasHeader from '../../ArkansasHeader';
import { customStyles } from '../constants/SelectStyles';
import hhsProvidersData from '../../../data/hhsProviders.json';

const ProvidersList = () => {
  const navigate = useNavigate();
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [expandedProvider, setExpandedProvider] = useState(null);
  const [showAddProviderModal, setShowAddProviderModal] = useState(false);
  const [showTypes, setShowTypes] = useState(false);
  const [nameDescriptionFilter, setNameDescriptionFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [countyFilter, setCountyFilter] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  // Create options from the JSON data
  const options = {
    uniqueName: hhsProvidersData.hhsProviders
      .map(provider => ({
        value: provider.name,
        label: provider.name
      }))
      .sort((a, b) => a.label.localeCompare(b.label)),

    uniqueCity: [...new Set(hhsProvidersData.hhsProviders
      .map(provider => provider.address.city))]
      .map(city => ({
        value: city,
        label: city
      }))
      .sort((a, b) => a.label.localeCompare(b.label)),

    uniqueCounty: [...new Set(hhsProvidersData.hhsProviders
      .map(provider => provider.county))]
      .map(county => ({
        value: county,
        label: county
      }))
      .sort((a, b) => a.label.localeCompare(b.label)),

    uniqueTags: [...new Set(hhsProvidersData.hhsProviders
      .flatMap(provider => provider.tags))]
      .map(tag => ({
        value: tag,
        label: tag
      }))
      .sort((a, b) => a.label.localeCompare(b.label))
  };

  // Filter providers based on selected filters
  const filteredProviders = hhsProvidersData.hhsProviders.filter(provider => {
    const matchesNameDescription = nameDescriptionFilter === "" ||
      provider.name.toLowerCase().includes(nameDescriptionFilter.toLowerCase()) ||
      provider.description.toLowerCase().includes(nameDescriptionFilter.toLowerCase()) ||
      provider.address.city.toLowerCase().includes(nameDescriptionFilter.toLowerCase()) ||
      provider.county.toLowerCase().includes(nameDescriptionFilter.toLowerCase()) ||
      (provider.tags && provider.tags.some(tag => 
        tag.toLowerCase().includes(nameDescriptionFilter.toLowerCase()))) ||
      (provider.services && provider.services.some(service => 
        service.toLowerCase().includes(nameDescriptionFilter.toLowerCase())));

    const matchesName = !nameFilter || 
      (Array.isArray(nameFilter) ? 
        nameFilter.some(n => n.value === provider.name) : 
        nameFilter.value === provider.name);

    const matchesCity = !cityFilter || 
      (Array.isArray(cityFilter) ? 
        cityFilter.some(c => c.value === provider.address.city) : 
        cityFilter.value === provider.address.city);

    const matchesCounty = !countyFilter || 
      (Array.isArray(countyFilter) ? 
        countyFilter.some(c => c.value === provider.county) : 
        countyFilter.value === provider.county);

    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => 
        provider.tags && provider.tags.includes(tag.value));

    const matchesTypes = selectedTypes.length === 0 || 
      selectedTypes.some(type => 
        provider.type === type.value);

    return matchesNameDescription && 
           matchesName && 
           matchesCity && 
           matchesCounty && 
           matchesTags && 
           matchesTypes;
  });

  // Handler functions
  const handlers = {
    handleNameDescriptionFilterChange: (e) => {
      setNameDescriptionFilter(e.target.value);
    },
    handleNameChange: (selected) => {
      setNameFilter(selected);
    },
    handleCityChange: (selected) => {
      setCityFilter(selected);
    },
    handleCountyChange: (selected) => {
      setCountyFilter(selected);
    },
    handleTagsChange: (selected) => {
      setSelectedTags(selected || []);
    },
    handleTypesChange: (selected) => {
      setSelectedTypes(selected || []);
    }
  };

  const clearAllFilters = () => {
    setNameDescriptionFilter("");
    setNameFilter("");
    setCityFilter("");
    setCountyFilter("");
    setSelectedTags([]);
    setSelectedTypes([]);
  };

  const handleDetailsClick = (providerId) => {
    navigate(`/hhsproviderspage/${providerId}`);
  };

  const toggleShowMore = (providerId) => {
    setExpandedProvider(prev => prev === providerId ? null : providerId);
  };

  const emailProvider = (provider) => {
    const subject = encodeURIComponent(`Information about ${provider.name}`);
    const body = encodeURIComponent(
      `Provider Name: ${provider.name}\n` +
      `Address: ${provider.address.street}, ${provider.address.city}, ${provider.address.state} ${provider.address.zip}\n` +
      `Phone: ${provider.phone}\n` +
      `Email: ${provider.email}\n` +
      `Services: ${provider.services.join(', ')}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <ArkansasHeader />
      <HelpModal
        isOpen={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
      />

      <div className="arkansas-providers-container">
        <h4 className="arkansas-providers-title">
          {`Providers ${filteredProviders.length > 0 ? `(${filteredProviders.length})` : ''}`}
        </h4>
        
        <ProviderFilters
          filters={{
            nameDescriptionFilter,
            nameFilter,
            cityFilter,
            countyFilter,
            selectedTags,
            selectedTypes
          }}
          handlers={handlers}
          options={options}
          customStyles={customStyles}
          showTypes={showTypes}
          setShowTypes={setShowTypes}
          clearAllFilters={clearAllFilters}
        />

        <div className="arkansas-providers-card-list">
          {filteredProviders.map(provider => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              expandedProvider={expandedProvider}
              toggleShowMore={toggleShowMore}
              handleDetailsClick={handleDetailsClick}
              emailProvider={emailProvider}
            />
          ))}
        </div>

        {showAddProviderModal && (
          <AddProviderModal
            onClose={() => setShowAddProviderModal(false)}
          />
        )}
      </div>
    </>
  );
};

export default ProvidersList;
