
import style from './style.css';

import React, { Component, PropTypes } from 'react';
import { Input, Button } from 'antd';

// TODO 如何以更好的方式来进行动态的样式加载
class SendDiscussBox extends Component {
  static propTypes = {
    isReply: PropTypes.bool,
    discussAdd: PropTypes.func,
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      discussInput: '',
    };
    this.handleDiscussInput = this.handleDiscussInput.bind(this);
    this.handleDiscussCommit = this.handleDiscussCommit.bind(this);
  }
  handleDiscussCommit() {
    this.props.discussAdd({
      discuss: [],
      email: 'zwhvv13@foxmail.com',
      headUrl: '/img/default_head.png',
      date: Date.now(),
      comment: this.state.discussInput,
    });
    this.setState({
      discussInput: '',
    });
  }

  handleDiscussInput(e) {
    this.setState({
      discussInput: e.target.value,
    });
  }
  render() {
    const isReply = this.props.isReply;
    const replyBtnStyle = {
      top: '3px',
      right: '-56px',
    };
    const replyHeadStyle = {
      width: '35px',
      height: '35px',
      position: 'relative',
      top: '-5px',
    };
    return (
      <div
        className={style.postBox}
      >
        <div className={style.postBoxLeft}>
          <a href="/img/default_head.png" className={style.userHeadUrl}>
            {isReply ? <img alt="userhead" style={replyHeadStyle} src="/img/default_head.png" className={style.userHead} /> : <img alt="userhead" src="/img/default_head.png" className={style.userHead} />}
          </a>
        </div>
        <div className={style.textWrap}>
          <Input
            placeholder="您想评论一点什么呢.."
            type="textarea" rows={this.props.isReply ? 1 : 3}
            value={this.state.discussInput}
            onChange={this.handleDiscussInput}
          />
          {isReply
            ?
            <Button
              className={style.discussBtn}
              type="primary" size="small"
              style={replyBtnStyle}
              onClick={this.handleDiscussCommit}
            >
              评论
            </Button>
            :
            <Button
              className={style.discussBtn}
              type="primary"
              onClick={this.handleDiscussCommit}
              size="large"
            >
              评论
            </Button>}
        </div>
      </div>
    );
  }
}

export default SendDiscussBox;
