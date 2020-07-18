import React, { useState } from 'react';
import DisplaySearchBar from '../layout/DisplaySearchBar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRestaurants, setAlert } from '../../actions/restaurantAction';

const Search = ({ getRestaurants, setAlert }) => {
  let autocomplete;

  const [where, setWhere] = useState('');
  const [what, setWhat] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const sortByOptions = {
    'Highest Rated': 'rating',
    'Best Match': 'best_match',
    'Most Reviewed': 'review_count',
  };

  const handleScriptLoad = () => {
    // Initialize Google Autocomplete
    /*global google*/ autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete')
    );

    // address.
    autocomplete.setFields(['address_components', 'formatted_address']);

    // Fire Event when a suggested name is selected
    autocomplete.addListener('place_changed', handlePlaceSelect);
  };

  const handlePlaceSelect = () => {
    // Extract City From Address Object

    const addressObject = autocomplete.getPlace();
    const address = addressObject.address_components;

    // Check if address is valid
    if (address) {
      // Set State
      setWhere(address[0].long_name);
    }
  };

  // give active class to option selected
  const getSortByClass = (sortByOption) => {
    if (sortBy === sortByOption) {
      return 'active';
    } else {
      return '';
    }
  };

  // set the state of a sorting option
  const handleSortByChange = (sortByOption) => {
    setSortBy(sortByOption);
  };

  //handle input changes
  const handleChange = (e) => {
    if (e.target.name === 'what') {
      setWhat(e.target.value);
    } else if (e.target.name === 'where') {
      setWhere(e.target.value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (where && what) {
      getRestaurants({ where, what, sortBy });
      setWhere('');
      setWhat('');
      setSortBy('best_match');
    } else {
      setAlert('Please fill all the inputs');
    }
  };

  // displays sort options
  const renderSortByOptions = () => {
    return Object.keys(sortByOptions).map((sortByOption) => {
      let sortByOptionValue = sortByOptions[sortByOption];
      return (
        <li
          className={getSortByClass(sortByOptionValue)}
          key={sortByOptionValue}
          onClick={() => handleSortByChange(sortByOptionValue)}
        >
          {sortByOption}
        </li>
      );
    });
  };

  return (
    <DisplaySearchBar
      onSubmit={onSubmit}
      handleChange={handleChange}
      renderSortByOptions={renderSortByOptions}
      where={where}
      what={what}
      handleScriptLoad={handleScriptLoad}
    />
  );
};

Search.propTypes = {
  getRestaurants: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { getRestaurants, setAlert })(Search);
