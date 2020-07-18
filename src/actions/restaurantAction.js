import Yelp from '../Components/Util/Yelp';
import { getCurrentPosition } from '../Components/Util/GeoLocation';

import {
  GET_RESTAURANTS,
  GET_INFO_RESTAURANT,
  GET_DEFAULT_RESTAURANTS,
  GET_DEFAULT_THAI_RESTAURANTS,
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

  let restaurants = await Yelp.searchRestaurants(text);

  if (restaurants === 'Zero Restaurants' || restaurants.length === 0) {
    return dispatch(setAlert('No restaurants in the area'));
  } else if (restaurants === 'Error') {
    return dispatch(setAlert('Invalid search. Try different input'));
  } else {
    dispatch({
      type: GET_RESTAURANTS,
      payload: restaurants,
    });
  }
};

// Get Restaurants Info
export const getRestaurantInfo = (id) => async (dispatch) => {
  dispatch(setLoading());
  let restaurant = await Yelp.searchRestaurantsInfo(id);

  if (restaurant.length === 0) {
    return dispatch(
      setAlert('Restaurant info not available. Please try again later')
    );
  } else if (restaurant === 'Error') {
    return dispatch(setAlert('Something went wrong'));
  } else {
    dispatch({
      type: GET_INFO_RESTAURANT,
      payload: restaurant,
    });
  }
};

// Get default restaurants
export const getDefaultRestaurants = (location) => async (dispatch) => {
  if (location.length > 0) {
    let defaultRestaurants = await Yelp.SearchDefaultRestaurants(location);

    if (
      defaultRestaurants === 'Zero Restaurants' ||
      defaultRestaurants.length === 0
    ) {
      return dispatch(setAlert('No restaurants in the area'));
    } else if (defaultRestaurants === 'Error') {
      return dispatch(setAlert('Something went wrong', 'error'));
    } else {
      dispatch({
        type: GET_DEFAULT_RESTAURANTS,
        payload: defaultRestaurants,
      });
    }
  }
};

export const getDefaultThaiRestaurants = (location) => async (dispatch) => {
  if (location.length > 0) {
    let defaultThaiRestaurants = await Yelp.SearchDefaultThaiRestaurants(
      location
    );

    if (
      defaultThaiRestaurants === 'Zero Restaurants' ||
      defaultThaiRestaurants.length === 0
    ) {
      return dispatch(setAlert('No thai restaurants in the area'));
    } else if (defaultThaiRestaurants === 'Error') {
      return dispatch(setAlert('Something went wrong'));
    } else {
      dispatch({
        type: GET_DEFAULT_THAI_RESTAURANTS,
        payload: defaultThaiRestaurants,
      });
    }
  }
};

export const getDefaultItalianRestaurants = (location) => async (dispatch) => {
  if (location.length > 0) {
    let defaultItaRestaurants = await Yelp.SearchDefaultItalianRestaurants(
      location
    );

    if (
      defaultItaRestaurants === 'Zero Restaurants' ||
      defaultItaRestaurants.length === 0
    ) {
      return dispatch(setAlert('No italian restaurants in the area'));
    } else if (defaultItaRestaurants === 'Error') {
      return dispatch(setAlert('Something went wrong'));
    } else {
      dispatch({
        type: GET_DEFAULT_ITALIAN_RESTAURANTS,
        payload: defaultItaRestaurants,
      });
    }
  }
};

export const getDefaultIndianRestaurants = (location) => async (dispatch) => {
  if (location.length > 0) {
    let defaultIndianRestaurants = await Yelp.SearchDefaultIndianRestaurants(
      location
    );

    if (
      defaultIndianRestaurants === 'Zero Restaurants' ||
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
