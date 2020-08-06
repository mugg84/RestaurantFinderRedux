import axios from 'axios';

import {
  getRestaurantInfoHelper,
  searchRestaurantsHelper,
  searchDefaultRestaurantsHelper,
} from './utils';

let YELP_API_KEY = process.env.REACT_APP_YELP_API_KEY;

const Yelp = {
  // Returns restaurant search resuts

  async searchRestaurants(text) {
    try {
      let response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=12&term=${text.what}&location=${text.where}&sort_by=${text.sortBy}`,
        {
          headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );

      if (response.data.businesses.length === 0) {
        return [];
      }

      return searchRestaurantsHelper(response);
    } catch (e) {
      console.log(e);
      return 'Error';
    }
  },

  async searchRestaurantsInfo(id) {
    try {
      let response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}`,
        {
          headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );

      let responseRew = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}/reviews`,
        {
          headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );

      /*   if (response.length === 0 || responseRew.length === 0) {
        return [];
      } */

      return getRestaurantInfoHelper(response, responseRew);
    } catch (e) {
      console.log(e);
      return 'Error';
    }
  },

  async SearchDefaultRestaurants(location) {
    try {
      let response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=6&latitude=${location[0]}&longitude=${location[1]}&categories=restaurants`,
        {
          headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );

      if (response.data.businesses.length === 0) {
        return [];
      }

      return searchDefaultRestaurantsHelper(response);
    } catch (e) {
      console.log(e);
      return 'Error';
    }
  },

  async SearchDefaultThaiRestaurants(location) {
    try {
      let response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=6&latitude=${location[0]}&longitude=${location[1]}&radius=40000&categories=thai`,
        {
          headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );

      if (response.data.businesses.length === 0) {
        return [];
      }

      return searchDefaultRestaurantsHelper(response);
    } catch (e) {
      console.log(e);
      return 'Error';
    }
  },

  async SearchDefaultItalianRestaurants(location) {
    try {
      let response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=6&latitude=${location[0]}&longitude=${location[1]}&radius=40000&categories=italian`,
        {
          headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );

      if (response.data.businesses.length === 0) {
        return [];
      }

      return searchDefaultRestaurantsHelper(response);
    } catch (e) {
      console.log(e);
      return 'Error';
    }
  },

  async SearchDefaultIndianRestaurants(location) {
    try {
      let response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=6&latitude=${location[0]}&longitude=${location[1]}&radius=40000&categories=indpak`,
        {
          headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );

      if (response.data.businesses.length === 0) {
        return [];
      }

      return searchDefaultRestaurantsHelper(response);
    } catch (e) {
      console.log(e);
      return 'Error';
    }
  },
};

export default Yelp;
