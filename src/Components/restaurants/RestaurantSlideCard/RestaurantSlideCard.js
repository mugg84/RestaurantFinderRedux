import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import StarRatings from 'react-star-ratings';

import './RestaurantSlideCard.scss';

const RestaurantSlideCard = ({ restaurant }) => {
  const { image, name, phone, price, categories, id, rating } = restaurant;
  //might use phone for button
  return (
    <Link to={`/restaurant/${id}`}>
      <section className="card">
        <div className="card-front">
          <figure className="card-image-holder">
            <div
              className="card-image"
              style={{
                backgroundImage: `url(${
                  image
                    ? image
                    : require('../../../Images/no-image-avaiable.jpg')
                }`,
              }}
            ></div>
          </figure>
          <article className="card-text">
            <div className="card-title">
              <h3>{name}</h3>
            </div>
            <div className="card-details">
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
