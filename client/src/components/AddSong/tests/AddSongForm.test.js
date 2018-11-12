import React from 'react';
import { shallow } from 'enzyme';
import AddSongForm from '../AddSongForm';

describe('AddSongForm', () => {
  const wrapper = shallow(<AddSongForm />);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
