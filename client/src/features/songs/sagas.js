import { call, put, takeLatest, select, all, take } from 'redux-saga/effects';
import { requestSongs, rateSong } from '../../common/api';

/**
 * Saga which retrieves songs from the server based on the
 * currently selected filtering data.
 */
function* fetchSongsSaga() {
  // Fetch all relevant fields for the request from the store.
  const page = yield select(state => state.pagination.page);
  const search = yield select(state => state.search);
  const selectedGenres = yield select(state => state.genres.selectedGenres);
  const rating = yield select(state => state.rating);
  const orderBy = yield select(state => state.order.orderBy);
  const isAsc = yield select(state => state.order.isAsc);

  // Call the API, providing all the relevant values.
  const response = yield call(
    requestSongs,
    page,
    search,
    selectedGenres,
    rating,
    orderBy,
    isAsc,
  );

  if (response.error) {
    // Send an action which will eventually notify the user that an error happened.
    yield put({ type: 'FETCH_ERROR' });
  }

  if (response.data) {
    // Send an action to update the songs in the table.
    yield put({ type: 'SET_SONGS', payload: { songs: response.data.songs } });

    // Send an action to update the total number of pages.
    yield put({
      type: 'SET_TOTAL_PAGES',
      payload: { totalPages: response.data.pages },
    });
  }
}

/**
 * Saga which handles the rating of a single song.
 */
function* rateSongSaga(action) {
  // Fetch the previous rating, so that we can abort
  // in case an error happens with our API request.
  const previousRating = yield select(
    state =>
      state.songs.data.filter(song => song.id === action.payload.id).rating,
  );

  // Rate the song locally instantly.
  yield put({ type: 'RATE_SONG', payload: action.payload });

  // Send a rating request to our API.
  const response = yield call(
    rateSong,
    action.payload.id,
    action.payload.rating,
  );

  if (response.error) {
    // Undo the rating if an error occurs.
    yield put({
      type: 'RATE_SONG',
      payload: { id: action.payload.id, rating: previousRating },
    });
  }

  // You might ask, what happened here. Why do we need to wait until the modal
  // is closed? Well, the problem boils down to the rating of songs. The rating
  // of songs could cause the song to disappear for the list, and it can change
  // the order of songs. The simplest fix for this is to reload the list of songs
  // after rating a song. However, refreshing when the modal is open can cause the
  // modal to disappear, because the song can disappear from the list which will
  // kill the tree containing the Modal node. Therefore, as a hack, we wait here
  // until the dialog is closed before refreshing the data.
  yield take('CLOSE_MODAL');
  yield put({ type: 'FETCH_SONGS' });

  // Many actions reset the pagination, because the data has changed.
  // However, the FETCH_SONGS action does not trigger this. This is
  // another hack, due to the fact that we do not want to reset the
  // pagination after songs aare refreshed due to the user rating a
  // from the details modal. It would be weird for the user to jump
  // back to page 0 after this. However, this could create weird edge
  // ases for example where the song being rated is the only one on
  // the page, and the rating causes the song to disappear. The best
  // fix I found for this is to set the page to the last possible page
  // if this happens. However, this entire saga is a gruesome hack.
  const pagesAction = yield take('SET_TOTAL_PAGES');
  const totalPages = pagesAction.payload.totalPages;
  const page = yield select(state => state.pagination.page);

  // If the page disappeared following the rating, set the user on the
  // last page instead of remainding out of bounds.
  if (page >= totalPages) {
    yield put({
      type: 'SET_PAGE',
      payload: { page: Math.max(totalPages - 1, 0) },
    });
  }
}

function* songsSaga() {
  yield all([
    // Take all actions which should result in the table being updated.
    // Later actions will cancel previous ones, so the retrieved data
    // is always up to date.
    takeLatest(
      [
        'FETCH_SONGS',
        'SET_PAGE',
        'SET_QUERY',
        'CLEAR_QUERY',
        'SET_SELECTED_GENRE',
        'SET_SELECTED_RATING',
        'TOGGLE_RATING_ENABLED',
        'SET_COLUMN',
        'TOGGLE_DIRECTION',
        'CLEAR_ORDER',
      ],

      fetchSongsSaga,
    ),

    // Handle the action for rating songs.
    takeLatest('SEND_SONG_RATING', rateSongSaga),
  ]);
}

export default songsSaga;
