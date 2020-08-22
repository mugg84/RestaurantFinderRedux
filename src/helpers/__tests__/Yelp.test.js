import Yelp from '../Yelp';
import axios from 'axios';

import {
  searchRestaurantsInfoHelper,
  searchRestaurantsHelper,
  searchDefaultRestaurantsHelper,
} from '../utils.js';

jest.mock('../utils.js');
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

  test('1 - searchRestaurantsHelper and axios called once', async () => {
    axios.get.mockImplementationOnce(() => {
      const response = { data: { businesses: ['foo'] } };
      return Promise.resolve(response);
    });

    searchRestaurantsHelper.mockImplementation(() => 'foo');
    await expect(Yelp.searchRestaurants(mock.input)).resolves.toEqual('foo');
    expect(searchRestaurantsHelper).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  /*  test('2 - if no restaurants returned returns "[]"', async () => {
    axios.get.mockImplementationOnce(() => {
      const response = { data: { businesses: [] } };
      return Promise.resolve(response);
    });

    await expect(Yelp.searchRestaurants(mock.input)).resolves.toEqual([]);
  });

  test('3 - if request rejected throws error', async () => {
    axios.get.mockImplementationOnce(() => {
      const response = { data: { businesses: [] }, status: 400 };
      return Promise.rejects(response);
    });

    await expect(Yelp.searchRestaurants(mock.input)).rejects.toThrow(Error);
  });
});

describe('SearchRestaurantsInfo', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('4 - searchRestaurantsInfoHelper called once, axios called twice', async () => {
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

  test('5 - if response empty returns "[]"', async () => {
    axios.get.mockImplementation(() => {
      return Promise.resolve([]);
    });

    await expect(
      Yelp.searchRestaurantsInfo('q_IoMdeM57U70GwqjXxGJw')
    ).resolves.toEqual([]);
  });

  test('6 - if request rejected throws error', async () => {
    axios.get.mockImplementationOnce(() => {
      const response = { data: { businesses: [] }, status: 400 };
      return Promise.rejects(response);
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

  test('7 - searchDefaultRestaurantsHelper and axios called once', async () => {
    axios.get.mockImplementationOnce(() => {
      const response = { data: { businesses: 'foo' } };
      return Promise.resolve(response);
    });

    searchDefaultRestaurantsHelper.mockImplementation(() => 'foo');

    await expect(Yelp.SearchDefaultRestaurants([1, 1])).resolves.toEqual('foo');
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(searchDefaultRestaurantsHelper).toHaveBeenCalledTimes(1);
  });

  test('8 -if response empty returns "[]"', async () => {
    axios.get.mockImplementationOnce(() => {
      const response = { data: { businesses: [] } };
      return Promise.resolve(response);
    });

    await expect(Yelp.SearchDefaultRestaurants([1, 1])).resolves.toEqual([]);
  });

  test('9 - if request rejected throws error', async () => {
    axios.get.mockImplementationOnce(() => {
      const response = { data: { businesses: [] }, status: 400 };
      return Promise.rejects(response);
    });

    await expect(Yelp.SearchDefaultRestaurants([1, 1])).rejects.toThrow(Error);
  }); */
});
