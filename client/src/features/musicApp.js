import { combineReducers } from 'redux';
import songs from './songs/reducers';
import page from './pagination/reducers';

const musicApp = combineReducers({
  songs,
  page,
});

export default musicApp;
