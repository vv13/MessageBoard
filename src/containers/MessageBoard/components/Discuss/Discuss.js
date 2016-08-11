
import style from './style.css';

import React, { Component, PropTypes } from 'react';
import { Icon } from 'antd';
import SendDiscussBox from '../SendDiscussBox';
class Discuss extends Component {
  static propTypes = {
    discuss: PropTypes.object,
  };

  static defaultProps = {
    className: '',
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      showSendDiscuss: false,
    };
    this.handleReplyClick = this.handleReplyClick.bind(this);
  }

  handleReplyClick() {
    this.setState({ showSendDiscuss: !this.state.showSendDiscuss });
  }

  render() {
    const discuss = this.props.discuss;
    return (
      <div
        className={style.postBox}
      >
        <div className={style.postBoxLeft}>
          <a href="/img/default_head.png" className={style.userHeadUrl}>
            <img alt="userhead" src={discuss.headUrl} className={style.userHead} />
          </a>
        </div>
        <div className={style.textWrap}>
          <p>{discuss.email}·{discuss.date}</p>
          <p>{discuss.comment}</p>
          <span onClick={this.handleReplyClick} className={style.replyBtn}><Icon type="enter" />回复</span>
          {this.state.showSendDiscuss ? <SendDiscussBox isReply /> : null}
        </div>
      </div>
    );
  }
}

export default Discuss;
