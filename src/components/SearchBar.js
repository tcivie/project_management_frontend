import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AutoComplete, Input } from 'antd';
import { fetchSearchResults, setSelectedSearch } from '../redux/actions/searchAction';
import unicodeToEmoji from '../utils/unicodeToEmoji';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const searchResults = useSelector((state) => state.search.results);
  const isLoading = useSelector((state) => state.search.loading);
  const dispatch = useDispatch();
  const debounceRef = useRef(null); // Create a ref to hold the debounce timeout id

  useEffect(() => {
    if (searchTerm.length > 3) {
      // Clear the existing timeout if there is one
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      dispatch({ type: 'SEARCH_STARTED' });
      // Set a new timeout to dispatch the fetchSearchResults action
      debounceRef.current = setTimeout(() => {
        dispatch(fetchSearchResults(searchTerm));
      }, 500); // 500ms delay
    }
  }, [searchTerm, dispatch]);

  const extractLabelFromResult = (result) => {
    const {
      name, stateName, country, emoji,
    } = result;
    let label = '';
    if (country) { // city
      label = `${name} (${stateName}) - ${country} ${unicodeToEmoji(emoji)}`;
    } else { // country
      label = `${name} - ${unicodeToEmoji(emoji)}`;
    }
    return label;
  };

  const selectSearchResult = (result, obj) => {
    // set selected city
    setSearchTerm(extractLabelFromResult(obj.data));
    setSelectedOption(obj);
    const { data } = obj;
    const selection = {
      id: data.id,
      name: data.name,
      location: data.location,
    };
    dispatch(setSelectedSearch(selection));
  };

  useEffect(() => {
    const parsedResults = searchResults.map((result) => {
      const allOptions = [];
      if (result.code !== undefined) {
        if (result.cities !== undefined) {
          result.cities.map((city) => {
            // eslint-disable-next-line no-param-reassign
            city.emoji = result.emoji;
            allOptions.push(
              {
                value: city.id,
                data: city,
                label: (
                  <div>
                    {extractLabelFromResult(city)}
                  </div>
                ),
              },
            );
            return allOptions;
          });
        } else {
          allOptions.push(
            {
              value: result.id,
              data: result,
              label: (
                <div>
                  {extractLabelFromResult(result)}
                </div>
              ),
            },
          );
        }
      }
      return allOptions;
    }).flat();
    setOptions(parsedResults);
  }, [searchResults]);
  const handleSearch = (value) => {
    // Perform the search action here
    console.log(selectedOption);
    selectSearchResult(value, selectedOption);
  };
  return (
    <AutoComplete
      style={{ width: '100%', marginBottom: '1em' }}
      options={options}
      value={searchTerm}
      onSelect={selectSearchResult}
      onSearch={setSearchTerm}
    >
      <Input.Search
        size="large"
        placeholder="Search..."
        loading={isLoading}
        enterButton
        onSearch={handleSearch}
      />
    </AutoComplete>
  );
}

export default SearchBar;
