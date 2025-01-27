// components/filters/SearchFilters.jsx
const SearchFilters = ({ 
  nameDescriptionFilter, 
  handleNameDescriptionFilterChange,
  nameFilter,
  handleNameChange,
  // ... other props
}) => {
  return (
    <div className="arkansas-providers-filters">
      <input
        type="text"
        value={nameDescriptionFilter}
        onChange={handleNameDescriptionFilterChange}
        placeholder="Search by Name, City, County, Tags and Services"
        className="arkansas-providers-name-description-filter"
      />
      <div className="arkansas-providers-autocomplete">
        <Select
          options={uniqueName}
          value={nameFilter}
          onChange={handleNameChange}
          // ... other props
        />
      </div>
      {/* Other filter components */}
    </div>
  );
};
