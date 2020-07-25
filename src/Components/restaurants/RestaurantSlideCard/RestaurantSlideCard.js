import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import StarRatings from 'react-star-ratings';

import styles from './RestaurantSlideCard.module.scss';

const RestaurantSlideCard = ({ restaurant }) => {
  const { image, name, phone, price, categories, id, rating } = restaurant;
  //might use phone for button
  return (
    <Link to={`/restaurant/${id}`}>
      <section className={styles.card}>
        <div className={styles.cardFront}>
          <figure className={styles.cardImageHolder}>
            <div
              className={styles.cardImage}
              style={{
                backgroundImage: `url(${
                  image
                    ? image
                    : require('../../../Images/no-image-avaiable.jpg')
                }`,
              }}
            ></div>
          </figure>
          <article className={styles.cardText}>
            <div className={styles.cardTitle}>
              <h3>{name}</h3>
            </div>
            <div className={styles.cardDetails}>
              <StarRatings
                rating={rating}
                numberOfStars={5}
                starRatedColor="#fad222"
                starDimension="2rem"
                starSpacing="0.3rem"
              />
              <p>Cousine: {categories}</p>
              <p>Price: {price}</p>
              <p>Phone: {phone}</p>
            </div>
          </article>
        </div>
      </section>
    </Link>
  );
};

RestaurantSlideCard.propTypes = {
  restaurant: PropTypes.object,
};

export default RestaurantSlideCard;
