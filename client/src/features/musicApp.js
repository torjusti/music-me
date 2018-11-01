import { combineReducers } from 'redux';
import songs from './songs/reducers';
import pagination from './pagination/reducers';
import search from './search/reducers';

const musicApp = combineReducers({
  songs,
  pagination,
  search,
});

export default musicApp;
