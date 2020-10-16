import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import Script from 'react-load-script';
import Fade from 'react-reveal/Fade';
import { useCustomHook } from '../../../helpers/utils';

import {
  clearSearch,
  getRestaurants,
  setAlert,
} from '../../../actions/restaurantAction';
import Alert from '../Alert/Alert';

import styles from './DisplaySearchBar.module.scss';

//const googleUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`;
// {googleUrl && <Script url={googleUrl} onLoad={handleScriptLoad} />}

export const DisplaySearchBar = ({
  handleScriptLoad,
  restaurants,
  clearSearch,
  getRestaurants,
  setAlert,
}) => {
  const { where, setWhere } = useCustomHook('');
  const { what, setWhat } = useCustomHook('');
  const { sortBy, setSortBy } = useCustomHook('rating');

  const sortByOptions = {
    'Highest Rated': 'rating',
    'Best Match': 'best_match',
    'Most Reviewed': 'review_count',
  };

  const handleSortByChange = (sortByOption) => {
    setSortBy(sortByOption);
  };

  const getSortByClass = (sortByOption) =>
    sortBy === sortByOption ? styles.active : '';

  const handleSubmit = (e) => {
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

  const handleChange = (e) => {
    if (e.target.name === 'what') {
      setWhat(e.target.value);
    } else if (e.target.name === 'where') {
      setWhere(e.target.value);
    }
  };

  const renderSortByOptions = () => {
    return Object.keys(sortByOptions).map((sortByOption) => {
      let sortByOptionValue = sortByOptions[sortByOption];
      return (
        <li
          className={`${sortByOptionValue} ${getSortByClass(
            sortByOptionValue
          )}`}
          data-testid={sortByOptionValue}
          key={sortByOptionValue}
          onClick={() => handleSortByChange(sortByOptionValue)}
        >
          {sortByOption}
        </li>
      );
    });
  };
  return (
    <section className={styles.searchBar}>
      <form
        onSubmit={handleSubmit}
        className={styles.searchBarForm}
        data-testid="form"
      >
        <legend className="title">
          <Fade left>
            <h1>Where are you going to eat tonight?</h1>
          </Fade>
        </legend>
        <Fade>
          <fieldset className={styles.searchBarInput}>
            <input
              type="text"
              name="where"
              placeholder="Where do you want to eat?"
              value={where}
              onChange={handleChange}
              id="autocomplete"
            />

            <input
              type="text"
              name="what"
              placeholder="What do you want to eat?"
              onChange={handleChange}
              value={what}
            />
            <div data-testid="alert-holder" className={styles.alertHolder}>
              <Alert />
            </div>
          </fieldset>

          <fieldset className={styles.searchBarSubmit}>
            <input
              data-testid="search"
              className={`${styles.myButton} button`}
              type="submit"
              name="submit"
              value="Search"
            ></input>

            {restaurants.length > 0 && (
              <button
                data-testid="clear"
                className={`${styles.clearButton} button`}
                onClick={() => clearSearch()}
              >
                Clear
              </button>
            )}
          </fieldset>
        </Fade>
      </form>
      <article className={styles.searchBarSortOptions}>
        <Fade>
          <ul>{renderSortByOptions()}</ul>
        </Fade>
      </article>
    </section>
  );
};

DisplaySearchBar.propTypes = {
  handleScriptLoad: PropTypes.func,
  restaurants: PropTypes.array.isRequired,
  clearSearch: PropTypes.func.isRequired,
  getRestaurants: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
  restaurants: state.restaurants.restaurants,
});

export default connect(mapStatetoProps, {
  clearSearch,
  getRestaurants,
  setAlert,
})(DisplaySearchBar);
