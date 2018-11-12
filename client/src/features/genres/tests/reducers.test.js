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
          ['setGenreSelected'],
          true,
        ),
      ),
    ).toMatchSnapshot();
  });

  it('should set no genre', () => {
    expect(
      genres(
        undefined,
        actions.setGenreSelected(
          ['setGenreSelected'],
          false
        ),
      ),
    ).toMatchSnapshot();
  });

  it('should set none genre selected', () => {
    expect(
      genres(
        undefined,
        actions.setGenreSelected(
          [],
          true,
        ),
      ),
    ).toMatchSnapshot();
  });

  it('should select all genre', () => {
    expect(
      genres(
        undefined,
        actions.setGenreSelected(
          ['setGenreSelected', 'genre'],
          true,
        ),
      ),
    ).toMatchSnapshot();
  });
});
