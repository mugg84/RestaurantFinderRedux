/* import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import { getRestaurants, setAlert } from '../../../actions/restaurantAction';
import DisplaySearchBar from '../../layout/DisplaySearchBar/DisplaySearchBar';

export const Search = ({ getRestaurants, setAlert }) => {
  const onSubmit = (e) => {
    const { where, what, sortBy } = e;
    if (where && what) {
      getRestaurants({ where, what, sortBy });
    } else {
      setAlert('Please fill all the inputs');
    }
  };

  return (
    <DisplaySearchBar onSubmit={onSubmit} />
  );
};

Search.propTypes = {
  getRestaurants: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { getRestaurants, setAlert })(Search);
 */