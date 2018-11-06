import React from 'react';
import { shallow } from 'enzyme';
import { SidePanel } from '../SidePanel';



describe('<SidePanel />', () => {

  const rating = 3;const genreList = {
    availableGenres: ["test1", "test2"],
    selectedGenres: ["test1"],
  };

  it('should render SidePanel correctly', () => {
    const component = shallow(<SidePanel genres={genreList} selectedRating={rating}/>);
    expect(component).toMatchSnapshot();
  });

  it('should update rating only by sidepanels update()', () => {
    const genreList = {
      availableGenres: ["test1", "test2"],
      selectedGenres: ["test1"],
    };

    const rating = 3;
    const newRating = 4;

    const wrapper = shallow(<SidePanel genres={genreList} selectedRating={rating}/>);
    const instance = wrapper.instance();
    instance.setValue(newRating);
    instance.update();
  })

});
