import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import {
  DisplaySearchBar as BaseDisplaySearchBar,
  default as DisplaySearchBar
} from '../../../layout/DisplaySearchBar/DisplaySearchBar';

const mockStore = configureStore();
const initialState = {
  restaurants: { restaurants: [], alert: null },
};
const props = {
  renderSortByOptions: jest.fn(),
  onSubmit: jest.fn(),
  where: '',
  handleChange: jest.fn(),
  what: '',
  handleScriptLoad: jest.fn(),
  clearSearch: jest.fn(),
};

let wrapper, store;

jest.mock('../../Alert/Alert', () => ({
  default: () => null,
  __esModule: true
}));

describe('Search', () => {
  beforeEach(() => {
    store = mockStore(initialState);

    wrapper = mount(
      <Provider store={store}>
        <DisplaySearchBar {...props} />
      </Provider>
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
    const restaurants = ['foo'];
    const clearSearch = jest.fn();

    wrapper = mount(
      <BaseDisplaySearchBar
        {...props}
        clearSearch={clearSearch}
        restaurants={restaurants}
      />
    );

    wrapper
      .find('[data-test="clear"]')
      .at(0)
      .simulate('click');

    expect(clearSearch).toHaveBeenCalled();
  });
});
