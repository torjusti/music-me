import { combineReducers } from 'redux';
import songs from './songs/reducers';
import pagination from './pagination/reducers';
import search from './search/reducers';
import loadingError from './loadingError/reducers';

const musicApp = combineReducers({
  songs,
  pagination,
  search,
  loadingError,
});

export default musicApp;
