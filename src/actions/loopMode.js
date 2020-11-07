export const NONE = 'NONE';
export const ALL_PLAY = 'ALL_PLAY';
export const RANDOM = 'RANDOM';
export const SET_LOOP_MODE = 'SET_LOOP_MODE';

export const setLoopMode = loopMode =>{
  return {
    type: SET_LOOP_MODE,
    loopMode,
  }
}