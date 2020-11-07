import React from 'react';
import './style.scss';

export default function InfoBlock(props) {
  return (
    <div className='InfoBlock'>
      <span
        className={`star ${props.isLike ? 'full': ''}`}
        onClick={props.onClickStar}
      />
      <div className='info'>
        <div className='song'>{props.song}</div>
        <div className='singer'>{props.singer}</div>
      </div>
    </div>
  )
}
