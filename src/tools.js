import {
  NONE,
  RANDOM,
  ALL_PLAY, 
  } from "actions";
  
  

const getRandomExp = (len, exp) => {
  let arr = [...Array(len).keys()];
  arr = [...arr.slice(0, exp), ...arr.slice(exp + 1)];
  arr.sort(() => Math.random() - 0.5);
  return arr[0];
};

export default function isEndAndCheckNext(props) {
  props.appendSecond();
  const {
    songList,
    loopMode,
    currentPlaying,
    currentSecond } = props;
  // console.warn(currentSecond,currentPlaying,props);
  if (currentSecond >= songList[currentPlaying].seconds) {
    if (loopMode === NONE) {
      props.stop();
      return true;
    } 
    else if (loopMode === ALL_PLAY) {
      if (currentPlaying < songList.length - 1) {
        props.setCurrentPlaying(currentPlaying + 1);
      } else if (currentPlaying >= songList.length - 1) {
        props.stop();
        return true;
      }
    } else if (loopMode === RANDOM) {
      props.play(getRandomExp(songList.length, currentPlaying));
    }
  }
  return false;
}
