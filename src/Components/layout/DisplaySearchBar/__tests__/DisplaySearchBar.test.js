/* import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { render, fireEvent } from '@testing-library/react';

import DisplaySearchBar from '../../../layout/DisplaySearchBar/DisplaySearchBar';

const mockStore = configureStore();
const initialState = {
  restaurants: { restaurants: ['foo'], alert: null },
};
const store = mockStore(initialState);
const props = {
  renderSortByOptions: jest.fn(),
  onSubmit: jest.fn(),
  where: '',
  handleChange: jest.fn(),
  what: '',
  handleScriptLoad: jest.fn(),
  restaurants: [],
  clearSearch: jest.fn(),
};

describe('Search', () => {
  test('', () => {
    const { getByText } = render(
      <Provider store={store}>
        <DisplaySearchBar {...props} />
      </Provider>
    );

    const button = getByText('Search');
    //fireEvent.click(button);
  });
});
 */