import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearSearch } from '../../../actions/restaurantAction';
//Import React Script Libraray to load Google object
import Script from 'react-load-script';
import Fade from 'react-reveal/Fade';
import Alert from '../Alert/Alert';

import styles from './DisplaySearchBar.module.scss';

const DisplaySearchBar = ({
  renderSortByOptions,
  onSubmit,
  where,
  handleChange,
  what,
  handleScriptLoad,
  restaurants,
  clearSearch,
}) => {
  const googleUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`;
  // {googleUrl && <Script url={googleUrl} onLoad={handleScriptLoad} />}
  return (
    <section className={styles.searchBar}>
      <form onSubmit={onSubmit} className={styles.searchBarForm}>
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
            <div data-test="alert-holder" className={styles.alertHolder}>
              <Alert />
            </div>
          </fieldset>

          <fieldset className={styles.searchBarSubmit}>
            <input
              data-test="search"
              className={`${styles.myButton} button`}
              type="submit"
              name="submit"
              value="Search"
            ></input>

            {restaurants.length > 0 && (
              <button
                data-test="clear"
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
  renderSortByOptions: PropTypes.func.isRequired,
  where: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  what: PropTypes.string.isRequired,
  handleScriptLoad: PropTypes.func.isRequired,
  restaurants: PropTypes.array.isRequired,
  clearSearch: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
  restaurants: state.restaurants.restaurants,
});

export default connect(mapStatetoProps, { clearSearch })(DisplaySearchBar);
