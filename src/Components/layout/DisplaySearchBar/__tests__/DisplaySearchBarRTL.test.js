import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

import { DisplaySearchBar as BaseDisplaySearchBar } from '../../../layout/DisplaySearchBar/DisplaySearchBar';

jest.mock('../../Alert/Alert', () => ({
  default: () => null,
  __esModule: true,
}));

const props = {
  getRestaurants: jest.fn(),
  setAlert: jest.fn(),
  restaurants: [],
  clearSearch: jest.fn(),
  handleScriptLoad: jest.fn(),
};

let wrapper = <BaseDisplaySearchBar {...props} />;

afterEach(cleanup);

describe('Search', () => {
  test('1- input "where" updates its value when input simulated', () => {
    const { getByPlaceholderText } = render(wrapper);
    let input = getByPlaceholderText('Where do you want to eat?');

    fireEvent.change(input, {
      target: { value: 'foo', name: 'where' },
    });

    expect(input.value).toBe('foo');
  });

  test('2- input "what" updates its value when input simulated', () => {
    const { getByPlaceholderText } = render(wrapper);
    let input = getByPlaceholderText('What do you want to eat?');

    fireEvent.change(input, {
      target: { value: 'foo', name: 'what' },
    });

    expect(input.value).toBe('foo');
  });

  test('3- if "restaurants" empty ClearButton is not rendered ', () => {
    const { queryByText } = render(wrapper);

    expect(queryByText('Clear')).toBeFalsy();
  });

  test('4- setAlert called if inputs not empty and form submitted', () => {
    const { getByTestId } = render(wrapper);
    fireEvent.submit(getByTestId('form'));

    expect(props.setAlert).toHaveBeenCalled();
  });

  test('5- getRestaurant called if inputs not empty and form submitted', () => {
    const { getByPlaceholderText, getByTestId } = render(wrapper);

    let inputWhere = getByPlaceholderText('Where do you want to eat?');
    let inputWhat = getByPlaceholderText('What do you want to eat?');

    fireEvent.change(inputWhere, {
      target: { value: 'foo', name: 'where' },
    });

    fireEvent.change(inputWhat, {
      target: { value: 'foo', name: 'what' },
    });

    fireEvent.submit(getByTestId('form'));

    expect(props.getRestaurants).toHaveBeenCalled();
  });

  test('6- if "restaurants" not empty ClearButton click should call "clearSearch"', async () => {
    let wrapper = (
      <BaseDisplaySearchBar
        {...props}
        clearSearch={props.clearSearch}
        restaurants={['foo']}
      />
    );

    const { getByTestId } = render(wrapper);

    fireEvent.click(getByTestId('clear'));

    expect(props.clearSearch).toHaveBeenCalled();
  });
});
