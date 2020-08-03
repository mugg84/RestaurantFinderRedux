import Yelp from './Yelp';

jest.mock('axios');

it('returns array of restaurnats obj', async () => {
  const restaurant = await Yelp.searchRestaurants({
    what: 'taco',
    where: 'rome',
    sortBy: 'rating',
  });
  expect(restaurant).toBe();
});
