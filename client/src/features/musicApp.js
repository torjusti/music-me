import { combineReducers } from 'redux';
import songs from './songs/reducers';
import pagination from './pagination/reducers';
import search from './search/reducers';
import genres from './genres/reducers';
import loadingError from './loadingError/reducers';
import selectedRating from './rating/reducers';

const musicApp = combineReducers({
  songs,
  pagination,
  search,
  genres,
  loadingError,
  selectedRating,
});

export default musicApp;
