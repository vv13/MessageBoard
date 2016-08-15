
import style from './style.css';

import React, { Component, PropTypes } from 'react';
import SendDiscussBox from '../SendDiscussBox';
import Discuss from '../Discuss';

class DiscussView extends Component {
  static propTypes = {
    style: PropTypes.string,
    discuss: PropTypes.array,
    db: PropTypes.object,
    commentId: PropTypes.string,
  };

  static defaultProps = {
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.discussAdd = this.discussAdd.bind(this);
  }

  genDiscuss() {
    const discussArr = this.props.discuss;
    return discussArr.map((a) => <Discuss discuss={a} key={Math.random()} db={this.props.db} commentId={this.props.commentId} />);
  }

  discussAdd(obj) {
    this.props.db.get(this.props.commentId)
      .then(res => {
        res.discuss.push(obj);
        return res;
      })
      .then((res) => this.props.db.put(res));
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
        <SendDiscussBox
          row="3"
          discussAdd={this.discussAdd}
        />
        {this.genDiscuss()}
      </div>
    );
  }
}

export default DiscussView;
