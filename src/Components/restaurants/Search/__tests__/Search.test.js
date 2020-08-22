import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import Search from './../Search';
import DisplaySearchBar from '../../../layout/DisplaySearchBar/DisplaySearchBar';

import { SET_LOADING, SET_ALERT } from '../../../../actions/types';

const mockStore = configureStore([thunk]);
const initialState = {
  restaurants: { restaurants: ['foo'], alert: null },
};

let wrapper, store;

describe('Search', () => {
  beforeEach(() => {
    store = mockStore(initialState);

    wrapper = mount(
      <Provider store={store}>
        <Search />
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('1 - renders without errors', () => {
    expect(wrapper.find(DisplaySearchBar)).toHaveLength(1);
  });

  test('2 - if restaurants clearButton is rendered', () => {
    expect(wrapper.find('[data-test="clear"]')).toBeTruthy();
  });

  test('3 - setAlert called if search button is pressed with no input', () => {
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    const actions = store.getActions();
    const expected = {
      type: SET_ALERT,
      payload: expect.objectContaining({ msg: 'Please fill all the inputs' }),
    };
    expect(actions[0]).toMatchObject(expected);
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
    
    const actions = store.getActions();
    const expected = {
      type: SET_LOADING,
    };
    expect(actions).toContainEqual(expected);
  });
});
