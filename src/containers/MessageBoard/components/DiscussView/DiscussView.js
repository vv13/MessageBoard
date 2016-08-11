
import style from './style.css';

import React, { Component, PropTypes } from 'react';
import SendDiscussBox from '../SendDiscussBox';
import Discuss from '../Discuss';

class DiscussView extends Component {
  static propTypes = {
    style: PropTypes.string,
    discuss: PropTypes.array,
  };

  static defaultProps = {
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  genDiscuss() {
    const discussArr = this.props.discuss;
    return discussArr.map((a) => <Discuss discuss={a} key={new Date()} />);
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
        {this.genDiscuss()}
      </div>
    );
  }
}

export default DiscussView;
