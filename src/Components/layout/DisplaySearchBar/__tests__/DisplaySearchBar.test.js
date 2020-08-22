import React from 'react';
import { mount } from 'enzyme';

import { DisplaySearchBar as BaseDisplaySearchBar } from '../../../layout/DisplaySearchBar/DisplaySearchBar';

let wrapper;

jest.mock('../../Alert/Alert', () => ({
  default: () => null,
  __esModule: true,
}));
const getRestaurants = jest.fn();
const setAlert = jest.fn();
let restaurants = [];
const clearSearch = jest.fn();

describe('Search', () => {
  beforeEach(() => {
    wrapper = mount(
      <BaseDisplaySearchBar
        clearSearch={clearSearch}
        restaurants={restaurants}
        getRestaurants={getRestaurants}
        setAlert={setAlert}
      />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('1- if "what" input changes handleChange is called', () => {
    wrapper.find('[name="what"]').simulate('change', {
      target: { value: 'foo', name: 'what' },
    });

    expect(wrapper.find('[name="what"]').prop('value')).toBe('foo');
  });

  test('2- if "where" input changes handleChange is called', () => {
    wrapper
      .find('[name="where"]')
      .simulate('change', { target: { value: 'foo', name: 'where' } });

    expect(wrapper.find('[name="where"]').prop('value')).toBe('foo');
  });

  test('3- if "restaurants" empty ClearButton is not rendered ', () => {
    const clear = wrapper.find('[data-test="clear"]');

    expect(clear.length).toBe(0);
  });

  test('4- on ClearButton "clearSearch" is called', () => {
    restaurants = ['foo'];
    wrapper = mount(
      <BaseDisplaySearchBar
        clearSearch={clearSearch}
        restaurants={restaurants}
        getRestaurants={getRestaurants}
        setAlert={setAlert}
      />
    );
    wrapper.find('[data-test="clear"]').simulate('click');

    expect(clearSearch).toHaveBeenCalled();
  });

  test('5 - setAlert called if search button is pressed with no input', () => {
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    expect(setAlert).toHaveBeenCalled();
  });

  test('6 - getRestaurants called when inputs filled and search button clicked ', () => {
    wrapper
      .find('[name="where"]')
      .simulate('change', { target: { value: 'foo', name: 'where' } });

    wrapper
      .find('[name="what"]')
      .simulate('change', { target: { value: 'foo', name: 'what' } });

    wrapper.find('[data-test="best_match"]').simulate('click');

    wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    expect(getRestaurants).toHaveBeenCalled();
  });
});
