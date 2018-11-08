import songs from '../reducers';
import * as actions from '../actions';

describe('songs reducer', () => {
  it('should have empty data array and loading equals true initially', () => {
    expect(songs(undefined, {})).toEqual({
      loading: true,
      data: [],
    });
  });

  it('', () => {
    expect(
      songs(
        undefined,
        actions.sendSongRating(
          1, // id
          2, // rating
        ),
      ),
    ).toMatchSnapshot();
  });

});
