import { combineReducers } from 'redux';
import songs from './songs/reducers';

const musicApp = combineReducers({
  songs,
});

export default musicApp;
