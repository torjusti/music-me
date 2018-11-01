import { call, put, takeLatest, select } from 'redux-saga/effects';
import { requestSongs } from '../../common/api';

function* fetchSongs() {
  const page = yield select(state => state.pagination.page);
  const search = yield select(state => state.search);

  const response = yield call(requestSongs, page, search);

  if (response.error) {
    yield put({ type: 'FETCH_ERROR' });
  }

  if (response.data) {
    yield put({ type: 'SET_SONGS', payload: { songs: response.data.songs } });
    yield put({
      type: 'SET_TOTAL_PAGES',
      payload: { totalPages: response.data.pages },
    });
  }
}

function* songsSaga() {
  yield takeLatest(
    ['FETCH_SONGS', 'SET_PAGE', 'SET_QUERY', 'CLEAR_QUERY'],
    fetchSongs,
  );
}

export default songsSaga;