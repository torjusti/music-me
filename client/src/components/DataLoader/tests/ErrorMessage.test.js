import React from 'react';
import { shallow } from 'enzyme';
import ErrorMessage from '../ErrorMessage';

describe('ErrorMessage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ErrorMessage />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
