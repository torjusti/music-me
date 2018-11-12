import React from 'react';
import { shallow } from 'enzyme';
import Details from '../index';
import configureMockStore from 'redux-mock-store';

describe('<Details />', () => {
  // Create the mock store
  const mockStore = configureMockStore();

  let wrapper, store;

  beforeEach(() => {
    store = mockStore();

    // Shallow render the container passing in the mock store
    wrapper = shallow(<Details store={store} />);
  });

  it('should render correctly', () => {
    expect(wrapper.dive()).toMatchSnapshot();
    expect(wrapper.dive().length).toEqual(1);
  });
});
