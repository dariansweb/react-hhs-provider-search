import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { EmailIcon, EmailShareButton } from "react-share";
import ScrollToTopButton from "../../utils/ScrollToTopButton";
import Select, { components } from "react-select";
import hhsProvidersData from "../../data/hhsProviders.json";
import ArkansasHeader from "./ArkansasHeader";
import HelpModal from "./hhsProvidersModalHelp";

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
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  const [selectedTags, setSelectedTags] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [countyFilter, setCountyFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [expandedProvider, setExpandedProvider] = useState(null);
  const [shareModalOpen, setShareModalOpen] = useState(null);
  const [headerTitle, setHeaderTitle] = useState("Providers");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [showTypes, setShowTypes] = useState(false);
  const [nameDescriptionFilter, setNameDescriptionFilter] = useState("");
  const [showAddProviderModal, setShowAddProviderModal] = useState(false);
  const [isJsonGenerated, setIsJsonGenerated] = useState(false);
  const [isJsonCopied, setIsJsonCopied] = useState(false);
  const navigate = useNavigate();

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

      // Name and Description Filter (handling multiple words)
      const searchWords = nameDescriptionFilter
        .toLowerCase()
        .split(" ") // Split by spaces to get all words
        .filter((word) => word.trim().length > 0); // Filter out empty strings

      const matchesAllFields =
        !nameDescriptionFilter ||
        searchWords.every(
          (word) =>
            provider.name.toLowerCase().includes(word) ||
            provider.description.toLowerCase().includes(word) ||
            provider.tags.some((tag) => tag.toLowerCase().includes(word)) ||
            provider.county.toLowerCase().includes(word) ||
            provider.address.city.toLowerCase().includes(word) ||
            provider.services.some((service) =>
              service.toLowerCase().includes(word)
            )
        );

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

      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(provider.type);

      const matchesName =
        !nameFilter ||
        nameFilter.length === 0 ||
        nameFilter.some((filter) =>
          provider.name.toLowerCase().includes(filter.value.toLowerCase())
        );

      return (
        matchesTags &&
        matchesCity &&
        matchesCounty &&
        matchesAllFields &&
        matchesType &&
        matchesName
      );
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  // Update the header title whenever the filters change
  // useEffect(() => {
  //   setHeaderTitle(`${filteredProviders.length} Providers`);
  // }, [filteredProviders]);

  // Update the header title whenever the filters change
  useEffect(() => {
    updateHeaderTitle();
  }, [
    filteredProviders,
    countyFilter,
    cityFilter,
    nameDescriptionFilter,
    nameFilter,
    selectedTags,
    selectedTypes,
  ]);

  // Function to update header title based on current filters
  const updateHeaderTitle = () => {
    let title = `${filteredProviders.length} Total Providers`; // Start with the count of filtered providers

    // Add county, city, and name/description filters to the title if they exist
    if (countyFilter?.length > 0) {
      const countyNames = Array.isArray(countyFilter)
        ? countyFilter.map((item) => item.label).join(", ")
        : countyFilter.label;
      title += ` in ${countyNames}`;
    }

    if (cityFilter?.length > 0) {
      const cityNames = Array.isArray(cityFilter)
        ? cityFilter.map((item) => item.label).join(", ")
        : cityFilter.label;
      title += `, ${cityNames}`;
    }

    if (nameDescriptionFilter.length > 0) {
      title += ` - Matching "${nameDescriptionFilter}"`;
    }

    if (nameFilter?.length > 0) {
      const nameNames = Array.isArray(nameFilter)
        ? nameFilter.map((item) => item.label).join(", ")
        : nameFilter.label;
      title += ` - ${nameNames}`;
    }

    // Add selected tags to the title if any are selected
    if (selectedTags.length > 0) {
      const tagNames = selectedTags.map((tag) => tag.label).join(", ");
      title += ` with tags: ${tagNames}`;
    }

    if (selectedTypes.length > 0) {
      const typeNames = selectedTypes.join(", ");
      title += ` of type: ${typeNames}`;
    }

    setHeaderTitle(title);
  };

  // Handle type selection changes
  const toggleTypeSelection = (type) => {
    setSelectedTypes((prevSelectedTypes) =>
      prevSelectedTypes.includes(type)
        ? prevSelectedTypes.filter((t) => t !== type)
        : [...prevSelectedTypes, type]
    );
  };

  const clearAllFilters = () => {
    setSelectedTags([]);
    setCityFilter([]);
    setCountyFilter([]);
    setNameFilter([]);
    setNameDescriptionFilter("");
    setSelectedTypes([]);
  };

  const handleNameDescriptionFilterChange = (e) => {
    setNameDescriptionFilter(e.target.value);
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
    setNameFilter(selected ? selected : []);
  };

  // Extract all unique types from provider data
  const allTypes = [
    ...new Set(hhsProvidersData.hhsProviders.map((provider) => provider.type)),
  ].sort((a, b) => a.localeCompare(b));

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

  const baseUrl = "https://www.edoracases.com/hhsProvidersPage";

  const [formData, setFormData] = useState({
    id: "", // This can be generated dynamically based on your existing data
    name: "",
    type: "",
    services: [],
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
    county: "",
    organization: "",
    phone: "",
    email: "",
    website: "",
    contactPerson: "",
    eligibilityCriteria: "",
    hours: "",
    description: "",
    tags: [],
  });

  // Handle form submission and switch to JSON view
  const handleFormSubmit = () => {
    // Generate ID dynamically (e.g., based on length of existing data)
    const newId = hhsProvidersData.hhsProviders.length + 1;
    const newProvider = { ...formData, id: newId };

    // Set the form data to the new provider and show the JSON output
    setFormData(newProvider);
    setIsJsonGenerated(true);
  };
  // Function to handle copying JSON to clipboard
  const handleCopyJson = () => {
    navigator.clipboard
      .writeText(JSON.stringify(formData, null, 2))
      .then(() => {
        setIsJsonCopied(true);
        // Reset the copy confirmation after a few seconds
        setTimeout(() => setIsJsonCopied(false), 3000);
      });
  };

  const handleDetailsClick = (providerId) => {
    navigate(`/hhsProvidersPage/${providerId}`);
  };

  return (
    <>
      <ArkansasHeader />
      <ScrollToTopButton />
      <HelpModal
        isOpen={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
      />
      <button
            className="hhsProviders-help-modal-open-button"
            onClick={() => setHelpModalOpen(true)}
          >
            Help
          </button>


      <div className="arkansas-providers-container">
        <h4 className="arkansas-providers-title">{headerTitle}</h4>
        
        <div className="arkansas-providers-filters">
          {/* Name and Description Filter */}
          <input
            type="text"
            value={nameDescriptionFilter}
            onChange={handleNameDescriptionFilterChange}
            placeholder="Search by Name, City, County, Tags and Services"
            className="arkansas-providers-name-description-filter"
          />
          
          {/* Name Filter */}
          <div className="arkansas-providers-autocomplete">
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

          {/* City Filter */}
          <div className="arkansas-providers-autocomplete">
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

          {/* County Filter */}
          <div className="arkansas-providers-autocomplete">
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

          {/* Tag Filter */}
          <div className="arkansas-providers-autocomplete">
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

          {/* Show/Hide Types Button */}
          <div className="arkansas-providers-buttons">            
            <button
              className="arkansas-add-provider-button"
              onClick={() => setShowAddProviderModal(true)}
            >
              Add
            </button>
            <button
              className="arkansas-show-hide-button"
              onClick={() => setShowTypes(!showTypes)}
            >
              {showTypes ? "Hide" : "Types"}
            </button>
            <button
              className="arkansas-providers-clear-button"
              onClick={clearAllFilters}
            >
              Clear
            </button>

          </div>

          {/* Filter types with clickable tags, shown conditionally */}
          {showTypes && (
            <div className="arkansas-providers-types">
              {allTypes.map((type) => (
                <span
                  key={type}
                  className={`arkansas-type-tag ${
                    selectedTypes.includes(type) ? "selected" : ""
                  }`}
                  onClick={() => toggleTypeSelection(type)}
                >
                  {type}
                </span>
              ))}
            </div>
          )}
        </div>
        {/* Filtered provider cards */}
        <div className="arkansas-providers-card-list">
          {filteredProviders.map((provider) => {
            const shareUrl = `${baseUrl}/${provider.id}`;
            return (
              <div key={provider.id} className="arkansas-providers-card">
                <h3 className="arkansas-providers-card-title">

                  <Link to={`/hhsproviderspage/${provider.id}`}>
                    {provider.name}
                  </Link>
                  
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
                    {expandedProvider === provider.id ? "Less" : "More"}
                  </button>
                  <button onClick={() => handleDetailsClick(provider.id)}>
                    Map
                  </button>
                  <button onClick={() => emailProvider(provider)}>Email</button>
                </div>
                {/* Share Modal */}
                {shareModalOpen === provider.id && (
                  <div className="arkansas-providers-share-modal">
                    <h4>Share {provider.name}</h4>

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
        {showAddProviderModal && (
          <div className="arkansas-providers-modal-overlay">
            <div className="arkansas-providers-modal-container">
              {/* Close Button */}
              <button
                className="arkansas-providers-modal-close-button"
                onClick={() => setShowAddProviderModal(false)}
              >
                &times;
              </button>
              <h3 className="arkansas-providers-modal-title">
                {isJsonGenerated ? "Generated JSON" : "Add New Provider"}
              </h3>

              {!isJsonGenerated ? (
                <form
                  className="arkansas-providers-modal-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleFormSubmit();
                  }}
                >
                  <label className="arkansas-providers-modal-label">
                    Provider Name:
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </label>

                  <label className="arkansas-providers-modal-label">
                    Type:
                    <input
                      type="text"
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                    />
                  </label>

                  <label className="arkansas-providers-modal-label">
                    Services (comma separated):
                    <input
                      type="text"
                      value={formData.services.join(", ")}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          services: e.target.value
                            .split(",")
                            .map((service) => service.trim()),
                        })
                      }
                    />
                  </label>

                  <label className="arkansas-providers-modal-label">
                    Street Address:
                    <input
                      type="text"
                      value={formData.address.street}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: {
                            ...formData.address,
                            street: e.target.value,
                          },
                        })
                      }
                    />
                  </label>

                  <label className="arkansas-providers-modal-label">
                    City:
                    <input
                      type="text"
                      value={formData.address.city}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: {
                            ...formData.address,
                            city: e.target.value,
                          },
                        })
                      }
                    />
                  </label>

                  <label className="arkansas-providers-modal-label">
                    State:
                    <input
                      type="text"
                      value={formData.address.state}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: {
                            ...formData.address,
                            state: e.target.value,
                          },
                        })
                      }
                    />
                  </label>

                  <label className="arkansas-providers-modal-label">
                    Zip Code:
                    <input
                      type="text"
                      value={formData.address.zip}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: { ...formData.address, zip: e.target.value },
                        })
                      }
                    />
                  </label>

                  <label className="arkansas-providers-modal-label">
                    County:
                    <input
                      type="text"
                      value={formData.county}
                      onChange={(e) =>
                        setFormData({ ...formData, county: e.target.value })
                      }
                    />
                  </label>

                  <label className="arkansas-providers-modal-label">
                    Organization:
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          organization: e.target.value,
                        })
                      }
                    />
                  </label>

                  <label className="arkansas-providers-modal-label">
                    Phone Number:
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </label>

                  <label className="arkansas-providers-modal-label">
                    Email:
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </label>

                  <label className="arkansas-providers-modal-label">
                    Website:
                    <input
                      type="text"
                      value={formData.website}
                      onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                      }
                    />
                  </label>

                  <label className="arkansas-providers-modal-label">
                    Contact Person:
                    <input
                      type="text"
                      value={formData.contactPerson}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contactPerson: e.target.value,
                        })
                      }
                    />
                  </label>

                  <label className="arkansas-providers-modal-label">
                    Eligibility Criteria:
                    <input
                      type="text"
                      value={formData.eligibilityCriteria}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          eligibilityCriteria: e.target.value,
                        })
                      }
                    />
                  </label>

                  <label className="arkansas-providers-modal-label">
                    Hours of Operation:
                    <input
                      type="text"
                      value={formData.hours}
                      onChange={(e) =>
                        setFormData({ ...formData, hours: e.target.value })
                      }
                    />
                  </label>

                  <label className="arkansas-providers-modal-label">
                    Description:
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </label>

                  <label className="arkansas-providers-modal-label">
                    Tags (comma separated):
                    <input
                      type="text"
                      value={formData.tags.join(", ")}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tags: e.target.value
                            .split(",")
                            .map((tag) => tag.trim()),
                        })
                      }
                    />
                  </label>

                  <div className="arkansas-providers-modal-buttons">
                    <button
                      type="submit"
                      className="arkansas-providers-modal-submit"
                    >
                      Generate JSON
                    </button>
                    <button
                      type="button"
                      className="arkansas-providers-modal-cancel"
                      onClick={() => setShowAddProviderModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="arkansas-providers-modal-json-output">
                  <h4 className="arkansas-providers-modal-json-title">
                    Generated JSON:
                  </h4>
                  <pre className="arkansas-providers-modal-json">
                    {JSON.stringify(formData, null, 2)}
                  </pre>
                  <button
                    className="arkansas-providers-modal-copy-button"
                    onClick={handleCopyJson}
                  >
                    Copy to Clipboard
                  </button>
                  {isJsonCopied && (
                    <span className="arkansas-providers-modal-copy-confirmation">
                      JSON copied to clipboard!
                    </span>
                  )}
                  {/* Back to Form Button */}
                  <button
                    className="arkansas-providers-modal-back-button"
                    onClick={() => setIsJsonGenerated(false)}
                  >
                    Back to Form
                  </button>

                  <p className="arkansas-providers-modal-instructions">
                    Please copy this JSON and email it to:{" "}
                    <a
                      href="mailto:darian.ross@dhs.arkansas.gov"
                      className="arkansas-email-link"
                    >
                      <strong>darian.ross@dhs.arkansas.gov</strong>
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProvidersList;
