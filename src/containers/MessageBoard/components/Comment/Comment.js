
import style from './style.css';
import { Icon } from 'antd';
import React, { Component, PropTypes } from 'react';
import Line from 'components/Line';
import DiscussView from '../DiscussView';

class Comment extends Component {
  static propTypes = {
    // FIXME: tmp test
    test: PropTypes.bool,
    comment: PropTypes.object,
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
    const comment = this.props.comment;
    return (
      <div
        className={style.commentWrapper}
      >
        <header className={style.titleWrapper}>
          <img alt="头像" src={comment.headUrl} className={style.headPic} />
          {comment.email}·{comment.date}
        </header>
        <Line />
        <article style={{ padding: '10px' }}>
          <p>{comment.comment}
          </p>
        </article>
        <footer className={style.commentFooter}>
          <span><Icon type="heart" />喜欢</span>
          <span onClick={this.toggleDiscussView}><Icon type="message" />
            {this.state.showDiscuss ? '收起评论' : '评论'}
          </span>
        </footer>
        {this.state.showDiscuss ? <DiscussView discuss={comment.discuss} /> : null}
      </div>
    );
  }
}

export default Comment;
