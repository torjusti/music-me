import genres from '../reducers';
import * as actions from '../actions';

describe('genres reducer', () => {
  it('should return an empty array initially', () => {
    expect(genres(undefined, {})).toEqual({availableGenres: [], selectedGenres: []});
  });

  it('should set a genre', () => {
    expect(
      genres(
        undefined,
        actions.setGenreSelected(
          ['setGenreSelected', 'genre'],
          ['setGenreSelected'],
        ),
      ),
    ).toMatchSnapshot();
  });

  it('should set no genre selected', () => {
    expect(
      genres(
        undefined,
        actions.setGenreSelected(
          ['setGenreSelected', 'genre'],
          [],
        ),
      ),
    ).toMatchSnapshot();
  });

  it('should set all genre selected', () => {
    expect(
      genres(
        undefined,
        actions.setGenreSelected(
          ['setGenreSelected', 'genre'],
          ['setGenreSelected', 'genre'],
        ),
      ),
    ).toMatchSnapshot();
  });

  it('should select none genre', () => {
    expect(
      genres(
        undefined,
        actions.setGenreSelected(
          ['setGenreSelected', 'genre'],
          null,
        ),
      ),
    ).toMatchSnapshot();
  });
});
