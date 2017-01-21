
import style from './style.css';

import React, { Component, PropTypes } from 'react';
import { Icon } from 'antd';
import SendDiscussBoxConn from '../../SendDiscussBoxConn';
import { getHeadUrl } from 'constants/utils';

function convertDate(time) {
  const date = new Date(time);
  const t = date.toLocaleTimeString();
  const d = date.toLocaleDateString();
  return `${t}  ${d}`;
}

function genReplyTitle(obj) {
  const normalTitle = <p>{obj.email}·{convertDate(obj.date)}</p>;
  const replyTitle = <p>{obj.email}·回复：{obj.replyTo}</p>;
  return obj.replyTo ? replyTitle : normalTitle;
}
class Discuss extends Component {
  static propTypes = {
    discuss: PropTypes.object,
    commentId: PropTypes.string,
    actions: PropTypes.object,
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
          <a href={getHeadUrl(discuss.email)} className={style.userHeadUrl}>
            <img alt="userhead" src={getHeadUrl(discuss.email)} className={style.userHead} />
          </a>
        </div>
        <div className={style.textWrap}>
          {genReplyTitle(discuss)}
          <p className="discussComment">{discuss.comment}</p>
          <span id="replyBtn" onClick={this.handleReplyClick} className={style.replyBtn}><Icon type="enter" />回复</span>
          {this.state.showSendDiscuss ?
            <SendDiscussBoxConn
              actions={this.props.actions}
              replyTo={discuss.email}
              commentId={this.props.commentId}
              isReply
            /> : null}
        </div>
      </div>
    );
  }
}

export default Discuss;
