import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import DataTable from '../DataTable';
import configureMockStore from 'redux-mock-store';

describe('<DataTable />', () => {
  // Create the mock store.
  const mockStore = configureMockStore();

  let wrapper, store;

  beforeEach(() => {
    const initialState = {
      songs: {
        loading: false,

        data: [
          {
            id: 1,
            title: 'Test title',
            artist: 'Test artist',
            album: 'Test album',
            genre: 'Test genre',
            description: 'Test description',
            rating: 4,
          },

          {
            id: 2,
            title: 'Test title 2',
            artist: 'Test artist 2',
            album: 'Test album 2',
            genre: 'Test genre 2',
            description: 'Test description 2',
            rating: 2,
          },
        ],
      },

      pagination: {
        page: 0,
        totalPages: 1,
      },
    };

    store = mockStore(initialState);

    wrapper = mount(
      <Provider store={store}>
        <DataTable />
      </Provider>,
    );
  });

  it('should render DataTable correctly', () => {
    const wrapper = shallow(<DataTable store={store} />);

    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('should have one table rendered', () => {
    expect(wrapper.find('TableBody').length).toBe(1);
  });

  it('should have two songs', () => {
    expect(wrapper.find('TableBody TableRow').length).toBe(2);
  });

  it('should not be loading', () => {
    expect(wrapper.find('DataTable').props().songs.loading).toBe(false);
  });
});
