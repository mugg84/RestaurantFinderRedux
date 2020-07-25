import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './Navbar.module.scss';

const Navbar = ({ className }) => {
  const [scrollDir, setScrollDir] = useState('scrolling down');

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? 'scrolling down' : 'scrolling up');
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
    // eslint-disable-next-line
  }, []);

  return (
    <nav
      className={`${className} ${
        scrollDir === 'scrolling down' && className === 'sticky'
          ? `${styles.hide}`
          : `${styles.show}`
      }`}
    >
      <p className={styles.logoBig}>
        <i className="fas fa-pizza-slice"></i>FoodFinder
      </p>
      <p className={styles.logoSmall}>
        <i className="fas fa-pizza-slice"></i>
      </p>
      <ul>
        <li className={styles.navBigIcon}>
          <Link to="/">Home</Link>
        </li>
        <li className={styles.navBigIcon}>
          <Link to="/about">About</Link>
        </li>
        <li className={styles.navSmallIcon}>
          <Link to="/">
            <i className="fas fa-home"></i>
          </Link>
        </li>
        <li className={styles.navSmallIcon}>
          <Link to="/about">
            <i className="fas fa-info-circle"></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
