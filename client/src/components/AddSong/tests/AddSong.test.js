import React from 'react';
import { shallow } from 'enzyme';
import { AddSong } from '../index';

describe('AddSong', () => {
  const wrapper = shallow(<AddSong />);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
