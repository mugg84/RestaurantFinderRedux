import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getDefaultRestaurants } from '../../../actions/restaurantAction';
import PropTypes from 'prop-types';
import RestaurantSlideCard from '../../restaurants/RestaurantSlideCard/RestaurantSlideCard';
import Carousel from 'react-multi-carousel';
import { responsive } from '../../../helpers/Responsive';
import 'react-multi-carousel/lib/styles.css';

import styles from './DisplayDefaultRestaurants.module.scss';

const DisplayDefaultRestaurants = ({
  location,
  defaultRestaurants,
  defaultThaiRestaurants,
  defaultIndianRestaurants,
  defaultItalianRestaurants,
  getDefaultRestaurants,
}) => {
  // get default restaurants with initial state location and then with actual location
  useEffect(() => {
    if (location) {
      if (defaultRestaurants.length === 0) {
        getDefaultRestaurants(location, 'restaurants');
        getDefaultRestaurants(location, 'thai');
        getDefaultRestaurants(location, 'italian');
        getDefaultRestaurants(location, 'indpak');
      }
    }
    // eslint-disable-next-line
  }, [location]);

  return (
    <section
      className={
        Array.isArray(defaultRestaurants) && defaultRestaurants.length > 0
          ? styles.restaurantSliders
          : ''
      }
    >
      {Array.isArray(defaultRestaurants) && defaultRestaurants.length > 0 && (
        <section className={styles.restaurantSlider}>
          <header>
            <h2>Restaurants near you</h2>
          </header>

          <Carousel responsive={responsive} infinite={true}>
            {defaultRestaurants.map((resturant) => (
              <RestaurantSlideCard
                restaurant={resturant}
                key={`${resturant.id}-d`}
              />
            ))}
          </Carousel>
        </section>
      )}

      {Array.isArray(defaultThaiRestaurants) &&
        defaultThaiRestaurants.length > 0 && (
          <section className={styles.restaurantSlider}>
            <header>
              <h2>Fancy Thai?</h2>
            </header>

            <Carousel responsive={responsive} infinite={true}>
              {defaultThaiRestaurants.map((resturant) => (
                <RestaurantSlideCard
                  restaurant={resturant}
                  key={`${resturant.id}-t`}
                />
              ))}
            </Carousel>
          </section>
        )}

      {Array.isArray(defaultItalianRestaurants) &&
        defaultItalianRestaurants.length > 0 && (
          <section className={styles.restaurantSlider}>
            <header>
              <h2>Fancy Italian?</h2>
            </header>

            <Carousel responsive={responsive} infinite={true}>
              {defaultItalianRestaurants.map((resturant) => (
                <RestaurantSlideCard
                  restaurant={resturant}
                  key={`${resturant.id}-it`}
                />
              ))}
            </Carousel>
          </section>
        )}

      {Array.isArray(defaultIndianRestaurants) &&
        defaultIndianRestaurants.length > 0 && (
          <section className={styles.restaurantSlider}>
            <header>
              <h2>Fancy Indian?</h2>
            </header>

            <Carousel responsive={responsive} infinite={true}>
              {defaultIndianRestaurants.map((resturant) => (
                <RestaurantSlideCard
                  restaurant={resturant}
                  key={`${resturant.id}-ind`}
                />
              ))}
            </Carousel>
          </section>
        )}
    </section>
  );
};

DisplayDefaultRestaurants.propTypes = {
  location: PropTypes.array.isRequired,
  defaultRestaurants: PropTypes.array.isRequired,
  defaultThaiRestaurants: PropTypes.array.isRequired,
  defaultIndianRestaurants: PropTypes.array.isRequired,
  defaultItalianRestaurants: PropTypes.array.isRequired,
  getDefaultRestaurants: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  location: state.restaurants.location,
  defaultRestaurants: state.restaurants.defaultRestaurants,
  defaultThaiRestaurants: state.restaurants.defaultThaiRestaurants,
  defaultIndianRestaurants: state.restaurants.defaultIndianRestaurants,
  defaultItalianRestaurants: state.restaurants.defaultItalianRestaurants,
});

export default connect(mapStateToProps, {
  getDefaultRestaurants,
})(DisplayDefaultRestaurants);
