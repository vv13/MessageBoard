
import style from './style.css';
import { Icon } from 'antd';
import React, { Component, PropTypes } from 'react';
import Line from 'components/Line';
import DiscussView from '../DiscussView';

class Comment extends Component {
  static propTypes = {
    // FIXME: tmp test
    test: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.state = {
      showDiscuss: false,
    };
    this.toggleDiscussView = this.toggleDiscussView.bind(this);
  }
  toggleDiscussView() {
    this.setState({ showDiscuss: !this.state.showDiscuss });
  }

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
        <article style={{ padding: '10px' }}>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </article>
        <footer className={style.commentFooter}>
          <span><Icon type="heart" />喜欢</span>
          <span onClick={this.toggleDiscussView}><Icon type="message" />
            {this.state.showDiscuss ? '收起评论' : '评论'}
          </span>
        </footer>
        {this.state.showDiscuss ? <DiscussView /> : null}
      </div>
    );
  }
}

export default Comment;
