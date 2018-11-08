import React from 'react';
import { shallow } from 'enzyme';
import { SidePanel, mapStateToProps, mapDispatchToProps } from '../SidePanel';
import configureMockStore from 'redux-mock-store'

describe('<SidePanel />', () => {

  // Create the mock store
  const mockStore = configureMockStore();

  let component, store, initialState;

  beforeEach(()=>{
    initialState = {
      genres: {
        availableGenres: ["test1", "test2"],
        selectedGenres: ["test1"],
      },
      selectedRating: 3,
    };

    store = mockStore(initialState);
    // Shallow render the container passing in the mock store
    component = shallow(
      <SidePanel store={store} />
    );
  });

  it('should render SidePanel correctly', () => {
    expect(component.length).toEqual(1);
  });


  it('sidepanel snapshot should be equal', () => {
    expect(component).toMatchSnapshot();
  });

  it('', () => {
    expect(mapStateToProps(initialState).selectedRating).toEqual(3);
  });

  /*
  it('should update rating only by sidepanels update()', () => {

    const newRating = 4;
    const instance = wrapper.instance();
    instance.setValue(newRating);
    instance.update();
  })


  it('', () => {
    // test that the component events dispatch the expected actions
    wrapper.simulate('rollDice');

    const actions = store.getActions();
    expect(actions).toEqual([ { type: 'ROLL_DICE' } ]);
  });
  */

});
