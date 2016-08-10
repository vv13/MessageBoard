
import style from './style.css';

import React, { Component } from 'react';
import { Icon } from 'antd';
import SendDiscussBox from '../SendDiscussBox';
class Discuss extends Component {
  static propTypes = {
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
    return (
      <div
        className={style.postBox}
      >
        <div className={style.postBoxLeft}>
          <a href="/img/default_head.png" className={style.userHeadUrl}>
            <img alt="userhead" src="/img/default_head.png" className={style.userHead} />
          </a>
        </div>
        <div className={style.textWrap}>
          <p>用户名·日期</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <span onClick={this.handleReplyClick} className={style.replyBtn}><Icon type="enter" />回复</span>
          {this.state.showSendDiscuss ? <SendDiscussBox isReply /> : null}
        </div>
      </div>
    );
  }
}

export default Discuss;
