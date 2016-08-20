
import style from './style.css';

import React, { Component, PropTypes } from 'react';
import SendDiscussBoxConn from '../../SendDiscussBoxConn';
import Discuss from '../Discuss';

class DiscussView extends Component {
  static propTypes = {
    style: PropTypes.string,
    commentId: PropTypes.string,
    actions: PropTypes.object,
    discuss: PropTypes.array,
  };

  static defaultProps = {
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    const discussArr = this.props.discuss;
    return (
      <div
        className={style.discussView}
      >
        <div className={style.triangle}>
        </div>
        <div className={style.triangleBorder}>
        </div>
        <SendDiscussBoxConn
          row="3"
          actions={this.props.actions}
          commentId={this.props.commentId}
        />
      {discussArr.map((discuss) => <Discuss discuss={discuss} key={discuss.date} commentId={this.props.commentId} actions={this.props.actions} />)}
      </div>
    );
  }
}

export default DiscussView;
