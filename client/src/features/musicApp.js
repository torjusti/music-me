import { combineReducers } from 'redux';
import songs from './songs/reducers';
import pagination from './pagination/reducers';
import search from './search/reducers';
import genres from './genres/reducers';
import loadingError from './loadingError/reducers';
import rating from './rating/reducers';
import order from './order/reducers';
import toasts from './toasts/reducers';

const musicApp = combineReducers({
  songs,
  pagination,
  search,
  genres,
  loadingError,
  rating,
  order,
  toasts,
});

export default musicApp;
