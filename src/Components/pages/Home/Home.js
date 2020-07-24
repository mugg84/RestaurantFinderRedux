import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCoordinates } from '../../../actions/restaurantAction';
import Search from '../../restaurants/Search/Search';
import Navbar from '../../layout/Navbar/Navbar';
import DisplatDefaultRestaurants from '../../layout/DisplayDefaultRestaurants/DisplayDefaultRestaurants';
import DisplayRestaurants from '../../layout/DisplayRestaurants/DisplayRestaurants';
import ParallaxPics from '../../layout/ParallaxPics/ParallaxPics';
import Footer from '../../layout/Footer/Footer';
import { Waypoint } from 'react-waypoint';

import './Home.scss';

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
      <>
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
        <ParallaxPics />
        <Footer />
      </>
    </section>
  );
};

Home.propTypes = {
  fetchCoordinates: PropTypes.func.isRequired,
};

export default connect(null, { fetchCoordinates })(Home);
