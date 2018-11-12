import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import Pagination from '../Pagination';
import configureMockStore from 'redux-mock-store';

describe('Pagination', () => {
  const mockStore = configureMockStore();

  let wrapper, store;

  beforeEach(() => {
    const initialState = {
      pagination: {
        page: 0,
        totalPages: 5,
      },
    };

    store = mockStore(initialState);

    wrapper = mount(
      <Provider store={store}>
        <Pagination />
      </Provider>,
    );
  });

  it('renders pagination', () => {
    wrapper = shallow(<Pagination store={store} />);

    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('renders two buttons', () => {
    wrapper = shallow(<Pagination store={store} />);

    expect(wrapper.dive().find('Button').length).toEqual(2);
  });

  it('should send an action when pressing the previous button', () => {
    expect(wrapper.find('Button').length).toEqual(2);
    wrapper
      .find('Button')
      .first()
      .simulate('click');
    expect(store.getActions()).toMatchSnapshot();
  });

  it('should send an action when pressing the next button', () => {
    expect(wrapper.find('Button').length).toEqual(2);
    wrapper
      .find('Button')
      .last()
      .simulate('click');
    expect(store.getActions()).toMatchSnapshot();
  });

  it('should not allow going back when on the first page', () => {
    expect(wrapper.find('Button').length).toEqual(2);
    expect(
      wrapper
        .find('Button')
        .first()
        .props().disabled,
    ).toEqual(true);
  });

  it('should allow advancing when there are pages left', () => {
    expect(wrapper.find('Button').length).toEqual(2);
    expect(
      wrapper
        .find('Button')
        .last()
        .props().disabled,
    ).toEqual(false);
  });

  it('should allow advancing both ways when in the middle', () => {
    const initialState = {
      pagination: {
        page: 3,
        totalPages: 5,
      },
    };

    store = mockStore(initialState);

    wrapper = mount(<Pagination store={store} />);

    expect(wrapper.find('Button').length).toEqual(2);
    expect(
      wrapper
        .find('Button')
        .first()
        .props().disabled,
    ).toEqual(false);
    expect(
      wrapper
        .find('Button')
        .last()
        .props().disabled,
    ).toEqual(false);
  });
});
