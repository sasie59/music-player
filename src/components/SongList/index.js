import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  isLike
} from 'musicPlayer_1/actions';

import CoverBlock from './components/CoverBlock';
export class SongList extends Component {

  handleClick = (index) => {
    this.props.isLike(index);
  }

  render() {
    return (
      <div className='SongList'>
        {this.props.songList.map((song,index) => 
          <CoverBlock
            key={song.id}
            index={index}
            song={song.name}
            singer={song.singer}
            isLike={song.isLike}
            stopInterval={this.props.stopInterval}
            startInterval={this.props.startInterval}
            onClickStar={this.handleClick.bind(this,index)}
            />
        )}
      </div>
    )
  }
}

const mapState2Props = (state) => {
  return {
    songList: state.songList,
  }
}
const mapDispatch2Props = (dispatch) => {
  return {
    isLike: (index) => dispatch(isLike(index),)
  }
}
export default connect(mapState2Props, mapDispatch2Props)(SongList);
