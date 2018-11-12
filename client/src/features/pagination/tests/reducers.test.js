import page from '../reducers';
import * as actions from '../actions';

describe('pagination reducer', () => {
  it('should return page number equal 0', () => {
    expect(page(undefined, {})).toEqual({
      totalPages: 0,
      page: 0,
    });
  });

  it('should set a page', () => {
    expect(
      page(
        undefined,
        actions.setPage(
          1
        ),
      ),
    ).toMatchSnapshot();
  });
});
