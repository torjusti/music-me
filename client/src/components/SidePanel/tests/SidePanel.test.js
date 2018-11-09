import React from 'react';
import { shallow } from 'enzyme';
import SidePanel from '../SidePanel';
import configureMockStore from 'redux-mock-store';

describe('SidePanel', () => {
  // Create the mock store
  const mockStore = configureMockStore();

  let wrapper, store;

  beforeEach(() => {
    const initialState = {
      genres: {
        availableGenres: [
          {
            id: 1,
            genre: 'Electro',
          },

          {
            id: 2,
            genre: 'Hip-Hop',
          },
        ],

        selectedGenres: ['Hip-Hop'],
      },

      rating: {
        ratingEnabled: false,
        selectedRating: 1,
      },
    };

    store = mockStore(initialState);

    // Shallow render the container passing in the mock store
    wrapper = shallow(<SidePanel store={store} />);
  });

  it('should render correctly', () => {
    expect(wrapper.dive()).toMatchSnapshot();
    expect(wrapper.dive().length).toEqual(1);
  });

  it('should have 1 as selectedRating', () => {
    // test that the state values were correctly passed as props
    expect(wrapper.props().rating.selectedRating).toBe(1);
  });

  it('should have ratingEnabled equal to false', () => {
    // test that the state values were correctly passed as props
    expect(wrapper.props().rating.ratingEnabled).toBe(false);
  });
});
