
import style from './style.css';
import { Icon } from 'antd';
import React, { Component, PropTypes } from 'react';
import Line from 'components/Line';

class Comment extends Component {
  static propTypes = {
    // FIXME: tmp test
    test: PropTypes.bool,
  };

  static defaultProps = {
  };

  state = {}
  render() {
    return (
      <div
        className={style.commentWrapper}
      >
        <header className={style.titleWrapper}>
          <img alt="头像" src="/img/default_head.png" className={style.headPic} />
          zwhvv13@foxmial.com
        </header>
        <Line />
        <article>
          <p>收到返还ｉｏｓ的就覅哦多少级哦ｉｆ觉得搜ｉｊｆｉｏｓｄｊ佛寺大解放ｄｐｓｏｆ尽快哦平时打开佛牌看破破地方恐怕山东皮肤科破地
            方恐怕开发票多水电费水电费水电费水电费水电费水电费第三方地方地方水电费水电费水电费是对方都是水电费飞飞
          </p>
        </article>
        <footer className={style.commentFooter}>
          <span><Icon type="heart" />喜欢</span>
          <span><Icon type="message" />评论</span>
        </footer>
      </div>
    );
  }
}

export default Comment;
