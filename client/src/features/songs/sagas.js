import { call, put, takeLatest, fork, take } from 'redux-saga/effects';
import { requestData } from '../../common/api';

function* fetchSongs(page) {
  const response = yield call(requestData, `/songs?page=${page}`);

  if (response.error) {
    yield put({ type: 'FETCH_ERROR' });
  }

  if (response.data) {
    yield put({ type: 'SET_SONGS', payload: { songs: response.data } });
  }
}

function* songsSaga() {
  let page = 0;

  yield fork(function*() {
    while (true) {
      const action = yield take('SET_PAGE');

      page = action.payload.page;
    }
  });

  yield takeLatest(['FETCH_SONGS', 'SET_PAGE'], fetchSongs, page);
}

export default songsSaga;
