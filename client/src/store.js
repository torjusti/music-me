import { createStore } from 'redux';
import musicApp from './features/musicApp';

const store = createStore(musicApp);

export default store;
