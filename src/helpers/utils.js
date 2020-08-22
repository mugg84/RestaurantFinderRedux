import { useState } from 'react';
import Yelp from '../helpers/Yelp';
import { setAlert } from '../actions/restaurantAction';

import {
  GET_RESTAURANTS,
  GET_INFO_RESTAURANT,
  GET_DEFAULT_RESTAURANTS,
  GET_DEFAULT_THAI_RESTAURANTS,
  GET_DEFAULT_ITALIAN_RESTAURANTS,
  GET_DEFAULT_INDIAN_RESTAURANTS,
} from '../actions/types';

// Helpers for Yelp.js

export const searchRestaurantsHelper = (response) => {
  return response.data.businesses.map((business) => {
    return {
      id: business.id,
      image: business.image_url,
      name: business.name,
      url: business.url,
      price: business.price,
      phone: business.phone,
      categories: business.categories[0].title,
      address: business.location.display_address[0],
    };
  });
};

export const searchRestaurantsInfoHelper = (response, responseRew) => {
  const parameters = {
    name: response.data.name,
    address: response.data.location.display_address[0],
    coordinates: {
      lat: response.data.coordinates.latitude,
      lng: response.data.coordinates.longitude,
    },
    city: response.data.location.display_address[1],
    rating: response.data.rating,
    photos: response.data.photos,
    phone: response.data.phone,
    price: response.data.price,
    categories: response.data.categories[0].title,
    url: response.data.url,
    reviews: responseRew.data.reviews,
  };

  return parameters;
};

export const searchDefaultRestaurantsHelper = (response) =>
  response.data.businesses.map((business) => {
    return {
      id: business.id,
      image: business.image_url,
      name: business.name,
      url: business.url,
      price: business.price,
      phone: business.phone,
      rating: business.rating,
      categories: business.categories[0].title,
      address: business.location.display_address[0],
    };
  });

// Helpers restaurantAction.js

export const getRestaurantsHelper = async (text, dispatch) => {
  try {
    let restaurants = await Yelp.searchRestaurants(text);

    if (restaurants === [] || restaurants.length === 0) {
      return dispatch(setAlert('No restaurants in the area'));
    } else {
      dispatch({
        type: GET_RESTAURANTS,
        payload: restaurants,
      });
    }
  } catch (error) {
    dispatch(setAlert('Invalid search. Try different input'));
  }
};

export const getRestaurantsInfoHelper = async (id, dispatch) => {
  try {
    let restaurant = await Yelp.searchRestaurantsInfo(id);

    if (restaurant.length === 0 || restaurant === []) {
      return dispatch(
        setAlert('Restaurant info not available. Please try again later')
      );
    } else {
      dispatch({
        type: GET_INFO_RESTAURANT,
        payload: restaurant,
      });
    }
  } catch (error) {
    dispatch(setAlert('Restaurant info not available. Please try again later'));
  }
};

export const getDefaultRestaurantsHelper = async (location, type, dispatch) => {
  try {
    let defaultRestaurants = await Yelp.SearchDefaultRestaurants(
      location,
      type
    );

    if (defaultRestaurants === [] || defaultRestaurants.length === 0) {
      return dispatch(setAlert('No restaurants in the area'));
    } else if (type === 'thai') {
      dispatch({
        type: GET_DEFAULT_THAI_RESTAURANTS,
        payload: defaultRestaurants,
      });
    } else if (type === 'italian') {
      dispatch({
        type: GET_DEFAULT_ITALIAN_RESTAURANTS,
        payload: defaultRestaurants,
      });
    } else if (type === 'indpak') {
      dispatch({
        type: GET_DEFAULT_INDIAN_RESTAURANTS,
        payload: defaultRestaurants,
      });
    } else {
      dispatch({
        type: GET_DEFAULT_RESTAURANTS,
        payload: defaultRestaurants,
      });
    }
  } catch (error) {
    dispatch(setAlert('Something went wrong'));
  }
};

export const getDefaultThaiRestaurantsHelper = async (location, dispatch) => {
  try {
    let defaultThaiRestaurants = await Yelp.SearchDefaultThaiRestaurants(
      location
    );

    if (defaultThaiRestaurants === [] || defaultThaiRestaurants.length === 0) {
      return dispatch(setAlert('No Thai restaurants in the area'));
    } else {
      dispatch({
        type: GET_DEFAULT_THAI_RESTAURANTS,
        payload: defaultThaiRestaurants,
      });
    }
  } catch (error) {
    dispatch(setAlert('Something went wrong'));
  }
};

export const getDefaultItalianRestaurantsHelper = async (
  location,
  dispatch
) => {
  try {
    let defaultItalianRestaurants = await Yelp.SearchDefaultItalianRestaurants(
      location
    );

    if (
      defaultItalianRestaurants === [] ||
      defaultItalianRestaurants.length === 0
    ) {
      return dispatch(setAlert('No Italian restaurants in the area'));
    } else {
      dispatch({
        type: GET_DEFAULT_ITALIAN_RESTAURANTS,
        payload: defaultItalianRestaurants,
      });
    }
  } catch (error) {
    dispatch(setAlert('Something went wrong'));
  }
};

export const getDefaultIndianRestaurantsHelper = async (location, dispatch) => {
  try {
    let defaultIndianRestaurants = await Yelp.SearchDefaultIndianRestaurants(
      location
    );

    if (
      defaultIndianRestaurants === [] ||
      defaultIndianRestaurants.length === 0
    ) {
      return dispatch(setAlert('No Indian restaurants in the area'));
    } else {
      dispatch({
        type: GET_DEFAULT_INDIAN_RESTAURANTS,
        payload: defaultIndianRestaurants,
      });
    }
  } catch (error) {
    dispatch(setAlert('Something went wrong'));
  }
};

export const useCustomHook = (initialState) => {
  const [where, setPlace] = useState(initialState);
  const [what, setCousine] = useState('');
  const [sortBy, setSortType] = useState('rating');

  return {
    where,
    what,
    sortBy,
    setWhere: (place) => setPlace(place),
    setWhat: (cousine) => setCousine(cousine),
    setSortBy: (type) => setSortType(type),
  };
};
