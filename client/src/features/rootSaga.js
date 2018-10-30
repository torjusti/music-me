import { all } from 'redux-saga/effects';
import songsSaga from './songs/sagas';

function* rootSaga() {
  yield all([songsSaga()]);
}

export default rootSaga;
