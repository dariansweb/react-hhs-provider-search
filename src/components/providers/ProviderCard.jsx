// components/providers/ProviderCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// import { EmailShareButton, EmailIcon } from 'react-share';

const ProviderCard = ({
  provider,
  expandedProvider,
  toggleShowMore,
  handleDetailsClick,
  emailProvider,
  baseUrl,
}) => {
  return (
    <div className="arkansas-providers-card">
      <h3 className="arkansas-providers-card-title">
        <Link to={`/hhsproviderspage/${provider.id}`}>
          {provider.name}
        </Link>
      </h3>
      
      {/* Basic provider information */}
      <div className="arkansas-providers-basic-info">
        <p className="arkansas-providers-id">
          <strong>ID:</strong> {provider.id}
        </p>
        <p className="arkansas-providers-type">
          <strong>Type:</strong> {provider.type}
        </p>
        {/* Add other basic information */}
      </div>

      {/* Expanded information */}
      {expandedProvider === provider.id && (
        <div className="arkansas-providers-expanded-info">
          {/* Add expanded information */}
        </div>
      )}

      {/* Action buttons */}
      <div className="arkansas-providers-card-buttons">
        <button onClick={() => toggleShowMore(provider.id)}>
          {expandedProvider === provider.id ? "Less" : "More"}
        </button>
        <button onClick={() => handleDetailsClick(provider.id)}>
          Map
        </button>
        <button onClick={() => emailProvider(provider)}>Email</button>
      </div>
    </div>
  );
};

export default ProviderCard;
