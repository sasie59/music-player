import { combineReducers } from 'redux';

import songList from './songList';
import loopMode from './loopMode';
import status from './status';

export default combineReducers({
  songList,
  loopMode,
  status
})