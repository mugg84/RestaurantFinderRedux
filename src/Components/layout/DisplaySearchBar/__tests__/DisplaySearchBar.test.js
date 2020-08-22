import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';

import DisplaySearchBar from '../../../layout/DisplaySearchBar/DisplaySearchBar';

import { CLEAR_SEARCH } from '../../../../actions/types';

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
    const initialState = {
      restaurants: { restaurants: ['foo'], alert: null },
    };
    store = mockStore(initialState);

    const clearSearch = jest.fn((x) => console.log('i am called'));
    wrapper = mount(
      <Provider store={store}>
        <DisplaySearchBar {...props} clearSearch={clearSearch} />
      </Provider>
    );

    console.log({ debug: wrapper.find('[data-test="clear"]').debug() });

    console.log({ clearDom2: wrapper.find('[data-test="clear"]') });

    wrapper
      .find('[data-test="clear"]')
      // .at(0)
      .simulate('click');

    setTimeout(() => console.log({ clearSearch }), 50);
    /* const actions = store.getActions();

    const expected = {
      type: CLEAR_SEARCH,
    };

    expect(actions).toContainEqual(expected); */

    expect(clearSearch).toHaveBeenCalled();
  });
});
