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
} from '../actions/types';

const initalState = {
  restaurants: [],
  restaurant: {},
  loading: false,
  location: [],
  defaultRestaurants: [],
  defaultThaiRestaurants: [],
  defaultItalianRestaurants: [],
  defaultIndianRestaurants: [],
  alert: null,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case GET_RESTAURANTS:
      return { ...state, restaurants: action.payload, loading: false };
    case GET_INFO_RESTAURANT:
      return { ...state, restaurant: action.payload, loading: false };
    case GET_DEFAULT_RESTAURANTS:
      return { ...state, defaultRestaurants: action.payload };
    case GET_DEFAULT_THAI_RESTAURANTS:
      return { ...state, defaultThaiRestaurants: action.payload };
    case GET_DEFAULT_ITALIAN_RESTAURANTS:
      return { ...state, defaultItalianRestaurants: action.payload };
    case GET_DEFAULT_INDIAN_RESTAURANTS:
      return { ...state, defaultIndianRestaurants: action.payload };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_LOCATION:
      return { ...state, location: action.payload };
    case CLEAR_SEARCH:
      return { ...state, restaurants: [], loading: false };
    case SET_ALERT:
      return { ...state, alert: action.payload, loading: false };
    case REMOVE_ALERT:
      return { ...state, alert: null };
    default:
      return state;
  }
};
