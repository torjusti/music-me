import { combineReducers } from 'redux';
import songs from './songs/reducers';
import pagination from './pagination/reducers';

const musicApp = combineReducers({
  songs,
  pagination,
});

export default musicApp;
