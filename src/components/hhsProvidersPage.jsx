import React from "react";
import { useParams, Link } from "react-router-dom";
import providersData from "../../data/hhsProviders.json";
import { EmailShareButton, EmailIcon } from "react-share";
import ArkansasHeader from "./ArkansasHeader";
import "./styles/hhsProvidersPage.css";

const HhsProviderPage = () => {
  const { providerId } = useParams();
  
  // Convert providerId to string for comparison since IDs in JSON might be strings
  const provider = providersData.hhsProviders.find(
    (p) => p.id.toString() === providerId
  );

  // Debug logging
  console.log("Provider ID from URL:", providerId);
  console.log("All providers:", providersData.hhsProviders);
  console.log("Found provider:", provider);

  if (!provider) {
    return (
      <>
        <ArkansasHeader />
        <div className="provider-not-found">
          <h2>Provider not found.</h2>
          <Link to="/hhsproviders">Return to Providers List</Link>
        </div>
      </>
    );
  }

  const shareUrl = `${window.location.origin}/hhsproviderspage/${provider.id}`;

  // Function to create Google Maps link based on address
  const createGoogleMapsLink = (provider) => {
    const { name } = provider;
    const { street, city, state, zip } = provider.address;
    const query = encodeURIComponent(
      `${name}, ${street}, ${city}, ${state} ${zip}`
    );
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  // Function to create the embed link for Google Maps iframe
  const createGoogleMapsEmbedLink = (provider) => {
    const { street, city, state, zip } = provider.address;
    const query = encodeURIComponent(`${street}, ${city}, ${state}, ${zip}`);
    return `https://www.google.com/maps/embed/v1/place?key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`;
  };

  return (
    <>
      <ArkansasHeader />
      <div className="hhs-provider-page">
        <div className="provider-details">
          <h1>{provider.name}</h1>
          <p>
            <strong>Type:</strong> {provider.type}
          </p>
          <p>
            <strong>Services:</strong> {provider.services.join(", ")}
          </p>
          <p>
            <strong>Email:</strong> {provider.email || "N/A"}
          </p>
          <p>
            <strong>Website:</strong> {provider.website || "N/A"}
          </p>
          <p>
            <strong>Phone:</strong> {provider.phone || "N/A"}
          </p>
          <p>
            <strong>Address:</strong> {provider.address.street},{" "}
            {provider.address.city}, {provider.address.state},{" "}
            {provider.address.zip}
          </p>
          <p>
            <strong>County:</strong> {provider.county || "N/A"}
          </p>
          <p>
            <strong>Eligibility Criteria:</strong>{" "}
            {provider.eligibilityCriteria || "N/A"}
          </p>
          <p>
            <strong>Hours:</strong> {provider.hours || "N/A"}
          </p>
          <p>
            <strong>Description:</strong> {provider.description}
          </p>
          <p>
            <strong>Tags:</strong> {provider.tags.join(", ")}
          </p>

          <div className="provider-button-group">
            <EmailShareButton
              url={shareUrl}
              subject={`Provider Information: ${provider.name}`}
              body={`Check out this provider:\n\nProvider Name: ${provider.name}
              Type: ${provider.type}
Services: ${provider.services.join(", ")}
Email: ${provider.email || "N/A"}
Website: ${provider.website || "N/A"}
Phone: ${provider.phone || "N/A"}
Address: ${provider.address.street}, ${provider.address.city}, ${
                provider.address.state
              }, ${provider.address.zip}
County: ${provider.county || "N/A"}
Eligibility Criteria: ${provider.eligibilityCriteria || "N/A"}
Hours: ${provider.hours || "N/A"}
Description: ${provider.description}
Tags: ${provider.tags.join(", ")}

More info: ${shareUrl}`}
            >
              <EmailIcon size={32} round />
            </EmailShareButton>

            <div className="back-link">
              <Link to="/hhsproviders">Back to Providers List</Link>
            </div>
          </div>
        </div>

        <div className="provider-map-container">
          {provider.address.city && provider.address.state ? (
            <iframe
              title="Provider Location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={createGoogleMapsEmbedLink(provider)}
            />
          ) : (
            <p className="no-map-available">
              Location data not available for mapping.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default HhsProviderPage;
