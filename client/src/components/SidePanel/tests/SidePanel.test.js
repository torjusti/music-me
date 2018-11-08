import React from 'react';
import { shallow } from 'enzyme';
import SidePanel from '../SidePanel';
import configureMockStore from 'redux-mock-store'

describe('<SidePanel />', () => {

  // Create the mock store
  const mockStore = configureMockStore();

  let wrapper, store;

  beforeEach(() => {
    const initialState = {
      genres: {
        availableGenres: ["test1", "test2"],
        selectedGenres: ["test1"],
      },
      rating: {
        ratingEnabled: false,
        selectedRating: 1,
      }
    };

    store = mockStore(initialState);
    // Shallow render the container passing in the mock store
    wrapper = shallow(
      <SidePanel store={store} />
    );
  });

  it('should render Sidepanel snapshot correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });


  it('should render SidePanel correctly', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should have 1 as selectedRating', () => {
    // test that the state values were correctly passed as props
    expect(wrapper.props().rating.selectedRating).toBe(1);
  });

  it('should have ratingEnabled equal to false', () => {
    // test that the state values were correctly passed as props
    expect(wrapper.props().rating.ratingEnabled).toBe(false);
  });

  it('should have two available genres', () => {
    // test that the state values were correctly passed as props
    expect(wrapper.props().genres.availableGenres).toEqual(["test1", "test2"]);
  });

  it('should have one selected genre', () => {
    // test that the state values were correctly passed as props
    expect(wrapper.props().genres.selectedGenres).toEqual(["test1"]);
  });
});
