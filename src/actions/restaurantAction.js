import { getCurrentPosition } from '../helpers/GeoLocation';
import {
  getRestaurantsHelper,
  getRestaurantsInfoHelper,
  getDefaultRestaurantsHelper,
} from '../helpers/utils';

import {
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
export const getDefaultRestaurants = (location, type) => async (dispatch) => {
  if (location.length > 0) {
    getDefaultRestaurantsHelper(location, type, dispatch);
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

// Set alert
export const setAlert = (msg) => (dispatch) => {
  dispatch({
    type: SET_ALERT,
    payload: { msg },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000);
};
