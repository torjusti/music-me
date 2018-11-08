import React from 'react';
import { shallow } from 'enzyme';
import DataTable from '../DataTable';
import configureMockStore from 'redux-mock-store'

describe('<DataTable />', () => {

  // Create the mock store
  const mockStore = configureMockStore();

  let wrapper, store;

  beforeEach(() => {
    const initialState = {
      loading: false,
      data: [
        {
          id: 1,
          title: "test title",
          artist: "test artist",
          album: "test album",
          genre: "test genre",
          description: "test description",
          rating: 4,
        },
        {
          id: 2,
          title: "test title2",
          artist: "test artist2",
          album: "test album2",
          genre: "test genre2",
          description: "test description2",
          rating: 2,
        },
      ],
    };

    store = mockStore(initialState);
    // Shallow render the container passing in the mock store
    wrapper = shallow(
      <DataTable store={store} />
    );
  });

  it('should render DataTable snapshot correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render DataTable correctly', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should have loading to be false', () => {
    // test that the state values were correctly passed as props
    expect(wrapper.props().store.getState().loading).toBe(false);
  });
});
