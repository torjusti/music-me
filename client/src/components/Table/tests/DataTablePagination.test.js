import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import DataTable from '../DataTable';
import Pagination from '../Pagination';
import configureMockStore from 'redux-mock-store';

describe('<DataTable />', () => {
  // Create the mock store.
  const mockStore = configureMockStore();

  let wrapper, paginationWrapper, store;

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
          {
            id: 3,
            title: 'sest title',
            artist: 'Test artist',
            album: 'Test album',
            genre: 'Test genre',
            description: 'Test description',
            rating: 4,
          },

          {
            id: 4,
            title: 'T title 2',
            artist: 'Test artist 2',
            album: 'Test album 2',
            genre: 'Test genre 2',
            description: 'Test description 2',
            rating: 2,
          },
          {
            id: 5,
            title: 't title',
            artist: 'Test artist',
            album: 'Test album',
            genre: 'Test genre',
            description: 'Test description',
            rating: 4,
          },

          {
            id: 6,
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
        totalPages: 2,
      },
    };

    store = mockStore(initialState);

    wrapper = mount(
      <Provider store={store}>
        <DataTable />
      </Provider>
    );

    paginationWrapper = mount(
      <Provider store={store}>
        <Pagination />
      </Provider>
    )
  });

  it('should render Pagination correctly', () => {
    expect(wrapper.find('Pagination').length).toBe(1);
  });

  it('should have six songs on first page', () => {
    expect(wrapper.find('TableBody TableRow').length).toBe(6);
  });
});
