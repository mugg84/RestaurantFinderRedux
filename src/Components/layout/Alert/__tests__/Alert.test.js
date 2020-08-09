import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Alert from '../Alert';

const mockStore = configureStore();

describe('Alert', () => {

test('renders nothing with initial state msg null', () => {
  const initialState = {
    restaurants: { alert: { msg: null } },
  };
  const store = mockStore(initialState);
  const alertMount = mount(
    <Provider store={store}>
      <Alert />
    </Provider>
  );

  expect(alertMount.find(".alertText").text()).toBe('');
});

  test('displays alert message', () => {
    const state = {
      restaurants: { alert: { msg: 'foo' } },
    };
    const store = mockStore(state);
    const alertMount = mount(
      <Provider store={store}>
        <Alert />
      </Provider>
    );

    expect(alertMount.find('.alertText').text()).toBe('foo');
  });
});
