// hooks/useProviderFilters.js
import { useState, useEffect } from 'react';

export const useProviderFilters = (hhsProvidersData) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [countyFilter, setCountyFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [nameDescriptionFilter, setNameDescriptionFilter] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [headerTitle, setHeaderTitle] = useState("Providers");

  const filteredProviders = hhsProvidersData.hhsProviders
    .filter((provider) => {
      // Your existing filter logic here
    })
    .sort((a, b) => a.name.localeCompare(b.name));

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

  const updateHeaderTitle = () => {
    // Your existing header title logic
  };

  return {
    filters: {
      selectedTags,
      cityFilter,
      countyFilter,
      nameFilter,
      nameDescriptionFilter,
      selectedTypes,
    },
    setters: {
      setSelectedTags,
      setCityFilter,
      setCountyFilter,
      setNameFilter,
      setNameDescriptionFilter,
      setSelectedTypes,
    },
    filteredProviders,
    headerTitle,
  };
};
