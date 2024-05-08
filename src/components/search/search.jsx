import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
        geoApiOptions
      );

      const result = await response.json();
      console.log(result);

      const cities = result.data.map((city) => ({
        label: `${city.city}, ${city.country}`,
        value: `${city.latitude} ${city.longitude}`,
        labelShort: `${city.city}, ${city.countryCode}`,
      }));

      return {
        options: cities,
        hasMore: true,
      };
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnChange = (searchData) => {
    console.log(searchData);
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
