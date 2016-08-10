
import style from './style.css';

import React, { Component } from 'react';
import { Input, Button } from 'antd';

class SendDiscussBox extends Component {
  static propTypes = {
  };
  constructor(props, context) {
    super(props, context);
    this.state = {};
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
          <Input placeholder="您想评论一点什么呢.." type="textarea" rows={3} />
          <Button className={style.discussBtn} type="primary" size="large">评论</Button>
        </div>
      </div>
    );
  }
}

export default SendDiscussBox;
