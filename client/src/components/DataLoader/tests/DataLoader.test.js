import React from 'react';
import { shallow } from 'enzyme';
import DataLoader from '../index';
import configureMockStore from 'redux-mock-store'

describe('<DataLoader />', () => {

  // Create the mock store
  const mockStore = configureMockStore();

  let wrapper, store;

  beforeEach(() => {
    store = mockStore();
    // Shallow render the container passing in the mock store
    wrapper = shallow(
      <DataLoader store={store} />
    );
  });

  it('should render DataLoader snapshot correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render DataLoader correctly', () => {
    expect(wrapper.length).toEqual(1);
  });
});
