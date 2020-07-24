import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './Alert.module.scss';

const Alert = ({ alert }) => {
  return alert !== null && <p className={styles.alertText}>{alert.msg}</p>;
};

Alert.propTypes = {
  alert: PropTypes.object,
};

const mapStateToProps = (state) => ({
  alert: state.restaurants.alert,
});

export default connect(mapStateToProps)(Alert);
