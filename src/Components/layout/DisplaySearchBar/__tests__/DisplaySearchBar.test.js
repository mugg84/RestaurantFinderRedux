import React from 'react';
import { mount } from 'enzyme';

import { DisplaySearchBar as BaseDisplaySearchBar } from '../../../layout/DisplaySearchBar/DisplaySearchBar';

const props = {
  renderSortByOptions: jest.fn(),
  onSubmit: jest.fn(),
  where: '',
  handleChange: jest.fn(),
  what: '',
  handleScriptLoad: jest.fn(),
  clearSearch: jest.fn(),
};

let wrapper;

jest.mock('../../Alert/Alert', () => ({
  default: () => null,
  __esModule: true,
}));

let restaurants = [];
const clearSearch = jest.fn();

describe('Search', () => {
  beforeEach(() => {
    wrapper = mount(
      <BaseDisplaySearchBar
        {...props}
        clearSearch={clearSearch}
        restaurants={restaurants}
      />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('1- if "where" input changes handleChange is called', () => {
    wrapper
      .find('[name="where"]')
      .at(0)
      .simulate('change', { target: { value: 'foo', name: 'where' } });

    expect(props.handleChange).toHaveBeenCalled();
  });

  test('2- if "what" input changes handleChange is called', () => {
    wrapper
      .find('[name="where"]')
      .at(0)
      .simulate('change', { target: { value: 'foo', name: 'where' } });

    expect(props.handleChange).toHaveBeenCalled();
  });

  test('3- if "restaurants" empty ClearButton is not rendered ', () => {
    const clear = wrapper.find('[data-test="clear"]');

    expect(clear.length).toBe(0);
  });

  test('4- on ClearButton click CLEAR_SEARCH action is dispatched', () => {
    restaurants = ['foo'];
    wrapper = mount(
      <BaseDisplaySearchBar
        {...props}
        clearSearch={clearSearch}
        restaurants={restaurants}
      />
    );
    wrapper.find('[data-test="clear"]').simulate('click');

    expect(clearSearch).toHaveBeenCalled();
  });
});
