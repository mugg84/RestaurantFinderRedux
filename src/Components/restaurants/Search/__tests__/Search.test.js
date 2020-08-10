import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import Search from '../Search';
import DisplaySearchBar from '../../../layout/DisplaySearchBar/DisplaySearchBar';

const mockStore = configureStore();

describe('Search', () => {
  test('renders withut errors', () => {
    const initialState = {
      restaurants: { alert: { msg: 'foo' } },
    };

    const store = mockStore(initialState);
    const wrapper = shallow(
      <Provider store={store}>
        <Search setAlert={jest.fn()} getRestaurants={jest.fn()} />
      </Provider>
    );
    wrapper.find(DisplaySearchBar).props();
  });
});
