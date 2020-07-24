import React from 'react';
import spinner from '../../Images/ajax-loader.gif';

const Spinner = () => (
  <>
    <img className="spinner" src={spinner} alt="Loading..." />
  </>
);

export default Spinner;
