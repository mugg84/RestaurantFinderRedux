import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getRestaurantInfo } from '../../actions/restaurantAction';
import { Link } from 'react-router-dom';
import Spinner from '../Util/Spinner';
import Navbar from '../layout/Navbar';
import Review from '../Util/Review';
import Footer from '../layout/Footer';
import PropTypes from 'prop-types';
import SimpleMap from '../Util/Map';
import StarRatings from 'react-star-ratings';
import Fade from 'react-reveal/Fade';
import { v4 as uuidv4 } from 'uuid';

const Restaurant = ({ match, loading, restaurant, getRestaurantInfo }) => {
  useEffect(() => {
    getRestaurantInfo(match.params.id);
    // eslint-disable-next-line
  }, []);

  const renderPage = () => {
    if (loading) {
      return <Spinner />;
    } else {
      if (restaurant) {
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
          <section className="restaurant-info">
            <Navbar className="nav-info" />

            <section className="restaurant-display">
              <article className="restaurant-display-right">
                <hgroup className="restaurant-display-info">
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
                  <figure className="restaurant-img">
                    <img
                      id="first"
                      src={
                        photos.length
                          ? photos[0]
                          : require('../../Images/no-image-avaiable.jpg')
                      }
                      alt={name}
                    />
                    <img
                      src={
                        photos.length > 1
                          ? photos[1]
                          : require('../../Images/no-image-avaiable.jpg')
                      }
                      alt={name}
                    />
                    <img
                      src={
                        photos.length > 2
                          ? photos[2]
                          : require('../../Images/no-image-avaiable.jpg')
                      }
                      alt={name}
                    />
                  </figure>
                </Fade>

                <ul className="restaurant-reviews">
                  <h3>{reviews && reviews.length} Reviews</h3>
                  {reviews &&
                    reviews.map((review) => (
                      <Fade>
                        <Review review={review} key={uuidv4()} />
                      </Fade>
                    ))}
                </ul>

                <Link to="/" className="backButton button">
                  Back to Search
                </Link>
              </article>
              <aside className="restaurant-display-left">
                <figure>
                  <SimpleMap coord={coordinates} />
                  <figcaption>
                    <p>{address}</p>
                    <p>{city}</p>
                    <p>
                      Visit our{' '}
                      <a
                        style={{ color: 'var(--main--color)' }}
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
      }
    }
  };

  return <Fragment>{renderPage()}</Fragment>;
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
