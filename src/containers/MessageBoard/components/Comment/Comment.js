import style from './style.css';
import { Icon } from 'antd';
import React, { Component, PropTypes } from 'react';
import Line from 'components/Line';
import DiscussView from '../DiscussView';
import classnames from 'classnames';
import { getHeadUrl } from 'constants/utils';

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object,
    userEmail: PropTypes.string,
    actions: PropTypes.object,
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

  toggleDiscussView() {
    this.setState({ showDiscuss: !this.state.showDiscuss });
  }

  removeComment() {
    this.props.actions.commentRemove(this.props.comment);
  }

  convertDate(time) {
    const date = new Date(time);
    return date.toLocaleDateString();
  }

  commentLike() {
    const commentId = this.props.comment._id;
    const userEmail = this.props.userEmail;
    this.props.actions.commentLike(commentId, userEmail);
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
          <img alt="头像" src={getHeadUrl(comment.email)} className={style.headPic} />
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
            actions={this.props.actions}
          /> : null}
      </div>
    );
  }
}

export default Comment;
