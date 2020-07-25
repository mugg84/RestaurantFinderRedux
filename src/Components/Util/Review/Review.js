import React from 'react';

import styles from './Review.module.scss';

const Review = ({ review }) => {
  const {
    text,
    time_created,
    url,
    user: { image_url } = '',
    user: { name } = '',
  } = review;

  return (
    <>
      <figure className={styles.reviewUser}>
        <img
          src={
            image_url
              ? image_url
              : require('../../../Images/no-image-avaiable.jpg')
          }
          alt={name}
        />
        <figcaption>
          <p>{name}</p>
          <p>{time_created}</p>
        </figcaption>
      </figure>

      <div className={styles.reviewText}>
        {text}{' '}
        <a
          style={{ color: 'var($color-primary)' }}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          View full review
        </a>
      </div>
    </>
  );
};

export default Review;
