import React from 'react';
import './styles/HelpModal.css';

const HelpModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="help-modal-overlay">
      <div className="help-modal-content">
        <button className="help-modal-close" onClick={onClose}>
          ×
        </button>
        
        <h2>Help Guide</h2>
        
        <div className="help-section">
          <h3>Search and Filter Options</h3>
          <ul>
            <li>
              <strong>Main Search Bar:</strong> Search across provider names, cities, 
              counties, tags, and services
            </li>
            <li>
              <strong>Name Filter:</strong> Search for specific provider names
            </li>
            <li>
              <strong>City Filter:</strong> Filter providers by city location
            </li>
            <li>
              <strong>County Filter:</strong> Filter providers by county
            </li>
            <li>
              <strong>Tags Filter:</strong> Filter by service tags
            </li>
          </ul>
        </div>

        <div className="help-section">
          <h3>Provider Cards</h3>
          <ul>
            <li>
              <strong>More/Less Button:</strong> Expands or collapses additional 
              provider information
            </li>
            <li>
              <strong>Map Button:</strong> Shows provider location on map
            </li>
            <li>
              <strong>Email Button:</strong> Share provider information via email
            </li>
          </ul>
        </div>

        <div className="help-section">
          <h3>Additional Features</h3>
          <ul>
            <li>
              <strong>Clear Button:</strong> Resets all filters
            </li>
            <li>
              <strong>Types Button:</strong> Shows/hides provider type filters
            </li>
            <li>
              <strong>Provider Name Links:</strong> Click to view detailed provider 
              information
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
