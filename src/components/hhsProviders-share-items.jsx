import React, { useState, useEffect } from "react";
import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import ScrollToTopButton from "../../utils/ScrollToTopButton";
import Select, { components } from "react-select";
import hhsProvidersData from "../../data/hhsProviders.json";
import ArkansasHeader from "./ArkansasHeader";
import "./styles/hhsProviders.css";
import "./styles/ArkansasHeader.css";

const CheckboxOption = (props) => {
  return (
    <div
      onClick={() => {
        props.selectOption(props.data); // Ensure standard select behavior
      }}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "8px",
        backgroundColor: props.isFocused ? "#e6f2ff" : "white",
        cursor: "pointer",
      }}
    >
      <input
        type="checkbox"
        checked={props.isSelected}
        onChange={() => null} // Checkbox is controlled by react-select
        style={{ marginRight: 8 }}
      />
      <label>{props.label}</label>
    </div>
  );
};

const MultiValueContainer = ({ children, ...props }) => {
  return (
    <components.ValueContainer {...props}>
      {props.selectProps.placeholder}
    </components.ValueContainer>
  );
};

const ProvidersList = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [countyFilter, setCountyFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [expandedProvider, setExpandedProvider] = useState(null);
  const [shareModalOpen, setShareModalOpen] = useState(null);
  const [headerTitle, setHeaderTitle] = useState("Providers");

  // Function to update header title based on current filters
  const updateHeaderTitle = () => {
    let title = "Providers";

    // Add county, city, and name filters to the title if they exist
    if (countyFilter?.length > 0) {
      const countyNames = countyFilter.map((item) => item.label).join(", ");
      title += ` in ${countyNames}`;
    }

    if (cityFilter?.length > 0) {
      const cityNames = cityFilter.map((item) => item.label).join(", ");
      title += `, ${cityNames}`;
    }

    if (nameFilter?.length > 0) {
      const nameNames = nameFilter.map((item) => item.label).join(", ");
      title += ` - ${nameNames}`;
    }

    // Add selected tags to the title if any are selected
    if (selectedTags.length > 0) {
      const tagNames = selectedTags.map((tag) => tag.label).join(", ");
      title += ` with tags: ${tagNames}`;
    }

    setHeaderTitle(title);
  };

  // Handle tag selection changes
  const handleTagChange = (selected) => {
    setSelectedTags(selected || []); // Allow multiple selected tags
  };

  // Handle city selection changes
  const handleCityChange = (selected) => {
    setCityFilter(selected || []);
  };

  // Handle county selection changes
  const handleCountyChange = (selected) => {
    setCountyFilter(selected || []);
  };

  // Handle name selection changes
  const handleNameChange = (selected) => {
    setNameFilter(selected || []);
  };

  // Call the updateHeaderTitle function whenever filters change
  useEffect(() => {
    updateHeaderTitle();
  }, [cityFilter, countyFilter, nameFilter, selectedTags]);

  const allTags = [
    ...new Set(
      hhsProvidersData.hhsProviders.flatMap((provider) => provider.tags)
    ),
  ]
    .map((tag) => ({ value: tag.toLowerCase(), label: tag }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const tagOptions = allTags;

  const uniqueName = [
    ...new Set(hhsProvidersData.hhsProviders.map((provider) => provider.name)),
  ]
    .map((name) => ({ value: name, label: name }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const uniqueCities = [
    ...new Set(
      hhsProvidersData.hhsProviders.map((provider) => provider.address.city)
    ),
  ]
    .map((city) => ({ value: city, label: city }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const uniqueCounties = [
    ...new Set(
      hhsProvidersData.hhsProviders.map((provider) => provider.county)
    ),
  ]
    .map((county) => ({ value: county, label: county }))
    .sort((a, b) => a.label.localeCompare(b.label));

  // Custom styles for react-select
  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#f9f9f9",
      borderColor: "#ccc",
      boxShadow: "none",
      "&:hover": { borderColor: "#888" },
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected ? "#0073e6" : isFocused ? "#e6f2ff" : "white",
      color: isSelected ? "white" : "black",
      "&:hover": { backgroundColor: "#cce5ff", color: "black" },
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "#BF0A30", // Set your desired red color here (Arkansas red)
      fontWeight: "bold",
      ":hover": {
        backgroundColor: "#BF0A30", // Same color for the background on hover
        color: "white",
      },
    }),
  };

  // Apply filters and sorting
  const filteredProviders = hhsProvidersData.hhsProviders
    .filter((provider) => {
      const matchesTags =
        !selectedTags ||
        (Array.isArray(selectedTags) && selectedTags.length === 0) ||
        (Array.isArray(selectedTags)
          ? selectedTags.some((tag) =>
              provider.tags
                .map((t) => t.toLowerCase())
                .includes(tag.value.toLowerCase())
            )
          : provider.tags
              .map((t) => t.toLowerCase())
              .includes(selectedTags.value.toLowerCase()));

      // Name Filter
      const matchesName =
        !nameFilter ||
        (Array.isArray(nameFilter) && nameFilter.length === 0) ||
        (Array.isArray(nameFilter)
          ? nameFilter.some((filter) =>
              provider.name.toLowerCase().includes(filter.value.toLowerCase())
            )
          : provider.name
              .toLowerCase()
              .includes(nameFilter.value.toLowerCase()));

      // City Filter
      const matchesCity =
        !cityFilter ||
        (Array.isArray(cityFilter) && cityFilter.length === 0) ||
        (Array.isArray(cityFilter)
          ? cityFilter.some((filter) => provider.address.city === filter.value)
          : provider.address.city === cityFilter.value);

      // County Filter
      const matchesCounty =
        !countyFilter ||
        (Array.isArray(countyFilter) && countyFilter.length === 0) ||
        (Array.isArray(countyFilter)
          ? countyFilter.some((filter) => provider.county === filter.value)
          : provider.county === countyFilter.value);

      return matchesTags && matchesName && matchesCity && matchesCounty;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const emailProvider = (provider) => {
    if (!provider.email) {
      alert("No email available for this provider.");
    } else if (Array.isArray(provider.email)) {
      window.location.href = `mailto:${provider.email.join(",")}`;
    } else {
      window.location.href = `mailto:${provider.email}`;
    }
  };

  const toggleShowMore = (providerId) => {
    setExpandedProvider((prev) => (prev === providerId ? null : providerId));
  };

  const toggleShareModal = (providerId) => {
    setShareModalOpen((prev) => (prev === providerId ? null : providerId));
  };

  const baseUrl = "https://www.edoracases.com/hhsProviders";

  return (
    <>
      <ArkansasHeader />
      <ScrollToTopButton />
      <div className="arkansas-providers-container">
        <h4 className="arkansas-providers-title">{headerTitle}</h4>

        <div className="arkansas-providers-filters">
          <div className="arkansas-providers-autocomplete">
            {/* Name Filter */}
            <Select
              options={uniqueName}
              value={nameFilter}
              onChange={handleNameChange}
              placeholder="Search by Name"
              isMulti={true}
              closeMenuOnSelect={false}
              isClearable
              components={{
                Option: CheckboxOption,
                ValueContainer: MultiValueContainer,
              }}
              styles={customStyles}
              noOptionsMessage={() => "No matching names"}
            />
          </div>

          <div className="arkansas-providers-autocomplete">
            {/* City Filter */}
            <Select
              options={uniqueCities}
              value={cityFilter}
              onChange={handleCityChange}
              placeholder="Search by City"
              isClearable
              isMulti={true}
              closeMenuOnSelect={false}
              components={{
                Option: CheckboxOption,
                ValueContainer: MultiValueContainer,
              }}
              styles={customStyles}
              noOptionsMessage={() => "No matching cities"}
            />
          </div>

          <div className="arkansas-providers-autocomplete">
            {/* County Filter */}
            <Select
              options={uniqueCounties}
              value={countyFilter}
              onChange={handleCountyChange}
              placeholder="Search by County"
              isClearable
              isMulti={true}
              closeMenuOnSelect={false}
              components={{
                Option: CheckboxOption,
                ValueContainer: MultiValueContainer,
              }}
              styles={customStyles}
              noOptionsMessage={() => "No matching counties"}
            />
          </div>

          <div className="arkansas-providers-autocomplete">
            {/* Tag Filter */}
            <Select
              options={tagOptions}
              value={selectedTags}
              onChange={handleTagChange}
              placeholder="Filter by tags"
              isClearable
              isMulti={true}
              closeMenuOnSelect={false}
              components={{
                Option: CheckboxOption,
                ValueContainer: MultiValueContainer,
              }}
              styles={customStyles}
              noOptionsMessage={() => "No tags available"}
            />
          </div>
        </div>

        {/* Filtered provider cards */}
        <div className="arkansas-providers-card-list">
          {filteredProviders.map((provider) => {
            const shareUrl = `${baseUrl}/${provider.id}`;
            return (
              <div key={provider.id} className="arkansas-providers-card">
                <h3 className="arkansas-providers-card-title">
                  {provider.name}
                </h3>
                <p className="arkansas-providers-id">
                  <strong>ID:</strong> {provider.id}{" "}
                </p>
                <p className="arkansas-providers-type">
                  <strong>Type:</strong> {provider.type}
                </p>
                <p className="arkansas-providers-services">
                  <strong>Services:</strong> {provider.services.join(", ")}
                </p>
                <p className="arkansas-providers-address">
                  <strong>Address:</strong>
                </p>
                <p className="arkansas-providers-address-line">
                  {provider.address.street}
                </p>
                <p className="arkansas-providers-address-line">
                  {provider.address.city}
                </p>
                <p className="arkansas-providers-address-line">
                  {provider.address.zip}
                </p>
                <p className="arkansas-providers-county">
                  <strong>County:</strong> {provider.county}
                </p>
                {/* Toggle show/hide additional information */}
                {expandedProvider === provider.id && (
                  <>
                    <p className="arkansas-providers-organization">
                      <strong>Organization:</strong> {provider.organization}
                    </p>
                    <p className="arkansas-providers-phone">
                      <strong>Phone:</strong> {provider.phone}
                    </p>
                    <p className="arkansas-providers-email">
                      <strong>Email:</strong>{" "}
                      {provider.email && provider.email.length > 0 ? (
                        Array.isArray(provider.email) ? (
                          provider.email.map((email, index) => (
                            <span key={email}>
                              <a href={`mailto:${email}`}>{email}</a>
                              {index < provider.email.length - 1 && ", "}
                            </span>
                          ))
                        ) : (
                          <a href={`mailto:${provider.email}`}>
                            {provider.email}
                          </a>
                        )
                      ) : (
                        "N/A"
                      )}
                    </p>

                    <p className="arkansas-providers-website">
                      <strong>Website:</strong>{" "}
                      {provider.website ? (
                        <a
                          href={provider.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {provider.website}
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </p>
                    <p className="arkansas-providers-contact">
                      <strong>Contact Person:</strong>{" "}
                      {provider.contactPerson || "N/A"}
                    </p>
                    <p className="arkansas-providers-eligibility">
                      <strong>Eligibility Criteria:</strong>{" "}
                      {provider.eligibilityCriteria}
                    </p>
                    <p className="arkansas-providers-hours">
                      <strong>Hours:</strong> {provider.hours || "N/A"}
                    </p>
                    <p className="arkansas-providers-description">
                      <strong>Description:</strong> {provider.description}
                    </p>
                    <p className="arkansas-providers-tags">
                      <strong>Tags:</strong> {provider.tags.join(", ")}
                    </p>
                  </>
                )}
                {/* Action Buttons */}
                <div className="arkansas-providers-card-buttons">
                  <button onClick={() => toggleShowMore(provider.id)}>
                    {expandedProvider === provider.id ? "< Less" : "More >"}
                  </button>
                  <button onClick={() => toggleShareModal(provider.id)}>
                    Share
                  </button>
                  <button onClick={() => emailProvider(provider)}>Email</button>
                </div>
                {/* Share Modal */}
                {shareModalOpen === provider.id && (
                  <div className="arkansas-providers-share-modal">
                    <h4>Share {provider.name}</h4>

                    {/* Facebook */}
                    {/* <FacebookShareButton
                      url={shareUrl}
                      quote={`Provider: ${provider.name}\nType: ${
                        provider.type
                      }\nServices: ${provider.services.join(", ")}\nEmail: ${
                        provider.email || "N/A"
                      }\nWebsite: ${provider.website || "N/A"}`}
                      hashtag="#ArkansasProviders"
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton> */}

                    {/* Twitter */}
                    {/* <TwitterShareButton
                      url={shareUrl}
                      title={`Provider: ${provider.name}\nType: ${
                        provider.type
                      }\nServices: ${provider.services.join(", ")}\nEmail: ${
                        provider.email || "N/A"
                      }\nWebsite: ${provider.website || "N/A"}`}
                      hashtags={["ArkansasProviders", "CommunityServices"]}
                    >
                      <TwitterIcon size={32} round />
                    </TwitterShareButton> */}

                    {/* LinkedIn */}
                    {/* <LinkedinShareButton
                      url={shareUrl}
                      title={provider.name}
                      summary={`Type: ${
                        provider.type
                      }\nServices: ${provider.services.join(", ")}\nEmail: ${
                        provider.email || "N/A"
                      }\nWebsite: ${provider.website || "N/A"}`}
                      source="edoracases.com"
                    >
                      <LinkedinIcon size={32} round />
                    </LinkedinShareButton> */}

                    {/* WhatsApp */}
                    {/* <WhatsappShareButton
                      url={shareUrl}
                      title={`Provider: ${provider.name}\nType: ${
                        provider.type
                      }\nServices: ${provider.services.join(", ")}\nEmail: ${
                        provider.email || "N/A"
                      }\nWebsite: ${provider.website || "N/A"}`}
                      separator=" - "
                    >
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton> */}

                    {/* Email */}
                    <EmailShareButton
                      url={shareUrl}
                      subject={`Provider Information: ${provider.name}`}
                      body={`Check out this provider:\n\nProvider: ${
                        provider.name
                      }\nType: ${
                        provider.type
                      }\nServices: ${provider.services.join(", ")}\nEmail: ${
                        provider.email || "N/A"
                      }\nWebsite: ${
                        provider.website || "N/A"
                      }\n\nMore info: ${shareUrl}`}
                    >
                      <EmailIcon size={32} round />
                    </EmailShareButton>
                    <button
                      className="arkansas-providers-close-button"
                      onClick={() => setShareModalOpen(null)}
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProvidersList;
