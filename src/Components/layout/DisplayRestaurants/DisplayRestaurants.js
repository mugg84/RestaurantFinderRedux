import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RestaurantCard from '../../restaurants/RestarantCard/RestaurantCard';
import Spinner from '../../Util/Spinner/Spinner';

import styles from './DisplayRestaurants.module.scss';

const DisplayRestaurants = ({ loading, restaurants }) => {
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        {Array.isArray(restaurants) && restaurants.length > 0 && (
          <section className={styles.restaurantListContainer}>
            <h2>Your search results:</h2>
            <article className={styles.restaurantList}>
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
      </>
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
