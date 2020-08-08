import Yelp from '../helpers/Yelp';
import { getCurrentPosition } from '../helpers/GeoLocation';
import {
  getRestaurantsHelper,
  getRestaurantsInfoHelper,
  getDefaultRestaurantsHelper,
  getDefaultThaiRestaurantsHelper,
  getDefaultItalianRestaurantsHelper,
} from '../helpers/utils';

import {
  GET_DEFAULT_ITALIAN_RESTAURANTS,
  GET_DEFAULT_INDIAN_RESTAURANTS,
  CLEAR_SEARCH,
  SET_LOADING,
  GET_LOCATION,
  SET_ALERT,
  REMOVE_ALERT,
} from './types';

// Get Restaurants
export const getRestaurants = (text) => async (dispatch) => {
  dispatch(setLoading());

  getRestaurantsHelper(text, dispatch);
};

// Get Restaurants Info
export const getRestaurantInfo = (id) => async (dispatch) => {
  dispatch(setLoading());
  getRestaurantsInfoHelper(id, dispatch);
};

// Get default restaurants
export const getDefaultRestaurants = (location) => async (dispatch) => {
  if (location.length > 0) {
    getDefaultRestaurantsHelper(location, dispatch);
  }
};

export const getDefaultThaiRestaurants = (location) => async (dispatch) => {
  if (location.length > 0) {
    getDefaultThaiRestaurantsHelper(location, dispatch);
  }
};

export const getDefaultItalianRestaurants = (location) => async (dispatch) => {
  if (location.length > 0) {
    getDefaultItalianRestaurantsHelper(location, dispatch);
  }
};

export const getDefaultIndianRestaurants = (location) => async (dispatch) => {
  if (location.length > 0) {
    let defaultIndianRestaurants = await Yelp.SearchDefaultIndianRestaurants(
      location
    );

    if (
      defaultIndianRestaurants === [] ||
      defaultIndianRestaurants.length === 0
    ) {
      return dispatch(setAlert('No indian restaurants in the area'));
    } else if (defaultIndianRestaurants === 'Error') {
      return dispatch(setAlert('Something went wrong'));
    } else {
      dispatch({
        type: GET_DEFAULT_INDIAN_RESTAURANTS,
        payload: defaultIndianRestaurants,
      });
    }
  }
};

// Get location
export const fetchCoordinates = () => async (dispatch) => {
  try {
    const { coords } = await getCurrentPosition();
    dispatch({
      type: GET_LOCATION,
      payload: [coords.latitude.toFixed(5), coords.longitude.toFixed(5)],
    });
  } catch (error) {
    dispatch(setAlert('Location not available'));
  }
};

// Set loading
export const setLoading = () => ({ type: SET_LOADING });

// Clear search
export const clearSearch = () => ({ type: CLEAR_SEARCH });

/// Set alert
export const setAlert = (msg, type) => (dispatch) => {
  dispatch({
    type: SET_ALERT,
    payload: { msg, type },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000);
};
