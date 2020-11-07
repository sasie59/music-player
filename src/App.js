import React, { Component } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";

import reducers from "reducers";
import SongList from 'components/SongList';
import StatusBlock from 'components/StatusBlock';
import './style.scss';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
store.subscribe(() => console.warn(store.getState()));
// store.dispatch(play(5));
// store.dispatch(appendSecond());
// store.dispatch(setCurrentPlaying(0));
// store.dispatch(appendSecond());
// store.dispatch(isLike(0))
// store.dispatch(isLike(8))
// store.dispatch(pause());
// store.dispatch(resume())
// store.dispatch(stop())
// store.dispatch(setLoopMode(ALL_PLAY));
// store.dispatch(setLoopMode(NONE));
// store.dispatch(setLoopMode(RANDOM));

export default class index extends Component {
  
  startInterval = (interval) => {
    this.interval = interval;
  }

  stopInterval = () => {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className='musicPlayer_1'>
        <Provider store={store}>
          <SongList
            startInterval={this.startInterval}
            stopInterval={this.stopInterval}
          />
          <StatusBlock
            startInterval={this.startInterval}
            stopInterval={this.stopInterval}
          />
        </Provider>
      </div>
    )
  }
}
