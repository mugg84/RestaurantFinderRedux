import React, { useEffect } from 'react';
import DisplayAbout from '../../layout/DisplayAbout/DisplayAbout';
import Footer from '../../layout/Footer/Footer';
import Navbar from '../../layout/Navbar/Navbar';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);

  return (
    <section className="about-container">
      <Navbar className="sticky nav-about" />
      <DisplayAbout />
      <Footer />
    </section>
  );
};

export default About;
