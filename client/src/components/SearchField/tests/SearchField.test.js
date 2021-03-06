import React from 'react';
import { shallow } from 'enzyme';
import SearchField from '../SearchField';
import configureMockStore from 'redux-mock-store';

describe('SearchField', () => {
  // Create the mock store.
  const mockStore = configureMockStore();

  let wrapper, store;

  beforeEach(() => {
    store = mockStore();
    // Shallow render the container passing in the mock store.
    wrapper = shallow(<SearchField store={store} />);
  });

  it('should render correctly', () => {
    expect(wrapper.dive()).toMatchSnapshot();
    expect(wrapper.dive().length).toEqual(1);
  });
});
