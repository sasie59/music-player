export const PLAY = 'PLAY';
export const STOP = 'STOP';
export const PAUSE = 'PAUSE';
export const RESUME = 'RESUME';
export const STOP_SECOND = 'STOP_SECOND';
export const APPEND_SECOND = 'APPEND_SECOND';
export const SET_CURRENT_PLAYING = 'SET_CURRENT_PLAYING';


export const play = (index) => {
  return {
    type: PLAY,
    index
  };
}
export const stop = () => {
  return {
    type: STOP,
  };
}
export const pause = () => {
  return {
    type: PAUSE,
  };
}
export const resume = () => {
  return {
    type: RESUME,
  };
}
export const appendSecond = () => {
  return {
    type: APPEND_SECOND
  };
}
export const stopSecond = () => {
  return {
    type: STOP_SECOND
  };
}
export const setCurrentPlaying = (index) => {
  return {
    type: SET_CURRENT_PLAYING,
    index
  };
}