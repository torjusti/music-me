import React from 'react';
import { mount, shallow } from "enzyme";
import { Provider } from 'react-redux';
import Pagination from '../Pagination';
import configureMockStore from 'redux-mock-store';

describe('Pagination', () => {

  // Create the mock store
  const mockStore = configureMockStore();

  let wrapper, store;

  beforeEach(() => {

    const initialState = {
      pagination: {
        page: 1,
        totalPages: 5
      }
    };

    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <Pagination />
      </Provider>,
    );
  });

  it('renders pagination', () => {
    wrapper = shallow(
      <Pagination store={store}/>,
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('renders two buttons', () => {
    wrapper = shallow(
      <Pagination store={store} />,
    );
    expect(wrapper.dive().find('Button').length).toEqual(2);
  });
});
