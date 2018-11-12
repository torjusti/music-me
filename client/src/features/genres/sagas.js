import { call, put, takeLatest } from 'redux-saga/effects';
import { requestData } from '../../common/api';

/**
 * Saga which retrieves available genres for filtering from the server..
 */
function* fetchGenres() {
  // Send a request to the server for genres.
  const response = yield call(requestData, `/genres`);

  if (response.error) {
    // Show an error notification if errros occur.
    yield put({ type: 'FETCH_ERROR' });
  }

  if (response.data) {
    // Send an action to update the available genres if
    // the genres are retrieved correctly from the server.
    yield put({ type: 'SET_GENRES', payload: { genres: response.data } });
  }
}

function* genresSaga() {
  // Run the above saga when FETCH_GENRES actions are retrieved.
  // If another FETCH_GENRES action is retrieved before the last
  // one is finished, the previous is cancelled and the last one starts.
  yield takeLatest(['FETCH_GENRES'], fetchGenres);
}

export default genresSaga;
