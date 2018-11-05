import { all } from 'redux-saga/effects';
import songsSaga from './songs/sagas';
import genresSaga from './genres/sagas';

function* rootSaga() {
  yield all([songsSaga(), genresSaga()]);
}

export default rootSaga;
