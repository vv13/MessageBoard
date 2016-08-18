import style from './style.css';
import { Icon } from 'antd';
import React, { Component, PropTypes } from 'react';
import Line from 'components/Line';
import DiscussView from '../DiscussView';
import utils from 'utility';
import classnames from 'classnames';

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object,
    discussAdd: PropTypes.func,
    db: PropTypes.object,
    userEmail: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      showDiscuss: false,
    };
    this.toggleDiscussView = this.toggleDiscussView.bind(this);
    this.removeComment = this.removeComment.bind(this);
    this.commentLike = this.commentLike.bind(this);
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

  commentLike() {
    const db = this.props.db;
    db.get(this.props.comment._id).then((doc) => {
      const index = doc.liked.indexOf(this.props.userEmail);
      if (index !== -1) {
        doc.liked.splice(index, 1);
      } else {
        doc.liked.push(this.props.userEmail);
      }
      return db.put(doc);
    })
    .catch(err => err);
  }

  render() {
    const comment = this.props.comment;
    const userEmail = this.props.userEmail;
    const isLiked = comment.liked.indexOf(userEmail) !== -1;
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
          <span
            onClick={this.commentLike}
          >
            <Icon type="heart" className={classnames({ [style.liked]: isLiked })} />{isLiked ? '已喜欢' : '喜欢'}({comment.liked.length})
          </span>
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
