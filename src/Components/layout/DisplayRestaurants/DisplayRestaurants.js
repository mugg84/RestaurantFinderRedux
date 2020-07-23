import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RestaurantCard from '../../restaurants/RestarantCard/RestaurantCard';
import Spinner from '../../util/Spinner';

import './DisplayRestaurants.scss';

const DisplayRestaurants = ({ loading, restaurants }) => {
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        {restaurants.length > 0 && Array.isArray(restaurants) && (
          <section className="restaurant-list-container">
            <h2>Your search results:</h2>
            <article className="restaurant-list">
              {restaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  id={restaurant.id}
                />
              ))}
            </article>
          </section>
        )}
      </Fragment>
    );
  }
};

DisplayRestaurants.propTypes = {
  loading: PropTypes.bool.isRequired,
  restaurants: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.restaurants.loading,
  restaurants: state.restaurants.restaurants,
});

export default connect(mapStateToProps)(DisplayRestaurants);
