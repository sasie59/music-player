import {
  NONE,
  SET_LOOP_MODE
} from 'actions/loopMode';

export default function loopMode(state = NONE, action) {
  switch(action.type) {
    case SET_LOOP_MODE:
      return action.loopMode;
    default:
      return state;
  }
}