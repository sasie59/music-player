import React, { Component } from "react";
import { connect } from "react-redux";

import "./style.scss";
import {
  STOP,
  NONE,
  PLAY,
  PAUSE,
  RANDOM,
  RESUME,
  ALL_PLAY,
  play,
  stop,
  pause,
  resume,
  setLoopMode,
  appendSecond,
  setCurrentPlaying,
  } from "musicPlayer/actions";

  import  isEndAndCheckNext  from 'musicPlayer_1/tools';

const obj = {
  NONE: "None",
  ALL_PLAY: "All Play",
  RANDOM: "Random",
};
const getRandomExp = (len, exp) => {
  let arr = [...Array(len).keys()];
  arr = [...arr.slice(0, exp),
        ...arr.slice(exp + 1)];
  arr.sort(() => Math.random() - 0.5);
  return arr[0];
};
export class StatusBlock extends Component {
  handleChangeLoopMode = () => {
    const { loopMode } = this.props;
    this.props.setLoopMode(
      loopMode === NONE
        ? ALL_PLAY
        : loopMode === ALL_PLAY
        ? RANDOM
        : loopMode === RANDOM
        ? NONE
        : ""
    );
  };

  handlePrev = () => {
    const {
      songList,
      loopMode,
      currentPlaying = this.props.songList.length,
    } = this.props;
    if (loopMode !== RANDOM) {
      this.props.setCurrentPlaying(currentPlaying - 1);
    }
    if (currentPlaying - 1 <= -1) {
      this.props.setCurrentPlaying(songList.length - 1);
    } else if(loopMode === RANDOM) 
        this.props.setCurrentPlaying(getRandomExp(songList.length, currentPlaying));
  };

  handleNext = () => {
    const { songList, loopMode, currentPlaying = -1 } = this.props;
    if (loopMode !== RANDOM) {
      this.props.setCurrentPlaying(currentPlaying + 1);
    }
    if (currentPlaying + 1 >= songList.length) {
      this.props.setCurrentPlaying(0);
    } else if(loopMode === RANDOM)
    this.props.setCurrentPlaying(getRandomExp(songList.length, currentPlaying));
  };

  handlePlay = () => {
    this.props.stopInterval();
    this.props.play(0);
    this.props.startInterval(setInterval(() => {
      const isStopInterval = isEndAndCheckNext(this.props);
      if(isStopInterval) {
        this.props.stopInterval();
      }
    }, 1000));
  };

  handlePause = () => {
    this.props.pause();
  }

  handleResume = () => {
    this.props.resume();
    this.props.startInterval(setInterval(() => {
      const isStopInterval = isEndAndCheckNext(this.props);
      if(isStopInterval) {
        this.props.stopInterval();
      }
    }, 1000));
  }

  render() {
    const { status, currentPlaying, currentSecond, songList } = this.props;
    let sec = currentSecond % 60;
    let min = Math.floor(currentSecond / 60);
    return (
      <div className="StatusBlock">
        <div className="progressBar">
          <div className="line">
            <div className="race" style={{ whidth: status.action !== STOP ?
            `${Math.floor((currentSecond / songList[currentPlaying].seconds) * 100)}%`
            : 0
            }} />
            </div>
        </div>
        {status.action !== STOP && (
            <div>
              <div>
                {min}:{sec}
              </div>
              <div>
                - {Math.floor((songList[currentPlaying].seconds - currentSecond) / 60
                )} : {(songList[currentPlaying].seconds - currentSecond) % 60}
              </div>
            </div>
          )}
        <div className="controlBar">
          <div className="loopMode">
            <div className="mode" onClick={this.handleChangeLoopMode}>
              {obj[this.props.loopMode]}
            </div>
          </div>
          <div className="controlButton">
            <div className="btn">
              <div className="prev" onClick={this.handlePrev} />
              <div className="prev" onClick={this.handlePrev} />
              <div>
                {status.action === STOP ? (
                  <div className="play" onClick={this.handlePlay} /> 
                  ) : status.action === PLAY || status.action === RESUME ? (
                  <div className="pause" onClick={this.handlePause} /> 
                  ) : status.action === PAUSE ? (
                  <div className='play' onClick={this.handleResume} /> )
                  : null}
              </div>
              <div className="next" onClick={this.handleNext} />
              <div className="next" onClick={this.handleNext} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState2Props = (state) => {
  return {
    status: state.status,
    loopMode: state.loopMode,
    songList: state.songList,
    currentSecond: state.status.currentSecond,
    currentPlaying: state.status.currentPlaying,
  };
};

const mapDispatch2Props = (dispatch) => {
  return {
    stop: () => dispatch(stop()),
    pause: () => dispatch(pause()),
    resume: () => dispatch(resume()),
    play: (index) => dispatch(play(index)),
    appendSecond: () => dispatch(appendSecond()),
    setLoopMode: (loopMode) => dispatch(setLoopMode(loopMode)),
    setCurrentPlaying: (index) => dispatch(setCurrentPlaying(index)),
  };
};

export default connect(mapState2Props, mapDispatch2Props)(StatusBlock);
