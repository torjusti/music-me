import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import musicApp from './features/musicApp';
import rootSaga from './features/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(musicApp, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(rootSaga);

export default store;
