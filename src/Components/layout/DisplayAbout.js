import React, { Fragment } from "react";
import Navbar from "./Navbar";
import { Waypoint } from "react-waypoint";
import Carousel from "react-multi-carousel";
import Fade from "react-reveal/Fade";

const DisplayAbout = () => {
  const handleWaypointEnter = () => {
    document.querySelector(".fixed").style.opacity = "0";
  };
  const handleWaypointLeave = () => {
    document.querySelector(".fixed").style.opacity = "100";
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 0 },
      items: 1,
    },
  };

  return (
    <Fragment>
      <section className="about">
        <hgroup className="aboutText">
          <Fade left>
            <h1>About this App</h1>
          </Fade>
          <Fade right>
            <p>Scroll for more</p>
          </Fade>
        </hgroup>
      </section>

      <Waypoint
        onEnter={handleWaypointEnter}
        onLeave={handleWaypointLeave}
        topOffset="10%"
      />
      <Navbar className="fixed" />

      <section className="goal">
        <h2>Our Goal</h2>
        <Carousel
          className="goal-carousel"
          responsive={responsive}
          infinite={true}
          transitionDuration={1000}
          focusOnSelect={true}
        >
          <figure>
            <Fade>
              <img
                src={require("../../Images/tim-mossholder-FH3nWjvia-U-unsplash.jpg")}
                alt="Who we are"
              />

              <figcaption>
                <h3>Something</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. In,
                  dolor fugiat deleniti voluptatibus dolores voluptate ducimus
                  provident ipsa.
                </p>
              </figcaption>
            </Fade>
          </figure>
          <figure>
            <Fade>
              <img
                src={require("../../Images/thomas-marban-EHK-EH1SRzQ-unsplash.jpg")}
                alt="Who we are"
              />

              <figcaption>
                <h3>Something</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. In,
                  dolor fugiat deleniti voluptatibus dolores voluptate ducimus
                  provident ipsa.
                </p>
              </figcaption>
            </Fade>
          </figure>

          <figure>
            <Fade>
              <img
                src={require("../../Images/priscilla-du-preez-XkKCui44iM0-unsplash.jpg")}
                alt="Who we are"
              />

              <figcaption>
                <h3>Something</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. In,
                  dolor fugiat deleniti voluptatibus dolores voluptate ducimus
                  provident ipsa.
                </p>
              </figcaption>
            </Fade>
          </figure>
        </Carousel>
      </section>

      <section className="who">
        <Fade clear>
          <article className="who-text">
            <h2>RestaurantFinder is a Lorem ipsum dolor</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In, dolor
              fugiat deleniti voluptatibus dolores voluptate ducimus provident
              ipsa. Natus consequatur itaque sed sequi expedita officiis
              explicabo! Quasi provident cupiditate eaque.
            </p>
          </article>

          <figure className="one">
            <img
              src={require("../../Images/priscilla-du-preez-XkKCui44iM0-unsplash.jpg")}
              alt="Who we are"
            />
          </figure>
          <figure className="two">
            <img
              src={require("../../Images/austin-distel-rxpThOwuVgE-unsplash.jpg")}
              alt="Who we are"
            />
          </figure>

          <figure className="three">
            <img
              src={require("../../Images/jakub-kapusnak-4f4YZfDMLeU-unsplash.jpg")}
              alt="Who we are"
            />
          </figure>

          <figure className="four">
            <img
              src={require("../../Images/andreas-klassen-gZB-i-dA6ns-unsplash.jpg")}
              alt="Who we are"
            />
          </figure>
          <figure className="five">
            <img
              src={require("../../Images/dan-gold-E6HjQaB7UEA-unsplash.jpg")}
              alt="Who we are"
            />
          </figure>
          <figure className="six">
            <img
              src={require("../../Images/peter-dawn-sxZ_Ca6MkWM-unsplash.jpg")}
              alt="Who we are"
            />
          </figure>
        </Fade>
      </section>

      <section className="values">
        <Fade clear>
          <h2>Our values</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In, dolor
            fugiat deleniti voluptatibus dolores voluptate ducimus provident
            ipsa. Natus consequatur itaque sed sequi expedita officiis
            explicabo! Quasi provident cupiditate eaque.
          </p>
        </Fade>

        <section className="values-grid">
          <Fade clear>
            <article className="value">
              <i className="fas fa-mobile-alt"></i>
              <h3>Mobile</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                ea incidunt soluta enim natus suscipit provident repudiandae,
                ipsum dolor maxime ab vitae magnam expedita
              </p>
            </article>
            <article className="value">
              <i className="fas fa-boxes"></i>
              <h3>Stable</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                ea incidunt soluta enim natus suscipit provident repudiandae,
                ipsum dolor maxime ab vitae magnam expedita
              </p>
            </article>
            <article className="value">
              <i className="far fa-clock"></i>
              <h3>Fast</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                ea incidunt soluta enim natus suscipit provident repudiandae,
                ipsum dolor maxime ab vitae magnam expedita
              </p>
            </article>
          </Fade>
          <Fade clear>
            <article className="value">
              <i className="fas fa-globe"></i>
              <h3>For the World</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                ea incidunt soluta enim natus suscipit provident repudiandae,
                ipsum dolor maxime ab vitae magnam expedita
              </p>
            </article>
            <article className="value">
              <i className="fas fa-crop-alt"></i>
              <h3>Scalable</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                ea incidunt soluta enim natus suscipit provident repudiandae,
                ipsum dolor maxime ab vitae magnam expedita
              </p>
            </article>
            <article className="value">
              <i className="fas fa-lock"></i>
              <h3>Secure</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                ea incidunt soluta enim natus suscipit provident repudiandae,
                ipsum dolor maxime ab vitae magnam expedita
              </p>
            </article>
          </Fade>
        </section>
      </section>
      <section className="work"></section>
    </Fragment>
  );
};

export default DisplayAbout;
