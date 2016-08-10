
import style from './style.css';

import React, { Component, PropTypes } from 'react';
import SendDiscussBox from '../SendDiscussBox';
import Discuss from '../Discuss';

class DiscussView extends Component {
  static propTypes = {
    style: PropTypes.string,
  };

  static defaultProps = {
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <div
        className={style.discussView}
      >
        <div className={style.triangle}>
        </div>
        <div className={style.triangleBorder}>
        </div>
        <SendDiscussBox row="3" />
        <Discuss />
        <Discuss />
      </div>
    );
  }
}

export default DiscussView;
