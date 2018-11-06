import React from 'react';
import { shallow } from 'enzyme';
import { DataTable } from '../DataTable';

describe('<DataTable />', () => {
  it('should render datatable correctly with no songs', () => {
    const component = shallow(<DataTable data={[]} />);
    expect(component).toMatchSnapshot();
  });

  it('should render datatable correctly with two songs', () => {
    const songs = [
      {
        id: 1,
        title: "test title",
        artist: "test artist",
        album: "test album",
        genre: "test genre",
        description: "test description",
        rating: 4,
      },
      {
        id: 2,
        title: "test title2",
        artist: "test artist2",
        album: "test album2",
        genre: "test genre2",
        description: "test description2",
        rating: 2,
      },
    ];

    const component = shallow(<DataTable data={songs} />);
    expect(component).toMatchSnapshot();
  });

  it('click on song should show song details', () => {
    const songs = [
      {
        id: 1,
        title: "test title",
        artist: "test artist",
        album: "test album",
        genre: "test genre",
        description: "test description",
        rating: 4,
      }];

    const wrapper = shallow(<DataTable data={songs}/>);
    const instance = wrapper.instance();
    expect(wrapper.state('detailsOpen')).toBe(false);
    instance.handleOpen();
    expect(wrapper.state('detailsOpen')).toBe(true);
    instance.handleClose();
    expect(wrapper.state('detailsOpen')).toBe(false);
  })
});
