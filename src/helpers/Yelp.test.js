import Yelp from './Yelp';
import axios from 'axios';

import {
  getRestaurantInfoHelper,
  searchRestaurantsHelper,
  searchDefaultRestaurantsHelper,
} from './utils';

jest.mock('./utils.js');
jest.mock('axios');

describe('Testing searchRestaurantsInfo', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('1 - searchRestaurantsInfo called once and returns something', async () => {
    await Yelp.searchRestaurantsInfo('q_IoMdeM57U70GwqjXxGJw');

    getRestaurantInfoHelper.mockImplementation(() => 'foo');

    expect(getRestaurantInfoHelper).toHaveBeenCalledTimes(1);
    await expect(
      Yelp.searchRestaurantsInfo('q_IoMdeM57U70GwqjXxGJw')
    ).resolves.toEqual('foo');
  });

  test('2 - axios.get called twice', async () => {
    await Yelp.searchRestaurantsInfo('q_IoMdeM57U70GwqjXxGJw');

    expect(axios.get).toHaveBeenCalledTimes(2);
  });
});

describe('Testing searchRestaurants', () => {
  const mock = {};
  beforeAll(() => {
    mock.input = {
      what: 'tacos',
      where: 'rome',
      sortBy: 'rating',
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('3 - searchRestaurantsHelper called once', async () => {
    axios.get.mockImplementationOnce(() => {
      const response = { data: { businesses: ['foo'] } };
      return Promise.resolve(response);
    });

    searchRestaurantsHelper.mockImplementation(() => 'foo');

    await Yelp.searchRestaurants(mock.input);

    expect(searchRestaurantsHelper).toHaveBeenCalledTimes(1);
  });

  test('4 - if get request empty searchRestaurant returns "[]"', async () => {
    axios.get.mockImplementationOnce(() => {
      const response = { data: { businesses: [] } };
      return Promise.resolve(response);
    });

    await expect(Yelp.searchRestaurants(mock.input)).resolves.toEqual([]);
  });

  test('5 - axios.get called once', async () => {
    await Yelp.searchRestaurants(mock.input);

    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});

/* test('Returns error if responses are empty', async () => {
    getRestaurantInfoHelper.mockImplementation(() => 'Error');

    await expect(
      Yelp.searchRestaurantsInfo('q_IoMdeM57U70GwqjXxGJw')
    ).resolves.toBe('Error');
  }); */
/*  test('Returns "Error" if responses are empty', async () => {
    searchRestaurantsHelper.mockImplementation(() => 'Error');

    await expect(
      Yelp.searchRestaurants(mock.input)
    ).resolves.toBe('Error');
  }); */

/*
  test('Returns object with restaurant info', async () => {
    const response = {
      data: {
        name: 'Casa Romana',
        location: {
          display_address: [
            "12 Upper Saint Martin's Lane",
            'London WC2H 9FB',
            'United Kingdom',
          ],
        },
        coordinates: { latitude: 52.6322649, longitude: -1.1314474 },

        rating: 4.5,
        photos: [
          'https://s3-media1.fl.yelpcdn.com/bphoto/4VUq4j1FF-n5bgXjtoC0Xw/o.jpg',
          'https://s3-media1.fl.yelpcdn.com/bphoto/4VUq4j1FF-n5bgXjtoC0Xw/o.jpg',
          'https://s3-media1.fl.yelpcdn.com/bphoto/4VUq4j1FF-n5bgXjtoC0Xw/o.jpg',
        ],
        phone: '+441162541174',
        price: '£££',
        categories: [{ alias: 'indpak', title: 'Indian' }],
        url:
          'https://www.yelp.com/biz/casa-romana-leicester?adjust_creative=7GHt4FY-2vjNyIPhQV7wcw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm',
      },
    };

    const responseRev = {
      data: {
        reviews: [
          {
            id: 'i_Q39aN9hwZzGDUb-IWpYw',
            rating: 5,
            text:
              'Proper Italian restaurant. Not Italian-themed, or serving Italian fusion cuisine, just a place with an Italian owner who makes solid, straightforward...',
            time_created: '2014-10-02 03:49:36',
            url:
              'https://www.yelp.com/biz/casa-romana-leicester?adjust_creative=7GHt4FY-2vjNyIPhQV7wcw&hrid=i_Q39aN9hwZzGDUb-IWpYw&utm_campaign=yelp_api_v3&utm_me',
            user: {
              id: '6tPD46XZSFllvgn2vTh51A',
              image_url:
                'https://s3-media3.fl.yelpcdn.com/photo/A4Ww6Ks2P9WsALqOFy9cOA/o.jpg',
              name: 'Espana S.',
              profile_url:
                'https://www.yelp.com/user_details?userid=6tPD46XZSFllvgn2vTh51A',
            },
          },
        ],
      },
    };

    const params = {
      name: 'Casa Romana',
      address: "12 Upper Saint Martin's Lane",
      coordinates: { lat: 52.6322649, lng: -1.1314474 },
      city: 'London WC2H 9FB',
      rating: 4.5,
      photos: [
        'https://s3-media1.fl.yelpcdn.com/bphoto/4VUq4j1FF-n5bgXjtoC0Xw/o.jpg',
        'https://s3-media1.fl.yelpcdn.com/bphoto/4VUq4j1FF-n5bgXjtoC0Xw/o.jpg',
        'https://s3-media1.fl.yelpcdn.com/bphoto/4VUq4j1FF-n5bgXjtoC0Xw/o.jpg',
      ],
      phone: '+441162541174',
      price: '£££',
      categories: 'Indian',
      url:
        'https://www.yelp.com/biz/casa-romana-leicester?adjust_creative=7GHt4FY-2vjNyIPhQV7wcw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm',
      reviews: [
        {
          id: 'i_Q39aN9hwZzGDUb-IWpYw',
          rating: 5,
          text:
            'Proper Italian restaurant. Not Italian-themed, or serving Italian fusion cuisine, just a place with an Italian owner who makes solid, straightforward...',
          time_created: '2014-10-02 03:49:36',
          url:
            'https://www.yelp.com/biz/casa-romana-leicester?adjust_creative=7GHt4FY-2vjNyIPhQV7wcw&hrid=i_Q39aN9hwZzGDUb-IWpYw&utm_campaign=yelp_api_v3&utm_me',
          user: {
            id: '6tPD46XZSFllvgn2vTh51A',
            image_url:
              'https://s3-media3.fl.yelpcdn.com/photo/A4Ww6Ks2P9WsALqOFy9cOA/o.jpg',
            name: 'Espana S.',
            profile_url:
              'https://www.yelp.com/user_details?userid=6tPD46XZSFllvgn2vTh51A',
          },
        },
      ],
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(response));
    axios.get.mockImplementationOnce(() => Promise.resolve(responseRev));
    getRestaurantInfoHelper.mockImplementationOnce(() => params);

    await expect(
      Yelp.searchRestaurantsInfo('q_IoMdeM57U70GwqjXxGJw')
    ).resolves.toEqual(params);
  });
  */
