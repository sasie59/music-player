import {
  STOP,
  PLAY,
  PAUSE,
  RESUME,
  APPEND_SECOND,
  SET_CURRENT_PLAYING,
} from "musicPlayer_1/actions";

export default function status(state = { action: STOP }, action) {
  switch (action.type) {
    case PLAY:
      return {
        action: PLAY,
        currentPlaying: action.index,
        currentSecond: 0,
      };
      case PAUSE: 
      return {
        ...state,
        action: PAUSE,
      }
      case RESUME:
        return {
          ...state,
          action: PLAY,
        }
        case STOP:
          return {
            action: STOP
          }
        case APPEND_SECOND:
      return {
        ...state,
        currentSecond: state.currentSecond + 1,
      }
    case SET_CURRENT_PLAYING:
      return {
        ...state,
        currentPlaying: action.index,
        currentSecond: 0,
      }
    default: 
      return state;
  }
}
