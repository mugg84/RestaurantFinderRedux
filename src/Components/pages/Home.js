import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCoordinates } from '../../actions/restaurantAction';
import Search from '../../Components/restaurants/Search';
import Navbar from '../../Components/layout/Navbar';
import DisplatDefaultRestaurants from '../../Components/layout/DisplayDefaultRestaurants';
import DisplayRestaurants from '../../Components/layout/DisplayRestaurants';
import Footer from '../../Components/layout/Footer';
import { Waypoint } from 'react-waypoint';

const Home = ({ fetchCoordinates }) => {
  useEffect(() => {
    fetchCoordinates();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);

  const handleWaypointEnter = () => {
    document.querySelector('.fixed').style.opacity = '0';
  };
  const handleWaypointLeave = () => {
    document.querySelector('.fixed').style.opacity = '100';
  };

  return (
    <section className="main-home">
      <Fragment>
        <Navbar className="sticky nav-home" />
        <Search />
        <Waypoint
          onEnter={handleWaypointEnter}
          onLeave={handleWaypointLeave}
          topOffset="7%"
        />
        <Navbar className="fixed" />
        <DisplayRestaurants />
        <DisplatDefaultRestaurants />
        <Footer />
      </Fragment>
    </section>
  );
};

Home.propTypes = {
  fetchCoordinates: PropTypes.func.isRequired,
};

export default connect(null, { fetchCoordinates })(Home);
