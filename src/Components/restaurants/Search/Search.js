import React, { useState } from 'react';
import DisplaySearchBar from '../../layout/DisplaySearchBar/DisplaySearchBar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleScriptLoad } from '../../../helpers/Autocomplete';
import { getRestaurants, setAlert } from '../../../actions/restaurantAction';

import styles from './Search.module.scss';
const Search = ({ getRestaurants, setAlert }) => {
  const [where, setWhere] = useState('');
  const [what, setWhat] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const sortByOptions = {
    'Highest Rated': 'rating',
    'Best Match': 'best_match',
    'Most Reviewed': 'review_count',
  };

  // give active class to option selected
  const getSortByClass = (sortByOption) => {
    if (sortBy === sortByOption) {
      return styles.active;
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
