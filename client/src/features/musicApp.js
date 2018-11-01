import { combineReducers } from 'redux';
import songs from './songs/reducers';
import pagination from './pagination/reducers';
import search from './search/reducers';
import genres from './genres/reducers';

const musicApp = combineReducers({
  songs,
  pagination,
  search,
  genres,
});

export default musicApp;
