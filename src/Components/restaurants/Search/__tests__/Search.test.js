import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import Search from './../Search';
import DisplaySearchBar from '../../../layout/DisplaySearchBar/DisplaySearchBar';

const mockStore = configureStore([thunk]);
const initialState = {
  restaurants: { restaurants: ['foo'], alert: null },
};
const store = mockStore(initialState);
const props = { setAlert: jest.fn(), getRestaurants: jest.fn() };
const wrapper = mount(
  <Provider store={store}>
    <Search props={props} />
  </Provider>
);

describe('Search', () => {
  beforeEach(() => {
    const form = wrapper.find('form').first();
    form.simulate('submit', {
      preventDefault: () => {},
    });
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
    wrapper.find('[data-test="search"]').simulate('click');
    //expect(store.getActions().length).toBe(1);
    expect(wrapper.props().children.props.props.setAlert).toHaveBeenCalled();
  });

  test('4 - getRestaurant called when inputs filled and search button clicked ', () => {
    wrapper
      .find('[name="where"]')
      .simulate('change', { target: { value: 'foo' } });

    wrapper
      .find('[name="what"]')
      .simulate('change', { target: { value: 'foo' } });

    wrapper.find('[data-test="best_match"]').simulate('click');

    wrapper.find('[data-test="search"]').simulate('click');

    expect(
      wrapper.props().children.props.props.getRestaurants
    ).toHaveBeenCalled();
  });
});
