import { takeLatest, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';

function* showToastSaga(action) {
  // Tell Redux to show the toast.
  yield put({ type: 'SAGA_SHOW_TOAST', payload: action.payload });

  // Wait five seconds.
  yield delay(5000);

  // Tell Redux to hide the toast again.
  yield put({ type: 'HIDE_TOAST' });
}

function* toastsSaga() {
  yield takeLatest('SHOW_TOAST', showToastSaga);
}

export default toastsSaga;
