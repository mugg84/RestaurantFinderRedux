import React, { Fragment } from 'react';
import spinner from '../../Images/ajax-loader.gif';

const Spinner = () => (
  <Fragment>
    <img className="spinner" src={spinner} alt="Loading..." />
  </Fragment>
);

export default Spinner;
