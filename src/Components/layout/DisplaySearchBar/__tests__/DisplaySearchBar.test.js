import React from 'react';
import { mount } from 'enzyme';

import { DisplaySearchBar as BaseDisplaySearchBar } from '../../../layout/DisplaySearchBar/DisplaySearchBar';

let wrapper;

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

describe('Search', () => {
  beforeEach(() => {
    wrapper = mount(<BaseDisplaySearchBar {...props} />);
  });

  test('1- input "where" updates its value when input simulated', () => {
    wrapper.find('[name="what"]').simulate('change', {
      target: { value: 'foo', name: 'what' },
    });

    expect(wrapper.find('[name="what"]').prop('value')).toBe('foo');
  });

  test('2- input "what" updates its value when input simulated', () => {
    wrapper
      .find('[name="where"]')
      .simulate('change', { target: { value: 'foo', name: 'where' } });

    expect(wrapper.find('[name="where"]').prop('value')).toBe('foo');
  });

  test('3- if "restaurants" empty ClearButton is not rendered ', () => {
    const clear = wrapper.find('[data-testid="clear"]');

    expect(clear.length).toBe(0);
  });

  test('4- on ClearButton "clearSearch" is called', () => {
    wrapper = mount(<BaseDisplaySearchBar {...props} restaurants={['foo']} />);
    wrapper.find('[data-testid="clear"]').simulate('click');

    expect(props.clearSearch).toHaveBeenCalled();
  });

  test('5 - setAlert called if search button is pressed with no input', () => {
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    expect(props.setAlert).toHaveBeenCalled();
  });

  test('6 - getRestaurants called when inputs filled and search button clicked ', () => {
    wrapper
      .find('[name="where"]')
      .simulate('change', { target: { value: 'foo', name: 'where' } });

    wrapper
      .find('[name="what"]')
      .simulate('change', { target: { value: 'foo', name: 'what' } });

    wrapper.find('[data-testid="best_match"]').simulate('click');

    wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    expect(props.getRestaurants).toHaveBeenCalled();
  });
});
