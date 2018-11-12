import React from 'react';
import { shallow } from 'enzyme';
import Rate from '../index';
import configureMockStore from 'redux-mock-store'

describe('<Rate />', () => {

  // Create the mock store
  const mockStore = configureMockStore();

  let wrapper, store;

  beforeEach(() => {
    store = mockStore();
    // Shallow render the container passing in the mock store
    wrapper = shallow(
      <Rate store={store} />
    );
  });

  it('should render Rate snapshot correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render Rate correctly', () => {
    expect(wrapper.length).toEqual(1);
  });
});
