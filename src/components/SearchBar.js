import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AutoComplete, Input } from 'antd';
import { fetchSearchResults, setSelectedSearch } from '../redux/actions/searchAction';
import unicodeToEmoji from '../utils/unicodeToEmoji';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [options, setOptions] = useState([]);
  const searchResults = useSelector((state) => state.search.results);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchTerm.length > 3) {
      dispatch(fetchSearchResults(searchTerm));
    }
  }, [searchTerm, dispatch]);

  const extractLabelFromResult = (result) => {
    console.log(result);
    const {
      name, stateName, country, emoji,
    } = result;
    let label = '';
    console.log(result);
    if (country) { // city
      console.log('city');
      label = `${name} (${stateName}) - ${country} ${unicodeToEmoji(emoji)}`;
    } else { // country
      console.log('country');
      label = `${name} - ${unicodeToEmoji(emoji)}`;
    }
    return label;
  };

  const selectSearchResult = (result, obj) => {
    // set selected city
    setSearchTerm(extractLabelFromResult(obj.data));
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

  return (
    <AutoComplete
      style={{ width: '100%', marginBottom: '1em' }}
      options={options}
      value={searchTerm}
      onSelect={selectSearchResult}
      onSearch={(value) => setSearchTerm(value)}
    >
      <Input.Search
        size="large"
        placeholder="Search..."
        enterButton
        value={searchTerm}
      />
    </AutoComplete>
  );
}

export default SearchBar;
