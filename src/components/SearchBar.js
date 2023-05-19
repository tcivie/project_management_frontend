import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';
import { fetchSearchResults, setSelectedSearch } from '../redux/actions/searchAction';
import unicodeToEmoji from '../utils/unicodeToEmoji';

const { Option } = Select;

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const searchResults = useSelector((state) => state.search.results);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchTerm.length % 3 === 0 && searchTerm.length !== 0) {
      dispatch(fetchSearchResults(searchTerm));
    }
  }, [searchTerm, dispatch]);

  const selectSearchResult = (result, obj) => {
    // set selected city
    setSearchTerm(obj);
    const selction = {
      id: obj.key,
      name: obj.children.join(''),
      location: result,
    };
    dispatch(setSelectedSearch(selction));
  };

  const options = searchResults.map((result) => {
    const allOptions = [];
    if (result.code !== undefined) {
      if (result.cities !== undefined) {
        result.cities.map((city) => (
          allOptions.push(
            <Option key={city.id} value={city.location}>
              {city.name} {' '} ({city.stateName}) - {city.country} {' '} {unicodeToEmoji(result.emoji)}
            </Option>,
          )
        ));
      } else {
        allOptions.push(
          <Option key={result.id} value={result.location}>
            {result.name} {' '} - {result.country} {' '} {unicodeToEmoji(result.emoji)}
          </Option>,
        );
      }
    }
    return allOptions;
  });

  return (
    <Select
      showSearch
      size="large"
      placeholder="Search..."
      style={{ width: '100%', marginBottom: '1em' }}
      value={searchTerm}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={(value) => setSearchTerm(value)}
      notFoundContent={null}
      onSelect={selectSearchResult}
    >
      {options}
    </Select>
  );
}

export default SearchBar;
