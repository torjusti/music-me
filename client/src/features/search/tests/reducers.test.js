import search from '../reducers';
import * as actions from '../actions';

describe('search reducer', () => {
  it('should be null initially', () => {
    expect(search(undefined, {})).toEqual(null);
  });

  it('should set query', () => {
    expect(
      search(
        undefined,
        actions.setQuery(
          'test',
        ),
      ),
    ).toMatchSnapshot();
  });

  it('should clear query', () => {
    expect(
      search(
        undefined,
        actions.clearQuery(

        ),
      ),
    ).toMatchSnapshot();
  });

});
