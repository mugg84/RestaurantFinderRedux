import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { Search as BaseSearch } from './../Search';
import { DisplaySearchBar as BaseDisplaySearchBar } from '../../../layout/DisplaySearchBar/DisplaySearchBar';

const mockStore = configureStore([thunk]);
const initialState = {
  restaurants: { restaurants: ['foo'], alert: null },
};

const getRestaurants = jest.fn();
const setAlert = jest.fn();

let wrapper, store;

describe('Search', () => {
  beforeEach(() => {
    store = mockStore(initialState);

    wrapper = mount(
      <Provider store={store}>
        <BaseSearch setAlert={setAlert} getRestaurants={getRestaurants} />
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('1 - renders without errors', () => {
    expect(wrapper.find(BaseDisplaySearchBar)).toHaveLength(1);
  });

  test('2 - if restaurants clearButton is rendered', () => {
    expect(wrapper.find('[data-test="clear"]')).toBeTruthy();
  });

  test('3 - setAlert called if search button is pressed with no input', () => {
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    expect(setAlert).toHaveBeenCalled();
  });

  test('4 - setLoading called when inputs filled and search button clicked ', () => {
    wrapper
      .find('[name="where"]')
      .at(0)
      .simulate('change', { target: { value: 'foo', name: 'where' } });

    wrapper
      .find('[name="what"]')
      .at(0)
      .simulate('change', { target: { value: 'foo', name: 'what' } });

    wrapper
      .find('[data-test="best_match"]')
      .at(0)
      .simulate('click');

    wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    expect(getRestaurants).toHaveBeenCalled();
  });
});
