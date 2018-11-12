import { all } from 'redux-saga/effects';
import songsSaga from './songs/sagas';
import genresSaga from './genres/sagas';
import toastsSaga from './toasts/sagas';

function* rootSaga() {
  yield all([songsSaga(), genresSaga(), toastsSaga()]);
}

export default rootSaga;
