import React, { Component } from 'react';
import { connect } from 'react-redux';

import  './style.scss';
import {
  STOP,
  PLAY,
  PAUSE,
  stop,
  play,
  pause,
  resume,
  appendSecond,
  setCurrentPlaying
} from 'actions';

import isEndAndCheckNext from 'tools';

import InfoBlock from './components/InfoBlock'
export class CoverBlock extends Component {

  handlePlay = () => {
    this.props.stopInterval();
    this.props.play(this.props.index);
    this.props.startInterval(setInterval(() => {
      const isStopInterval = isEndAndCheckNext(this.props);
      if(isStopInterval) {
        this.props.stopInterval();
      }
    }, 1000));
  };

  handlePause = () => {
    this.props.pause();
    this.props.stopInterval();
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
    const { action } = this.props  
    const isSame = this.props.currentPlaying === this.props.index;
    return (
      <div className='CoverBlock'>
        <div className="cover">
          <div className={`box ${isSame ? 'darkBox' : ''}`}>
          {!isSame ? <div className="triangle" onClick={this.handlePlay} />:
              action === STOP ? <div className="triangle" onClick={this.handlePlay} />:
              action === PLAY ? <div className="pause" onClick={this.handlePause} />:
              action === PAUSE ? <div className="triangle" onClick={this.handleResume} />:
              null}
          </div>
          <InfoBlock
            song={this.props.song}
            singer={this.props.singer}
            isLike={this.props.isLike}
            onClickStar={this.props.onClickStar}
          />
        </div>
      </div>
    )
  }
}
const mapState2Props = (state) => {
  return {
    status: state.status,
    songList: state.songList,
    loopMode: state.loopMode,
    action: state.status.action,
    currentSecond: state.status.currentSecond,
    currentPlaying: state.status.currentPlaying,
  };
};

const mapDispatch2props = (dispatch) => {
  return {
    stop: () => dispatch(stop()),
    pause: () => dispatch(pause()),
    resume: () => dispatch(resume()),
    play: (index) => dispatch(play(index)),
    appendSecond: () => dispatch(appendSecond()),
    setCurrentPlaying: (index) => dispatch(setCurrentPlaying(index)),
  };
};

export default connect(mapState2Props, mapDispatch2props)(CoverBlock)
