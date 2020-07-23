import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './RestaurantCard.scss';

const RestaurantCardList = ({ restaurant, id }) => {
  const { image, name, phone, price, categories, address } = restaurant;
  return (
    <section className="card">
      <section className="card-front">
        <Link to={`/restaurant/${id}`}>
          <figure className="card-image-holder">
            <div
              className="card-image"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          </figure>
          <article className="card-text">
            <div className="card-title">
              <h3>{name}</h3>
            </div>
            <div className="card-details">
              <p>Address: {address}</p>
              <p>Phone: {phone}</p>
              <p>Cousine: {categories}</p>
              <p>Price: {price}</p>
            </div>
          </article>
        </Link>
      </section>
    </section>
  );
};

RestaurantCardList.propTypes = {
  restaurant: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

export default RestaurantCardList;
