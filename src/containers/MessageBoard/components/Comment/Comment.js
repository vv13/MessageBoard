import style from './style.css';
import { Icon } from 'antd';
import React, { Component, PropTypes } from 'react';
import Line from 'components/Line';
import DiscussView from '../DiscussView';
import utils from 'utility';

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object,
    discussAdd: PropTypes.func,
    db: PropTypes.object,
  };
  constructor(props) {
    super(props);
    this.state = {
      showDiscuss: false,
    };
    this.toggleDiscussView = this.toggleDiscussView.bind(this);
    this.removeComment = this.removeComment.bind(this);
  }

  getHeadUrl(email) {
    const md5 = utils.md5(email);
    return `https://www.gravatar.com/avatar/${md5}`;
  }

  toggleDiscussView() {
    this.setState({ showDiscuss: !this.state.showDiscuss });
  }

  removeComment() {
    this.props.db.remove(this.props.comment);
  }

  convertDate(time) {
    const date = new Date(time);
    return date.toLocaleDateString();
  }

  render() {
    const comment = this.props.comment;
    return (
      <div
        className={style.commentWrapper}
      >
        <header className={style.titleWrapper}>
          <img alt="头像" src={this.getHeadUrl(comment.email)} className={style.headPic} />
          <p>
          {comment.email}·{this.convertDate(comment.date)}
          </p>
          <Icon type="cross" className={style.removeComment} onClick={this.removeComment} />
        </header>
        <Line />
        <article style={{ padding: '10px' }}>
          <p>{comment.comment}
          </p>
        </article>
        <footer className={style.commentFooter}>
          <span><Icon type="heart" />喜欢</span>
          <span onClick={this.toggleDiscussView}><Icon type="message" />
            {this.state.showDiscuss ? '收起评论' : `评论(${comment.discuss.length})`}
          </span>
        </footer>
        {this.state.showDiscuss ?
          <DiscussView
            discuss={comment.discuss}
            commentId={comment._id}
            db={this.props.db}
          /> : null}
      </div>
    );
  }
}

export default Comment;
