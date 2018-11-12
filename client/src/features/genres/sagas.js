import { call, put, takeLatest } from 'redux-saga/effects';
import { requestData } from '../../common/api';
import { showToast } from '../toasts/actions';

function* fetchGenres() {
  const response = yield call(requestData, `/genres`);

  if (response.error) {
    yield put({ type: 'FETCH_ERROR' });
    yield put(showToast('An error occurred while fetching data'));
  }

  if (response.data) {
    yield put({ type: 'SET_GENRES', payload: { genres: response.data } });
  }
}

function* genresSaga() {
  yield takeLatest(['FETCH_GENRES'], fetchGenres);
}

export default genresSaga;
