import React from "react";
import "./styles/hhsProvidersModalHelp.css"; // Update styles with the new prefixed classnames

const hhsProvidersModalHelp = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="hhsProviders-help-modal-overlay">
      <div className="hhsProviders-help-modal-container">
        <button
          className="hhsProviders-help-modal-close-button"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="hhsProviders-help-modal-title">Help & Instructions</h2>
        <div className="hhsProviders-help-modal-content">
          <h3>1. Filtering Providers</h3>
          <p>
            Use the input fields and dropdown menus to filter providers based
            on:
          </p>
          <ul>
            <li>
              <strong>Name:</strong> Search providers by their names using the
              name filter.
            </li>
            <li>
              <strong>City:</strong> Select one or more cities to narrow down
              providers operating in those locations.
            </li>
            <li>
              <strong>County:</strong> Filter providers by their county.
            </li>
            <li>
              <strong>Tags:</strong> Use the tag filter to find providers with
              specific attributes or services.
            </li>
            <li>
              <strong>Type:</strong> Click the "Types" button to display all
              available provider types and select the ones you want to include
              in your search.
            </li>
          </ul>

          <h3>2. Clearing Filters</h3>
          <p>
            Click the <strong>Clear</strong> button to reset all filters and
            view the full list of providers.
          </p>

          <h3>3. Viewing Provider Details</h3>
          <p>
            Each provider is displayed in a card format. Click the
            <strong>More</strong> button on a card to see additional details
            like:
          </p>
          <ul>
            <li>Organization</li>
            <li>Contact Person</li>
            <li>Eligibility Criteria</li>
            <li>Tags and more</li>
          </ul>

          <h3>4. Sharing Provider Details</h3>
          <p>
            Use the <strong>Email</strong> button to send provider details via
            email. You can also click the <strong>Share</strong> button to
            access a shareable link.
          </p>

          <h3>5. Adding a New Provider</h3>
          <p>To add a new provider:</p>
          <ul>
            <li>
              Click the <strong>Add</strong> button.
            </li>
            <li>
              Fill out the form with details like name, address, services, etc.
            </li>
            <li>
              Click <strong>Generate JSON</strong> to create the provider's
              data.
            </li>
          </ul>
          <p>
            The generated JSON can be copied to your clipboard and sent to the
            appropriate contact for integration.
          </p>

          <h3>6. Navigating to Provider Pages</h3>
          <p>
            Click on a provider's name in their card to navigate to their
            detailed page.
          </p>

          <h3>7. Sorting Providers</h3>
          <p>
            Providers are sorted alphabetically by name. Adjust your filters to
            refine the order further.
          </p>

          <h3>8. Accessibility Features</h3>
          <p>
            The interface is designed with accessibility in mind, including
            keyboard navigation and focus indicators.
          </p>
        </div>
      </div>
    </div>
  );
};

export default hhsProvidersModalHelp;
