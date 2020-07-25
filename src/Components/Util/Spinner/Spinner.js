import React from 'react';
import spinner from '../../../Images/ajax-loader.gif';

import styles from './Spinner.module.scss';

const Spinner = () => (
  <>
    <img className={styles.spinner} src={spinner} alt="Loading..." />
  </>
);

export default Spinner;
