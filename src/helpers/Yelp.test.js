import Yelp from './Yelp';
import axios from 'axios';

jest.mock('axios');

describe('testing searchRestaurantsInfo', () => {
  test('returns object with restaurant infos', async () => {
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

    await expect(
      Yelp.searchRestaurantsInfo('q_IoMdeM57U70GwqjXxGJw')
    ).resolves.toEqual(params);
  });
});
