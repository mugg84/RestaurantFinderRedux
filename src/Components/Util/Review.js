import React, { Fragment } from "react";

const Review = ({ review }) => {
  const {
    text,
    time_created,
    url,
    user: { image_url } = "",
    user: { name } = "",
  } = review;

  return (
    <Fragment>
      <figure className="review-user">
        <img
          src={
            image_url
              ? image_url
              : require("../../Images/no-image-avaiable.jpg")
          }
          alt={name}
        />
        <figcaption>
          <p>{name}</p>
          <p>{time_created}</p>
        </figcaption>
      </figure>

      <div className="review-text">
        {text}{" "}
        <a
          style={{ color: "var(--main--color)" }}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          View full review
        </a>
      </div>
    </Fragment>
  );
};

export default Review;
