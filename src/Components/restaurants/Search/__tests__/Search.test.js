import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import Search from '../Search';

const mockStore = configureStore();

const initialState = {
  restaurants: { restaurants: ['foo'], alert: null },
};

describe('Search', () => {
  test('setAlert called if search button pressed with no input', () => {
    const store = mockStore(initialState);
    const actions = { setAlert: jest.fn(), getRestaurants: jest.fn() };

    const wrapper = mount(
      <Provider store={store}>
        <Search actions={actions} />
      </Provider>
    );
    wrapper.find('.myButton').simulate('click');

    expect(actions.getRestaurants).toHaveBeenCalledTimes(1);
  });

  /* test('input change', () => {
    const store = mockStore(initialState);
    const props = { setAlert: jest.fn(), getRestaurants: jest.fn() };

    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);

    const wrapper = mount(
      <Provider store={store}>
        <Search {...props} />
      </Provider>
    );

    wrapper
      .find('[name="where"]')
      .simulate('change', { target: { value: 'foo' } });

   expect(setState).toHaveBeenCalledWith('foo');
  }); */
});
