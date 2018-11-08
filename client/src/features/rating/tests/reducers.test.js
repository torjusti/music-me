import rating from '../reducers';
import * as actions from '../actions';

describe('rating reducer', () => {
  it('should have 1 selectedrating and ratingenabled equal to false', () => {
    expect(rating(undefined, {})).toEqual({
      ratingEnabled: false,
      selectedRating: 1,
    });
  });

  it('should set a new rating', () => {
    expect(
      rating(
        undefined,
        actions.setRatingSelected(
          2
        ),
      ),
    ).toMatchSnapshot();
  });

  it('should toggle rating', () => {
    expect(
      rating(
        undefined,
        actions.toggleRatingEnabled(),
      ),
    ).toMatchSnapshot();
  });
});
