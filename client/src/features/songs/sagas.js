import { call, put, takeLatest, select, all, take } from 'redux-saga/effects';
import { requestSongs, rateSong, postSong, putSong } from '../../common/api';
import { showToast } from '../toasts/actions';

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
 * Saga which refreshes only the currently visible page, without
 * changing the pagination back to the first page. If the current
 * page no longer exists, the user is sent to the last page.
 */
function* fetchCurrentPage() {
  yield put({ type: 'FETCH_SONGS' });

  // Many actions reset the pagination, because the data has changed.
  // However, the FETCH_SONGS action does not trigger this. This is
  // a small hack, due to the fact that we do not want to reset the
  // pagination after songs are refreshed for example due to the user
  // rating a from the details modal. It would be weird for the user to
  // jump back to page 0 after this. However, this could create weird edge
  // cases for example where the song being rated is the only one on
  // the page, and the rating causes the song to disappear. The best
  // fix I found for this is to set the page to the last possible page
  // if this happens.
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

/**
 * Jump to the last page and fetch data from the server.
 * Used when  adding songs.
 */
function* fetchLastPage() {
  yield put({ type: 'FETCH_SONGS' });
  const action = yield take('SET_TOTAL_PAGES');
  const totalPages = action.payload.totalPages;
  const page = yield select(state => state.pagination.page);

  if (totalPages - 1 > page) {
    yield put({
      type: 'SET_PAGE',
      payload: { page: totalPages - 1 },
    });
  }
}

/**
 * Saga which refreshes the current page when the modal is closed.
 */
function* refreshOnCloseModal() {
  // You might ask, what happened here. Why do we need to wait until the modal
  // is closed? Well, the problem boils down to the rating of songs. The rating
  // of songs could cause the song to disappear for the list, and it can change
  // the order of songs. The simplest fix for this is to reload the list of songs
  // after rating a song. However, refreshing when the modal is open can cause the
  // modal to disappear, because the song can disappear from the list which will
  // kill the tree containing the Modal node. Therefore we wait here until the
  // dialog is closed before refreshing the data.
  yield take('CLOSE_MODAL');
  yield fetchCurrentPage();
}

/**
 * Saga to handle the rating of songs in the details dialog.
 */
function* rateSongSaga(action) {
  // Fetch the previous rating, so that we can abort
  // in case an error happens with our API request.
  const previousRating = yield select(
    state =>
      state.songs.data.filter(song => song.id === action.payload.id).rating,
  );

  // Notify the user that we are starting to rate the song.
  yield put(showToast('Starting to rate song'));

  // Rate the song locally.
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

    // Notify the user that an error occured.
    yield put(showToast('An error occurred rating the song'));
  }

  // Notify the user that the song was rated successfully.
  yield put(showToast('Successfully rated song'));

  // Refresh the table when the modal is closed, to prevent
  // the modal window from being unmounted.
  yield refreshOnCloseModal();
}

/**
 * Saga that handles the adding of songs.
 */
function* addSongSaga(action) {
  // Notify the user that we are adding a new song.
  yield put(showToast('Adding new song to the database'));

  // Send a request to the server to add the song.
  const response = yield call(postSong, action.payload.song);

  if (response.error) {
    // Notify the user that an error occurred.
    yield put(showToast('An error occurred while sending song information.'));
  } else {
    // Fetch the genres. This needs to be done before we fetch
    // the new data for the table, because there could potentially
    // be a mismatch between the table and the genres we use for filtering.
    yield put({ type: 'FETCH_GENRES' });
    yield take('SET_GENRES');
    yield put(showToast('Song added to database'));
    yield fetchLastPage();
  }
}

/**
 * Saga for sending an updated version of a song to the server.
 */
function* updateSongSaga(action) {
  const { id, song } = action.payload;

  // Retrieve the old state, in case we need to revert because of a failed request.
  const previousSong = yield select(state =>
    state.songs.data.filter(song => song.id === id),
  );

  yield put(showToast('Starting to update song'));

  // Update the song locally.
  yield put({ type: 'UPDATE_SONG_LOCALLY', payload: action.payload });

  // Send the updated song to the server.
  const response = yield call(putSong, id, song);

  if (response.error) {
    yield put(showToast('An error occurred while sending song information.'));

    // Restore to the old version of the song.
    yield put({
      type: 'UPDATE_SONG_LOCALLY',
      payload: { id, song: previousSong },
    });
  } else {
    // Make sure to fetch genres before we update the table, to
    // prevent filtering based on nonexisting genres.
    yield put({ type: 'FETCH_GENRES' });
    yield take('SET_GENRES');
    yield put(showToast('Song successfully updated'));
    yield refreshOnCloseModal();
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

    takeLatest('FETCH_CURRENT_PAGE', fetchCurrentPage),

    takeLatest('SEND_SONG_RATING', rateSongSaga),

    takeLatest('ADD_SONG', addSongSaga),

    takeLatest('UPDATE_SONG', updateSongSaga),
  ]);
}

export default songsSaga;
