import { call, put, takeLatest, select, all, take } from 'redux-saga/effects';
import { requestSongs, rateSong, postSong, putSong } from '../../common/api';
import { showToast } from '../toasts/actions';

function* fetchSongsSaga() {
  const page = yield select(state => state.pagination.page);
  const search = yield select(state => state.search);
  const selectedGenres = yield select(state => state.genres.selectedGenres);
  const rating = yield select(state => state.rating);
  const orderBy = yield select(state => state.order.orderBy);
  const isAsc = yield select(state => state.order.isAsc);

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
    yield put({ type: 'FETCH_ERROR' });
  }

  if (response.data) {
    yield put({ type: 'SET_SONGS', payload: { songs: response.data.songs } });

    yield put({
      type: 'SET_TOTAL_PAGES',
      payload: { totalPages: response.data.pages },
    });
  }
}

function* fetchCurrentPage() {
  yield put({ type: 'FETCH_SONGS' });

  // Many actions reset the pagination, because the data has changed.
  // However, the FETCH_SONGS action does not trigger this. This is
  // another hack, due to the fact that we do not want to reset the
  // pagination after songs are refreshed for example due to the user
  // rating a from the details modal. It would be weird for the user to
  // jump back to page 0 after this. However, this could create weird edge
  // ases for example where the song being rated is the only one on
  // the page, and the rating causes the song to disappear. The best
  // fix I found for this is to set the page to the last possible page
  // if this happens. However, this entire saga is a gruesome hack.
  const pagesAction = yield take('SET_TOTAL_PAGES');
  const totalPages = pagesAction.payload.totalPages;
  const page = yield select(state => state.pagination.page);

  if (page >= totalPages) {
    yield put({
      type: 'SET_PAGE',
      payload: { page: Math.max(totalPages - 1, 0) },
    });
  }
}

function* refreshOnCloseModal() {
  // You might ask, what happened here. Why do we need to wait until the modal
  // is closed? Well, the problem boils down to the rating of songs. The rating
  // of songs could cause the song to disappear for the list, and it can change
  // the order of songs. The simplest fix for this is to reload the list of songs
  // after rating a song. However, refreshing when the modal is open can cause the
  // modal to disappear, because the song can disappear from the list which will
  // kill the tree containing the Modal node. Therefore, as a hack, we wait here
  // until the dialog is closed before refreshing the data.
  yield take('CLOSE_MODAL');
  yield fetchCurrentPage();
}

function* rateSongSaga(action) {
  const previousRating = yield select(
    state =>
      state.songs.data.filter(song => song.id === action.payload.id).rating,
  );

  yield put(showToast('Starting to rate song'));

  yield put({ type: 'RATE_SONG', payload: action.payload });

  const response = yield call(
    rateSong,
    action.payload.id,
    action.payload.rating,
  );

  if (response.error) {
    yield put({
      type: 'RATE_SONG',
      payload: { id: action.payload.id, rating: previousRating },
    });

    yield put(showToast('An error occurred rating the song'));
  }

  yield put(showToast('Successfully rated song'));

  yield refreshOnCloseModal();
}

function* addSongSaga(action) {
  yield put(showToast('Adding new song to the database'));

  const response = yield call(postSong, action.payload.song);

  if (response.error) {
    yield put(showToast('An error occurred while sending song information.'));
  } else {
    yield put(showToast('Song added to database'));
    yield put({ type: 'FETCH_GENRES' });
    yield take('SET_GENRES');
    yield fetchCurrentPage();
  }
}

function* updateSongSaga(action) {
  const { id, song } = action.payload;

  const previousSong = yield select(state =>
    state.songs.data.filter(song => song.id === id),
  );

  yield put(showToast('Starting to update song'));

  yield put({ type: 'UPDATE_SONG_LOCALLY', payload: action.payload });

  const response = yield call(putSong, id, song);

  if (response.error) {
    yield put(showToast('An error occurred while sending song information.'));
    yield put({
      type: 'UPDATE_SONG_LOCALLY',
      payload: { id, song: previousSong },
    });
  } else {
    yield put(showToast('Song successfully updated'));
    yield put({ type: 'FETCH_GENRES' });
    yield take('SET_GENRES');
    yield refreshOnCloseModal();
  }
}

function* songsSaga() {
  yield all([
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
