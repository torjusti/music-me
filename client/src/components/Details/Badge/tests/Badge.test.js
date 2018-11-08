import React from 'react';
import { shallow } from 'enzyme';
import Badge from '../index';
import configureMockStore from 'redux-mock-store'

describe('<Badge />', () => {

  // Create the mock store
  const mockStore = configureMockStore();

  let wrapper, store;

  beforeEach(() => {
    store = mockStore();
    // Shallow render the container passing in the mock store
    wrapper = shallow(
      <Badge store={store} />
    );
  });

  it('should render Badge snapshot correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render Badge correctly', () => {
    expect(wrapper.length).toEqual(1);
  });
});
