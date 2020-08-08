import Yelp from './Yelp';
import axios from 'axios';

import {
  searchRestaurantsInfoHelper,
  searchRestaurantsHelper,
  searchDefaultRestaurantsHelper,
} from './utils';

jest.mock('./utils.js');
jest.mock('axios');

describe('SearchRestaurants', () => {
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

  test('2 - searchRestaurantsHelper and axios called once', async () => {
    axios.get.mockImplementationOnce(() => {
      const response = { data: { businesses: ['foo'] } };
      return Promise.resolve(response);
    });

    searchRestaurantsHelper.mockImplementation(() => 'foo');
    await expect(Yelp.searchRestaurants(mock.input)).resolves.toEqual('foo');
    expect(searchRestaurantsHelper).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  test('4 - if no restaurants returned returns "[]"', async () => {
    axios.get.mockImplementationOnce(() => {
      const response = { data: { businesses: [] } };
      return Promise.resolve(response);
    });

    await expect(Yelp.searchRestaurants(mock.input)).resolves.toEqual([]);
  });

  test('5 - if request rejected throws error', async () => {
    axios.get.mockImplementationOnce(() => {
      return Promise.rejects();
    });

    await expect(Yelp.searchRestaurants(mock.input)).rejects.toThrow(Error);
  });
});

describe('SearchRestaurantsInfo', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('8 - searchRestaurantsInfoHelper called once, axios called twice', async () => {
    axios.get.mockImplementation(() => {
      return Promise.resolve('foo');
    });

    searchRestaurantsInfoHelper.mockImplementation(() => 'foo');

    await expect(
      Yelp.searchRestaurantsInfo('q_IoMdeM57U70GwqjXxGJw')
    ).resolves.toEqual('foo');

    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(searchRestaurantsInfoHelper).toHaveBeenCalledTimes(1);
  });

  test('if response empty returns "[]"', async () => {
    axios.get.mockImplementation(() => {
      return Promise.resolve([]);
    });

    await expect(
      Yelp.searchRestaurantsInfo('q_IoMdeM57U70GwqjXxGJw')
    ).resolves.toEqual([]);
  });

  test('9 - if request rejected throws error', async () => {
    axios.get.mockImplementationOnce(() => {
      return Promise.rejects();
    });

    await expect(
      Yelp.searchRestaurantsInfo('q_IoMdeM57U70GwqjXxGJw')
    ).rejects.toThrow(Error);
  });
});

describe('SearchDefaultRestaurants', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('searchDefaultRestaurantsHelper and axios called once', async () => {
    axios.get.mockImplementationOnce(() => {
      const response = { data: { businesses: 'foo' } };
      return Promise.resolve(response);
    });

    searchDefaultRestaurantsHelper.mockImplementation(() => 'foo');

    await expect(Yelp.SearchDefaultRestaurants([1, 1])).resolves.toEqual('foo');
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(searchDefaultRestaurantsHelper).toHaveBeenCalledTimes(1);
  });

  test('if response empty returns "[]"', async () => {
    axios.get.mockImplementationOnce(() => {
      const response = { data: { businesses: [] } };
      return Promise.resolve(response);
    });

    await expect(Yelp.SearchDefaultRestaurants([1, 1])).resolves.toEqual([]);
  });

  test('if request rejected throws error', async () => {
    axios.get.mockImplementationOnce(() => {
      return Promise.rejects();
    });

    await expect(Yelp.SearchDefaultRestaurants([1, 1])).rejects.toThrow(Error);
  });
});
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
    searchRestaurantsInfoHelper.mockImplementationOnce(() => params);

    await expect(
      Yelp.searchRestaurantsInfo('q_IoMdeM57U70GwqjXxGJw')
    ).resolves.toEqual(params);
  });
  */
