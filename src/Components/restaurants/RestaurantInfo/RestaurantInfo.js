import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRestaurantInfo } from '../../../actions/restaurantAction';
import { Link } from 'react-router-dom';
import Navbar from '../../layout/Navbar/Navbar';
import Review from '../../Util/Review/Review';
import Footer from '../../layout/Footer/Footer';
import Spinner from '../../Util/Spinner/Spinner';
import PropTypes from 'prop-types';
import SimpleMap from '../../Util/Map/Map';
import StarRatings from 'react-star-ratings';
import Fade from 'react-reveal/Fade';
import { v4 as uuidv4 } from 'uuid';

import styles from './RestaurantInfo.module.scss';

const Restaurant = ({ match, loading, restaurant, getRestaurantInfo }) => {
  useEffect(() => {
    getRestaurantInfo(match.params.id);
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!restaurant) {
    return <p>There's not restaurant</p>
  }
  
  const {
    name,
    address,
    city,
    rating,
    coordinates,
    photos = [],
    phone,
    price,
    categories,
    url,
    reviews,
  } = restaurant;

  return (
    <section className={styles.restaurantInfo}>
      <Navbar className="navInfo" />

      <section className={styles.restaurantDisplay}>
        <article className={styles.restaurantDisplayright}>
          <hgroup className={styles.restaurantDisplayInfo}>
            <Fade left>
              <h2>{name}</h2>
            </Fade>

            <div>
              <p>{categories}</p>
              <StarRatings
                rating={rating}
                numberOfStars={5}
                starRatedColor="#fad222"
                starDimension="2rem"
                starSpacing="0.3rem"
              />
            </div>
            {price && <p>Price: {price}</p>}
          </hgroup>
          <Fade>
            <figure className={styles.restaurantImg}>
              <img
                id={styles.first}
                src={
                  photos.length
                    ? photos[0]
                    : require('../../../Images/no-image-avaiable.jpg')
                }
                alt={name}
              />
              <img
                src={
                  photos.length > 1
                    ? photos[1]
                    : require('../../../Images/no-image-avaiable.jpg')
                }
                alt={name}
              />
              <img
                src={
                  photos.length > 2
                    ? photos[2]
                    : require('../../../Images/no-image-avaiable.jpg')
                }
                alt={name}
              />
            </figure>
          </Fade>

          <ul className={styles.restaurantReviews}>
            <h3>{reviews && reviews.length} Reviews</h3>
            {reviews &&
              reviews.map((review) => (
                <Fade>
                  <Review review={review} key={uuidv4()} />
                </Fade>
              ))}
          </ul>

          <Link to="/" className={`${styles.backButton} button`}>
            Back to Search
          </Link>
        </article>
        <aside className={styles.restaurantDisplayLeft}>
          <figure>
            <SimpleMap coord={coordinates} />
            <figcaption>
              <p>{address}</p>
              <p>{city}</p>
              <p>
                Visit our{' '}
                <a
                  style={{ color: 'var($color-primary)' }}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website
                </a>
              </p>
              <p>Call {phone}</p>
            </figcaption>
          </figure>
        </aside>
      </section>

      <Footer />
    </section>
  );


};

Restaurant.propTypes = {
  match: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  restaurant: PropTypes.object.isRequired,
  getRestaurantInfo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.restaurants.loading,
  restaurant: state.restaurants.restaurant,
});

export default connect(mapStateToProps, { getRestaurantInfo })(Restaurant);
