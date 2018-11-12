import React from 'react';
import { mount, shallow } from "enzyme";
import { Provider } from 'react-redux';
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
    wrapper = mount(
      <Provider store={store}>
        <SidePanel />
      </Provider>,
    );
  });

  it('should render correctly', () => {
    wrapper = shallow(<SidePanel store={store} />);
    expect(wrapper.dive()).toMatchSnapshot();
    expect(wrapper.dive().length).toEqual(1);
  });

  it('should have 1 as selectedRating', () => {
    wrapper = shallow(<SidePanel store={store} />);
    // test that the state values were correctly passed as props
    expect(wrapper.props().rating.selectedRating).toBe(1);
  });

  it('should have ratingEnabled equal to false', () => {
    wrapper = shallow(<SidePanel store={store} />);
    // test that the state values were correctly passed as props
    expect(wrapper.props().rating.ratingEnabled).toBe(false);
  });

  it('should have two checkboxes', () => {
    expect(wrapper.find('ul').children().length).toBe(2);
  });
});
