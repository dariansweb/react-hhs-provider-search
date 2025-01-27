// components/providers/ProviderFilters.jsx
import React from 'react';
import Select from 'react-select';
import { CheckboxOption, MultiValueContainer } from '../constants/SelectStyles';

const ProviderFilters = ({
  filters,
  handlers,
  options,
  customStyles,
  showTypes,
  setShowTypes,
  clearAllFilters,
}) => {
  return (
    <div className="arkansas-providers-filters">
      <input
        type="text"
        value={filters.nameDescriptionFilter}
        onChange={handlers.handleNameDescriptionFilterChange}
        placeholder="Search by Name, City, County, Tags and Services"
        className="arkansas-providers-name-description-filter"
      />
      
      <div className="arkansas-providers-autocomplete">
        <Select
          options={options.uniqueName}
          value={filters.nameFilter}
          onChange={handlers.handleNameChange}
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

      {/* Add other Select components here */}

      <div className="arkansas-providers-buttons">
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
    </div>
  );
};

export default ProviderFilters;
