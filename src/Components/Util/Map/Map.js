import React from 'react';
import GoogleMapReact from 'google-map-react';

import styles from './Map.module.scss';

const Marker = () => <i className="fas fa-map-marker-alt"></i>;

const SimpleMap = (center) => {
  const renderMap = () => {
    if (center === undefined) {
      return (
        <img
          src={require('../../../Images/no-image-avaiable.jpg')}
          alt="Map not available"
        />
      );
    } else if (center.coord) {
      return (
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_API_KEY,
          }}
          defaultCenter={center.coord}
          defaultZoom={18}
        >
          <Marker lat={center.coord.lat} lng={center.coord.lng} />
        </GoogleMapReact>
      );
    }
  };

  return <div className={styles.mapHolder}>{renderMap()}</div>;
};

export default SimpleMap;
